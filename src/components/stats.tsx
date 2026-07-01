import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import { bandStats } from "@/lib/data";

/**
 * Stats band: a 4-cell bordered grid with big teal-gradient numbers that count
 * up on scroll. The gap-px on a line-colored background renders the hairlines.
 */
export function Stats() {
  return (
    <section className="bg-bg">
      <div className="container-x section-y">
        <Reveal>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {bandStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card p-7 sm:p-9"
              >
                <StatCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="text-gradient font-serif text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-tight"
                />
                <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
