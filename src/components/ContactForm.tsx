"use client";

import { useState, FormEvent } from "react";
import { track } from "@/lib/analytics";
import {
  BUDGET_BANDS,
  PROJECT_TYPES,
  contactSchema,
} from "@/lib/contact-schema";
import { CONTACT_EMAIL } from "@/lib/site";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "success-undelivered"
  | "error";

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [mailtoHref, setMailtoHref] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});

    const form = new FormData(event.currentTarget);
    const values = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      budgetBand: String(form.get("budgetBand") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");

    const body = `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\nBudget band: ${values.budgetBand}\n\n${values.message}`;
    setMailtoHref(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `New enquiry: ${values.projectType}`,
      )}&body=${encodeURIComponent(body)}`,
    );

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        return;
      }

      track("form_submitted", { projectType: values.projectType });
      setStatus(data.delivered ? "success" : "success-undelivered");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "success-undelivered") {
    return (
      <div className="blueprint p-6" role="status">
        <i className="corner tl" aria-hidden="true" />
        <i className="corner tr" aria-hidden="true" />
        <i className="corner bl" aria-hidden="true" />
        <i className="corner br" aria-hidden="true" />
        <h3 className="text-xl uppercase">Message sent</h3>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          Thanks — we read every enquiry and reply within one business day.
        </p>
        {status === "success-undelivered" && (
          <p className="mt-4 text-[13px] leading-5 text-muted-2">
            Our inbox isn&apos;t wired up yet, so please also{" "}
            <a href={mailtoHref} className="underline">
              send this over email
            </a>{" "}
            to make sure it reaches us.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label htmlFor="name" className="mb-1.5 block text-xs text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="field-input"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-700">{fieldErrors.name}</p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email" className="mb-1.5 block text-xs text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="field-input"
          />
          {fieldErrors.email && (
            <p className="mt-1 text-xs text-red-700">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="field">
          <label
            htmlFor="projectType"
            className="mb-1.5 block text-xs text-muted"
          >
            Project type
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            className="field-input"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label
            htmlFor="budgetBand"
            className="mb-1.5 block text-xs text-muted"
          >
            Budget band
          </label>
          <select
            id="budgetBand"
            name="budgetBand"
            required
            className="field-input"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {BUDGET_BANDS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message" className="mb-1.5 block text-xs text-muted">
          What are you trying to build?
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={compact ? 3 : 4}
          className="field-input"
        />
        {fieldErrors.message && (
          <p className="mt-1 text-xs text-red-700">{fieldErrors.message}</p>
        )}
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700" role="alert">
          Something went wrong sending that. Please try again, or email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
            {CONTACT_EMAIL}
          </a>{" "}
          directly.
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-block sm:w-fit"
        disabled={status === "submitting"}
      >
        {status === "submitting"
          ? "Sending…"
          : "Send and get a reply in 1 business day"}
      </button>
    </form>
  );
}
