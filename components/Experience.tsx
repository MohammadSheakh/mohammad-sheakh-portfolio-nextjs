"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".exp-row", {
        scrollTrigger: { trigger: ".exp-list", start: "top 75%" },
        duration: 0.6,
        x: -30,
        opacity: 0,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "opacity,transform",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[var(--bg)] px-6 py-20 md:px-12 md:py-28" id="exp">
      <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[3px] text-purple">
        Experience
      </div>
      <h2 className="s-title mb-8 font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[-2.5px]">
        Where I&apos;ve
        <br />
        worked.
      </h2>
      <div className="exp-list mt-12 flex flex-col">
        <div className="exp-row flex flex-wrap items-center justify-between gap-8 border-b border-[var(--border)] py-8">
          <div>
            <div className="font-display text-xl font-black tracking-[-0.5px]">
              SparkTech Agency
            </div>
            <div className="mt-1 text-[0.82rem] text-[var(--muted)]">
              Junior Backend Developer · Full-time · On-site
            </div>
          </div>
          <span className="whitespace-nowrap rounded-lg bg-[var(--purple-pale)] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[1px] text-purple">
            Current
          </span>
          <div className="whitespace-nowrap text-right font-mono text-xs text-[var(--muted)]">
            May 2025 — May 2026
            <br />
            Dhaka, Bangladesh
          </div>
        </div>
        <div className="exp-row flex flex-wrap items-center justify-between gap-8 border-b border-[var(--border)] py-8">
          <div>
            <div className="font-display text-xl font-black tracking-[-0.5px]">
              Edistys
            </div>
            <div className="mt-1 text-[0.82rem] text-[var(--muted)]">
              Junior Web Developer · Full-time · Remote
            </div>
          </div>
          <span className="whitespace-nowrap rounded-lg bg-[#E8FFF4] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[1px] text-[#0F766E]">
            Remote
          </span>
          <div className="whitespace-nowrap text-right font-mono text-xs text-[var(--muted)]">
            Sep 2024 — Jan 2025
            <br />
            Remote
          </div>
        </div>
        <div className="exp-row flex flex-wrap items-center justify-between gap-8 py-8">
          <div>
            <div className="font-display text-xl font-black tracking-[-0.5px]">
              AIUB
            </div>
            <div className="mt-1 text-[0.82rem] text-[var(--muted)]">
              BSc in Computer Science &amp; Engineering
            </div>
          </div>
          <span className="whitespace-nowrap rounded-lg bg-[#FFF0E8] px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[1px] text-coral">
            3.73 GPA
          </span>
          <div className="whitespace-nowrap text-right font-mono text-xs text-[var(--muted)]">
            2020 — Aug 2024
            <br />
            Dhaka, Bangladesh
          </div>
        </div>
      </div>
    </section>
  );
}
