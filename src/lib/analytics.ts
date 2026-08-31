"use client";

// Lightweight event layer per the PRD's instrumentation plan (§9).
// Forwards to Plausible's `window.plausible` when it's present (script wired
// in layout.tsx once a Plausible/GA4 domain is configured); otherwise no-ops
// in production and logs in development so events are still verifiable.

type EventName =
  | "cta_click_primary"
  | "form_submitted"
  | "whatsapp_click"
  | "case_study_read"
  | "service_card_click";

type EventProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void;
  }
}

export function track(event: EventName, props?: EventProps) {
  if (typeof window === "undefined") return;

  if (window.plausible) {
    window.plausible(event, { props });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, props ?? {});
  }
}
