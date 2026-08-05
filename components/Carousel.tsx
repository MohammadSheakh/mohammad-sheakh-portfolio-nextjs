"use client";

import { useRef, useState } from "react";

const CARDS = [
  {
    label: "Backend",
    title: "API Engineering",
    body: "RESTful APIs with NestJS and Express.js. JWT auth, RBAC, modular architecture. TypeScript strict mode, SOLID principles, clean dependency injection.",
    bg: "linear-gradient(135deg,#1a1a2e,#2d1b69)",
    bgSvg: (
      <svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#fff" strokeWidth="1" fill="none" />
        <path d="M50 10 L90 50 L50 90 L10 50 Z" stroke="#fff" strokeWidth="0.5" fill="none" />
      </svg>
    ),
  },
  {
    label: "Database",
    title: "Data Architecture",
    body: "PostgreSQL with Prisma ORM, MongoDB/Mongoose, Redis caching and sessions. Schema design with indexing and query optimization for production workloads.",
    bg: "linear-gradient(135deg,#0d2137,#1a4a6e)",
    bgSvg: (
      <svg viewBox="0 0 100 100">
        <rect x="10" y="10" width="35" height="35" rx="4" stroke="#fff" strokeWidth="1" fill="none" />
        <rect x="55" y="10" width="35" height="35" rx="4" stroke="#fff" strokeWidth="1" fill="none" />
        <rect x="10" y="55" width="35" height="35" rx="4" stroke="#fff" strokeWidth="1" fill="none" />
        <rect x="55" y="55" width="35" height="35" rx="4" stroke="#fff" strokeWidth="1" fill="none" />
      </svg>
    ),
  },
  {
    label: "Real-time",
    title: "Live Systems",
    body: "Socket.io with Redis adapter for multi-instance scaling. BullMQ job queues with retry and exponential backoff. Firebase push notifications and webhooks.",
    bg: "linear-gradient(135deg,#0f2a1f,#1a5c3a)",
    bgSvg: (
      <svg viewBox="0 0 100 100">
        <path d="M10 50 Q30 20 50 50 Q70 80 90 50" stroke="#fff" strokeWidth="1.5" fill="none" />
        <circle cx="10" cy="50" r="4" fill="#fff" opacity="0.5" />
        <circle cx="50" cy="50" r="4" fill="#fff" opacity="0.5" />
        <circle cx="90" cy="50" r="4" fill="#fff" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Cloud",
    title: "AWS & DevOps",
    body: "AWS S3 for file uploads, Cloudinary for media. Docker containerization, GitHub CI/CD pipelines, multi-worker clustering for horizontal scalability.",
    bg: "linear-gradient(135deg,#2a1f0f,#5c3a1a)",
    bgSvg: (
      <svg viewBox="0 0 100 100">
        <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" stroke="#fff" strokeWidth="1" fill="none" />
        <line x1="50" y1="10" x2="50" y2="90" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
        <line x1="10" y1="30" x2="90" y2="70" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
        <line x1="90" y1="30" x2="10" y2="70" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    label: "Payments",
    title: "Stripe Integration",
    body: "Stripe payment gateway, subscription flows, webhook signature verification, RevenueCat for mobile IAP. Secure, idempotent payment processing.",
    bg: "linear-gradient(135deg,#1f0f2a,#4a1a5c)",
    bgSvg: (
      <svg viewBox="0 0 100 100">
        <rect x="20" y="30" width="60" height="40" rx="6" stroke="#fff" strokeWidth="1" fill="none" />
        <line x1="20" y1="45" x2="80" y2="45" stroke="#fff" strokeWidth="0.5" />
        <circle cx="35" cy="38" r="3" fill="#fff" opacity="0.6" />
        <circle cx="47" cy="38" r="3" fill="#fff" opacity="0.4" />
        <circle cx="59" cy="38" r="3" fill="#fff" opacity="0.2" />
      </svg>
    ),
  },
];

export default function Carousel() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Select, expand, and align one expertise card inside the hidden scroll track.
  const selectCard = (index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const nextIndex = Math.min(Math.max(index, 0), CARDS.length - 1);

    setActive(nextIndex);
    track.scrollTo({
      left: nextIndex * 324,
      behavior: "smooth",
    });
  };

  const moveCarousel = (direction: -1 | 1) => {
    selectCard(active + direction);
  };

  return (
    <section className="overflow-hidden bg-[var(--purple-pale)] py-28">
      <div className="mb-12 px-6 md:px-12">
        <div className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[3px] text-purple">
          Core expertise
        </div>
        <h2 className="s-title mb-8 font-display text-[clamp(2.5rem,5vw,4rem)] font-black leading-[0.95] tracking-[-2.5px] text-[#0a0a0a]">
          What I do best.
        </h2>
      </div>
      <div
        className="flex gap-6 overflow-x-hidden px-6 select-none md:px-12"
        ref={trackRef}
      >
        {/* Selectable expertise cards expand to reveal their supporting details. */}
        {CARDS.map((c, i) => (
          <button
            type="button"
            aria-pressed={active === i}
            className={`relative min-h-[400px] shrink-0 cursor-pointer overflow-hidden rounded-3xl border-0 p-0 text-left transition-[flex-basis,box-shadow] duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple/70 ${
              active === i
                ? "basis-[520px] ring-2 ring-purple/70"
                : "basis-[300px] ring-0"
            }`}
            style={{ background: c.bg }}
            onClick={() => selectCard(i)}
            key={c.title}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] [&_svg]:h-[200px] [&_svg]:w-[200px]">
              {c.bgSvg}
            </div>
            <div className="relative z-[1] flex h-full flex-col justify-end p-10">
              <div className="mb-2 text-[0.65rem] uppercase tracking-[2px] text-white/40">
                {c.label}
              </div>
              <div className="font-display text-2xl font-black tracking-[-0.5px] text-white">
                {c.title}
              </div>
              <div
                className={`mt-3 overflow-hidden text-[0.82rem] leading-7 text-white/60 transition-[max-height,opacity] duration-500 ${
                  active === i ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {c.body}
              </div>
              <div
                className={`mt-4 overflow-hidden transition-[max-height,opacity] duration-500 ${
                  active === i ? "max-h-[60px] opacity-100 delay-100" : "max-h-0 opacity-0"
                }`}
              >
                <span
                  className="inline-flex items-center rounded-full border border-white/60 px-5 py-2 text-xs font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black"
                >
                  <span>Explore →</span>
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Progress and button-only carousel navigation. */}
      <div className="mt-10 flex items-center justify-between gap-8 px-6 md:px-12">
        <div className="flex min-w-0 flex-1 items-center gap-3 md:max-w-sm">
          <span className="font-mono text-xs font-bold text-[#0a0a0a]">
            {String(active + 1).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-black/15">
            <div
              className="absolute inset-y-0 left-0 bg-purple transition-[width] duration-500"
              style={{ width: `${((active + 1) / CARDS.length) * 100}%` }}
            />
          </div>
          <span className="font-mono text-xs font-bold text-[#0a0a0a]">
            {String(CARDS.length).padStart(2, "0")}
          </span>
        </div>

        <div className="mr-[10%] flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous expertise"
            title="Previous expertise"
            disabled={active === 0}
            onClick={() => moveCarousel(-1)}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-black/70 text-[#0a0a0a] transition-all duration-300 hover:bg-[#0a0a0a] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0a0a0a]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
              <path d="M9 12h10" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next expertise"
            title="Next expertise"
            disabled={active === CARDS.length - 1}
            onClick={() => moveCarousel(1)}
            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-black/70 text-[#0a0a0a] transition-all duration-300 hover:bg-[#0a0a0a] hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-[#0a0a0a]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
              <path d="M5 12h10" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
