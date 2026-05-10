import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team — UNBD | Urdu News Bias Detection",
  description: "Meet the FYP team behind the Urdu News Bias Detection system — supervisor, developers, and researchers.",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
