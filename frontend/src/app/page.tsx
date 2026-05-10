"use client";

import { useState, useEffect, useRef } from "react";

const translations = {
  en: {
    title: "URDU BIAS DETECTION",
    subtitle: "Analyzing journalistic integrity through machine learning.",
    textLabel: "ENTER TEXT:",
    urlLabel: "NEWS URL:",
    placeholderText: "Paste Urdu text here for analysis...",
    placeholderUrl: "https://example.com/news-article",
    or: "OR",
    analyze: "ANALYZE",
    newAnalysis: "NEW ANALYSIS",
    processing: "PROCESSING...",
    resultsTitle: "ANALYSIS RESULTS",
    prediction: "PREDICTION",
    confidence: "CONFIDENCE",
// ... rest of en translations ...
    summary: "TEXT PREVIEW",
    biased: "BIASED",
    unbiased: "UNBIASED",
    error: "An error occurred.",
    urduValidation: "Input must be in Urdu language.",
    kicker: "INTELLIGENCE",
    langToggle: "اردو",
    dir: "ltr",
    semanticInfluence: "SEMANTIC INFLUENCE (LaBSE)",
    semanticStrength: "Strength",
    semanticDirection: "Direction",
    explain: "EXPLAIN BIAS",
    neutralize: "NEUTRALIZE",
    explanationTitle: "WHY IS THIS BIASED?",
    neutralVersionTitle: "NEUTRAL VERSION",
    loadingLLM: "Consulting LLM Analyst...",
  },
  ur: {
    title: "اردو جانبدارانہ تحریر کی شناخت",
    subtitle: "مشینی سیکھنے کے ذریعے صحافتی سالمیت کا تجزیہ۔",
    textLabel: "متن درج کریں:",
    urlLabel: "خبر کا لنک (URL) دیں:",
    placeholderText: "تجزیہ کے لیے یہاں اردو متن لکھیں یا پیسٹ کریں...",
    placeholderUrl: "https://example.com/news-article",
    or: "یا",
    analyze: "تجزیہ کریں",
    newAnalysis: "نیا تجزیہ کریں",
    processing: "پروسیسنگ ہو رہی ہے...",
    resultsTitle: "تجزیہ کے نتائج",
    prediction: "نتیجہ",
    confidence: "یقین دہانی",
// ... rest of ur translations ...
    summary: "متن کا خلاصہ",
    biased: "جانبدار",
    unbiased: "غیر جانبدار",
    error: "کچھ غلط ہو گیا ہے۔",
    urduValidation: "متن اردو زبان میں ہونا ضروری ہے۔",
    kicker: "انٹیلی جنس",
    langToggle: "English",
    dir: "rtl",
    semanticInfluence: "سیمنٹک اثر (LaBSE)",
    semanticStrength: "شدت",
    semanticDirection: "سمت",
    explain: "وضاحت کریں",
    neutralize: "غیر جانبدار بنائیں",
    explanationTitle: "یہ کیوں جانبدارانہ ہے؟",
    neutralVersionTitle: "غیر جانبدار ورژن",
    loadingLLM: "ایل ایل ایم تجزیہ کار سے مشورہ کیا جا رہا ہے...",
  },
};

export default function Home() {
// ... existing state ...
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"en" | "ur">("en");
  const [inputText, setInputText] = useState("");
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // LLM Interaction State
  const [llmData, setLlmData] = useState<{[key: number]: { explanation?: string, rewritten?: string, loading?: boolean }}>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = translations[lang];

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = t.dir;
      document.documentElement.lang = lang;
    }
  }, [lang, t.dir, mounted]);

  // Scroll heat map to top whenever a new result is loaded
  useEffect(() => {
    if (result && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [result]);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />; // Clean skeleton for initial load
  }

  const toggleLang = () => {
    setLang(lang === "en" ? "ur" : "en");
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    // We don't clear result immediately here so loading state is handled by the button
    // Actually, user wants it to swap, so let's keep it until fetch completes or clear it?
    // Let's clear it on fetch start to show processing in place of input.
    // Wait, user said "load in place of input boxes". 
    // So when Analyze is clicked, input boxes disappear, result appears.
    
    const payload = inputUrl ? { url: inputUrl } : { text: inputText };

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || t.error);
      }

      setResult(data);
      setLlmData({}); // Reset LLM data on successful new prediction
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setError("");
    // Keep inputText/Url for convenience? User said "revert to input boxes". 
    // Usually clears but let's see. I'll clear them to make it a fresh start.
    setInputText("");
    setInputUrl("");
  };

// ... handleExplain, handleRewrite, getHighlightIndices ...
  const handleExplain = async (sentenceData: any, idx: number) => {
    console.log(`[FRONTEND] Requesting grounded explanation for sentence ${idx}`);
    setLlmData(prev => ({ ...prev, [idx]: { ...prev[idx], loading: true } }));
    try {
      const response = await fetch("http://localhost:8000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: sentenceData }),
      });
      const data = await response.json();
      console.log(`[FRONTEND] Received explanation for sentence ${idx}:`, data);
      setLlmData(prev => ({ 
        ...prev, 
        [idx]: { 
          ...prev[idx], 
          explanation: data.explanation, 
          loading: false 
        } 
      }));
    } catch (err) {
      console.error(`[FRONTEND] Error fetching explanation:`, err);
      setLlmData(prev => ({ ...prev, [idx]: { ...prev[idx], loading: false } }));
    }
  };

  const handleRewrite = async (sentence: string, idx: number) => {
    console.log(`[FRONTEND] Requesting rewrite for sentence ${idx}`);
    setLlmData(prev => ({ ...prev, [idx]: { ...prev[idx], loading: true } }));
    try {
      const response = await fetch("http://localhost:8000/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentence }),
      });
      const data = await response.json();
      console.log(`[FRONTEND] Received rewrite for sentence ${idx}:`, data);
      setLlmData(prev => ({ 
        ...prev, 
        [idx]: { 
          ...prev[idx], 
          rewritten: data.rewritten, 
          loading: false 
        } 
      }));
    } catch (err) {
      console.error(`[FRONTEND] Error fetching rewrite:`, err);
      setLlmData(prev => ({ ...prev, [idx]: { ...prev[idx], loading: false } }));
    }
  };

  // Logic to identify meaningful contributing sentences (Max 5 biased, 5 unbiased)
  const getHighlightIndices = (sentenceScores: any[]) => {
    if (!sentenceScores) return { biased: new Set(), unbiased: new Set() };
    
    const THRESHOLD = 0.15;

    // Filter for meaningful signals first
    const biasedPool = sentenceScores
      .map((item, idx) => ({ ...item, idx }))
      .filter(item => item.score >= THRESHOLD)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
      
    const unbiasedPool = sentenceScores
      .map((item, idx) => ({ ...item, idx }))
      .filter(item => item.score <= -THRESHOLD)
      .sort((a, b) => a.score - b.score) // Most negative first
      .slice(0, 5);
      
    return {
      biased: new Set(biasedPool.map(i => i.idx)),
      unbiased: new Set(unbiasedPool.map(i => i.idx))
    };
  };

  const highlightIndices = result?.sentence_scores ? getHighlightIndices(result.sentence_scores) : { biased: new Set(), unbiased: new Set() };

  return (
// ... Utility Bar ...
// ... Header ...
// ... Input Section ...
// ... Error Display ...
// ... Results Section ...
// ... Legend Section (Update needed inside JSX loop for intensity)

    <div className={`min-h-screen bg-white ${lang === "ur" ? "font-urdu" : "font-lora"}`}>
      {/* Utility Bar */}
      <div className="bg-black text-white py-2 px-4 flex justify-between items-center">
        <div className="kicker text-[10px]">PROJECT: UNBDAPP_V2</div>
        <button 
          onClick={toggleLang}
          className="kicker text-[10px] hover:text-link-blue transition-colors cursor-pointer"
        >
          {t.langToggle}
        </button>
      </div>

      {/* Header */}
      <header className="border-b-2 border-black py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="kicker text-black mb-2">{t.kicker}</div>
          <h1 className="text-5xl md:text-7xl font-playfair font-black mb-4 tracking-tighter">
            {translations.en.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-lora italic">
            {translations.en.subtitle}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Error Display */}
        {error && (
          <div className="border-2 border-red-600 bg-red-50 p-6 mb-12 animate-fade-in">
            <div className="kicker text-red-600 mb-2">CRITICAL ERROR</div>
            <p className="text-xl text-red-700 font-bold">{error}</p>
            {!result && (
              <button 
                onClick={() => setError("")}
                className="mt-4 kicker underline"
              >
                DISMISS
              </button>
            )}
          </div>
        )}

        {!result ? (
          /* Input Section */
          <section className="grid grid-cols-1 gap-12 animate-fade-in">
            <form onSubmit={handlePredict} className="space-y-8">
              <div className="border-2 border-black p-1">
                <div className="border border-black p-6">
                  <label className="kicker block mb-4 text-black">{t.textLabel}</label>
                  <textarea
                    rows={6}
                    className="w-full p-4 border-2 border-black focus:outline-none focus:ring-0 text-lg bg-white"
                    placeholder={t.placeholderText}
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (e.target.value) setInputUrl("");
                    }}
                  />
                </div>
              </div>

              <div className="relative flex justify-center items-center">
                <div className="w-full border-t border-black"></div>
                <span className="absolute bg-white px-4 kicker text-lg">{t.or}</span>
              </div>

              <div className="border-2 border-black p-1">
                <div className="border border-black p-6">
                  <label className="kicker block mb-4 text-black">{t.urlLabel}</label>
                  <input
                    type="url"
                    className="w-full p-4 border-2 border-black focus:outline-none focus:ring-0 text-lg bg-white"
                    placeholder={t.placeholderUrl}
                    value={inputUrl}
                    onChange={(e) => {
                      setInputUrl(e.target.value);
                      if (e.target.value) setInputText("");
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (!inputText && !inputUrl)}
                className="w-full py-4 border-2 border-black text-xl font-bold transition-all hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed group relative"
              >
                <span className="relative z-10">{loading ? t.processing : t.analyze}</span>
                <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </form>
          </section>
        ) : (
          /* Results Section */
          <section className="animate-fade-in">
            <div className="flex justify-between items-center mb-12 border-b-4 border-black pb-4">
              <div className="bg-black text-white px-4 py-1 inline-block kicker">
                {t.resultsTitle}
              </div>
              <button
                onClick={handleNewAnalysis}
                className="kicker border-2 border-black px-6 py-2 hover:bg-black hover:text-white transition-all font-bold"
              >
                {t.newAnalysis}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 items-start">
              {/* Primary Metrics Column */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-l-2 border-black pl-4">
                    <div className="kicker text-gray-500 mb-1">{t.prediction}</div>
                    <div className={`text-3xl font-playfair font-black tracking-tighter ${result.prediction === "biased" ? "text-red-600" : "text-green-600"}`}>
                      {result.prediction === "biased" ? t.biased : t.unbiased}
                    </div>
                  </div>

                  <div className="border-l-2 border-black pl-4">
                    <div className="kicker text-gray-500 mb-1">{t.confidence}</div>
                    <div className="text-3xl font-playfair font-black tracking-tighter text-link-blue">
                      {(result.confidence * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                {/* Semantic Signal as Qualitative 'Underlying Tone' */}
                {result.semantic_signal && (
                  <div className="border-2 border-black p-4 bg-gray-50 animate-fade-in relative overflow-hidden">
                    <div className="kicker text-black mb-2 border-b border-black pb-1 text-[10px]">SEMANTIC CONTEXT (DEEP ANALYSIS)</div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-[11px] text-gray-600 leading-tight">
                          {lang === "en" 
                            ? `Our semantic analyzer detected a predominantly ${result.semantic_signal.label} underlying tone across the document's structure.`
                            : `ہمارے تجزیہ کار نے دستاویز کی ساخت میں بنیادی طور پر ${result.semantic_signal.label === "biased" ? "جانبدارانہ" : "غیر جانبدارانہ"} رنگ پایا ہے۔`}
                        </p>
                      </div>
                      <div className={`shrink-0 kicker px-2 py-1 text-[10px] border border-black ${result.semantic_signal.label === "biased" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
                        {result.semantic_signal.label === "biased" ? t.biased : t.unbiased}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Section: Scrollable Sentence Level Highlighting (XAI) */}
            {result.sentence_scores && (
              <div className="mt-12 p-8 border-2 border-black bg-white relative">
                <div className="bg-black text-white px-3 py-1 inline-block kicker mb-6 absolute -top-4 left-6 z-20">
                  EXPLAINABLE AI: SENTENCE ATTENTION MAP
                </div>
                
                {/* Legend positioned at top right of the map container */}
                <div className="absolute -top-4 right-6 z-20 bg-white border-2 border-black p-2 flex gap-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-2 bg-[#fee2e2] border-l-2 border-red-600"></div>
                      <p className="text-[8px] font-bold uppercase">Moderate Bias</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-2 bg-[#fecaca] border-l-2 border-red-700"></div>
                      <p className="text-[8px] font-bold uppercase">Strong Bias</p>
                    </div>
                  </div>
                  <div className="w-[1px] bg-gray-200"></div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-2 bg-[#f0fdf4] border-l-2 border-green-600"></div>
                      <p className="text-[8px] font-bold uppercase">Moderate Neutrality</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-2 bg-[#dcfce7] border-l-2 border-green-700"></div>
                      <p className="text-[8px] font-bold uppercase">Strong Neutrality</p>
                    </div>
                  </div>
                </div>

                <div 
                  ref={scrollRef}
                  className="max-h-[500px] overflow-y-auto pr-4 scrollbar-custom" 
                  dir="rtl"
                >
                  <div className="space-y-6">
                    {result.sentence_scores.map((item: any, idx: number) => {
                      const isBiased = (highlightIndices as any).biased.has(idx);
                      const isUnbiased = (highlightIndices as any).unbiased.has(idx);
                      
                      const absScore = Math.abs(item.score);
                      const isStrong = absScore > 0.30;
                      
                      let bgColor = "transparent";
                      let borderColor = "transparent";
                      
                      if (isBiased) {
                        bgColor = isStrong ? "#fecaca" : "#fee2e2"; // red-200 vs red-100
                        borderColor = isStrong ? "#b91c1c" : "#dc2626"; // red-700 vs red-600
                      } else if (isUnbiased) {
                        bgColor = isStrong ? "#dcfce7" : "#f0fdf4"; // green-200 vs green-100
                        borderColor = isStrong ? "#15803d" : "#16a34a"; // green-700 vs green-600
                      }

                      return (
                        <div 
                          key={idx} 
                          className="p-6 transition-all duration-300 border-r-8 text-2xl leading-relaxed relative group"
                          style={{ 
                            backgroundColor: bgColor,
                            borderRightColor: borderColor,
                            opacity: (isBiased || isUnbiased) ? 1 : 0.4
                          }}
                        >
                          {/* Score Tooltip on Hover */}
                          {(isBiased || isUnbiased) && (
                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-30 delay-150">
                              <div className="bg-black text-white text-[10px] px-2 py-1 font-mono flex items-center gap-1 border border-white">
                                <span className="text-gray-400">SCORE:</span>
                                <span>{item.score.toFixed(3)}</span>
                              </div>
                            </div>
                          )}

                          <div className="flex flex-col gap-4">
                            {isBiased && (
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity mb-2">
                                <button 
                                  onClick={() => handleExplain(item, idx)}
                                  className="kicker bg-black text-white px-3 py-1 text-[10px] hover:bg-red-600 transition-colors"
                                >
                                  {t.explain}
                                </button>
                                <button 
                                  onClick={() => handleRewrite(item.sentence, idx)}
                                  className="kicker bg-black text-white px-3 py-1 text-[10px] hover:bg-green-600 transition-colors"
                                >
                                  {t.neutralize}
                                </button>
                              </div>
                            )}
                            <div className="flex justify-between items-start">
                              <span className="flex-1">{item.sentence}</span>
                            </div>

                            {/* LLM Result Display */}
                            {llmData[idx] && (
                              <div className="mt-4 animate-fade-in">
                                {llmData[idx].loading && (
                                  <div className="text-sm font-bold italic text-gray-500 animate-pulse">
                                    {t.loadingLLM}
                                  </div>
                                )}
                                
                                {llmData[idx].explanation && (
                                  <div className="bg-white border border-red-200 p-4 mt-2">
                                    <div className="kicker text-red-600 text-[10px] mb-2">{t.explanationTitle}</div>
                                    <p className="text-lg text-gray-800 italic leading-relaxed break-words font-urdu">
                                      {llmData[idx].explanation}
                                    </p>
                                  </div>
                                )}

                                {llmData[idx].rewritten && (
                                  <div className="bg-white border border-green-200 p-4 mt-2">
                                    <div className="kicker text-green-600 text-[10px] mb-2">{t.neutralVersionTitle}</div>
                                    <p className="text-xl text-gray-800 font-bold leading-relaxed break-words font-urdu">
                                      {llmData[idx].rewritten}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            
            <button
              onClick={handleNewAnalysis}
              className="mt-12 w-full py-4 border-2 border-black text-xl font-bold transition-all hover:bg-black hover:text-white group relative"
            >
              <span className="relative z-10">{t.newAnalysis}</span>
              <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-playfair font-black mb-8 tracking-tighter text-white">WIRED × UNBDAPP</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-gray-700 pt-8">
            <div className="text-left">
              <div className="kicker text-gray-400 mb-4">METHODOLOGY</div>
              <p className="text-sm text-gray-400">Hybrid TF-IDF & LaBSE embeddings processed through Stratified K-Fold Logistic Regression.</p>
            </div>
            <div className="text-left">
              <div className="kicker text-gray-400 mb-4">RELIABILITY</div>
              <p className="text-sm text-gray-400">Trained on 10,000+ verified Urdu news samples for high-confidence classification.</p>
            </div>
            <div className="text-left">
              <div className="kicker text-gray-400 mb-4">OPEN ACCESS</div>
              <p className="text-sm text-gray-400">An open-source initiative for promoting transparency in digital Urdu media.</p>
            </div>
          </div>
          <div className="kicker text-gray-500 text-[10px]">© 2026 UNBDAPP PROJECT. NO ROUNDED CORNERS WERE HARMED IN THE MAKING OF THIS SITE.</div>
        </div>
      </footer>
    </div>
  );
}
