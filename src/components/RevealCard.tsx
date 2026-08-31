"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { track } from "@/lib/analytics";
import type { Service } from "@/lib/site";

/**
 * Service card that reveals its detail in place — the mockups' blueprint
 * framing applied to a tap-to-learn-more pattern. The whole card is a
 * disclosure button; the "Learn more" link inside is a separate stop so
 * keyboard users can reach the service section directly.
 */
export function RevealCard({ service }: { service: Service }) {
  const [revealed, setRevealed] = useState(false);
  const panelId = useId();

  return (
    <div className="blueprint lift h-full">
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />

      <button
        type="button"
        aria-expanded={revealed}
        aria-controls={panelId}
        onClick={() => {
          const next = !revealed;
          setRevealed(next);
          if (next) track("service_card_reveal", { service: service.code });
        }}
        className="flex w-full items-start justify-between gap-4 p-6 text-left"
      >
        <span>
          <span className="flex items-baseline gap-2.5">
            <span className="text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
              {service.code}
            </span>
            <span className="font-[family-name:var(--font-heading)] text-2xl font-semibold uppercase leading-[26px] tracking-wide">
              {service.name}
            </span>
          </span>
          <span className="mt-2 block text-[15px] leading-6 text-muted">
            {service.who}
          </span>
        </span>
        <Plus
          className={`mt-1 h-5 w-5 shrink-0 text-[var(--color-accent-700)] transition-transform duration-200 ${
            revealed ? "rotate-45" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          revealed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--color-divider)] p-6">
            <p className="m-0 text-[15px] leading-6 text-muted">
              {service.summary}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Tag variant="outline">{service.timeline}</Tag>
              <Tag>You own: {service.owns}</Tag>
            </div>
            <Link
              href={`/services#${service.code.toLowerCase()}`}
              className="mt-5 inline-block text-sm font-medium"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
