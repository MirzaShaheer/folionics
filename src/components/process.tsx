import { Reveal } from "@/components/reveal";
import { processSteps } from "@/lib/data";

export function Process() {
  return (
    <section id="process" className="section-y bg-tint">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Process</p>
          <h2 className="section-title mt-4 max-w-3xl">
            Five steps, refined over eight years.
          </h2>
          <p className="lead mt-5 max-w-xl">
            A rhythm that keeps projects moving without the guesswork.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 70}>
              <div className="card p-6 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-teal">{step.number}</span>
                  <span className="rounded-full grid place-items-center h-6 w-6 bg-teal/10 text-teal">
                    <svg
                      viewBox="0 0 20 20"
                      width="14"
                      height="14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4.5 10.5l3.4 3.4L15.5 6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="font-serif text-xl">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
