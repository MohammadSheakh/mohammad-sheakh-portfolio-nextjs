"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function CircleCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const cbTextRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(ringsRef.current, { opacity: 0, ease: "none" }, 0)
        .to(circleRef.current, { scale: 28, ease: "none" }, 0)
        .to(cbTextRef.current, { opacity: 0, ease: "none" }, 0.15)
        .to(overlayRef.current, { opacity: 1, ease: "none" }, 0.55);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="circle-section" id="contact" ref={sectionRef}>
      <div className="c-rings" ref={ringsRef}>
        <div className="c-ring"></div>
        <div className="c-ring"></div>
        <div className="c-ring"></div>
      </div>
      <div className="circle-btn" ref={circleRef}>
        <div className="cb-text" ref={cbTextRef}>
          LET&apos;S
          <br />
          WORK
        </div>
      </div>
      <div className="circle-overlay" ref={overlayRef}>
        <div className="co-title">Ready to build?</div>
        <div className="co-email">mohammad.sheakh@gmail.com</div>
        <a className="btn btn-white" href="mailto:mohammad.sheakh@gmail.com">
          <span>Send a message →</span>
        </a>
      </div>
    </section>
  );
}
