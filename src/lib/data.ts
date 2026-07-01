import type {
  Faq,
  FooterColumn,
  NavLink,
  Plan,
  ProcessStep,
  Project,
  Sector,
  Service,
  Stat,
  Testimonial,
} from "./types";

// ---------------------------------------------------------------------------
// Studio facts (single source of truth for contact + brand copy)
// ---------------------------------------------------------------------------

export const studio = {
  name: "Folionics",
  tagline: "We build websites that earn their place.",
  oneLiner:
    "A lean web design and development studio in Dallas, building considered, fast websites for teams worldwide.",
  email: "hello@folionics.com",
  phone: "+1 (409) 269-4928",
  location: "Dallas, Texas",
  locationDetail: "Dallas, Texas · working worldwide",
  yearsBuilding: 8,
  projectsShipped: "120+",
} as const;

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

export const navLinks: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const heroStats: Stat[] = [
  { value: 8, label: "Years building" },
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 40, suffix: "+", label: "Industries" },
];

// ---------------------------------------------------------------------------
// Marquee (services + tech, looped)
// ---------------------------------------------------------------------------

export const marqueeItems: string[] = [
  "Web Design",
  "Next.js",
  "Shopify Plus",
  "SEO & Growth",
  "Headless Commerce",
  "AI Integration",
  "React",
  "Performance",
  "WordPress",
  "Technical SEO",
  "WooCommerce",
  "Motion Design",
  "Sanity CMS",
  "Stripe",
  "Web Development",
];

// ---------------------------------------------------------------------------
// Stats band
// ---------------------------------------------------------------------------

export const bandStats: Stat[] = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 90, suffix: "+", label: "Clients served" },
  { value: 8, label: "Years building" },
  { value: 40, suffix: "+", label: "Industries" },
];

// ---------------------------------------------------------------------------
// Services (spec-sheet rows)
// ---------------------------------------------------------------------------

export const services: Service[] = [
  {
    number: "01",
    title: "Web Design",
    description:
      "Interface and brand systems drawn for the work they have to do. Clear hierarchy, real content, and a look that holds up past the launch screenshot.",
    tags: ["UI Systems", "Art Direction", "Prototyping", "Design Ops"],
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Hand-built front ends on Next.js and React, wired to whatever backend the job needs. Fast, accessible, and easy for your team to keep running.",
    tags: ["Next.js", "React", "TypeScript", "Headless"],
  },
  {
    number: "03",
    title: "E-Commerce",
    description:
      "Storefronts that sell without friction. Shopify Plus, headless builds, and WooCommerce, tuned for conversion, subscriptions, and clean operations.",
    tags: ["Shopify Plus", "Headless", "WooCommerce", "Subscriptions"],
  },
  {
    number: "04",
    title: "SEO & Growth",
    description:
      "Technical foundations and content systems that compound. We fix what search engines choke on and build pages that keep earning traffic.",
    tags: ["Technical SEO", "Content", "Core Web Vitals", "Analytics"],
  },
  {
    number: "05",
    title: "AI Integration",
    description:
      "Practical AI where it removes real work. Assistants, search, and content tooling built on the current Claude and OpenAI models, shipped responsibly.",
    tags: ["Assistants", "RAG", "Automation", "Content Tooling"],
  },
  {
    number: "06",
    title: "Care & Hosting",
    description:
      "The part most studios skip. Monitored hosting, security, backups, and a standing line for changes so your site never drifts into neglect.",
    tags: ["Managed Hosting", "Monitoring", "Backups", "Retainers"],
  },
];

// ---------------------------------------------------------------------------
// Work / portfolio
// ---------------------------------------------------------------------------

export const sectors: (Sector | "All")[] = [
  "All",
  "E-Commerce",
  "Automotive",
  "Real Estate",
  "Industrial",
  "Non-Profit",
];

export const projects: Project[] = [
  {
    name: "Luxframes",
    url: "luxframes.com",
    sector: "E-Commerce",
    sectorLabel: "E-Commerce / Luxury Fashion (UK)",
    services: ["Shopify Plus", "Headless", "Subscriptions"],
    highlight: "Headless Plus rebuild & subscriptions",
    year: 2024,
    role: "Lead Dev",
  },
  {
    name: "Metroplex Customs",
    url: "metroplexcustoms.com",
    sector: "Automotive",
    sectorLabel: "Automotive / Custom Shop (Dallas)",
    services: ["Web Design", "Next.js", "Performance"],
    highlight: "Full Next.js rebuild & migration",
    year: 2024,
  },
  {
    name: "JCK Batch Plant",
    url: "jckbatch.net",
    sector: "Industrial",
    sectorLabel: "Industrial / Ready-Mix Concrete (DFW)",
    services: ["Web Design", "Quote System", "SEO"],
    highlight: "Quote dashboard + full redesign",
    year: 2023,
  },
  {
    name: "Thayvie",
    url: "thayvie.com",
    sector: "E-Commerce",
    sectorLabel: "E-Commerce / Wellness",
    services: ["Shopify", "UX", "Collections"],
    highlight: "Intent-based collections overhaul",
    year: 2025,
  },
  {
    name: "Heartland Auction & Realty",
    url: "bid573.com",
    sector: "Real Estate",
    sectorLabel: "Real Estate / Auctions (Missouri)",
    services: ["Web", "SEO", "Content"],
    highlight: "SEO + content system rebuild",
    year: 2023,
  },
  {
    name: "Save Cambodia",
    url: "savecambodia.org",
    sector: "Non-Profit",
    sectorLabel: "Non-Profit / Human Rights (Cambodia)",
    services: ["Web Design", "Khmer UX", "Motion"],
    highlight: "Khmer-first landing & story arc",
    year: 2024,
  },
  {
    name: "Primetime Research",
    url: "primetimeresearch.shop",
    sector: "E-Commerce",
    sectorLabel: "E-Commerce / Regulated Niche (US)",
    services: ["WooCommerce", "Technical SEO", "Compliance"],
    highlight: "Compliance-first store & SEO",
    year: 2025,
  },
];

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "We dig into the business, the audience, and the numbers before touching a canvas. No project starts on a guess.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Structure first, then surface. We design with real content and ship interactive prototypes you can click, not just admire.",
  },
  {
    number: "03",
    title: "Build",
    description:
      "Clean, typed code on a modern stack. Accessible, fast, and documented so your team is never locked out of its own site.",
  },
  {
    number: "04",
    title: "Launch",
    description:
      "Careful migrations, redirects that hold, and analytics wired from day one. We sweat the launch so you do not have to.",
  },
  {
    number: "05",
    title: "Iterate",
    description:
      "Launch is the start line. We measure, refine, and keep shipping improvements on a schedule that fits your growth.",
  },
];

// ---------------------------------------------------------------------------
// Toolkit
// ---------------------------------------------------------------------------

export const toolkit: string[] = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "WordPress",
  "Shopify",
  "WooCommerce",
  "Tailwind",
  "Sanity",
  "Stripe",
  "Vercel",
  "Figma",
  "OpenAI",
  "Anthropic",
  "Ahrefs",
];

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export const plans: Plan[] = [
  {
    name: "Launch",
    price: "$1,500",
    cadence: "one-time build",
    tagline: "A sharp, single-page site to get a real business online fast.",
    features: [
      "One-page marketing site",
      "Custom design, no template",
      "Mobile-first and accessible",
      "Basic SEO and analytics",
      "Two rounds of revisions",
      "Two-week turnaround",
    ],
    cta: "Start with Launch",
  },
  {
    name: "Growth",
    price: "$4,500",
    cadence: "project build",
    tagline: "A full multi-page site with the depth a growing team needs.",
    features: [
      "Up to eight custom pages",
      "CMS so you can edit content",
      "Advanced SEO foundation",
      "Performance and Core Web Vitals",
      "Copy and content support",
      "Analytics and event tracking",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "scoped per engagement",
    tagline: "E-commerce, apps, and platform work priced to the actual scope.",
    features: [
      "E-commerce and headless builds",
      "Custom app and platform work",
      "AI features and integrations",
      "Migrations from legacy stacks",
      "Ongoing product partnership",
      "Priority care and support",
    ],
    cta: "Scope a project",
  },
];

// ---------------------------------------------------------------------------
// Testimonials (placeholders, attributed to sector/region only)
// ---------------------------------------------------------------------------

export const testimonials: Testimonial[] = [
  {
    quote:
      "They rebuilt our storefront without the usual drama. Clean handoff, a faster site, and a team that actually answered when it mattered.",
    name: "Luxury Retail Client",
    role: "E-Commerce · United Kingdom",
    initial: "L",
  },
  {
    quote:
      "The new site finally looks like the shop feels. Folionics understood the work before they designed a single screen.",
    name: "Custom Shop Client",
    role: "Automotive · Dallas",
    initial: "M",
  },
  {
    quote:
      "Our old site was invisible. The rebuild fixed the plumbing and the search traffic followed. No fluff, no hourly surprises.",
    name: "Auction House Client",
    role: "Real Estate · Missouri",
    initial: "H",
  },
];

// ---------------------------------------------------------------------------
// Industries
// ---------------------------------------------------------------------------

export const industries: string[] = [
  "E-Commerce",
  "Automotive",
  "Real Estate",
  "Industrial",
  "Non-Profit",
  "Wellness",
  "Hospitality",
  "Construction",
  "Legal",
  "Healthcare",
  "Fitness",
  "Fashion",
  "Manufacturing",
  "Auctions",
  "SaaS",
  "Restaurants",
  "Education",
  "Logistics",
];

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export const faqs: Faq[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "A single-page Launch build ships in about two weeks. A full Growth site runs four to eight weeks depending on scope and how fast content lands. We set the schedule up front and hold to it.",
  },
  {
    question: "Do you work with clients outside of Dallas?",
    answer:
      "Yes. We are based in Dallas and work with teams worldwide. Most of our projects run remotely with a clear rhythm of calls, shared docs, and clickable previews.",
  },
  {
    question: "What does the pricing actually include?",
    answer:
      "Fixed project pricing covers strategy, design, build, and launch. No hourly fog. Anything outside the agreed scope is quoted before we start it, so there are no surprise invoices.",
  },
  {
    question: "Can you rebuild or migrate our existing site?",
    answer:
      "Often that is exactly the job. We handle migrations from WordPress, Wix, Squarespace, and custom stacks, keep your URLs and rankings intact, and set up redirects so nothing breaks.",
  },
  {
    question: "Do you handle hosting and ongoing maintenance?",
    answer:
      "We do. Care plans start at $450 a month and cover managed hosting, monitoring, security, backups, and a standing line for changes. You are never left maintaining a site you cannot touch.",
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "A short call to align on goals, whatever brand assets and content you already have, and one decision-maker on your side. We handle the rest and keep the process light.",
  },
];

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Web Design", href: "#services" },
      { label: "Web Development", href: "#services" },
      { label: "E-Commerce", href: "#services" },
      { label: "SEO & Growth", href: "#services" },
      { label: "AI Integration", href: "#services" },
      { label: "Care & Hosting", href: "#services" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Work", href: "#work" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: "mailto:hello@folionics.com" },
      { label: "WhatsApp", href: "#contact" },
    ],
  },
];

export interface SocialLink {
  label: string;
  href: string;
  /** icon key resolved in site-footer */
  icon: "x" | "linkedin" | "instagram" | "dribbble" | "github";
}

export const socials: SocialLink[] = [
  { label: "X", href: "#", icon: "x" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Dribbble", href: "#", icon: "dribbble" },
  { label: "GitHub", href: "#", icon: "github" },
];
