// ---------------------------------------------------------------------------
// Portfolio, grouped by stack (single source of truth for the Work section).
//
// Screenshots live in /public/work and are served locally. Each stack renders
// as a filter in the Work grid; each project is a browser-frame card that links
// out to the live site. Kept data-driven so adding a project is a one-line edit.
// ---------------------------------------------------------------------------

export interface WorkProject {
  /** Display title / bare domain, e.g. "aepower.pk" */
  title: string;
  /** Live site URL, opened in a new tab from the card */
  url: string;
  /** Local screenshot path under /public, e.g. "/work/aepower.png" */
  image: string;
  /** Descriptive alt text for the screenshot (accessibility) */
  alt: string;
}

export interface WorkStack {
  /** Stable id, used as the filter value and React key, e.g. "wordpress" */
  id: string;
  /** Stack display label, e.g. "WordPress" */
  title: string;
  /** One-line descriptor of the work built on this stack */
  description: string;
  /** Brand accent color for the stack */
  color: string;
  /** Optional extra note shown alongside the group */
  highlight?: string;
  /** Projects built on this stack */
  projects: WorkProject[];
}

export const workStacks: WorkStack[] = [
  {
    id: "wordpress",
    title: "WordPress",
    description: "Headless & custom WordPress builds",
    color: "#21759B",
    projects: [
      {
        title: "aepower.pk",
        url: "https://aepower.pk",
        image: "/work/aepower.png",
        alt: "AE Power homepage hero — Pakistan's No.1 Solar Brand with a technician installing solar panels",
      },
      {
        title: "emergen.io",
        url: "https://emergen.io",
        image: "/work/emergen.png",
        alt: "Emergen marketing site hero section",
      },
      {
        title: "brandonut.com",
        url: "https://brandonut.com",
        image: "/work/brandonut.png",
        alt: "Brandonut homepage with custom brand-led design",
      },
    ],
  },
  {
    id: "shopify",
    title: "Shopify",
    description: "High-converting Shopify storefronts",
    highlight: "We also build custom Shopify password pages.",
    color: "#96BF48",
    projects: [
      {
        title: "luxframes.com",
        url: "https://luxframes.com",
        image: "/work/luxframes.png",
        alt: "LuxFrames storefront showing rimless designer sunglasses in black, blue, green and solid black fades",
      },
      {
        title: "fireandpine.com",
        url: "https://fireandpine.com",
        image: "/work/fireandpine.png",
        alt: "Fire & Pine storefront featuring wooden map art and favorite collections",
      },
      {
        title: "letterart.com",
        url: "https://letterart.com",
        image: "/work/letterart.png",
        alt: "Letter Art storefront showcasing FAMILY, LOVE and BLESSED premade letter art best sellers",
      },
    ],
  },
  {
    id: "react",
    title: "React / Next.js",
    description: "Custom web apps & marketing sites",
    color: "#61DAFB",
    projects: [
      {
        title: "metroplexcustoms.com",
        url: "https://metroplexcustoms.com",
        image: "/work/metroplex.png",
        alt: "Metroplex Customs storefront showcasing custom automotive builds",
      },
      {
        title: "discofrogstudio.com",
        url: "https://discofrogstudio.com",
        image: "/work/discofrog.png",
        alt: "Disco Frog Studio site featuring a creative studio portfolio",
      },
      {
        title: "brain.net.pk",
        url: "https://brain.net.pk",
        image: "/work/brainnet.png",
        alt: "Brain.net.pk homepage for the Pakistan internet service provider",
      },
    ],
  },
  {
    id: "ai",
    title: "AI Integration",
    description: "LLM-powered features, agents, automations",
    color: "#C75C12",
    projects: [
      {
        title: "fourmula.ai",
        url: "https://fourmula.ai",
        image: "/work/fourmula.png",
        alt: "Fourmula.ai marketing site hero showcasing an AI-powered product experience",
      },
      {
        title: "functions.ai",
        url: "https://functions.ai",
        image: "/work/functions.png",
        alt: "Functions.ai homepage highlighting AI agents and automation workflows",
      },
      {
        title: "flownote.ai",
        url: "https://flownote.ai",
        image: "/work/flownote.png",
        alt: "Flownote.ai landing page featuring AI note-taking and meeting summaries",
      },
    ],
  },
];

/** Flattened project list with its stack context attached, for the work grid. */
export interface WorkCard extends WorkProject {
  stackId: string;
  stackTitle: string;
  stackDescription: string;
}

export const workCards: WorkCard[] = workStacks.flatMap((stack) =>
  stack.projects.map((project) => ({
    ...project,
    stackId: stack.id,
    stackTitle: stack.title,
    stackDescription: stack.description,
  })),
);
