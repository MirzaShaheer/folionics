import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost";
type Size = "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** render as a plain <a> (new tab) instead of next/link */
  external?: boolean;
  /** style for placement on a deep-teal background */
  onDeep?: boolean;
  className?: string;
  "aria-label"?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:opacity-60";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

function variantClasses(variant: Variant, onDeep: boolean): string {
  if (onDeep) {
    return variant === "solid"
      ? "bg-on-deep text-deep shadow-soft hover:-translate-y-0.5 hover:bg-white"
      : "border border-[color:var(--line-deep)] text-on-deep hover:bg-white/10";
  }
  return variant === "solid"
    ? "bg-grad text-white shadow-soft hover:-translate-y-0.5 hover:shadow-soft-lg"
    : "border border-line text-text hover:border-teal hover:text-teal-deep";
}

/**
 * CTA link. Renders as next/link (internal / hash) or a plain <a> for external
 * targets, driven by the `external` prop.
 */
export function Button({
  href,
  children,
  variant = "solid",
  size = "md",
  external = false,
  onDeep = false,
  className = "",
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variantClasses(variant, onDeep)}${
    className ? ` ${className}` : ""
  }`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
