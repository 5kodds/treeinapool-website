"use client";

import { track } from "@/lib/analytics";
import { CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/site";

export function WhatsAppLink({ className }: { className?: string }) {
  if (!WHATSAPP_URL) {
    return (
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className={className ?? "btn btn-ghost"}
      >
        Email us
      </a>
    );
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className ?? "btn btn-ghost"}
      onClick={() => track("whatsapp_click")}
    >
      Message us on WhatsApp
    </a>
  );
}
