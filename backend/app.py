from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.predictor import predict
from services.validator import is_urdu
from services.url_extractor import extract_text_from_url
from services.llm_service import explain_bias, rewrite_unbiased

app = FastAPI(title="Urdu Bias Detection API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestData(BaseModel):
    text: str = None
    url: str = None

@app.get("/")
async def root():
    return {"message": "Urdu Bias Detection API is running"}

@app.post("/predict")
async def classify(data: RequestData):
    input_text = ""
    
    if data.url:
        print(f"Extracting text from URL: {data.url}")
        input_text = extract_text_from_url(data.url)
        if not input_text:
            raise HTTPException(status_code=400, detail="Could not extract text from the provided URL")
    elif data.text:
        input_text = data.text
    else:
        raise HTTPException(status_code=400, detail="No input provided. Please provide 'text' or 'url'.")

    # Validate if it's Urdu
    if not is_urdu(input_text):
        raise HTTPException(status_code=400, detail="The input text does not appear to be in Urdu.")

    try:
        pred, prob, sentence_scores, semantic_signal = predict(input_text)
        return {
            "prediction": pred,
            "confidence": round(prob, 4),
            "sentence_scores": sentence_scores,
            "semantic_signal": semantic_signal,
            "text_preview": input_text[:200] + "..." if len(input_text) > 200 else input_text
        }
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail="An error occurred during prediction.")

class LLMRequest(BaseModel):
    sentence: str

class LLMExplainRequest(BaseModel):
    data: dict

@app.post("/explain")
async def explain(req: LLMExplainRequest):
    print(f"\n[API] Received /explain request for grounded analysis")
    try:
        explanation = explain_bias(req.data)
        return {"explanation": explanation}
    except Exception as e:
        print(f"[API] Error in /explain: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/rewrite")
async def rewrite(data: LLMRequest):
    print(f"\n[API] Received /rewrite request for sentence")
    try:
        rewritten = rewrite_unbiased(data.sentence)
        return {"rewritten": rewritten}
    except Exception as e:
        print(f"[API] Error in /rewrite: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
