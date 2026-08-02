"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SectionTitleReveal() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];

    document.querySelectorAll<HTMLElement>(".s-title").forEach((el) => {
      const tween = gsap.from(el, {
        scrollTrigger: { trigger: el, start: "top 85%" },
        duration: 0.9,
        y: 40,
        opacity: 0,
        ease: "power3.out",
        clearProps: "all",
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}

