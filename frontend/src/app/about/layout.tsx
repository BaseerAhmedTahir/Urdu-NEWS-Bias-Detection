import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — UNBD | Urdu News Bias Detection",
  description: "Learn about the methodology, ML pipeline, system architecture, and technology stack behind UNBD — an AI-powered Urdu bias detection system.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
