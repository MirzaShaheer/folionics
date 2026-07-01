import { marqueeItems } from "@/lib/data";

/**
 * Infinite horizontal marquee of services + tech. The track holds two copies of
 * the list so the -50% CSS animation loops seamlessly. Pauses on hover; halts
 * entirely under prefers-reduced-motion (handled in globals.css).
 */
export function Marquee() {
  const loop = [...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-label="Services and technologies"
      className="marquee overflow-hidden border-y border-line bg-tint py-5"
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {loop.map((item, i) => (
          <div
            key={`${item}-${i}`}
            aria-hidden={i >= marqueeItems.length ? true : undefined}
            className="flex items-center gap-8"
          >
            <span className="font-serif text-lg text-text/75">{item}</span>
            <span
              className="h-1.5 w-1.5 rounded-full bg-teal"
              aria-hidden="true"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
