"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { track } from "@/lib/analytics";

export type AccordionItem = { q: string; a: string };

/**
 * Accessible disclosure list. Animates open with a grid-rows transition,
 * which collapses to an instant state under prefers-reduced-motion (see the
 * global reduced-motion rule in globals.css).
 */
export function Accordion({
  items,
  page,
  defaultOpen,
}: {
  items: readonly AccordionItem[];
  page: string;
  defaultOpen?: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpen ?? null,
  );
  const baseId = useId();

  return (
    <div className="border-t border-[var(--color-divider)]">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.q} className="border-b border-[var(--color-divider)]">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const next = isOpen ? null : index;
                  setOpenIndex(next);
                  if (next !== null)
                    track("faq_open", { question: item.q, page });
                }}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-medium"
              >
                {item.q}
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-[var(--color-accent-700)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[70ch] pb-5 text-[15px] leading-7 text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
