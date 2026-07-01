// Shared content types. Every section maps over typed arrays from data.ts,
// so copy and structure stay data-driven rather than hardcoded in JSX.

export type Sector =
  | "E-Commerce"
  | "Automotive"
  | "Real Estate"
  | "Industrial"
  | "Non-Profit";

export interface Project {
  /** Display name, e.g. "Luxframes" */
  name: string;
  /** Bare domain shown in the browser-frame chrome, e.g. "luxframes.com" */
  url: string;
  /** Primary sector, used by the work-grid filter chips */
  sector: Sector;
  /** Full descriptor, e.g. "E-Commerce / Luxury Fashion (UK)" */
  sectorLabel: string;
  /** Service chips shown on the card */
  services: string[];
  /** One scope-descriptor highlight line (not an invented metric) */
  highlight: string;
  /** Year the engagement shipped */
  year: number;
  /** Optional engagement tag, e.g. "Lead Dev" */
  role?: string;
}

export interface Service {
  /** Two-digit index, e.g. "01" */
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Plan {
  name: string;
  /** Formatted price, e.g. "$1,500" or "Custom" */
  price: string;
  /** Small line under the price, e.g. "one-time build" */
  cadence: string;
  tagline: string;
  features: string[];
  cta: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  /** Anonymized descriptor, not a real named client */
  name: string;
  role: string;
  /** Single letter for the gradient avatar */
  initial: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}
