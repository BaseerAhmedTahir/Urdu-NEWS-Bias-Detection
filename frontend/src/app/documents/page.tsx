"use client";

import { useLang } from "../context/LangContext";

interface Document {
  title: string;
  titleUr: string;
  description: string;
  descriptionUr: string;
  category: string;
  categoryUr: string;
  fileType: "PDF" | "DOCX" | "PPTX" | "OTHER";
  fileName: string;
  date: string;
}

const documents: Document[] = [
  {
    title: "Research Paper",
    titleUr: "تحقیقی مقالہ",
    description:
      "Complete research paper on Urdu News Bias Detection using hybrid TF-IDF and LaBSE embeddings with SHAP-based explainability.",
    descriptionUr:
      "TF-IDF اور LaBSE ایمبیڈنگز کے ساتھ SHAP پر مبنی وضاحت کا استعمال کرتے ہوئے اردو خبروں میں تعصب کی شناخت پر مکمل تحقیقی مقالہ۔",
    category: "Research",
    categoryUr: "تحقیق",
    fileType: "PDF",
    fileName: "research_paper.pdf",
    date: "2026",
  },
  {
    title: "FYP Proposal",
    titleUr: "ایف وائی پی تجویز",
    description:
      "Initial project proposal document outlining the problem statement, objectives, scope, and methodology for the Urdu bias detection system.",
    descriptionUr:
      "اردو تعصب کی شناخت کے نظام کے لیے مسئلے کا بیان، مقاصد، دائرہ کار اور طریقہ کار کا خاکہ پیش کرنے والا ابتدائی پراجیکٹ تجویزی دستاویز۔",
    category: "Proposal",
    categoryUr: "تجویز",
    fileType: "PDF",
    fileName: "fyp_proposal.pdf",
    date: "2025",
  },
  {
    title: "Literature Review",
    titleUr: "ادبی جائزہ",
    description:
      "Comprehensive review of existing research on media bias detection, NLP for low-resource languages, and explainable AI techniques.",
    descriptionUr:
      "میڈیا تعصب کی شناخت، کم وسائل والی زبانوں کے لیے NLP، اور وضاحتی AI تکنیکوں پر موجودہ تحقیق کا جامع جائزہ۔",
    category: "Research",
    categoryUr: "تحقیق",
    fileType: "PDF",
    fileName: "literature_review.pdf",
    date: "2025",
  },
  {
    title: "Project Presentation",
    titleUr: "پراجیکٹ پریزنٹیشن",
    description:
      "Final defense presentation slides covering the system architecture, methodology, results, and demonstration of the UNBD platform.",
    descriptionUr:
      "سسٹم کے فن تعمیر، طریقہ کار، نتائج، اور UNBD پلیٹ فارم کے مظاہرے پر مشتمل حتمی دفاعی پریزنٹیشن سلائیڈز۔",
    category: "Presentation",
    categoryUr: "پریزنٹیشن",
    fileType: "PPTX",
    fileName: "final_presentation.pptx",
    date: "2026",
  },
  {
    title: "Dataset Documentation",
    titleUr: "ڈیٹاسیٹ دستاویزات",
    description:
      "Documentation of the curated Urdu news dataset including collection methodology, annotation guidelines, and statistical analysis.",
    descriptionUr:
      "تیار کردہ اردو خبروں کے ڈیٹا سیٹ کی دستاویزات بشمول جمع کرنے کا طریقہ، تشریحی ہدایات، اور شماریاتی تجزیہ۔",
    category: "Documentation",
    categoryUr: "دستاویزات",
    fileType: "PDF",
    fileName: "dataset_documentation.pdf",
    date: "2025",
  },
];

const getBadgeClass = (fileType: string) => {
  switch (fileType) {
    case "PDF":
      return "badge-pdf";
    case "DOCX":
      return "badge-doc";
    case "PPTX":
      return "badge-ppt";
    default:
      return "badge-other";
  }
};

export default function DocumentsPage() {
  const { lang } = useLang();
  const isUr = lang === "ur";

  // Get unique categories
  const categories = Array.from(new Set(documents.map((d) => d.category)));

  return (
    <div>
      {/* Header */}
      <header className="border-b-2 border-black py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="kicker text-black mb-2">
            {isUr ? "ریسرچ ریپوزٹری" : "RESEARCH REPOSITORY"}
          </div>
          <h1 className="text-5xl md:text-7xl font-playfair font-black mb-4 tracking-tighter">
            {isUr ? "دستاویزات" : "DOCUMENTS"}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-lora italic">
            {isUr
              ? "تحقیقی مقالات، تجاویز، اور پراجیکٹ سے متعلق مواد"
              : "Research papers, proposals, and project-related materials."}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Instructions Banner */}
        <div className="border-2 border-black p-6 mb-12 bg-gray-50 animate-fade-in">
          <div className="kicker text-[10px] text-gray-500 mb-2">
            {isUr ? "ہدایات" : "HOW TO ADD YOUR FILES"}
          </div>
          <p className="text-sm text-gray-600">
            {isUr
              ? "اپنی PDF/DOCX/PPTX فائلیں frontend/public/documents/ فولڈر میں رکھیں۔ نیچے دی گئی فائل کے نام اپ ڈیٹ کریں۔"
              : "Place your PDF/DOCX/PPTX files in the "}
            <code className="bg-gray-200 px-1 text-xs font-mono">
              frontend/public/documents/
            </code>
            {!isUr && " folder. The download links below will automatically point to your files."}
          </p>
        </div>

        {/* Documents by Category */}
        {categories.map((category) => (
          <section key={category} className="mb-12">
            <div className="kicker text-gray-500 mb-6 text-[10px] border-b border-black pb-2">
              {isUr
                ? documents.find((d) => d.category === category)?.categoryUr
                : category.toUpperCase()}
            </div>
            <div className="space-y-4">
              {documents
                .filter((d) => d.category === category)
                .map((doc, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-black p-1 card-hover animate-fade-in-up"
                    style={{ animationDelay: `${idx * 0.1}s`, opacity: 0 }}
                  >
                    <div className="border border-black p-6">
                      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                        {/* Doc Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span
                              className={`kicker text-[9px] px-2 py-0.5 ${getBadgeClass(
                                doc.fileType
                              )}`}
                            >
                              {doc.fileType}
                            </span>
                            <span className="kicker text-[9px] text-gray-400">
                              {doc.date}
                            </span>
                          </div>
                          <h3 className="text-xl font-playfair font-black tracking-tighter mb-1">
                            {isUr ? doc.titleUr : doc.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {isUr ? doc.descriptionUr : doc.description}
                          </p>
                        </div>
                        {/* Download Button */}
                        <a
                          href={`/documents/${doc.fileName}`}
                          download
                          className="shrink-0 kicker border-2 border-black px-6 py-3 text-[11px] hover:bg-black hover:text-white transition-all font-bold text-center group relative overflow-hidden"
                        >
                          <span className="relative z-10">
                            {isUr ? "ڈاؤن لوڈ" : "DOWNLOAD"} ↓
                          </span>
                          <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {/* Empty State Note */}
        <div className="border-t border-black pt-8 mt-8 text-center animate-fade-in">
          <div className="kicker text-gray-400 text-[10px] mb-2">
            {isUr ? "نوٹ" : "NOTE"}
          </div>
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            {isUr
              ? "اگر ڈاؤن لوڈ لنک کام نہیں کرتا تو براہ کرم frontend/public/documents/ فولڈر میں متعلقہ فائل رکھیں۔"
              : "If a download link doesn't work, please ensure the corresponding file has been placed in the frontend/public/documents/ directory."}
          </p>
        </div>
      </main>
    </div>
  );
}
