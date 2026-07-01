"use client";

import { useEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/use-count-up";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * Renders a single number that counts up the first time it scrolls into view.
 * Shared by the hero stat row and the stats band.
 */
export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const display = useCountUp(value, active);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
