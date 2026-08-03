"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WaveCanvas from "./WaveCanvas";

const PROJECTS = [
  {
    num: "01 / 04",
    tag: "2026 · Active",
    title: "Alora Rental",
    desc: "Multi-role apartment management platform. Owners, renters, crews, agents and admin — unified under one API. Billing, maintenance flows, and document management.",
    pills: ["NestJS", "Prisma", "PostgreSQL", "TypeScript"],
    color: "#7B6FDD",
    color2: "#5B4FCF",
  },
  {
    num: "02 / 04",
    tag: "2025–2026",
    title: "Task Management System",
    desc: "Production-grade backend for individual, family and team workflows. Socket.IO real-time sync, Stripe subscriptions, BullMQ for automated emails and push notifications.",
    pills: ["Express.js", "MongoDB", "BullMQ", "Socket.IO"],
    color: "#22cc88",
    color2: "#0F766E",
  },
  {
    num: "03 / 04",
    tag: "2025",
    title: "Suplify — Health Platform",
    desc: "Full backend for a health & wellness platform. Real-time messaging, appointment scheduling, Kafka event streams, Stripe payments, Firebase push, and horizontal clustering.",
    pills: ["Node.js", "Kafka", "Firebase", "AWS S3"],
    color: "#F97316",
    color2: "#ea580c",
  },
  {
    num: "04 / 04",
    tag: "2025",
    title: "Kaaj BD — Service Marketplace",
    desc: "Multi-role marketplace for service providers and users. Real-time chat, Agora audio calling, and a generic inheritance architecture that cut code duplication by 70%.",
    pills: ["Express.js", "MongoDB", "Agora", "Socket.io"],
    color: "#3B82F6",
    color2: "#2563EB",
  },
];

export default function StackCards() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>(".sc");
      const stickPosition = "top 100px";

      cards.forEach((card, index) => {
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        ScrollTrigger.create({
          trigger: card,
          start: stickPosition,
          end: stickPosition,
          endTrigger: nextCard,
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: stickPosition,
            scrub: true,
          },
        });
      });
    });

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#0a0a0a] py-28" id="work">
      <div className="mb-20 px-6 md:px-12">
        <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[3px] text-white/40">
          Selected projects
        </div>
        <h2 className="s-title mb-8 font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[-2.5px] text-white">
          Work that shipped.
        </h2>
      </div>

      <div className="relative" ref={wrapRef}>
        {PROJECTS.map((p, i) => (
          <div
            className="stack-card-outer flex min-h-screen items-center py-5"
            style={{ zIndex: i + 1 }}
            key={p.title}
          >
            <div className="sc mx-6 grid min-h-[400px] w-[calc(100%_-_3rem)] origin-center grid-cols-1 items-center gap-12 rounded-3xl border border-[#1f1f1f] bg-[#111] px-6 pb-12 will-change-[transform,opacity] md:mx-12 md:w-[calc(100%_-_6rem)] md:grid-cols-[1fr_1.1fr] md:px-12">
              <div>
                <span className="mb-8 block pt-8 font-mono text-[0.72rem] tracking-[2px] text-[#444]">
                  {p.num}
                </span>
                <span className="mb-5 inline-block rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-3 py-1 text-[0.68rem] uppercase tracking-[2px] text-[#666]">
                  {p.tag}
                </span>
                <h3 className="mb-4 font-display text-[clamp(1.5rem,3vw,2.2rem)] font-black leading-none tracking-[-1px] text-white">
                  {p.title}
                </h3>
                <p className="mb-7 text-[0.85rem] leading-7 text-[#555]">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {p.pills.map((pill) => (
                    <span
                      className="rounded-lg border border-[#222] bg-[#151515] px-2.5 py-1 font-mono text-[0.72rem] text-[#444]"
                      key={pill}
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative h-60 overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0a0a0a] p-6">
                <WaveCanvas color={p.color} color2={p.color2} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
