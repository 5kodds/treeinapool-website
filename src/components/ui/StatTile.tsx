import { StatCountUp } from "@/components/ui/StatCountUp";

export function StatTile({ stat, label }: { stat: string; label: string }) {
  return (
    <div>
      <span className="block font-[family-name:var(--font-heading)] text-[clamp(40px,5vw,60px)] font-semibold leading-none tracking-tight">
        <StatCountUp value={stat} />
      </span>
      <p className="mt-3 text-sm leading-6 text-muted">{label}</p>
    </div>
  );
}
