const ROWS: { label: string; startCol: number; span: number; light?: boolean }[] = [
  { label: "Discovery", startCol: 2, span: 1 },
  { label: "Design", startCol: 3, span: 2 },
  { label: "Build", startCol: 4, span: 4 },
  { label: "QA & hardening", startCol: 7, span: 2, light: true },
  { label: "Launch & support", startCol: 9, span: 1, light: true },
];

export function SprintPlan() {
  return (
    <div className="blueprint">
      <i className="corner tl" aria-hidden="true" />
      <i className="corner tr" aria-hidden="true" />
      <i className="corner bl" aria-hidden="true" />
      <i className="corner br" aria-hidden="true" />
      <header className="flex flex-wrap border-b border-[var(--color-divider)]">
        <span className="min-w-[16ch] flex-1 px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em]">
          Sprint plan — [ client ] · first release
        </span>
        <span className="whitespace-nowrap border-l border-[var(--color-divider)] px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em] text-muted">
          7 sprints · 14 weeks
        </span>
      </header>

      <div className="grid grid-cols-[88px_repeat(7,minmax(0,1fr))] border-b border-[var(--color-divider)] sm:grid-cols-[132px_repeat(7,minmax(0,1fr))]">
        <span className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
          Workstream
        </span>
        {["S0", "S1", "S2", "S3", "S4", "S5", "S6"].map((s) => (
          <span
            key={s}
            className="border-l border-[var(--color-divider)] px-1 py-2 text-center text-xs font-semibold tracking-[0.06em] text-muted"
          >
            {s}
          </span>
        ))}
      </div>

      {ROWS.map((row) => (
        <div
          key={row.label}
          className="grid min-h-11 grid-cols-[88px_repeat(7,minmax(0,1fr))] items-center border-b border-[var(--color-divider)] last:border-b-0 sm:grid-cols-[132px_repeat(7,minmax(0,1fr))]"
        >
          <span className="px-3 text-sm">{row.label}</span>
          <span
            className={`h-2.5 ${row.light ? "bg-[var(--color-accent-300)]" : "bg-[var(--color-accent-600)]"} mx-0.5`}
            style={{ gridColumn: `${row.startCol} / span ${row.span}` }}
          />
        </div>
      ))}

      <p className="m-0 px-6 py-3 text-[13px] leading-6 text-muted">
        Illustrative plan. Yours is written during discovery, with dates, and it is the document
        we are both held to.
      </p>
    </div>
  );
}
