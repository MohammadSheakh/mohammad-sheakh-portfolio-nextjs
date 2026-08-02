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
    <section className="hero">
      <div className="hero-circle"></div>
      <div className="hero-circle2"></div>
      <div className="hero-badge">
        <span
          style={{
            width: 6,
            height: 6,
            background: "#4ade80",
            borderRadius: "50%",
            display: "inline-block",
            boxShadow: "0 0 8px #4ade80",
          }}
        ></span>
        AVAILABLE FOR BACKEND ROLES · DHAKA, BD
      </div>
      <h1 className="hero-heading" id="heroHead">
        <span className="line1">Mohammad</span>
        <br />
        <span className="line2">Sheakh</span>
        <br />
        <span className="line3">Backend.</span>
      </h1>
      <p className="hero-sub">
        I build the systems behind the product — scalable APIs, real-time
        engines, and job queues that don&apos;t break under pressure. Node.js
        · NestJS · TypeScript.
      </p>
      <div className="hero-actions">
        <a className="btn btn-hero-primary" href="#work">
          <span>See my work →</span>
        </a>
        <a className="btn btn-hero-secondary" href="mailto:mohammad.sheakh@gmail.com">
          <span>Get in touch</span>
        </a>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>SCROLL TO EXPLORE
      </div>
    </section>
  );
}

