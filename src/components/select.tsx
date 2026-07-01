"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

interface SelectProps {
  /** id for the trigger, referenced by the external label's aria wiring */
  id: string;
  /** form field name; mirrored to a hidden input so it posts with the form */
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  required?: boolean;
  /** id of the external label element, for aria-labelledby */
  labelledBy?: string;
}

/**
 * Accessible select-only combobox (WAI-ARIA listbox pattern) styled to match
 * the site. Focus stays on the trigger; the highlighted option is tracked with
 * aria-activedescendant. Supports arrow/Home/End/Enter/Escape, type-ahead,
 * click-outside, and pointer selection.
 */
export function Select({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = "Select one",
  required,
  labelledBy,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const typeahead = useRef({ buffer: "", time: 0 });
  const listId = useId();
  const optionId = (i: number) => `${listId}-opt-${i}`;
  const selectedIndex = options.indexOf(value);

  // Close when a pointer press lands outside the component.
  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // Keep the highlighted option in view while navigating a long list.
  useEffect(() => {
    if (!open || active < 0) return;
    const node = listRef.current?.children[active] as HTMLElement | undefined;
    node?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  const openMenu = (toIndex: number) => {
    setActive(toIndex < 0 ? 0 : toIndex);
    setOpen(true);
  };

  const choose = (index: number) => {
    if (index < 0 || index >= options.length) return;
    onChange(options[index]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  const onKeyDown = (event: ReactKeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openMenu(selectedIndex);
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openMenu(selectedIndex >= 0 ? selectedIndex : options.length - 1);
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (!open) openMenu(selectedIndex);
        else choose(active);
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        if (open) setOpen(false);
        break;
      default: {
        // Type-ahead: jump to the first option matching recent keystrokes.
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
          const now = Date.now();
          const state = typeahead.current;
          if (now - state.time > 600) state.buffer = "";
          state.time = now;
          state.buffer += event.key.toLowerCase();
          const match = options.findIndex((option) =>
            option.toLowerCase().startsWith(state.buffer),
          );
          if (match >= 0) {
            if (open) setActive(match);
            else openMenu(match);
          }
        }
      }
    }
  };

  return (
    <div className="relative" ref={rootRef}>
      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={labelledBy ? `${labelledBy} ${id}` : undefined}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-required={required || undefined}
        onClick={() => (open ? setOpen(false) : openMenu(selectedIndex))}
        onKeyDown={onKeyDown}
        className={`flex w-full items-center justify-between gap-2 rounded-xl border bg-bg px-4 py-3 text-left text-sm outline-none transition-colors ${
          open
            ? "border-teal ring-2 ring-teal/20"
            : "border-line hover:border-teal/60"
        } focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/20`}
      >
        <span className={value ? "text-text" : "text-muted"}>
          {value || placeholder}
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`flex-none text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-labelledby={labelledBy}
          className="select-pop absolute inset-x-0 z-30 mt-2 max-h-64 select-none overflow-auto rounded-xl border border-line bg-card p-1.5 shadow-soft-lg"
        >
          {options.map((option, i) => {
            const isSelected = option === value;
            const isActive = i === active;
            return (
              <li
                key={option}
                id={optionId(i)}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-tint" : ""
                } ${isSelected ? "font-medium text-teal-deep" : "text-text"}`}
              >
                <span>{option}</span>
                {isSelected ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="flex-none text-teal"
                  >
                    <path
                      d="M5 12l5 5L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
