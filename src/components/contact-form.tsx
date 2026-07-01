"use client";

import { useEffect, useRef, useState } from "react";

const projectTypes = [
  "New website",
  "Rebuild or migration",
  "E-commerce",
  "SEO & growth",
  "AI integration",
  "Care & hosting",
  "Something else",
];

const budgets = [
  "Under $2k",
  "$2k to $5k",
  "$5k to $15k",
  "$15k and up",
  "Not sure yet",
];

const emptyForm = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  message: "",
};

const fieldClass =
  "w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm text-text outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20";
const labelClass = "mb-1.5 block text-sm font-medium text-text";

export function ContactForm() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function update<K extends keyof typeof emptyForm>(field: K) {
    return (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => setForm((prev) => ({ ...prev, [field]: event.target.value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: wire this to a Route Handler. Create src/app/api/contact/route.ts
    // exporting `async function POST(request: Request)`, then here:
    //   await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    setSubmitted(true);
    setForm(emptyForm);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSubmitted(false), 6000);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={form.name}
            onChange={update("name")}
            className={fieldClass}
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={update("email")}
            className={fieldClass}
            placeholder="jane@company.com"
          />
        </div>
        <div>
          <label htmlFor="projectType" className={labelClass}>
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            value={form.projectType}
            onChange={update("projectType")}
            className={fieldClass}
          >
            <option value="" disabled>
              Select one
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget
          </label>
          <select
            id="budget"
            name="budget"
            required
            value={form.budget}
            onChange={update("budget")}
            className={fieldClass}
          >
            <option value="" disabled>
              Select one
            </option>
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={labelClass}>
          Project details
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={update("message")}
          className={`${fieldClass} resize-y`}
          placeholder="A sentence or two about what you are building."
        />
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-grad px-6 text-[0.95rem] font-medium text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        Send project brief
      </button>

      {submitted ? (
        <p
          role="status"
          className="mt-4 rounded-xl border border-teal/30 bg-teal/10 px-4 py-3 text-sm text-teal-deep"
        >
          Thanks, your brief is in. We’ll reply within one business day.
        </p>
      ) : null}
    </form>
  );
}
