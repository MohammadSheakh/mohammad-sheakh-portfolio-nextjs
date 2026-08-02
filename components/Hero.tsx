"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function Hero() {
  useEffect(() => {
    gsap.from(".hero-badge", {
      duration: 0.8,
      y: 20,
      opacity: 0,
      delay: 0.2,
      ease: "power3.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".hero-heading .line1", {
      duration: 1,
      y: 60,
      opacity: 0,
      delay: 0.4,
      ease: "power4.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".hero-heading .line2", {
      duration: 1,
      y: 60,
      opacity: 0,
      delay: 0.55,
      ease: "power4.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".hero-heading .line3", {
      duration: 1,
      y: 60,
      opacity: 0,
      delay: 0.7,
      ease: "power4.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".hero-sub", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      delay: 0.9,
      ease: "power3.out",
      clearProps: "opacity,transform",
    });
    gsap.from(".hero-actions", {
      duration: 0.8,
      y: 20,
      opacity: 0,
      delay: 1.1,
      ease: "power3.out",
      clearProps: "opacity,transform",
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-36 pb-12 px-6 md:px-14 overflow-hidden bg-[linear-gradient(165deg,#f7f5fe_0%,#ece8fe_22%,#9f91f3_50%,#5f50c5_75%,#302476_100%)]">
      {/* Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-white/30 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-purple-500/20 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Status Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/40 dark:bg-black/30 border border-white/60 dark:border-white/10 backdrop-blur-md text-[0.68rem] font-bold tracking-[2px] uppercase text-neutral-800 dark:text-neutral-200 mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full shadow-[0_0_8px_#4ade80]"></span>
          AVAILABLE FOR BACKEND ROLES · DHAKA, BD
        </div>

        {/* Main Display Heading */}
        <h1 className="hero-heading font-display font-black leading-[0.92] tracking-[-3px] text-[clamp(3.5rem,9vw,8.5rem)] mb-8" id="heroHead">
          <span className="line1 block text-[#0b0b0b] font-black">Mohammad</span>
          <span className="line2 block text-[#8e81bf] font-black">Sheakh</span>
          <span className="line3 block text-white font-black">Backend.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub max-w-xl text-white/90 text-base md:text-lg leading-relaxed mb-10 font-medium">
          I build the systems behind the product — scalable APIs, real-time
          engines, and job queues that don&apos;t break under pressure. Node.js
          · NestJS · TypeScript.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions flex flex-wrap items-center gap-4 mb-16">
          <a
            className="inline-flex items-center justify-center py-4 px-9 rounded-full bg-neutral-950 text-white font-bold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:scale-[1.04] hover:bg-black shadow-xl"
            href="#work"
          >
            <span>See my work →</span>
          </a>
          <a
            className="inline-flex items-center justify-center py-4 px-9 rounded-full bg-white/20 border border-white/40 text-white backdrop-blur-md font-bold text-sm tracking-wider uppercase no-underline transition-all duration-300 hover:bg-white/35 shadow-md"
            href="mailto:mohammad.sheakh@gmail.com"
          >
            <span>Get in touch</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="relative z-10 hero-scroll flex items-center gap-3 text-xs tracking-[3px] uppercase font-semibold text-white/70">
        <div className="w-10 h-[1px] bg-white/50"></div>
        <span>SCROLL TO EXPLORE</span>
      </div>
    </section>
  );
}


