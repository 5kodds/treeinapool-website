"use client";

import { useState } from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import type { Insight } from "@/lib/insights";

const ALL = "All";

export function InsightsIndex({
  insights,
  categories,
}: {
  insights: Insight[];
  categories: string[];
}) {
  const [active, setActive] = useState(ALL);
  const filtered =
    active === ALL ? insights : insights.filter((i) => i.category === active);

  return (
    <>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by category"
      >
        {[ALL, ...categories].map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={`btn ${selected ? "btn-primary" : "btn-secondary"} min-h-11`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10 border-t border-[var(--color-divider)]">
        {filtered.map((insight) => (
          <article
            key={insight.slug}
            className="border-b border-[var(--color-divider)]"
          >
            <Link
              href={`/insights/${insight.slug}`}
              className="grid gap-3 py-8 text-inherit no-underline md:grid-cols-[3fr_9fr] md:gap-10"
            >
              <div className="flex flex-col gap-2">
                <Tag>{insight.category}</Tag>
                <span className="text-[13px] text-muted-2">
                  {insight.date} · {insight.readingTime}
                </span>
              </div>
              <div>
                <h2 className="max-w-[28ch] text-[clamp(22px,2.4vw,30px)] uppercase leading-[1.15] tracking-wide">
                  {insight.title}
                </h2>
                <p className="mt-3 max-w-[70ch] text-[15px] leading-7 text-muted">
                  {insight.summary}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[var(--color-accent-700)]">
                  Read it →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-muted">Nothing filed under {active} yet.</p>
      )}
    </>
  );
}
