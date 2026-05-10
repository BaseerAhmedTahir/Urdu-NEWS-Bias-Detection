"use client";

import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLang } from "../context/LangContext";

export default function LayoutShell({ children }: { children: ReactNode }) {
  const { lang, toggleLang } = useLang();

  return (
    <div className={`min-h-screen flex flex-col bg-white ${lang === "ur" ? "font-urdu" : "font-lora"}`}>
      <Navbar lang={lang} onToggleLang={toggleLang} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
