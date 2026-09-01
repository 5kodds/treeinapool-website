"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { WhyFigure, type FigureName } from "@/components/ui/WhyFigure";
import { track } from "@/lib/analytics";

type Block = {
  figure: FigureName;
  figureTitle: string;
  title: string;
  body: string;
  points: readonly string[];
};

/**
 * Alternating expandable blocks, illustration on one side, argument on
 * the other, flipping each row.
 */
export function AltFeatureSection({ blocks }: { blocks: readonly Block[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-14">
      {blocks.map((block, index) => {
        const isOpen = openIndex === index;
        const panelId = `why-panel-${index}`;
        const flipped = index % 2 === 1;

        return (
          <div
            key={block.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <div className={flipped ? "md:order-2" : ""}>
              <WhyFigure name={block.figure} title={block.figureTitle} />
            </div>

            <div className={flipped ? "md:order-1" : ""}>
              <h3 className="max-w-[24ch] text-[clamp(24px,2.6vw,32px)] uppercase leading-[1.1] tracking-wide">
                {block.title}
              </h3>
              <p className="mt-4 max-w-[56ch] text-[15px] leading-7 text-muted">
                {block.body}
              </p>

              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => {
                  const next = isOpen ? null : index;
                  setOpenIndex(next);
                  if (next !== null)
                    track("faq_open", {
                      question: block.title,
                      page: "home-why",
                    });
                }}
                className="mt-5 flex items-center gap-2 border-t border-[var(--color-divider)] pt-4 text-sm font-medium text-[var(--color-accent-700)]"
              >
                {isOpen ? "Hide the detail" : "What that means in practice"}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <div
                id={panelId}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-6 text-muted">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
