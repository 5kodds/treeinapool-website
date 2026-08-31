/**
 * Standard image slot. Renders the blueprint hatch treatment used across
 * the site until a real image is dropped in, so swapping in photography
 * later needs no layout work.
 */
export function BlueprintFigure({
  label,
  ratio = "4/3",
  className,
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center border border-[var(--color-divider)] ${className ?? ""}`}
      style={{
        aspectRatio: ratio,
        background:
          "repeating-linear-gradient(135deg, color-mix(in srgb, var(--color-accent-600) 8%, transparent) 0 12px, transparent 12px 24px)",
      }}
    >
      <span className="px-4 text-center text-xs font-semibold uppercase tracking-[0.1em] text-muted-2">
        {label}
      </span>
    </div>
  );
}
