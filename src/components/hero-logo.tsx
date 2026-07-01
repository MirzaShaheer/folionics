"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/use-parallax";

// Teal palette (matches the site tokens) for the drifting particles.
const COLORS = ["#17a99b", "#0c7a72", "#0a5a53", "#4fd1c5", "#3bb4a6"];

interface Particle {
  angle: number; // current angle around the centre
  radius: number; // distance from the centre
  speed: number; // signed angular speed
  drift: number; // radial-breathing phase
  driftAmp: number;
  size: number;
  alpha: number;
  color: string;
  twSpeed: number; // twinkle speed
  twPhase: number;
}

// "#rrggbb" + alpha(0..1) -> "rgba(r,g,b,a)"
function rgba(hex: string, a: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

/**
 * Hero visual: the brand mark surrounded by a canvas particle field that swirls
 * around it, with a soft teal aura, a gentle float, and pointer parallax. All
 * motion is disabled under prefers-reduced-motion (a single static frame is
 * drawn instead). Decorative; desktop-only, matching the previous hero graphic.
 */
export function HeroLogo() {
  const [isLg, setIsLg] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { x, y } = useParallax(isLg);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let particles: Particle[] = [];

    const make = (): Particle => {
      const maxR = Math.min(w, h) * 0.46;
      return {
        angle: rand(0, Math.PI * 2),
        radius: rand(maxR * 0.18, maxR),
        speed: rand(0.0006, 0.0028) * (Math.random() < 0.5 ? -1 : 1),
        drift: rand(0, Math.PI * 2),
        driftAmp: rand(4, 22),
        size: rand(0.8, 2.6),
        alpha: rand(0.18, 0.6),
        color: COLORS[(Math.random() * COLORS.length) | 0],
        twSpeed: rand(0.008, 0.03),
        twPhase: rand(0, Math.PI * 2),
      };
    };

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(18, Math.round((w * h) / 6500));
      particles = Array.from({ length: count }, make);
    };

    const draw = () => {
      if (w === 0 || h === 0) return;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      for (const p of particles) {
        const r = p.radius + Math.sin(t * 0.02 + p.drift) * p.driftAmp;
        const px = cx + Math.cos(p.angle) * r;
        const py = cy + Math.sin(p.angle) * r * 0.86; // slight vertical squash
        const tw = 0.6 + 0.4 * Math.sin(t * p.twSpeed + p.twPhase);
        const a = p.alpha * tw;
        const glow = p.size * 3.2;

        const grad = ctx.createRadialGradient(px, py, 0, px, py, glow);
        grad.addColorStop(0, rgba(p.color, a));
        grad.addColorStop(1, rgba(p.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = rgba(p.color, Math.min(1, a + 0.15));
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      t += 1;
      for (const p of particles) p.angle += p.speed;
      draw();
      raf = requestAnimationFrame(step);
    };

    setup();
    if (reduce) draw();
    else raf = requestAnimationFrame(step);

    const onResize = () => {
      setup();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const px = x * 16;
  const py = y * 16;

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[560px]">
      {/* Soft teal aura behind the mark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(23,169,155,0.22) 0%, rgba(12,122,114,0.10) 42%, transparent 70%)",
          transform: `translate(-50%, -50%) translate(${px * 0.4}px, ${py * 0.4}px)`,
        }}
      />

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div
        className="absolute inset-0 grid place-items-center"
        style={{ transform: `translate(${px}px, ${py}px)` }}
      >
        <Image
          src="/logo.png"
          alt="Folionics"
          width={693}
          height={800}
          className="hero-float w-[210px] max-w-[64%] drop-shadow-[0_18px_50px_rgba(10,63,60,0.28)]"
        />
      </div>
    </div>
  );
}
