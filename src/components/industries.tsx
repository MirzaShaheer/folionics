import { Reveal } from "@/components/reveal";
import { industries } from "@/lib/data";

export function Industries() {
  return (
    <section id="industries" className="section-y bg-tint">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Industries</p>
          <h2 className="section-title mt-4 max-w-3xl">
            Built across 40+ industries.
          </h2>
          <p className="lead mt-5 max-w-xl">
            Different sectors, the same standard of work.
          </p>
        </Reveal>

        <Reveal>
          <ul className="mt-10 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <li
                key={industry}
                className="cursor-default rounded-full border border-line bg-card px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-teal hover:bg-teal hover:text-white"
              >
                {industry}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
