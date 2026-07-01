"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { workStacks, workCards, type WorkCard } from "@/lib/projects";

type Filter = "all" | string;

// "All" plus one chip per stack, driven off the data so new stacks show up here.
const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...workStacks.map((stack) => ({ id: stack.id, label: stack.title })),
];

// Coverflow tuning. Offsets beyond MAX_VISIBLE are hidden so a long list stays
// cheap. Values are unit-independent (translateX is a % of the card's own
// width) so the layout is responsive without measuring the DOM.
const STEP_X = 58; // % of card width each neighbour is pushed sideways
const ROTATE = 34; // deg of Y-rotation per step (the 3D fan)
const SCALE_STEP = 0.14; // shrink per step
const OPACITY_STEP = 0.22; // fade per step
const MAX_VISIBLE = 2; // render window on each side of centre
const TILT_MAX_X = 10; // deg of pointer tilt (vertical axis)
const TILT_MAX_Y = 14; // deg of pointer tilt (horizontal axis)
const SWIPE_MIN = 44; // px drag before it counts as a swipe
const DRAG_SLOP = 8; // px before a press is treated as a drag
const AUTOPLAY_MS = 5000;

export function Work() {
  const [active, setActive] = useState<Filter>("all");
  const filtered =
    active === "all"
      ? workCards
      : workCards.filter((card) => card.stackId === active);

  const [index, setIndex] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [paused, setPaused] = useState(false);
  const [reduce, setReduce] = useState(false);

  const len = filtered.length;
  const goTo = useCallback(
    (n: number) => setIndex(Math.max(0, Math.min(len - 1, n))),
    [len],
  );
  const next = useCallback(
    () => setIndex((n) => Math.min(len - 1, n + 1)),
    [len],
  );
  const prev = useCallback(() => setIndex((n) => Math.max(0, n - 1)), []);

  // Changing the filter resets the deck to the first slide and clears any tilt.
  // Done here (the only place `active` changes) rather than in an effect.
  const selectFilter = (id: Filter) => {
    setActive(id);
    setIndex(0);
    setTilt({ rx: 0, ry: 0 });
  };

  // Honour prefers-reduced-motion for the pointer tilt + autoplay.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Autoplay, ping-ponging at the ends so there is never a hard rewind jump.
  const dirRef = useRef(1);
  useEffect(() => {
    if (reduce || paused || len <= 1) return;
    const id = window.setInterval(() => {
      setIndex((n) => {
        let d = dirRef.current;
        let nx = n + d;
        if (nx > len - 1) {
          d = -1;
          nx = n - 1;
        } else if (nx < 0) {
          d = 1;
          nx = n + 1;
        }
        dirRef.current = d;
        return nx;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduce, paused, len]);

  // Pointer/drag tracking for swipe. Shared with the card click handler so a
  // drag never fires the link.
  const drag = useRef({ startX: 0, moved: false, active: false });

  const onPointerDown = (e: ReactPointerEvent) => {
    drag.current = { startX: e.clientX, moved: false, active: true };
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (!drag.current.active) return;
    if (Math.abs(e.clientX - drag.current.startX) > DRAG_SLOP) {
      drag.current.moved = true;
    }
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.active = false;
    if (drag.current.moved && Math.abs(dx) > SWIPE_MIN) {
      if (dx < 0) next();
      else prev();
    }
  };

  // Pointer tilt on the centred card only.
  const handleTiltMove = (e: ReactMouseEvent) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * TILT_MAX_X, ry: px * TILT_MAX_Y });
  };
  const handleTiltLeave = () => setTilt({ rx: 0, ry: 0 });

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  return (
    <section id="work" className="section-y bg-bg">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h2 className="section-title mt-4">The folio.</h2>
          <p className="lead mt-5 max-w-xl">
            A cross-section of recent builds across WordPress, Shopify, React,
            and AI. Filter by stack, then swipe or drag through the deck.
          </p>

          <div
            role="group"
            aria-label="Filter projects by stack"
            className="mt-8 flex flex-wrap gap-2.5"
          >
            {filters.map((filter) => {
              const isActive = filter.id === active;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => selectFilter(filter.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-teal bg-teal text-white"
                      : "border-line bg-card text-muted hover:border-teal hover:text-teal-deep"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Selected work"
          onKeyDown={onKeyDown}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-10"
        >
          <div
            className="work-slider h-[430px] touch-pan-y select-none sm:h-[480px] lg:h-[520px]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current.active = false)}
          >
            {filtered.map((card, i) => {
              const offset = i - index;
              const abs = Math.abs(offset);
              const isCenter = offset === 0;
              const hidden = abs > MAX_VISIBLE;

              const slideStyle: CSSProperties = {
                transform: `translate(-50%, -50%) translateX(${offset * STEP_X}%) rotateY(${-offset * ROTATE}deg) scale(${1 - abs * SCALE_STEP})`,
                opacity: hidden ? 0 : 1 - abs * OPACITY_STEP,
                zIndex: 50 - abs,
                visibility: hidden ? "hidden" : "visible",
                pointerEvents: hidden ? "none" : "auto",
              };

              return (
                <div
                  key={card.title}
                  className="work-slide w-[86vw] max-w-[520px] sm:w-[460px] lg:w-[500px]"
                  style={slideStyle}
                  aria-hidden={!isCenter}
                >
                  <ProjectCard
                    card={card}
                    isCenter={isCenter}
                    tilt={isCenter ? tilt : ZERO_TILT}
                    priority={i < 2}
                    onCenterMove={isCenter ? handleTiltMove : undefined}
                    onCenterLeave={isCenter ? handleTiltLeave : undefined}
                    onActivate={(e) => {
                      // A pointer drag (detail > 0) never opens the link.
                      // Keyboard activation has detail 0, so it is unaffected.
                      if (e.detail > 0 && drag.current.moved) {
                        e.preventDefault();
                        drag.current.moved = false;
                        return;
                      }
                      // Tapping a side card just brings it to the centre.
                      if (!isCenter) {
                        e.preventDefault();
                        goTo(i);
                      }
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Controls: prev / dots / next */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <SliderButton
              label="Previous project"
              disabled={index === 0}
              onClick={prev}
              dir="left"
            />

            <div
              className="flex items-center gap-2"
              role="group"
              aria-label="Choose project"
            >
              {filtered.map((card, i) => {
                const isActive = i === index;
                return (
                  <button
                    key={card.title}
                    type="button"
                    aria-label={`Go to ${card.title}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-7 bg-teal"
                        : "w-2.5 bg-line hover:bg-teal-deep/50"
                    }`}
                  />
                );
              })}
            </div>

            <SliderButton
              label="Next project"
              disabled={index === len - 1}
              onClick={next}
              dir="right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const ZERO_TILT = { rx: 0, ry: 0 };

function ProjectCard({
  card,
  isCenter,
  tilt,
  priority,
  onCenterMove,
  onCenterLeave,
  onActivate,
}: {
  card: WorkCard;
  isCenter: boolean;
  tilt: { rx: number; ry: number };
  priority: boolean;
  onCenterMove?: (e: ReactMouseEvent) => void;
  onCenterLeave?: () => void;
  onActivate: (e: ReactMouseEvent) => void;
}) {
  return (
    <a
      href={card.url}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={isCenter ? 0 : -1}
      aria-label={`${card.title} — open live site in a new tab`}
      onClick={onActivate}
      onMouseMove={onCenterMove}
      onMouseLeave={onCenterLeave}
      style={{
        transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="work-tilt card group block overflow-hidden hover:shadow-soft-lg"
    >
      {/* Browser-frame thumbnail with the real screenshot. */}
      <div className="relative" style={{ background: "var(--frame)" }}>
        <div className="frame-bar">
          <div className="frame-dots">
            <span className="frame-dot" />
            <span className="frame-dot" />
            <span className="frame-dot" />
          </div>
          <span className="frame-url">{card.title}</span>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={card.image}
            alt={card.alt}
            fill
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 460px, 500px"
            priority={priority}
            draggable={false}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="chip flex-none">{card.stackTitle}</span>
          <span
            aria-hidden="true"
            className="grid h-9 w-9 flex-none place-items-center rounded-full border border-line text-text transition-all duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
              <path
                d="M7 17 17 7M9 7h8v8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <h3 className="mt-3 font-serif text-xl font-semibold">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {card.stackDescription}
        </p>
      </div>
    </a>
  );
}

function SliderButton({
  label,
  disabled,
  onClick,
  dir,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  dir: "left" | "right";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid h-11 w-11 flex-none place-items-center rounded-full border border-line bg-card text-text transition-all duration-300 hover:border-teal hover:bg-teal hover:text-white disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-line disabled:hover:bg-card disabled:hover:text-text"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true">
        <path
          d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
