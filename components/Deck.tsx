"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Deck() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".dk", {
      scrollTrigger: { trigger: ".deck-wrap", start: "top 75%" },
      duration: 0.8,
      y: 50,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="deck-section">
      <div className="s-label" style={{ textAlign: "center" }}>
        Why hire me
      </div>
      <h2 className="s-title" style={{ textAlign: "center", letterSpacing: "-2px" }}>
        What makes me
        <br />
        different.
      </h2>
      <div className={`deck-wrap${open ? " open" : ""}`}>
        <div className="dk dk1">
          <div className="dk-num">01</div>
          <div className="dk-title">Agentic velocity</div>
          <div className="dk-sub">
            AI-assisted development that ships faster without sacrificing
            architecture quality
          </div>
        </div>
        <div className="dk dk2">
          <div className="dk-num">03</div>
          <div className="dk-title">Frontend empathy</div>
          <div className="dk-sub">
            Clean, documented endpoints that frontend teams love to consume
            and integrate
          </div>
        </div>
        <div className="dk dk0">
          <div className="dk-num" style={{ color: "rgba(255,255,255,0.08)" }}>
            02
          </div>
          <div className="dk-title">Production mindset</div>
          <div className="dk-sub" style={{ color: "rgba(255,255,255,0.6)" }}>
            Error handling, logging, health checks — production-grade from
            the first commit
          </div>
        </div>
      </div>
      <div className="deck-toggle">
        <button className="btn" onClick={() => setOpen((o) => !o)}>
          <span>{open ? "Stack them back ←" : "Spread the cards →"}</span>
        </button>
      </div>
    </section>
  );
}
