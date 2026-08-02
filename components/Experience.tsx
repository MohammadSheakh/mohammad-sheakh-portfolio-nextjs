"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function Experience() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".exp-row", {
      scrollTrigger: { trigger: ".exp-list", start: "top 75%" },
      duration: 0.6,
      x: -30,
      opacity: 0,
      stagger: 0.12,
      ease: "power2.out",
    });
  }, []);

  return (
    <section className="exp-section" id="exp">
      <div className="s-label">Experience</div>
      <h2 className="s-title">
        Where I&apos;ve
        <br />
        worked.
      </h2>
      <div className="exp-list">
        <div className="exp-row">
          <div>
            <div className="exp-company">SparkTech Agency</div>
            <div className="exp-role">
              Junior Backend Developer · Full-time · On-site
            </div>
          </div>
          <span className="exp-badge">Current</span>
          <div className="exp-time">
            May 2025 — May 2026
            <br />
            Dhaka, Bangladesh
          </div>
        </div>
        <div className="exp-row">
          <div>
            <div className="exp-company">Edistys</div>
            <div className="exp-role">
              Junior Web Developer · Full-time · Remote
            </div>
          </div>
          <span
            className="exp-badge"
            style={{ background: "#E8FFF4", color: "#0F766E" }}
          >
            Remote
          </span>
          <div className="exp-time">
            Sep 2024 — Jan 2025
            <br />
            Remote
          </div>
        </div>
        <div className="exp-row" style={{ borderBottom: "none" }}>
          <div>
            <div className="exp-company">AIUB</div>
            <div className="exp-role">
              BSc in Computer Science &amp; Engineering
            </div>
          </div>
          <span
            className="exp-badge"
            style={{ background: "#FFF0E8", color: "#F97316" }}
          >
            3.73 GPA
          </span>
          <div className="exp-time">
            2020 — Aug 2024
            <br />
            Dhaka, Bangladesh
          </div>
        </div>
      </div>
    </section>
  );
}
