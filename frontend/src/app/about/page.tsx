"use client";

import { useLang } from "../context/LangContext";

const techStack = [
  { name: "Next.js", category: "Frontend", desc: "React framework for the web interface" },
  { name: "Tailwind CSS", category: "Frontend", desc: "Utility-first CSS framework" },
  { name: "FastAPI", category: "Backend", desc: "High-performance Python API server" },
  { name: "scikit-learn", category: "ML", desc: "Logistic Regression classifier" },
  { name: "LaBSE", category: "ML", desc: "Language-agnostic sentence embeddings" },
  { name: "TF-IDF", category: "ML", desc: "Term frequency-inverse document frequency" },
  { name: "SHAP", category: "XAI", desc: "Explainable AI for model interpretability" },
  { name: "DeepSeek", category: "LLM", desc: "LLM for bias explanation & rewriting" },
];

const metrics = [
  { label: "Dataset Size", value: "10,000+", unit: "samples" },
  { label: "Feature Space", value: "TF-IDF + LaBSE", unit: "hybrid" },
  { label: "Model", value: "Logistic Regression", unit: "classifier" },
  { label: "Validation", value: "Stratified K-Fold", unit: "cross-validation" },
];

const pipelineSteps = [
  {
    step: "01",
    title: "Input Processing",
    titleUr: "ان پٹ پروسیسنگ",
    desc: "Raw Urdu text or URL is received and preprocessed — removing English characters, normalizing whitespace, and cleaning noise.",
    descUr: "خام اردو متن یا URL موصول ہوتا ہے اور پری پروسیسنگ ہوتی ہے — انگریزی حروف کو ہٹانا، وائٹ اسپیس کو معمول پر لانا، اور شور کو صاف کرنا۔",
  },
  {
    step: "02",
    title: "Feature Extraction",
    titleUr: "فیچر نکالنا",
    desc: "Text is split into sentences. Each sentence gets dual feature vectors: TF-IDF (lexical) and LaBSE (semantic) embeddings.",
    descUr: "متن کو جملوں میں تقسیم کیا جاتا ہے۔ ہر جملے کو دو فیچر ویکٹر ملتے ہیں: TF-IDF (الفاظی) اور LaBSE (معنوی) ایمبیڈنگز۔",
  },
  {
    step: "03",
    title: "Classification",
    titleUr: "درجہ بندی",
    desc: "Combined features are scaled and passed to a Logistic Regression model trained on 10,000+ labeled Urdu news samples.",
    descUr: "مشترکہ فیچرز کو سکیل کیا جاتا ہے اور 10,000+ لیبل شدہ اردو خبروں کے نمونوں پر تربیت یافتہ لاجسٹک ریگریشن ماڈل کو دیا جاتا ہے۔",
  },
  {
    step: "04",
    title: "Explainability (SHAP)",
    titleUr: "وضاحت (SHAP)",
    desc: "SHAP values are computed for each sentence to identify which words and semantic features drive the bias prediction.",
    descUr: "SHAP ویلیوز ہر جملے کے لیے شمار کی جاتی ہیں تاکہ یہ معلوم ہو کہ کون سے الفاظ اور معنوی خصوصیات تعصب کی پیشگوئی کو چلاتی ہیں۔",
  },
  {
    step: "05",
    title: "LLM Analysis",
    titleUr: "LLM تجزیہ",
    desc: "Biased sentences can be explained and neutralized using a DeepSeek LLM, providing human-readable analysis and rewritten alternatives.",
    descUr: "جانبدار جملوں کی DeepSeek LLM کے ذریعے وضاحت اور غیر جانبدارانہ شکل دی جا سکتی ہے، جو انسان کے قابل فہم تجزیہ اور دوبارہ لکھے گئے متبادل فراہم کرتی ہے۔",
  },
];

export default function AboutPage() {
  const { lang } = useLang();
  const isUr = lang === "ur";

  return (
    <div>
      {/* Header */}
      <header className="border-b-2 border-black py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="kicker text-black mb-2">{isUr ? "کے بارے میں" : "ABOUT"}</div>
          <h1 className="text-5xl md:text-7xl font-playfair font-black mb-4 tracking-tighter">
            {isUr ? "پراجیکٹ کا تعارف" : "PROJECT OVERVIEW"}
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Abstract */}
        <section className="mb-16 animate-fade-in-up stagger-1">
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "خلاصہ" : "ABSTRACT"}
          </div>
          <div className="border-2 border-black p-1">
            <div className="border border-black p-8">
              <p className="text-lg leading-relaxed text-gray-700">
                {isUr
                  ? "UNBD (اردو نیوز بائیس ڈیٹیکشن) ایک AI سے چلنے والا نظام ہے جو اردو خبروں کے مضامین میں جانبداری کا پتہ لگاتا اور اس کی وضاحت کرتا ہے۔ یہ ہائبرڈ مشین لرننگ تکنیکوں (TF-IDF + LaBSE) کو وضاحتی AI (SHAP) اور بڑے لینگویج ماڈلز (LLM) کے ساتھ ملا کر جملے کی سطح پر تعصب کا تجزیہ فراہم کرتا ہے۔ اس نظام کا مقصد اردو ڈیجیٹل میڈیا میں صحافتی سالمیت اور شفافیت کو فروغ دینا ہے۔"
                  : "UNBD (Urdu News Bias Detection) is an AI-powered system that detects and explains bias in Urdu news articles. By combining hybrid machine learning techniques (TF-IDF + LaBSE) with explainable AI (SHAP) and Large Language Models (LLMs), it provides sentence-level bias analysis with human-readable explanations. The system aims to promote journalistic integrity and transparency in Urdu digital media — a critical need given the scale of Urdu-language news consumption worldwide."}
              </p>
            </div>
          </div>
        </section>

        {/* ML Pipeline */}
        <section className="mb-16">
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "ML پائپ لائن" : "ML PIPELINE"}
          </div>
          <div className="space-y-4">
            {pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex gap-6 items-start animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
              >
                {/* Step Number */}
                <div className="w-16 h-16 border-2 border-black flex items-center justify-center shrink-0 bg-black text-white">
                  <span className="text-2xl font-playfair font-black">
                    {step.step}
                  </span>
                </div>
                {/* Step Content */}
                <div className="flex-1 border-b border-gray-200 pb-4">
                  <h3 className="text-xl font-playfair font-black tracking-tighter mb-1">
                    {isUr ? step.titleUr : step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {isUr ? step.descUr : step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* System Architecture Diagram */}
        <section className="mb-16 animate-fade-in">
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "نظام کا فن تعمیر" : "SYSTEM ARCHITECTURE"}
          </div>
          <div className="border-2 border-black p-1">
            <div className="border border-black p-8 bg-gray-50">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
                {/* User */}
                <div className="border-2 border-black px-6 py-4 bg-white min-w-[140px]">
                  <div className="kicker text-[9px] text-gray-500 mb-1">CLIENT</div>
                  <div className="font-playfair font-bold">Next.js</div>
                  <div className="text-[10px] text-gray-500">React + Tailwind</div>
                </div>
                <div className="text-2xl font-mono text-gray-400 rotate-90 md:rotate-0">→</div>
                {/* API */}
                <div className="border-2 border-black px-6 py-4 bg-white min-w-[140px]">
                  <div className="kicker text-[9px] text-gray-500 mb-1">API</div>
                  <div className="font-playfair font-bold">FastAPI</div>
                  <div className="text-[10px] text-gray-500">Python + Uvicorn</div>
                </div>
                <div className="text-2xl font-mono text-gray-400 rotate-90 md:rotate-0">→</div>
                {/* ML */}
                <div className="border-2 border-black px-6 py-4 bg-white min-w-[140px]">
                  <div className="kicker text-[9px] text-gray-500 mb-1">ML ENGINE</div>
                  <div className="font-playfair font-bold">scikit-learn</div>
                  <div className="text-[10px] text-gray-500">TF-IDF + LaBSE</div>
                </div>
                <div className="text-2xl font-mono text-gray-400 rotate-90 md:rotate-0">→</div>
                {/* XAI */}
                <div className="border-2 border-black px-6 py-4 bg-white min-w-[140px]">
                  <div className="kicker text-[9px] text-gray-500 mb-1">EXPLAINABILITY</div>
                  <div className="font-playfair font-bold">SHAP + LLM</div>
                  <div className="text-[10px] text-gray-500">DeepSeek API</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-16">
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "اہم اعداد و شمار" : "KEY METRICS"}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className="border-2 border-black p-4 text-center animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
              >
                <div className="kicker text-gray-400 text-[9px] mb-2">
                  {metric.label.toUpperCase()}
                </div>
                <div className="text-lg font-playfair font-black tracking-tighter">
                  {metric.value}
                </div>
                <div className="text-[10px] text-gray-500">{metric.unit}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
            {isUr ? "ٹیکنالوجی اسٹیک" : "TECHNOLOGY STACK"}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="border border-black p-4 card-hover animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.05}s`, opacity: 0 }}
              >
                <div className="kicker text-[8px] text-link-blue mb-1">
                  {tech.category}
                </div>
                <div className="font-playfair font-bold text-sm mb-1">
                  {tech.name}
                </div>
                <div className="text-[10px] text-gray-500">{tech.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub */}
        <section className="border-t-2 border-black pt-8 text-center animate-fade-in">
          <div className="kicker text-gray-400 text-[10px] mb-4">
            {isUr ? "سورس کوڈ" : "SOURCE CODE"}
          </div>
          <a
            href="https://github.com/BaseerAhmedTahir/Urdu-NEWS-Bias-Detection"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-black px-8 py-4 kicker text-sm hover:bg-black hover:text-white transition-all group relative overflow-hidden"
          >
            <span className="relative z-10">
              {isUr ? "گِٹ ہب پر دیکھیں" : "VIEW ON GITHUB"} ↗
            </span>
            <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </a>
        </section>
      </main>
    </div>
  );
}
