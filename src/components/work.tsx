"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { projects, sectors } from "@/lib/data";
import type { Project, Sector } from "@/lib/types";

type Filter = Sector | "All";

export function Work() {
  const [active, setActive] = useState<Filter>("All");
  const filtered =
    active === "All"
      ? projects
      : projects.filter((project) => project.sector === active);

  return (
    <section id="work" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title mt-4">The folio.</h2>
          <p className="lead mt-5 max-w-xl">
            A cross-section of recent builds. Filter by sector to see how the
            work adapts to the job.
          </p>

          <div
            role="group"
            aria-label="Filter projects by sector"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {sectors.map((sector) => {
              const isActive = sector === active;
              return (
                <button
                  key={sector}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(sector)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-teal bg-teal text-white"
                      : "border-line bg-card text-muted hover:border-teal hover:text-teal-deep"
                  }`}
                >
                  {sector}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {filtered.map((project, i) => (
            <Reveal key={project.name} delay={i * 60}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      {/* Browser-frame thumbnail. TODO: swap this gradient placeholder for a
          real screenshot with next/image, e.g.
          <Image src={`/work/${slug}.jpg`} alt={`${project.name} homepage`}
                 fill sizes="(max-width:768px) 100vw, 50vw"
                 className="object-cover" /> inside a relative wrapper. */}
      <div
        className="relative overflow-hidden"
        style={{ background: "var(--frame)" }}
      >
        <div className="frame-bar">
          <div className="frame-dots">
            <span className="frame-dot" />
            <span className="frame-dot" />
            <span className="frame-dot" />
          </div>
          <span className="frame-url">{project.url}</span>
        </div>
        <div className="flex min-h-[190px] items-end p-6">
          <span className="font-serif text-3xl font-semibold text-on-deep transition-transform duration-300 group-hover:-translate-y-1">
            {project.name}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-wider text-teal">
            {project.sectorLabel}
          </p>
          {project.role ? (
            <span className="chip flex-none">{project.role}</span>
          ) : null}
        </div>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold">{project.name}</h3>
          <span className="font-mono text-sm text-muted">{project.year}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.services.map((service) => (
            <span key={service} className="chip">
              {service}
            </span>
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted">
          {project.highlight}
        </p>
      </div>
    </article>
  );
}
