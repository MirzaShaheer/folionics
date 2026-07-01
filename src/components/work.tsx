"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { workStacks, workCards, type WorkCard } from "@/lib/projects";

type Filter = "all" | string;

// "All" plus one chip per stack, driven off the data so new stacks show up here.
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...workStacks.map((stack) => ({ id: stack.id, label: stack.title })),
];

export function Work() {
  const [active, setActive] = useState<Filter>("all");
  const filtered =
    active === "all"
      ? workCards
      : workCards.filter((card) => card.stackId === active);

  return (
    <section id="work" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title mt-4">The folio.</h2>
          <p className="lead mt-5 max-w-xl">
            A cross-section of recent builds across WordPress, Shopify, React,
            and AI. Filter by stack to see how the work adapts to the tools.
          </p>

          <div
            role="group"
            aria-label="Filter projects by stack"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {filters.map((filter) => {
              const isActive = filter.id === active;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(filter.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-teal bg-teal text-white"
                      : "border-line bg-card text-muted hover:border-teal hover:text-teal-deep"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((card, i) => (
            <Reveal key={card.title} delay={i * 60}>
              <ProjectCard card={card} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  card,
  priority,
}: {
  card: WorkCard;
  priority: boolean;
}) {
  return (
    <a
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${card.title} — open live site in a new tab`}
      className="group card block overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
    >
      {/* Browser-frame thumbnail with the real screenshot. */}
      <div className="relative" style={{ background: "var(--frame)" }}>
        <div className="frame-bar">
          <div className="frame-dots">
            <span className="frame-dot" />
            <span className="frame-dot" />
            <span className="frame-dot" />
          </div>
          <span className="frame-url">{card.title}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={priority}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="chip flex-none">{card.stackTitle}</span>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full border border-line text-text transition-all duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {card.stackDescription}
        </p>
      </div>
    </a>
  );
}
