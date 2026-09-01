import type { TrustItem } from "@/lib/site";

/**
 * Client logo / badge row. Real logos replace the placeholder cells one by
 * one in site.ts, a cell only ships once the client has signed off (D8).
 */
export function TrustBar({ items }: { items: TrustItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-y border-[var(--color-divider)]">
      <ul className="grid grid-cols-2 sm:grid-cols-4">
        {items.map((item, index) => (
          <li
            key={`${item.name}-${index}`}
            className={`flex flex-col items-center justify-center gap-1 px-4 py-7 text-center ${
              index < items.length - 1
                ? "sm:border-r sm:border-[var(--color-divider)]"
                : ""
            } ${index % 2 === 0 ? "border-r border-[var(--color-divider)] sm:border-r" : ""} ${
              index < 2
                ? "border-b border-[var(--color-divider)] sm:border-b-0"
                : ""
            }`}
          >
            <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide text-muted">
              {item.name}
            </span>
            <span className="text-xs uppercase tracking-[0.08em] text-muted-2">
              {item.note}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
