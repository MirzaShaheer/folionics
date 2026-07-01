"use client";

import { useEffect, useState } from "react";
import { useParallax } from "@/hooks/use-parallax";
import { heroStack } from "@/lib/data";

// Base fan layout for the three overlapping browser-frame cards, plus a depth
// multiplier so each card drifts a different amount with the pointer.
const layout = [
  { x: -46, y: 34, rotate: -8, depth: 26 },
  { x: 0, y: 0, rotate: -1, depth: 15 },
  { x: 58, y: -30, rotate: 7, depth: 8 },
];

/**
 * Desktop-only signature element: a parallax stack of portfolio cards that
 * shift with the pointer at different depths. Decorative (aria-hidden) since
 * the same projects are listed accessibly in the Work section.
 */
export function HeroStack() {
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { x, y } = useParallax(isLg);

  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[560px]" aria-hidden="true">
      {heroStack.map((project, i) => {
        const base = layout[i];
        const transform = `translate(-50%, -50%) translate(${
          base.x + x * base.depth
        }px, ${base.y + y * base.depth}px) rotate(${
          base.rotate + x * 1.4
        }deg)`;

        return (
          <div
            key={project.name}
            className="frame absolute left-1/2 top-1/2 w-[320px] transition-transform duration-300 ease-out will-change-transform"
            style={{ transform, zIndex: i + 1 }}
          >
            <div className="frame-bar">
              <div className="frame-dots">
                <span className="frame-dot" />
                <span className="frame-dot" />
                <span className="frame-dot" />
              </div>
              <span className="frame-url">{project.url}</span>
            </div>
            <div className="flex flex-col justify-between p-6" style={{ minHeight: "220px" }}>
              <span className="w-fit rounded-full border border-line-deep px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-on-deep-muted">
                {project.sector}
              </span>
              <div>
                <p className="font-serif text-3xl font-semibold leading-tight text-on-deep">
                  {project.name}
                </p>
                <p className="mt-1 font-mono text-xs text-on-deep-muted">
                  {project.services.slice(0, 2).join(" · ")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
