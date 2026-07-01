"use client";

import { useEffect, useRef, useState } from "react";

export interface ParallaxPos {
  /** -1 (left) .. 1 (right) */
  x: number;
  /** -1 (top) .. 1 (bottom) */
  y: number;
}

/**
 * Tracks the pointer position relative to the viewport center and returns a
 * normalized offset. Disabled when `enabled` is false or the user prefers
 * reduced motion. rAF-throttled to stay cheap.
 */
export function useParallax(enabled = true): ParallaxPos {
  const [pos, setPos] = useState<ParallaxPos>({ x: 0, y: 0 });
  const frame = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        setPos({
          x: (event.clientX / window.innerWidth - 0.5) * 2,
          y: (event.clientY / window.innerHeight - 0.5) * 2,
        });
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  return pos;
}
