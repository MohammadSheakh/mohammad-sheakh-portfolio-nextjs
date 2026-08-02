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
  const drag = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;
    drag.current.dragging = true;
    drag.current.startX = e.pageX - track.offsetLeft;
    drag.current.scrollLeft = track.scrollLeft;
  };
  const onMouseLeave = () => (drag.current.dragging = false);
  const onMouseUp = () => (drag.current.dragging = false);
  const onMouseMove = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.dragging) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft - drag.current.startX;
    track.scrollLeft = drag.current.scrollLeft - x * 2;
  };

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <div className="s-label" style={{ color: "var(--purple)" }}>
          Core expertise
        </div>
        <h2 className="s-title" style={{ color: "#0a0a0a" }}>
          What I do best.
        </h2>
      </div>
      <div
        className="carousel-track"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {CARDS.map((c, i) => (
          <div
            className={`car-card${active === i ? " active" : ""}`}
            style={{ background: c.bg }}
            onClick={() => setActive(i)}
            key={c.title}
          >
            <div className="car-bg">{c.bgSvg}</div>
            <div className="car-inner">
              <div className="car-lbl">{c.label}</div>
              <div className="car-title">{c.title}</div>
              <div className="car-body">{c.body}</div>
              <div className="car-cta">
                <a className="btn btn-white btn-sm" href="#">
                  <span>Explore →</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
