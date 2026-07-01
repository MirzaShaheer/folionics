import { Reveal } from "@/components/reveal";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="section-y bg-tint">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="section-title mt-4 max-w-3xl">Services, in full.</h2>
          <p className="lead mt-5 max-w-xl">
            Six disciplines, one studio. We take a site from idea to something
            that keeps earning.
          </p>
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-card">
          {services.map((service, i) => (
            <Reveal
              key={service.number}
              delay={i * 60}
              className="border-t border-line first:border-t-0"
            >
              <a
                href="#contact"
                className="group block transition-colors duration-300 hover:bg-tint"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 p-6 sm:gap-6 sm:p-8">
                  <span className="font-mono text-sm text-teal">
                    {service.number}
                  </span>

                  <div className="transition-transform duration-300 group-hover:translate-x-2">
                    <h3 className="font-serif text-2xl">{service.title}</h3>
                    <p className="mt-2 max-w-xl text-muted">
                      {service.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-line text-text transition-all duration-300 group-hover:translate-x-1 group-hover:border-teal group-hover:bg-teal group-hover:text-white">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
