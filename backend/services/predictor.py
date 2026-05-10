import os
import re
import joblib
import numpy as np
import shap
from sentence_transformers import SentenceTransformer

# ===============================
# LOAD MODELS & ARTIFACTS
# ===============================
MODEL_DIR = os.path.join(os.path.dirname(__file__), '../model')
tfidf_path = os.path.join(MODEL_DIR, 'tfidf_vectorizer.pkl')
scaler_path = os.path.join(MODEL_DIR, 'scaler.pkl')      # NEW: Added Scaler
lr_path = os.path.join(MODEL_DIR, 'lr_model.pkl')
background_path = os.path.join(MODEL_DIR, 'x_background.npy')

print("Loading ML models and Scaler...")
tfidf = joblib.load(tfidf_path)
scaler = joblib.load(scaler_path)                        # NEW: Load Scaler
model = joblib.load(lr_path)
X_background = np.load(background_path)

# NEW: Get TF-IDF dimension for SHAP splitting
tfidf_dim = len(tfidf.get_feature_names_out())

print("Initializing SHAP explainer...")
# Note: X_background is already standardized from your training script
explainer = shap.LinearExplainer(model, X_background)

print("Loading LaBSE model...")
labse_model = SentenceTransformer('sentence-transformers/LaBSE')

def preprocess(text):
    # 1. Basic conversion to string
    text = str(text)
    
    # 2. Remove Copyright boilerplate and dates (e.g., © 2024, 2026, etc.)
    text = re.sub(r'©\s*\d{4}', '', text)
    text = re.sub(r'Copyright\s*©?\s*\d{4}', '', text, flags=re.IGNORECASE)
    
    # 3. Remove URL/Links noise if any remains
    text = re.sub(r'https?://\S+|www\.\S+', '', text)
    
    # 4. Remove English letters (as requested previously)
    text = re.sub(r'[a-zA-Z]', '', text)
    
    # 5. Clean up trailing noise like (..). or repetitive dots
    # This often appears at the end of scraped articles
    text = re.sub(r'\(\s*\.\s*\.\s*\)', '', text) # Remove (..)
    text = re.sub(r'\.{2,}', '.', text)           # Normalize multiple dots to one
    
    # 6. Normalize whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # 7. Final strip and removal of trailing noise characters
    text = text.strip()
    # Remove trailing non-Urdu characters that aren't standard sentence enders
    text = re.sub(r'[^\u0600-\u06FF۔؟!]+$', '', text)
    
    return text.strip()



def predict(text):
    """
    Sentence-level prediction pipeline as per urdu_bias_pipeline_fixes.md.
    Processes each sentence independently to ensure faithful attribution.
    """
    clean_text = preprocess(text)
    
    # Split document into sentences
    # Urdu sentence delimiters: ۔ (full stop), ؟ (question), ! (exclamation)
    sentences_raw = re.split(r'([۔؟!])', clean_text)
    assembled_sentences = []
    for i in range(0, len(sentences_raw)-1, 2):
        assembled_sentences.append(sentences_raw[i] + sentences_raw[i+1])
    if len(sentences_raw) % 2 != 0 and sentences_raw[-1].strip():
        assembled_sentences.append(sentences_raw[-1])

    sentence_results = []
    doc_probs = []

    # Weights for combined scoring
    ALPHA = 0.6 # TF-IDF (Lexical)
    BETA = 0.4  # LaBSE (Semantic)

    for sentence_text in assembled_sentences:
        sentence_text = sentence_text.strip()
        if not sentence_text: continue

        # 1. Extract Features for this sentence
        X_tfidf = tfidf.transform([sentence_text]).toarray()
        X_labse = labse_model.encode([sentence_text])
        X_raw = np.hstack((X_tfidf, X_labse))
        
        # 2. Scale
        X_scaled = scaler.transform(X_raw)
        
        # 3. Predict
        probs = model.predict_proba(X_scaled)[0]
        prob_biased = float(probs[1])
        doc_probs.append(prob_biased)
        
        # 4. SHAP for this sentence
        shap_values = explainer.shap_values(X_scaled)
        if isinstance(shap_values, list):
            final_shap = shap_values[1][0]
        else:
            final_shap = shap_values[0] if len(shap_values.shape) == 2 else shap_values

        # Split SHAP
        shap_tfidf = final_shap[:tfidf_dim]
        shap_labse = final_shap[tfidf_dim:]

        # Lexical (TF-IDF) Influence
        lexical_influence = float(np.sum(shap_tfidf))
        
        # Top contributing words from TF-IDF

        feature_names = tfidf.get_feature_names_out()

        feature_contributions = []

        # Extract TF-IDF features present in this sentence
        for feature, idx in tfidf.vocabulary_.items():

            # Only keep features actually present in sentence
            if feature in sentence_text:

                if idx < len(shap_tfidf):

                    contribution = float(shap_tfidf[idx])

                    # Stronger filtering
                    if abs(contribution) > 0.03:

                        feature_contributions.append(
                            (feature, contribution)
                        )

        # Sort by importance
        feature_contributions.sort(
            key=lambda x: abs(x[1]),
            reverse=True
        )

        # Separate bigrams and unigrams
        bigrams = []
        unigrams = []

        for feature, contribution in feature_contributions:

            if " " in feature:
                bigrams.append(feature)
            else:
                unigrams.append(feature)

        # Prioritize phrase-level features
        # Prioritize phrase-level evidence first
        top_words = []

        # Add strongest bigrams first
        top_words.extend(bigrams[:5])

        # Only add unigrams if needed
        remaining_slots = 5 - len(top_words)

        if remaining_slots > 0:
            top_words.extend(unigrams[:remaining_slots])

        # Semantic Score (LaBSE component)
        semantic_direction = float(np.sum(shap_labse))
        semantic_label = "biased" if semantic_direction > 0 else "unbiased"

        # Final Combined Sentence Score
        # Using a normalized version of lexical influence + the raw probability
        final_score = (ALPHA * lexical_influence) + (BETA * (prob_biased - 0.5) * 2)

        sentence_results.append({
            "sentence": sentence_text,
            "score": final_score,
            "prediction": "biased" if prob_biased > 0.5 else "unbiased",
            "confidence": prob_biased if prob_biased > 0.5 else (1 - prob_biased),
            "top_words": top_words,
            "semantic_label": semantic_label
        })

    # Aggregate for Document Level
    if doc_probs:
        avg_prob = np.mean(doc_probs)
        doc_label = "biased" if avg_prob > 0.5 else "unbiased"
        doc_confidence = avg_prob if avg_prob > 0.5 else (1 - avg_prob)
    else:
        doc_label = "unbiased"
        doc_confidence = 0.0

    # Global Semantic Signal (for the whole text summary)
    # Re-calculate on whole text for the summary component
    X_labse_full = labse_model.encode([clean_text])
    X_tfidf_full = tfidf.transform([clean_text]).toarray()
    X_raw_full = np.hstack((X_tfidf_full, X_labse_full))
    X_scaled_full = scaler.transform(X_raw_full)
    shap_full = explainer.shap_values(X_scaled_full)
    if isinstance(shap_full, list): final_shap_full = shap_full[1][0]
    else: final_shap_full = shap_full[0] if len(shap_full.shape) == 2 else shap_full
    
    shap_labse_full = final_shap_full[tfidf_dim:]
    semantic_strength_full = float(np.sum(np.abs(shap_labse_full)))
    semantic_direction_full = float(np.sum(shap_labse_full))

    semantic_signal = {
        "score": min(1.0, semantic_strength_full / 10.0),
        "label": "biased" if semantic_direction_full > 0 else "unbiased"
    }

    return doc_label, float(doc_confidence), sentence_results, semantic_signal
