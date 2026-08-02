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
    <section className="about" id="about">
      <div className="about-grid" id="aboutContent">
        <div>
          <div className="s-label">ABOUT ME</div>
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
          <p className="about-text" style={{ marginTop: "1rem" }}>
            AIUB CSE graduate with 3.73 CGPA. Passionate about clean
            architecture, system diagrams, and agentic development workflows.
          </p>
          <div style={{ marginTop: "2rem" }}>
            <a className="btn btn-about" href="#">
              <span>Download CV →</span>
            </a>
          </div>
          <div className="about-stats">
            <div>
              <div className="stat-n">1+</div>
              <div className="stat-l">YEARS EXP</div>
            </div>
            <div>
              <div className="stat-n">4+</div>
              <div className="stat-l">PROJECTS</div>
            </div>
            <div>
              <div className="stat-n">3.73</div>
              <div className="stat-l">CGPA</div>
            </div>
          </div>
        </div>

        <div className="bento">
          {/* SparkTech Card */}
          <div className="bento-card bc1">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              style={{ marginBottom: "2rem" }}
            >
              <rect x="6" y="6" width="22" height="22" rx="6" className="spark-rect-1" />
              <rect x="36" y="6" width="22" height="22" rx="6" className="spark-rect-2" />
              <rect x="6" y="36" width="22" height="22" rx="6" className="spark-rect-3" />
              <rect x="36" y="36" width="22" height="22" rx="6" className="spark-rect-4" />
            </svg>
            <div className="bento-num">SparkTech</div>
            <div className="bento-label">CURRENT EMPLOYER · DHAKA</div>
          </div>

          {/* AIUB - CSE Card */}
          <div className="bento-card bc2">
            <div className="bento-icon-wrap mint-icon">
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
            <div className="bento-title">AIUB — CSE</div>
            <div className="bento-sub">3.73 / 4.00 GPA</div>
          </div>

          {/* 4+ Projects Card */}
          <div className="bento-card bc3">
            <div className="bento-icon-wrap peach-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="bento-title">4+ Projects</div>
            <div className="bento-sub">Health · Marketplace · Tasks · Rental</div>
          </div>
        </div>
      </div>
    </section>
  );
}

