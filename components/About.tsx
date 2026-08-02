"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from("#aboutTitle", {
      scrollTrigger: { trigger: "#aboutTitle", start: "top 80%" },
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power4.out",
    });
    gsap.from(".bento-card", {
      scrollTrigger: { trigger: ".bento", start: "top 75%" },
      duration: 0.7,
      y: 40,
      opacity: 0,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-grid">
        <div>
          <div className="s-label">About me</div>
          <h2 className="s-title" id="aboutTitle">
            Building systems
            <br />
            that hold.
          </h2>
          <p className="about-text">
            Backend developer at SparkTech Agency, Dhaka. I design and ship
            APIs, real-time engines, and data pipelines for health,
            marketplace, and task management platforms.
          </p>
          <p className="about-text" style={{ marginTop: "-1rem" }}>
            AIUB CSE graduate with 3.73 CGPA. Passionate about clean
            architecture, system diagrams, and agentic development workflows.
          </p>
          <a className="btn" href="#">
            <span>Download CV →</span>
          </a>
          <div className="about-stats">
            <div>
              <div className="stat-n">1+</div>
              <div className="stat-l">Years exp</div>
            </div>
            <div>
              <div className="stat-n">4+</div>
              <div className="stat-l">Projects</div>
            </div>
            <div>
              <div className="stat-n">3.73</div>
              <div className="stat-l">CGPA</div>
            </div>
          </div>
        </div>
        <div className="bento">
          <div className="bento-card bc1">
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              style={{ marginBottom: "1.5rem", opacity: 0.4 }}
            >
              <rect x="10" y="10" width="25" height="25" rx="6" fill="#5B4FCF" />
              <rect
                x="45"
                y="10"
                width="25"
                height="25"
                rx="6"
                fill="#5B4FCF"
                opacity="0.5"
              />
              <rect
                x="10"
                y="45"
                width="25"
                height="25"
                rx="6"
                fill="#5B4FCF"
                opacity="0.5"
              />
              <rect
                x="45"
                y="45"
                width="25"
                height="25"
                rx="6"
                fill="#5B4FCF"
                opacity="0.3"
              />
            </svg>
            <div className="bento-num">SparkTech</div>
            <div className="bento-label">Current employer · Dhaka</div>
          </div>
          <div className="bento-card bc2">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ marginBottom: "0.6rem", opacity: 0.5 }}
            >
              <circle cx="20" cy="20" r="18" stroke="#0F766E" strokeWidth="2" />
              <path
                d="M13 20l5 5 9-10"
                stroke="#0F766E"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="bento-title">AIUB — CSE</div>
            <div className="bento-sub" style={{ marginTop: "0.3rem" }}>
              3.73 / 4.00 GPA
            </div>
          </div>
          <div className="bento-card bc3">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ marginBottom: "0.6rem", opacity: 0.5 }}
            >
              <path
                d="M20 4l4 12h12l-10 7 4 12-10-7-10 7 4-12L4 16h12z"
                fill="#F97316"
              />
            </svg>
            <div className="bento-title">4+ Projects</div>
            <div className="bento-sub" style={{ marginTop: "0.3rem" }}>
              Health · Marketplace · Tasks · Rental
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
