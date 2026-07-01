import { Reveal } from "@/components/reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section id="testimonials" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Testimonials</p>
          <h2 className="section-title mt-4 max-w-3xl">What clients tell us.</h2>
          <p className="lead mt-5 max-w-xl">
            Placeholder quotes, honest about where they came from: sector and
            region, not names.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <Reveal key={testimonial.name} delay={i * 80}>
              <figure className="card flex h-full flex-col gap-5 p-7">
                <div className="flex gap-1 text-teal">
                  {Array.from({ length: 5 }).map((_, star) => (
                    <svg
                      key={star}
                      viewBox="0 0 20 20"
                      width="16"
                      height="16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.2l-4.95 2.6.95-5.5-4-3.9 5.53-.8z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg leading-relaxed text-text">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-grad font-serif text-lg text-white">
                    {testimonial.initial}
                  </div>
                  <div>
                    <div className="font-medium text-text">
                      {testimonial.name}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wide text-muted">
                      {testimonial.role}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
