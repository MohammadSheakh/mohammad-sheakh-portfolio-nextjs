"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [manualExpand, setManualExpand] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
        setManualExpand(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavVisible = !scrolled || manualExpand;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-[900] pointer-events-none flex justify-between items-center transition-[padding] duration-[400ms] ease-in-out ${
        scrolled ? "py-4 px-6 md:px-14" : "py-6 px-6 md:px-14"
      }`}
    >
      {/* Left Logo */}
      <div
        className={`pointer-events-auto shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isNavVisible ? "translate-x-0 opacity-100 visible" : "-translate-x-24 opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/" className="font-display font-black text-lg tracking-[2px] uppercase text-neutral-900 dark:text-neutral-900 no-underline">
          Mohammad Sheakh
        </Link>
      </div>

      {/* Right Nav Capsule Container */}
      <div
        className={`pointer-events-auto ml-auto inline-flex items-center rounded-full bg-neutral-100/85 dark:bg-neutral-900/85 border border-black/10 dark:border-white/15 backdrop-blur-xl shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled && !manualExpand
            ? "py-1.5 pr-1.5 pl-2"
            : "py-1.5 pr-1.5 pl-6 md:pl-7"
        }`}
      >
        {/* Nav Links Group */}
        <div
          className={`flex items-center gap-7 whitespace-nowrap transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isNavVisible
              ? "max-w-[500px] opacity-100 translate-x-0 mr-5 visible"
              : "max-w-0 opacity-0 translate-x-5 mr-0 overflow-hidden pointer-events-none"
          }`}
        >
          <Link
            href="/#about"
            className="text-[0.78rem] tracking-[1.5px] uppercase font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-[0.78rem] tracking-[1.5px] uppercase font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/#skills"
            className="text-[0.78rem] tracking-[1.5px] uppercase font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Skills
          </Link>
          <Link
            href="/#contact"
            className="text-[0.78rem] tracking-[1.5px] uppercase font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            Contact
          </Link>
          <ThemeToggle />
        </div>

        {/* Expand Icon Button (Visible when scrolled) */}
        {scrolled && (
          <button
            className={`mr-1.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border p-0 shadow-sm transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 ${
              manualExpand
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950"
                : "border-neutral-300 bg-white text-neutral-950 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            }`}
            onClick={() => setManualExpand(!manualExpand)}
            aria-label="Toggle navigation menu"
            type="button"
            title={manualExpand ? "Collapse navigation" : "Expand navigation"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${manualExpand ? "rotate-180" : "rotate-0"}`}
            >
              <polyline points="15 18 9 12 15 6"></polyline>
              <polyline points="19 18 13 12 19 6"></polyline>
            </svg>
          </button>
        )}

        {/* Permanent Open to Work Pill Button */}
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2.5 py-2.5 px-5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[0.75rem] font-bold tracking-[1.2px] uppercase no-underline whitespace-nowrap transition-all duration-[250ms] hover:scale-[1.04] shadow-md"
        >
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_#4ade80]"></span>
          <span>Open to work</span>
        </Link>
      </div>
    </nav>
  );
}
