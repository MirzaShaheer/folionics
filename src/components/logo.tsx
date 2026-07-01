import Link from "next/link";

interface LogoProps {
  /** "on-deep" tints the wordmark light for the deep-teal footer */
  variant?: "default" | "on-deep";
  className?: string;
}

/**
 * Gradient rounded-square mark with a "stacked pages" glyph (two offset rounded
 * rects) plus the lowercase wordmark.
 */
export function Logo({ variant = "default", className = "" }: LogoProps) {
  const word = variant === "on-deep" ? "text-on-deep" : "text-text";

  return (
    <Link
      href="#top"
      aria-label="Folionics, back to top"
      className={`group inline-flex items-center gap-2.5${className ? ` ${className}` : ""}`}
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-grad shadow-soft transition-transform duration-300 group-hover:-translate-y-0.5">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="3"
            y="5.5"
            width="9.5"
            height="11.5"
            rx="2.3"
            fill="#ffffff"
            fillOpacity="0.55"
          />
          <rect
            x="7.5"
            y="3"
            width="9.5"
            height="11.5"
            rx="2.3"
            fill="#ffffff"
          />
        </svg>
      </span>
      <span
        className={`font-serif text-[1.3rem] font-semibold tracking-[-0.03em] ${word}`}
      >
        folionics
      </span>
    </Link>
  );
}
