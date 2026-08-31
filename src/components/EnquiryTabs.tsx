"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { RebuildForm } from "@/components/RebuildForm";

type Path = "project" | "rebuild";

export function EnquiryTabs() {
  const searchParams = useSearchParams();
  const [path, setPath] = useState<Path>(
    searchParams.get("type") === "rebuild" ? "rebuild" : "project",
  );

  const tabs: { id: Path; label: string; hint: string }[] = [
    {
      id: "project",
      label: "New project",
      hint: "A prototype, an idea, or an operation to digitise",
    },
    {
      id: "rebuild",
      label: "Rebuild an existing site",
      hint: "You have a site and it is underperforming",
    },
  ];

  return (
    <>
      <div
        role="tablist"
        aria-label="Enquiry type"
        className="flex flex-wrap gap-2 border-b border-[var(--color-divider)] px-6 pt-6"
      >
        {tabs.map((tab) => {
          const selected = tab.id === path;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setPath(tab.id)}
              className={`btn ${selected ? "btn-primary" : "btn-secondary"}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        id={`panel-${path}`}
        role="tabpanel"
        aria-labelledby={`tab-${path}`}
        className="p-6"
      >
        <p className="mb-5 text-[14px] leading-6 text-muted-2">
          {tabs.find((tab) => tab.id === path)?.hint}
        </p>
        {path === "project" ? <ContactForm /> : <RebuildForm />}
      </div>
    </>
  );
}
