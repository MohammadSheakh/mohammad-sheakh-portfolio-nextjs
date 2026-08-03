"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.from("#aboutContent", {
      scrollTrigger: { trigger: "#about", start: "top 80%" },
      duration: 0.9,
      y: 35,
      opacity: 0,
      ease: "power3.out",
      clearProps: "all",
    });

    gsap.from(".bento-card", {
      scrollTrigger: { trigger: ".bento", start: "top 80%" },
      duration: 0.7,
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "all",
    });
  }, []);

  return (
    <section className="bg-neutral-50 dark:bg-neutral-950 py-28 px-6 lg:px-14 relative" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start max-w-7xl mx-auto" id="aboutContent">
        {/* Left Column: Information & Stats */}
        <div className="lg:col-span-6">
          <div className="text-[0.72rem] tracking-[2.5px] font-bold uppercase text-[#5b4fcf] dark:text-[#8174df] mb-3">
            ABOUT ME
          </div>
          <h2 className="s-title font-display font-black leading-[0.92] tracking-[-3px] text-[clamp(2.8rem,5vw,4.5rem)] text-neutral-950 dark:text-white mb-8" id="aboutTitle">
            Building systems
            <br />
            that hold.
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed max-w-xl font-normal mb-4">
            Backend developer at SparkTech Agency, Dhaka. I design and ship
            APIs, real-time engines, and data pipelines for health,
            marketplace, and task management platforms.
          </p>
          <p className="text-neutral-700 dark:text-neutral-300 text-base md:text-lg leading-relaxed max-w-xl font-normal mb-8">
            AIUB CSE graduate with 3.73 CGPA. Passionate about clean
            architecture, system diagrams, and agentic development workflows.
          </p>

          <div>
            <a
              className="inline-flex items-center justify-center py-3.5 px-8 rounded-full border-2 border-neutral-950 dark:border-white text-neutral-950 dark:text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-neutral-950 hover:text-white dark:hover:bg-white dark:hover:text-neutral-950 shadow-sm"
              href="#"
            >
              <span>Download CV →</span>
            </a>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="font-display font-black text-4xl lg:text-5xl tracking-tight text-[#5b4fcf] dark:text-[#8174df] mb-1.5">
                1+
              </div>
              <div className="text-[0.72rem] font-bold tracking-[1.5px] uppercase text-neutral-500 dark:text-neutral-400">
                YEARS EXP
              </div>
            </div>
            <div>
              <div className="font-display font-black text-4xl lg:text-5xl tracking-tight text-[#5b4fcf] dark:text-[#8174df] mb-1.5">
                4+
              </div>
              <div className="text-[0.72rem] font-bold tracking-[1.5px] uppercase text-neutral-500 dark:text-neutral-400">
                PROJECTS
              </div>
            </div>
            <div>
              <div className="font-display font-black text-4xl lg:text-5xl tracking-tight text-[#5b4fcf] dark:text-[#8174df] mb-1.5">
                3.73
              </div>
              <div className="text-[0.72rem] font-bold tracking-[1.5px] uppercase text-neutral-500 dark:text-neutral-400">
                CGPA
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bento Cards */}
        <div className="bento lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {/* SparkTech Card (bc1) */}
          <div className="bento-card bc1 relative overflow-hidden sm:col-span-1 sm:row-span-2 min-h-[420px] rounded-3xl p-8 flex flex-col justify-between bg-[#eeebff] dark:bg-[#1c1836] border border-[#5b4fcf]/15 dark:border-[#8e81bf]/25 transition-transform duration-300 hover:-translate-y-1 shadow-sm">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              className="mb-8"
            >
              <rect x="6" y="6" width="22" height="22" rx="6" className="fill-[#5b4fcf] dark:fill-[#8e81bf]" />
              <rect x="36" y="6" width="22" height="22" rx="6" className="fill-[#5b4fcf]/45 dark:fill-[#8e81bf]/50" />
              <rect x="6" y="36" width="22" height="22" rx="6" className="fill-[#5b4fcf]/45 dark:fill-[#8e81bf]/50" />
              <rect x="36" y="36" width="22" height="22" rx="6" className="fill-[#5b4fcf]/25 dark:fill-[#8e81bf]/30" />
            </svg>
            <div>
              <div className="font-display font-black text-4xl lg:text-5xl tracking-tight leading-none text-[#5b4fcf] dark:text-[#a89ce8] mb-2">
                SparkTech
              </div>
              <div className="text-[0.72rem] font-bold tracking-[1.5px] uppercase text-[#6b6b8a] dark:text-[#a0a0c0]">
                CURRENT EMPLOYER · DHAKA
              </div>
            </div>
          </div>

          {/* AIUB - CSE Card (bc2) */}
          <div className="bento-card bc2 relative overflow-hidden rounded-3xl p-7 flex flex-col justify-end bg-[#e4fcf2] dark:bg-[#0f2b24] border border-[#0f766e]/15 dark:border-[#2dd4bf]/25 transition-transform duration-300 hover:-translate-y-1 shadow-sm min-h-[190px]">
            <div className="text-[#0f766e] dark:text-[#2dd4bf] mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 12l3 3 5-6"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="font-display font-extrabold text-lg tracking-tight text-neutral-950 dark:text-white mb-1">
              AIUB — CSE
            </div>
            <div className="text-xs font-medium text-neutral-600 dark:text-[#99b8ac]">
              3.73 / 4.00 GPA
            </div>
          </div>

          {/* 4+ Projects Card (bc3) */}
          <div className="bento-card bc3 relative overflow-hidden rounded-3xl p-7 flex flex-col justify-end bg-[#fff0e6] dark:bg-[#2e1a0e] border border-[#f97316]/15 dark:border-[#fb923c]/25 transition-transform duration-300 hover:-translate-y-1 shadow-sm min-h-[190px]">
            <div className="text-[#f97316] dark:text-[#fb923c] mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="font-display font-extrabold text-lg tracking-tight text-neutral-950 dark:text-white mb-1">
              4+ Projects
            </div>
            <div className="text-xs font-medium text-neutral-600 dark:text-[#c89a80]">
              Health · Marketplace · Tasks · Rental
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

