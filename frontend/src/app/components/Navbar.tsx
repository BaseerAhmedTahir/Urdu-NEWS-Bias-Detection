"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Analyze", labelUr: "تجزیہ" },
  { href: "/team", label: "Team", labelUr: "ٹیم" },
  { href: "/documents", label: "Documents", labelUr: "دستاویزات" },
  { href: "/about", label: "About", labelUr: "تعارف" },
];

interface NavbarProps {
  lang: "en" | "ur";
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Utility Bar */}
      <div className="bg-black text-white py-2 px-4 flex justify-between items-center">
        <div className="kicker text-[10px]">PROJECT: UNBDAPP_V2</div>
        <button
          onClick={onToggleLang}
          className="kicker text-[10px] hover:text-link-blue transition-colors cursor-pointer"
        >
          {lang === "en" ? "اردو" : "English"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="border-b-2 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-playfair font-black tracking-tighter group-hover:text-link-blue transition-colors">
              UNBD
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`kicker text-[11px] px-4 py-2 transition-all relative ${
                    isActive
                      ? "text-black font-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {lang === "en" ? link.label : link.labelUr}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[3px] bg-black" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[2px] bg-black transition-transform ${
                mobileOpen ? "rotate-45 translate-y-[6px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-black transition-opacity ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-black transition-transform ${
                mobileOpen ? "-rotate-45 -translate-y-[6px]" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-black animate-fade-in">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block kicker text-[11px] px-6 py-3 border-b border-gray-200 transition-all ${
                    isActive
                      ? "text-black font-black bg-gray-50"
                      : "text-gray-500 hover:text-black hover:bg-gray-50"
                  }`}
                >
                  {lang === "en" ? link.label : link.labelUr}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
