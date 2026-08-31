"use client";

import { FormEvent, useState } from "react";
import { track } from "@/lib/analytics";
import { CONTACT_EMAIL } from "@/lib/site";

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "success-undelivered"
  | "error";

export function NewsletterForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(
      new FormData(event.currentTarget).get("email") ?? "",
    ).trim();

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setError("");
    setStatus("submitting");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        return;
      }

      track("newsletter_signup");
      setStatus(data.delivered ? "success" : "success-undelivered");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success" || status === "success-undelivered") {
    return (
      <p className="text-[15px] leading-6" role="status">
        Thanks — you&apos;re on the list.
        {status === "success-undelivered" && (
          <>
            {" "}
            <span className="text-muted-2">
              Our list isn&apos;t wired up yet, so{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Newsletter`}
                className="underline"
              >
                email us
              </a>{" "}
              to be sure we have you.
            </span>
          </>
        )}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-2 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        placeholder="you@company.com"
        className="field-input sm:max-w-[320px]"
        required
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Signing up…" : "Sign up"}
      </button>
      {error && (
        <p className="text-sm text-red-700 sm:self-center" role="alert">
          {error}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700 sm:self-center" role="alert">
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}
