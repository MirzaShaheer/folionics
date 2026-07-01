import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  /** "on-deep" tints the wordmark light for the deep-teal footer */
  variant?: "default" | "on-deep";
  className?: string;
}

/**
 * Brand mark (the teal "F" leaf glyph, served from /logo.png) plus the
 * lowercase wordmark. The wrapping link is labelled, so the image is
 * decorative (empty alt) to avoid a duplicate announcement.
 */
export function Logo({ variant = "default", className = "" }: LogoProps) {
  const word = variant === "on-deep" ? "text-on-deep" : "text-text";

  return (
    <Link
      href="#top"
      aria-label="Folionics, back to top"
      className={`group inline-flex items-center gap-2.5${className ? ` ${className}` : ""}`}
    >
      <Image
        src="/logo.png"
        alt=""
        width={476}
        height={384}
        className="h-9 w-auto transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span
        className={`font-serif text-[1.3rem] font-semibold tracking-[-0.03em] ${word}`}
      >
        folionics
      </span>
    </Link>
  );
}
