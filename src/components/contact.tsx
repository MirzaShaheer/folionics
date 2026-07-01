import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { studio } from "@/lib/data";

const contactLines = [
  {
    label: "Email",
    value: studio.email,
    href: `mailto:${studio.email}`,
    icon: (
      <path
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5zM4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "Phone / WhatsApp",
    value: studio.phone,
    href: `tel:${studio.phone.replace(/[^+\d]/g, "")}`,
    icon: (
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L16 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: "Studio",
    value: studio.locationDetail,
    href: null,
    icon: (
      <>
        <path
          d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-y bg-tint">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-title mt-4">Start a project.</h2>
          <p className="lead mt-5 max-w-md">
            Tell us where you’re headed. We’ll come back within one business day
            with clear next steps, no pressure and no sales theatre.
          </p>

          <ul className="mt-10 flex flex-col gap-6">
            {contactLines.map((line) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-teal/10 text-teal">
                    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                      {line.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-mono text-xs uppercase tracking-wider text-muted">
                      {line.label}
                    </span>
                    <span className="mt-0.5 block text-text">{line.value}</span>
                  </span>
                </>
              );

              return (
                <li key={line.label}>
                  {line.href ? (
                    <a
                      href={line.href}
                      className="group flex items-center gap-4 transition-colors hover:text-teal-deep"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
