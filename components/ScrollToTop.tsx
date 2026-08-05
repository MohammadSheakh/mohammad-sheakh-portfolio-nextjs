"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const buttonClassName =
    "flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white/90 text-neutral-950 shadow-[0_10px_35px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 dark:border-white/15 dark:bg-neutral-900/90 dark:text-white dark:hover:bg-white dark:hover:text-neutral-950";

  // Show navigation after the hero and hide downward actions at the footer.
  useEffect(() => {
    const footer = document.querySelector<HTMLElement>("footer");
    const handleScroll = () => {
      const pageBottomReached =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 80;
      const footerReached = footer
        ? footer.getBoundingClientRect().top <= window.innerHeight
        : pageBottomReached;

      setVisible(window.scrollY > 500);
      setAtBottom(footerReached || pageBottomReached);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Find the next semantic section currently below the fixed navigation.
  const scrollToNextSection = () => {
    const nextSection = Array.from(
      document.querySelectorAll<HTMLElement>("section"),
    ).find((section) => section.getBoundingClientRect().top > 80);

    nextSection?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollToFooter = () => {
    const footer = document.querySelector<HTMLElement>("footer");

    if (footer) {
      footer.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[850] flex flex-col gap-3 transition-all duration-300 md:bottom-8 md:right-8 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Scroll to top"
        title="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={buttonClassName}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      </button>

      {/* Downward controls disappear when no further content remains. */}
      {!atBottom && (
        <>
          <button
            type="button"
            aria-label="Scroll to next section"
            title="Scroll to next section"
            onClick={scrollToNextSection}
            className={buttonClassName}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Scroll to footer"
            title="Scroll to footer"
            onClick={scrollToFooter}
            className={buttonClassName}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m5 5 7 7 7-7" />
              <path d="m5 12 7 7 7-7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
