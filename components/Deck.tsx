"use client";

import { useRef, useState } from "react";

const CARDS = [
  {
    title: "Fast delivery",
    description:
      "Agentic coding workflows to accelerate prototyping without sacrificing quality",
    dark: false,
  },
  {
    title: "Trust from reliability.",
    description:
      "Error handling, logging, monitoring — production-grade from day one",
    dark: true,
  },
  {
    title: "SEO-ready APIs",
    description:
      "Clean, documented endpoints that frontend teams love to work with",
    dark: false,
  },
];

export default function Deck() {
  const [open, setOpen] = useState(false);
  const [mobileActive, setMobileActive] = useState(0);
  const touchStart = useRef({ x: 0, y: 0 });
  const suppressTap = useRef(false);

  const moveMobileCarousel = (direction: -1 | 1) => {
    setMobileActive(
      (current) => (current + direction + CARDS.length) % CARDS.length,
    );
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - touchStart.current.x;
    const distanceY = touch.clientY - touchStart.current.y;

    if (Math.abs(distanceX) < 45 || Math.abs(distanceX) <= Math.abs(distanceY)) {
      return;
    }

    suppressTap.current = true;
    moveMobileCarousel(distanceX < 0 ? 1 : -1);
    window.setTimeout(() => {
      suppressTap.current = false;
    }, 300);
  };

  return (
    <section className="min-h-[760px] overflow-hidden bg-[var(--bg)] px-4 pb-10 pt-11 md:min-h-[820px] md:px-6 md:pb-8">
      <div className="mb-3 text-center text-[0.68rem] font-semibold uppercase tracking-[3px] text-purple">
        Why work with me
      </div>
      <h2 className="s-title text-center font-display text-[clamp(2.75rem,4.6vw,3.75rem)] font-black leading-none tracking-[-3px] max-md:text-[clamp(2.3rem,11vw,3.25rem)] max-md:tracking-[-2px]">
        What makes me different
      </h2>
      <div className="relative mt-24 hidden h-[432px] items-center justify-center md:flex">
        <div
          className={`absolute flex h-[432px] w-[min(30.65vw,384px)] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-10 py-12 text-center opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
            open
              ? "[transform:rotate(0)_translateX(calc(0px_-_min(30.65vw,384px)_-_24px))]"
              : "[transform:rotate(-8deg)_translateX(-92px)]"
          }`}
        >
          <div className="mb-4 font-display text-2xl font-black leading-[1.15] tracking-[-1px]">
            Fast delivery
          </div>
          <div className="max-w-[310px] text-base leading-[1.45] text-[var(--muted)]">
            Agentic coding workflows to accelerate prototyping without
            sacrificing quality
          </div>
        </div>
        <div
          className={`absolute flex h-[432px] w-[min(30.65vw,384px)] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-10 py-12 text-center opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform ${
            open
              ? "[transform:rotate(0)_translateX(calc(min(30.65vw,384px)_+_24px))]"
              : "[transform:rotate(8deg)_translateX(92px)]"
          }`}
        >
          <div className="mb-4 font-display text-2xl font-black leading-[1.15] tracking-[-1px]">
            SEO-ready APIs
          </div>
          <div className="max-w-[310px] text-base leading-[1.45] text-[var(--muted)]">
            Clean, documented endpoints that frontend teams love to work with
          </div>
        </div>
        <div
          className="absolute z-[3] flex h-[432px] w-[min(30.65vw,384px)] flex-col items-center justify-center rounded-[28px] bg-[#0a0a0a] px-10 py-12 text-center text-white opacity-100 outline-none transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-4"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          tabIndex={0}
        >
          <div className="mb-4 font-display text-2xl font-black leading-[1.15] tracking-[-1px]">
            Trust from reliability.
          </div>
          <div className="max-w-[310px] text-base leading-[1.45] text-white/60">
            Error handling, logging, monitoring — production-grade from day
            one
          </div>
        </div>
      </div>

      <div
        className="relative mx-auto mt-12 h-[410px] w-[min(82vw,340px)] touch-pan-y md:hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {CARDS.map((card, index) => {
          const stackPosition =
            (index - mobileActive + CARDS.length) % CARDS.length;
          const isActive = stackPosition === 0;

          return (
            <button
              type="button"
              aria-label={`${card.title}${isActive ? ", selected" : ""}`}
              aria-pressed={isActive}
              className={`absolute inset-0 flex h-[390px] w-full flex-col items-center justify-center rounded-[28px] border px-8 py-12 text-center shadow-[0_18px_45px_rgba(0,0,0,0.12)] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple/60 ${
                card.dark
                  ? "border-black bg-[#0a0a0a] text-white"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
              } ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
              style={{
                zIndex: CARDS.length - stackPosition,
                opacity: 1 - stackPosition * 0.18,
                transform: `translate3d(${stackPosition * 11}px, ${stackPosition * 14}px, 0) scale(${1 - stackPosition * 0.045}) rotate(${stackPosition * 1.4}deg)`,
              }}
              onClick={() => {
                if (!suppressTap.current) moveMobileCarousel(1);
              }}
              key={card.title}
            >
              <div className="mb-4 font-display text-2xl font-black leading-[1.15] tracking-[-1px]">
                {card.title}
              </div>
              <div
                className={`max-w-[280px] text-base leading-[1.5] ${
                  card.dark ? "text-white/60" : "text-[var(--muted)]"
                }`}
              >
                {card.description}
              </div>
              {isActive && (
                <span className="absolute bottom-7 font-mono text-[0.65rem] uppercase tracking-[2px] opacity-50">
                  Tap for next
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 text-center md:hidden">
        <span className="font-mono text-xs font-semibold text-[var(--muted)]">
          {String(mobileActive + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
        </span>
      </div>

      <div className="mt-[4.6rem] hidden text-center md:block">
        <button
          className="inline-flex items-center rounded-full border-[1.5px] border-[var(--text)] bg-transparent px-8 py-3 font-sans text-[0.82rem] font-semibold tracking-[0.5px] text-[var(--text)] transition-colors duration-300 hover:bg-[var(--text)] hover:text-[var(--bg)]"
          type="button"
          aria-pressed={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span>{open ? "Stack back ←" : "Spread cards →"}</span>
        </button>
      </div>
    </section>
  );
}
