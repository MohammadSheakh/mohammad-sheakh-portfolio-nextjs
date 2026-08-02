"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const cards =
      wrapRef.current?.querySelectorAll<HTMLDivElement>(".sc") ?? [];

    const triggers: ScrollTrigger[] = [];
    const STICK_POS = "top 100px";

    cards.forEach((card, i) => {
      const isLast = i === cards.length - 1;
      const nextCard = cards[i + 1];

      // Pin the card at a fixed position on screen. It stays there
      // ("previous card thake upore") until the next card catches up
      // to that same position, at which point this one releases. The
      // last card isn't pinned — it settles into view and then scrolls
      // away naturally since nothing follows it.
      if (!isLast) {
        const pinTrigger = ScrollTrigger.create({
          trigger: card,
          start: STICK_POS,
          end: STICK_POS,
          endTrigger: nextCard,
          pin: true,
          pinSpacing: false,
        });
        triggers.push(pinTrigger);
      }

      // While the next card approaches from below, shrink & fade the
      // current (pinned) card so the next one visibly reveals over it.
      if (!isLast) {
        const tween = gsap.to(card, {
          scale: 0.92,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: STICK_POS,
            scrub: true,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="stack-section" id="work">
      <div className="stack-header">
        <div className="s-label">Selected projects</div>
        <h2 className="s-title">Work that shipped.</h2>
      </div>

      <div className="stack-cards-wrap" ref={wrapRef}>
        {PROJECTS.map((p, i) => (
          <div
            className="stack-card-outer"
            style={{ zIndex: i + 1 }}
            key={p.title}
          >
            <div className="sc">
              <div>
                <span className="sc-num">{p.num}</span>
                <span className="sc-tag">{p.tag}</span>
                <h3 className="sc-title">{p.title}</h3>
                <p className="sc-desc">{p.desc}</p>
                <div className="sc-pills">
                  {p.pills.map((pill) => (
                    <span className="sc-pill" key={pill}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="sc-visual">
                <WaveCanvas color={p.color} color2={p.color2} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
