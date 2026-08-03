"use client";

import { useState } from "react";

export default function Deck() {
  const [open, setOpen] = useState(false);

  return (
    <section className="min-h-[820px] overflow-hidden bg-[var(--bg)] px-6 pb-8 pt-11 max-md:min-h-[690px] max-md:px-4">
      <div className="mb-3 text-center text-[0.68rem] font-semibold uppercase tracking-[3px] text-purple">
        Why work with me
      </div>
      <h2 className="s-title text-center font-display text-[clamp(2.75rem,4.6vw,3.75rem)] font-black leading-none tracking-[-3px] max-md:text-[clamp(2.3rem,11vw,3.25rem)] max-md:tracking-[-2px]">
        What makes me different
      </h2>
      <div className="relative mt-24 flex h-[432px] items-center justify-center max-md:mt-16 max-md:h-[390px]">
        <div
          className={`absolute flex h-[432px] w-[min(30.65vw,384px)] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-10 py-12 text-center opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform max-md:h-[390px] max-md:w-[min(78vw,340px)] max-md:px-8 ${
            open
              ? "[transform:rotate(0)_translateX(calc(0px_-_min(30.65vw,384px)_-_24px))] max-md:[transform:rotate(-5deg)_translateX(-32vw)]"
              : "[transform:rotate(-8deg)_translateX(-92px)] max-md:[transform:rotate(-7deg)_translateX(-54px)]"
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
          className={`absolute flex h-[432px] w-[min(30.65vw,384px)] flex-col items-center justify-center rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-10 py-12 text-center opacity-100 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform max-md:h-[390px] max-md:w-[min(78vw,340px)] max-md:px-8 ${
            open
              ? "[transform:rotate(0)_translateX(calc(min(30.65vw,384px)_+_24px))] max-md:[transform:rotate(5deg)_translateX(32vw)]"
              : "[transform:rotate(8deg)_translateX(92px)] max-md:[transform:rotate(7deg)_translateX(54px)]"
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
          className="absolute z-[3] flex h-[432px] w-[min(30.65vw,384px)] flex-col items-center justify-center rounded-[28px] bg-[#0a0a0a] px-10 py-12 text-center text-white opacity-100 outline-none transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-4 max-md:h-[390px] max-md:w-[min(78vw,340px)] max-md:px-8"
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
      <div className="mt-[4.6rem] text-center max-md:mt-12">
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
