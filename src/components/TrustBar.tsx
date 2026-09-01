import type { TrustItem } from "@/lib/site";

/**
 * Proof row. Every cell is something a visitor can open and check, which is
 * why each one links out. Client logos and quotes replace or join these as
 * they are signed off (D8); nothing goes in here that cannot be verified by
 * a stranger in under a minute.
 */
export function TrustBar({ items }: { items: TrustItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="border-y border-[var(--color-divider)]">
      <p className="border-b border-[var(--color-divider)] px-1 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-2">
        Shipped and live, check for yourself
      </p>
      <ul className="flex flex-col sm:flex-row">
        {items.map((item, index) => {
          const inner = (
            <>
              <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase tracking-wide">
                {item.name}
              </span>
              <span className="text-xs uppercase tracking-[0.08em] text-muted-2">
                {item.note}
              </span>
            </>
          );
          return (
            <li
              key={`${item.name}-${index}`}
              className={`flex-1 ${
                index < items.length - 1
                  ? "border-b border-[var(--color-divider)] sm:border-b-0 sm:border-r"
                  : ""
              }`}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col items-center justify-center gap-1 px-4 py-7 text-center text-muted no-underline"
                >
                  {inner}
                </a>
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-1 px-4 py-7 text-center text-muted">
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
