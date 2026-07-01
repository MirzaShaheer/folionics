import { Reveal } from "@/components/reveal";
import { toolkit } from "@/lib/data";

export function Toolkit() {
  return (
    <section id="toolkit" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Stack</p>
          <h2 className="section-title mt-4 max-w-3xl">The toolkit.</h2>
          <p className="lead mt-5 max-w-xl">
            The tools we reach for, chosen because they hold up in production.
          </p>
        </Reveal>

        <Reveal className="mt-12 overflow-hidden rounded-2xl border border-line">
          <div
            className="grid gap-px bg-line"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))" }}
          >
            {toolkit.map((tech, i) => (
              <div
                key={tech}
                className="flex items-center gap-3 bg-card px-5 py-6 transition-colors hover:bg-tint"
              >
                <span className="font-mono text-xs text-teal">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg">{tech}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
