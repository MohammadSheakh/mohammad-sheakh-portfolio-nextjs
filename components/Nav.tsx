"use client";

import { useEffect, useState } from "react";
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
    <nav className={`navbar ${scrolled ? "scrolled" : ""} ${manualExpand ? "expanded" : ""}`}>
      {/* Left Logo */}
      <div className={`logo-wrap ${isNavVisible ? "visible" : "hidden"}`}>
        <a href="#" className="logo">
          MS
        </a>
      </div>

      {/* Right Nav Capsule Container */}
      <div className="nav-capsule">
        {/* Nav Links Group */}
        <div className={`nav-links-group ${isNavVisible ? "visible" : "hidden"}`}>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </div>

        {/* Expand Toggle Button (Visible when scrolled) */}
        {scrolled && (
          <button
            className={`nav-expand-btn ${manualExpand ? "active" : ""}`}
            onClick={() => setManualExpand(!manualExpand)}
            aria-label="Toggle navigation menu"
            type="button"
          >
            {manualExpand ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
                <polyline points="19 18 13 12 19 6"></polyline>
              </svg>
            )}
            <span className="expand-label">{manualExpand ? "Close" : "Expand"}</span>
          </button>
        )}

        {/* Permanent Open to Work Pill Button */}
        <a href="#contact" className="btn-open-to-work">
          <span className="nav-dot"></span>
          <span>Open to work</span>
        </a>
      </div>
    </nav>
  );
}

