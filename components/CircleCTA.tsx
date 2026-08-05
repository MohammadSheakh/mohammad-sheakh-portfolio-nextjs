"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CircleCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLButtonElement>(null);
  const cbTextRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  // Pin the CTA while the circle expands into the full-screen contact overlay.
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=170%",
          scrub: 1.2,
          pin: true,
        },
      });
      scrollTriggerRef.current = tl.scrollTrigger ?? null;

      tl.to(ringsRef.current, { opacity: 0, ease: "none" }, 0)
        .to(circleRef.current, { scale: 28, ease: "none" }, 0)
        .to(cbTextRef.current, { opacity: 0, ease: "none" }, 0.15)
        .to(overlayRef.current, { opacity: 1, ease: "none" }, 0.55);
    }, sectionRef);

    return () => {
      scrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  // Clicking the circle completes the same timeline normally driven by scrolling.
  const handleCircleClick = () => {
    const trigger = scrollTriggerRef.current;
    if (!trigger) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: trigger.end,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--surface)] px-6 py-32 md:px-12"
      id="contact"
      ref={sectionRef}
    >
      {/* Decorative rings collapse as the central CTA expands. */}
      <div ref={ringsRef}>
        <div className="absolute left-1/2 top-1/2 -ml-[150px] -mt-[150px] h-[300px] w-[300px] animate-ring rounded-full border border-purple/15"></div>
        <div className="absolute left-1/2 top-1/2 -ml-[220px] -mt-[220px] h-[440px] w-[440px] animate-ring rounded-full border border-purple/15 [animation-delay:1s]"></div>
        <div className="absolute left-1/2 top-1/2 -ml-[290px] -mt-[290px] h-[580px] w-[580px] animate-ring rounded-full border border-purple/15 [animation-delay:2s]"></div>
      </div>
      <button
        className="relative z-[2] flex h-60 w-60 flex-col items-center justify-center gap-1 rounded-full border-0 bg-[#0f766e] will-change-transform transition-shadow focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal/40 focus-visible:ring-offset-4"
        ref={circleRef}
        type="button"
        aria-label="Open contact invitation"
        title="Let's work together"
        onClick={handleCircleClick}
      >
        <div
          className="pointer-events-none text-center font-display text-[1.1rem] font-black uppercase tracking-[3px] text-white"
          ref={cbTextRef}
        >
          LET&apos;S
          <br />
          WORK
        </div>
      </button>
      {/* Fixed invitation appears after the expanding circle covers the viewport. */}
      <div
        className="pointer-events-none fixed inset-0 z-[901] flex flex-col items-center justify-center text-center text-white opacity-0"
        ref={overlayRef}
      >
        <div className="mb-4 font-display text-[clamp(2.5rem,7vw,6rem)] font-black tracking-[-3px]">
          Ready to build?
        </div>
        <div className="mb-10 font-mono text-[1.1rem] text-white/65">
          mohammad.sheakh@gmail.com
        </div>
        <a
          className="pointer-events-auto inline-flex items-center rounded-full border-[1.5px] border-white/60 px-8 py-3 text-[0.82rem] font-semibold tracking-[0.5px] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          href="mailto:mohammad.sheakh@gmail.com"
        >
          <span>Send a message →</span>
        </a>
      </div>
    </section>
  );
}
