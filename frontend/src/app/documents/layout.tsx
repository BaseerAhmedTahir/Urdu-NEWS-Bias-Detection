import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documents — UNBD | Urdu News Bias Detection",
  description: "Research papers, proposals, presentations, and documentation for the Urdu News Bias Detection FYP project.",
};

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
