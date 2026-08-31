"use client";

import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import {
  CONVERSION_GOALS,
  PLATFORMS,
  REBUILD_BUDGET_BANDS,
  TIMELINES,
  rebuildSchema,
} from "@/lib/contact-schema";
import { CONTACT_EMAIL } from "@/lib/site";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "success-undelivered"
  | "error";

/**
 * The enterprise-tier path: an existing site to rebuild, rather than a
 * project to start from scratch. Routed with lead_type: rebuild so these
 * enquiries can be triaged separately.
 */
export function RebuildForm() {
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
      siteUrl: String(form.get("siteUrl") ?? ""),
      platform: String(form.get("platform") ?? ""),
      conversionGoal: String(form.get("conversionGoal") ?? ""),
      timeline: String(form.get("timeline") ?? ""),
      budgetBand: String(form.get("budgetBand") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    const parsed = rebuildSchema.safeParse(values);
    if (!parsed.success) {
      const errors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        errors[String(issue.path[0])] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    setStatus("submitting");

    const body = `Rebuild enquiry\n\nName: ${values.name}\nEmail: ${values.email}\nSite: ${values.siteUrl}\nPlatform: ${values.platform}\nPrimary goal: ${values.conversionGoal}\nTimeline: ${values.timeline}\nBudget band: ${values.budgetBand}\n\n${values.message}`;
    setMailtoHref(
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        `Rebuild enquiry: ${values.siteUrl}`,
      )}&body=${encodeURIComponent(body)}`,
    );

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, lead_type: "rebuild" }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        return;
      }

      track("rebuild_enquiry_submitted", {
        platform: values.platform,
        timeline: values.timeline,
      });
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
        <h3 className="text-xl uppercase">Enquiry received</h3>
        <p className="mt-3 text-[15px] leading-6 text-muted">
          We&apos;ll audit the site and come back within one business day with
          what we found — whether or not there&apos;s a project in it.
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
        <div>
          <label
            htmlFor="rebuild-name"
            className="mb-1.5 block text-xs text-muted"
          >
            Name
          </label>
          <input
            id="rebuild-name"
            name="name"
            type="text"
            required
            className="field-input"
          />
          {fieldErrors.name && (
            <p className="mt-1 text-xs text-red-700">{fieldErrors.name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="rebuild-email"
            className="mb-1.5 block text-xs text-muted"
          >
            Email
          </label>
          <input
            id="rebuild-email"
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

      <div>
        <label
          htmlFor="rebuild-site"
          className="mb-1.5 block text-xs text-muted"
        >
          Current site URL
        </label>
        <input
          id="rebuild-site"
          name="siteUrl"
          type="text"
          inputMode="url"
          placeholder="yourcompany.com"
          required
          className="field-input"
        />
        {fieldErrors.siteUrl && (
          <p className="mt-1 text-xs text-red-700">{fieldErrors.siteUrl}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="rebuild-platform"
            className="mb-1.5 block text-xs text-muted"
          >
            Current platform
          </label>
          <select
            id="rebuild-platform"
            name="platform"
            required
            className="field-input"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {PLATFORMS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="rebuild-goal"
            className="mb-1.5 block text-xs text-muted"
          >
            Primary conversion goal
          </label>
          <select
            id="rebuild-goal"
            name="conversionGoal"
            required
            className="field-input"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {CONVERSION_GOALS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="rebuild-timeline"
            className="mb-1.5 block text-xs text-muted"
          >
            Timeline
          </label>
          <select
            id="rebuild-timeline"
            name="timeline"
            required
            className="field-input"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {TIMELINES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="rebuild-budget"
            className="mb-1.5 block text-xs text-muted"
          >
            Budget band
          </label>
          <select
            id="rebuild-budget"
            name="budgetBand"
            required
            className="field-input"
            defaultValue=""
          >
            <option value="" disabled>
              Choose one
            </option>
            {REBUILD_BUDGET_BANDS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="rebuild-message"
          className="mb-1.5 block text-xs text-muted"
        >
          Anything else we should know? (optional)
        </label>
        <textarea
          id="rebuild-message"
          name="message"
          rows={3}
          className="field-input"
        />
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
        {status === "submitting" ? "Sending…" : "Request the audit"}
      </button>
    </form>
  );
}
