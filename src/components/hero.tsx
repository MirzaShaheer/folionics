import { Button } from "@/components/button";
import { StatCounter } from "@/components/stat-counter";
import { HeroLogo } from "@/components/hero-logo";
import { heroStats } from "@/lib/data";

/**
 * Hero: server shell (copy, buttons, stat row). The particle-effect brand mark
 * and the count-up numbers are the only client pieces.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg pt-28 pb-16 sm:pt-32 lg:min-h-screen lg:pt-40 lg:pb-24"
    >
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-medium text-muted shadow-soft">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-teal-hi" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            <span className="font-mono uppercase tracking-wider">
              Open for new projects · 2026
            </span>
          </span>

          <h1 className="mt-7 font-serif text-[clamp(2.5rem,6.2vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-text">
            We build websites that{" "}
            <em className="text-gradient italic">earn their place</em>.
          </h1>

          <p className="lead mt-6 max-w-xl">
            A Dallas studio building fast, considered websites for teams
            worldwide. Design, development, e-commerce, and the care to keep
            them sharp long after launch.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" size="lg">
              Start a project
            </Button>
            <Button href="#work" size="lg" variant="ghost">
              See the work
            </Button>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6 sm:gap-x-14">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <StatCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    className="font-serif text-[2.5rem] font-semibold leading-none tracking-tight text-text"
                  />
                  <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hidden lg:block">
          <HeroLogo />
        </div>
      </div>

      {/* Scroll cue, pinned bottom-left (lg only) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block">
        <div className="container-x">
          <span className="eyebrow cue-bob">
            Scroll
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 5v14M6 13l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </section>
  );
}
