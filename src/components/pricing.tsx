import { Reveal } from "@/components/reveal";
import { Button } from "@/components/button";
import { plans } from "@/lib/data";

export function Pricing() {
  return (
    <section id="pricing" className="section-y bg-tint">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Pricing</p>
          <h2 className="section-title mt-4 max-w-3xl">
            Fixed pricing. No hourly fog.
          </h2>
          <p className="lead mt-5 max-w-xl">
            Clear scope, one number, agreed before we start.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3 items-start">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div
                className={
                  plan.featured
                    ? "card relative border-2 border-teal shadow-soft-lg lg:-translate-y-3"
                    : "card"
                }
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-grad text-white rounded-full px-3 py-1 text-xs font-mono uppercase tracking-wide">
                    Most popular
                  </span>
                ) : null}

                <div className="p-7 flex flex-col gap-5">
                  <p className="font-mono uppercase text-muted text-sm tracking-wide">
                    {plan.name}
                  </p>
                  <p
                    className={
                      plan.featured
                        ? "font-serif text-5xl text-gradient"
                        : "font-serif text-5xl"
                    }
                  >
                    {plan.price}
                  </p>
                  <p className="text-muted text-sm">{plan.cadence}</p>
                  <p className="text-muted">{plan.tagline}</p>

                  <div className="h-px bg-line" />

                  <ul className="flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <span className="text-teal shrink-0">
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
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href="#contact"
                    variant={plan.featured ? "solid" : "ghost"}
                    size="lg"
                    className="mt-2 w-full"
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Care plans from $450/mo. Every project starts with a free strategy
          call.
        </p>
      </div>
    </section>
  );
}
