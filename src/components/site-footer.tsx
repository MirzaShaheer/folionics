import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";
import { footerColumns, socials, studio } from "@/lib/data";
import type { SocialLink } from "@/lib/data";
import type { NavLink } from "@/lib/types";

const socialIcons: Record<SocialLink["icon"], ReactNode> = {
  x: (
    <path
      d="M4 4l16 16M20 4L4 20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  ),
  linkedin: (
    <>
      <path
        d="M5 8v9M5 5.5v.01M9.5 17v-5a2.5 2.5 0 0 1 5 0v5M9.5 17v-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  instagram: (
    <>
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        fill="none"
      />
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <circle cx="16.4" cy="7.6" r="1" fill="currentColor" />
    </>
  ),
  dribbble: (
    <>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" fill="none" />
      <path
        d="M5 9c5 0 9 1.5 12 5M8.5 4.5C13 9 15 14 15.5 19.5M20 11c-4-1-8-.5-12 1.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </>
  ),
  github: (
    <path
      d="M9 19c-4 1.2-4-2-6-2m12 4v-3.5c0-1 .3-1.7-.5-2.5 2.4-.3 4.5-1.2 4.5-5a4 4 0 0 0-1.1-2.8 3.7 3.7 0 0 0-.1-2.8s-1-.3-3.2 1.2a11 11 0 0 0-6 0C6.9 2.9 5.9 3.2 5.9 3.2a3.7 3.7 0 0 0-.1 2.8A4 4 0 0 0 4.7 8.8c0 3.8 2.1 4.7 4.5 5-.6.6-.6 1.2-.5 2.5V20"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

function FooterLink({ link }: { link: NavLink }) {
  const className =
    "text-sm text-on-deep-muted transition-colors hover:text-on-deep";
  if (link.href.startsWith("#")) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} className={className}>
      {link.label}
    </a>
  );
}

/** Deep-teal anchor footer with brand block, link columns, and a bottom bar. */
export function SiteFooter() {
  return (
    <footer className="bg-deep text-on-deep">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo variant="on-deep" />
            <p className="max-w-xs text-sm leading-relaxed text-on-deep-muted">
              {studio.oneLiner}
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-line-deep text-on-deep-muted transition-colors hover:border-on-deep hover:text-on-deep"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                      {socialIcons[social.icon]}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="font-mono text-xs uppercase tracking-wider text-on-deep-muted">
                {column.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line-deep pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-on-deep-muted">
            © 2026 {studio.name}. {studio.location}.
          </p>
          <Link
            href="#top"
            className="group inline-flex items-center gap-2 text-sm text-on-deep-muted transition-colors hover:text-on-deep"
          >
            Back to top
            <span className="grid h-7 w-7 place-items-center rounded-full border border-line-deep transition-transform duration-200 group-hover:-translate-y-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 19V5M6 11l6-6 6 6"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
