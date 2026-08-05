"use client";

import { useEffect, useRef } from "react";

interface WaveCanvasProps {
  color: string;
  color2?: string;
  width?: number;
  height?: number;
}

export default function WaveCanvas({
  color,
  color2,
  width = 300,
  height = 200,
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    let t = 0;
    const W = c.width;
    const H = c.height;
    const nodes = Array.from({ length: 12 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let raf = 0;
    let isVisible = false;
    let isRunning = false;

    function frame() {
      if (!ctx || !isRunning) return;
      ctx.clearRect(0, 0, W, H);
      // Waves
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6 - j * 0.15;
        for (let x = 0; x <= W; x += 2) {
          const y = H / 2 + Math.sin((x / W) * Math.PI * 3 + t + j * 1.1) * (18 - j * 4);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // Nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });
      ctx.globalAlpha = 0.4;
      ctx.strokeStyle = color2 || color;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 80) {
            ctx.globalAlpha = (1 - d / 80) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = color;
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      t += 0.03;
      raf = requestAnimationFrame(frame);
    }

    const start = () => {
      if (isRunning || !isVisible || document.hidden) return;
      isRunning = true;
      raf = requestAnimationFrame(frame);
    };

    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(raf);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    // Pause the canvas outside the viewport to avoid competing with scroll animation.
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { rootMargin: "160px 0px" },
    );

    observer.observe(c);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [color, color2]);

  return (
    <canvas
      className="block"
      ref={canvasRef}
      width={width}
      height={height}
      aria-hidden="true"
    />
  );
}
