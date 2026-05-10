import type { Metadata } from "next";
import { Noto_Nastaliq_Urdu, Inter, Playfair_Display, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "./context/LangContext";
import LayoutShell from "./components/LayoutShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const notoUrdu = Noto_Nastaliq_Urdu({ 
  subsets: ["arabic"], 
  weight: ["400", "700"],
  variable: "--font-noto-nastaliq-urdu" 
});

export const metadata: Metadata = {
  title: "UNBD — Urdu News Bias Detection",
  description: "Detect bias in Urdu news text and URLs with AI-powered explainable analysis. A Final Year Project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${lora.variable} ${jetbrains.variable} ${notoUrdu.variable} antialiased`}>
        <LangProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </LangProvider>
      </body>
    </html>
  );
}
