import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Analyze" },
  { href: "/team", label: "Team" },
  { href: "/documents", label: "Documents" },
  { href: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Branding */}
          <div>
            <h2 className="text-4xl font-playfair font-black mb-3 tracking-tighter text-white">
              UNBD
            </h2>
            <p className="text-sm text-gray-400 max-w-xs">
              Urdu News Bias Detection — An AI-powered tool for analyzing
              journalistic integrity in Urdu media.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="kicker text-gray-400 mb-4 text-[10px]">
              NAVIGATION
            </div>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 border-t border-gray-700 pt-8">
          <div className="text-left">
            <div className="kicker text-gray-400 mb-4 text-[10px]">
              METHODOLOGY
            </div>
            <p className="text-sm text-gray-400">
              Hybrid TF-IDF & LaBSE embeddings processed through Stratified
              K-Fold Logistic Regression with SHAP-based explainability.
            </p>
          </div>
          <div className="text-left">
            <div className="kicker text-gray-400 mb-4 text-[10px]">
              RELIABILITY
            </div>
            <p className="text-sm text-gray-400">
              Trained on 10,000+ verified Urdu news samples for
              high-confidence classification.
            </p>
          </div>
          <div className="text-left">
            <div className="kicker text-gray-400 mb-4 text-[10px]">
              OPEN ACCESS
            </div>
            <p className="text-sm text-gray-400">
              An open-source initiative for promoting transparency in digital
              Urdu media.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="kicker text-gray-500 text-[10px]">
            © 2026 UNBD PROJECT — FINAL YEAR PROJECT
          </div>
          <a
            href="https://github.com/BaseerAhmedTahir/Urdu-NEWS-Bias-Detection"
            target="_blank"
            rel="noopener noreferrer"
            className="kicker text-gray-500 text-[10px] hover:text-white transition-colors"
          >
            GITHUB REPOSITORY ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
