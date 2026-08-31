"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { Tag } from "@/components/ui/Tag";
import type { CaseStudy } from "@/lib/case-studies";

export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/work/${caseStudy.slug}`}
      className="block text-inherit no-underline"
      onClick={() => track("service_card_click", { card: caseStudy.slug, type: "case-study" })}
    >
      <article className="blueprint">
        <i className="corner tl" aria-hidden="true" />
        <i className="corner tr" aria-hidden="true" />
        <i className="corner bl" aria-hidden="true" />
        <i className="corner br" aria-hidden="true" />
        <div
          className="flex aspect-[16/10] items-center justify-center border-b border-[var(--color-divider)]"
          style={{
            background:
              "repeating-linear-gradient(135deg, color-mix(in srgb, var(--color-accent-600) 8%, transparent) 0 12px, transparent 12px 24px)",
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-2">
            Image placeholder · {caseStudy.category}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-[26px] leading-[30px] uppercase tracking-wide">{caseStudy.title}</h3>
          <p className="mt-3.5 text-[15px] leading-6 text-muted">{caseStudy.summary}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Tag>{caseStudy.category}</Tag>
            {caseStudy.stack[0] && <Tag>{caseStudy.stack[0]}</Tag>}
          </div>
        </div>
      </article>
    </Link>
  );
}
