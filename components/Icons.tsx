"use client";

import { useEffect, useRef } from "react";

const ICONS = [
  {
    name: "Node.js",
    type: "Runtime",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#539E43" />
        <path
          d="M9 21l3-8 4 6 4-6 3 8"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
  },
  {
    name: "NestJS",
    type: "Framework",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#E0234E" />
        <path
          d="M8 22V10h4l4 8 4-8h4v12h-3v-7l-3.5 7h-3L12 15v7H8z"
          fill="#fff"
        />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    type: "Language",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M16 3L3 8.5v15L16 29l13-5.5V8.5L16 3z" fill="#3178C6" />
        <path
          d="M18 19v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V19M18 14h7M16 14v8"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    type: "Database",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#336791" />
        <path
          d="M16 7c-5 0-8 2.5-8 6s3 5.5 8 6 8 2.5 8 5.5S21 29 16 29"
          stroke="#fff"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="16" cy="7" r="2" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    type: "Database",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path
          d="M16 3C9 3 4 9 4 16s5 13 12 13 12-6 12-13S23 3 16 3z"
          fill="#47A248"
        />
        <path d="M11 16c0-3 2-5 5-5s5 2 5 5-2 5-5 5-5-2-5-5z" fill="#fff" />
      </svg>
    ),
  },
  {
    name: "Redis",
    type: "Cache/Queue",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#DC382D" />
        <path
          d="M9 20l3-3 3 3 3-3 3 3M9 14l3 3 3-3 3 3 3-3"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "Docker",
    type: "DevOps",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#2496ED" />
        <path d="M16 8l8 8-8 8-8-8 8-8z" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    name: "AWS S3",
    type: "Cloud",
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="4" fill="#FF9900" />
        <path d="M8 16h16M16 8v16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Icons() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target
              .querySelectorAll<HTMLDivElement>(".icon-box")
              .forEach((b, i) => {
                setTimeout(() => b.classList.add("in"), i * 80);
              });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    io.observe(grid);
    return () => io.disconnect();
  }, []);

  return (
    <section className="icons-section" id="skills">
      <div className="s-label">Tech stack</div>
      <h2 className="s-title">
        Tools that
        <br />
        ship products.
      </h2>
      <div className="icons-grid" ref={gridRef}>
        {ICONS.map((icon) => (
          <div className="icon-item" key={icon.name}>
            <div className="icon-box">{icon.svg}</div>
            <div className="icon-name">{icon.name}</div>
            <div className="icon-type">{icon.type}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
