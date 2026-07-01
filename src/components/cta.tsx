import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { studio } from "@/lib/data";

/** Deep-teal anchor block: closing call to action with light text. */
export function Cta() {
  return (
    <section className="relative overflow-hidden bg-deep text-on-deep">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 0%, rgba(23,169,155,0.28), transparent 70%)",
        }}
      />
      <div className="container-x section-y relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-teal-hi">Start a project</p>
          <h2 className="section-title mt-5 text-on-deep">
            Let’s build a website that earns its place.
          </h2>
          <p className="lead mx-auto mt-5 max-w-xl text-on-deep-muted">
            Tell us where you’re headed. We bring the plan, the design, and the
            code to get you there, on a schedule that holds.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#contact" size="lg" onDeep>
              Start a project
            </Button>
            <Button
              href={`mailto:${studio.email}`}
              size="lg"
              variant="ghost"
              onDeep
              external
            >
              Email the studio
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
