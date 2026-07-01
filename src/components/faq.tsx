"use client";

import { useState } from "react";
import { Reveal } from "@/components/reveal";
import { faqs } from "@/lib/data";

/**
 * Accordion, one item open at a time. Height animates via the
 * grid-template-rows 0fr -> 1fr technique; the plus icon morphs to a minus by
 * collapsing its vertical bar.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 className="section-title mt-4">Questions, answered.</h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="border-y border-line">
            {faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className="border-b border-line last:border-b-0">
                  <h3>
                    <button
                      type="button"
                      id={`faq-trigger-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-5 py-5 text-left"
                    >
                      <span className="font-serif text-lg font-medium sm:text-xl">
                        {faq.question}
                      </span>
                      <span className="relative grid h-8 w-8 flex-none place-items-center rounded-full border border-line text-teal transition-colors">
                        <span className="absolute h-0.5 w-3.5 rounded bg-current" />
                        <span
                          className={`absolute h-3.5 w-0.5 rounded bg-current transition-transform duration-300 ${
                            isOpen ? "scale-y-0" : "scale-y-100"
                          }`}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    inert={!isOpen ? true : undefined}
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-6 pr-8 leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
