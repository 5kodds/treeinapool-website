import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/site";

export function FaqAccordion() {
  return (
    <div className="border-t border-[var(--color-divider)]">
      {FAQS.map((faq) => (
        <details key={faq.q} className="group border-b border-[var(--color-divider)] py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-medium marker:content-none">
            {faq.q}
            <ChevronDown
              className="h-4 w-4 shrink-0 text-[var(--color-accent-700)] transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="max-w-[64ch] pb-5 text-[15px] leading-6 text-muted">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}
