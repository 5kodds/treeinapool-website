/**
 * The three figures beside the "Why TreeInAPool" arguments.
 *
 * Deliberately not stock photography. A photograph of strangers at a laptop
 * is the visual signature of exactly the agencies this page argues against,
 * and a buyer reads it as "nothing of our own to show". These draw the thing
 * each block is claiming, in the same blueprint language as the rest of the
 * site, so the picture carries the argument rather than decorating it.
 */

type FigureName = "cadence" | "scope" | "handover";

const STROKE = "var(--color-accent-600)";
const FAINT = "color-mix(in srgb, var(--color-accent-600) 22%, transparent)";
const INK = "var(--color-text)";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <rect
        x="0.5"
        y="0.5"
        width="399"
        height="249"
        fill="none"
        stroke="var(--color-divider)"
      />
      {children}
    </>
  );
}

/** Sprint cadence: four sprints, each closing on something openable. */
function Cadence() {
  const sprints = [0, 1, 2, 3];
  return (
    <Frame>
      <text x="20" y="34" fontSize="11" letterSpacing="1.4" fill={INK} opacity="0.55">
        SPRINT
      </text>
      <text x="330" y="34" fontSize="11" letterSpacing="1.4" fill={INK} opacity="0.55">
        DEMO
      </text>
      <line x1="20" y1="46" x2="380" y2="46" stroke="var(--color-divider)" />
      {sprints.map((i) => {
        const y = 76 + i * 42;
        return (
          <g key={i}>
            <text x="20" y={y + 4} fontSize="12" fill={INK} opacity="0.75">
              {`S${i + 1}`}
            </text>
            <rect x="54" y={y - 7} width="230" height="11" fill={FAINT} />
            <rect x="54" y={y - 7} width={110 + i * 40} height="11" fill={STROKE} />
            <line x1="300" y1={y - 14} x2="300" y2={y + 10} stroke={STROKE} strokeWidth="1.5" />
            <circle cx="340" cy={y - 2} r="6" fill="none" stroke={STROKE} strokeWidth="1.5" />
            <circle cx="340" cy={y - 2} r="2" fill={STROKE} />
          </g>
        );
      })}
      <line x1="20" y1="232" x2="380" y2="232" stroke="var(--color-divider)" />
      <text x="20" y="224" fontSize="10.5" letterSpacing="1.2" fill={INK} opacity="0.55">
        EVERY ROW ENDS AT A URL YOU CAN OPEN
      </text>
    </Frame>
  );
}

/** Scope: a signed document, and the one path a change is allowed to take. */
function Scope() {
  return (
    <Frame>
      <rect x="24" y="26" width="150" height="198" fill="none" stroke={STROKE} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={i}
          x1="40"
          y1={54 + i * 20}
          x2={i % 3 === 2 ? 128 : 158}
          y2={54 + i * 20}
          stroke={FAINT}
          strokeWidth="3"
        />
      ))}
      <path
        d="M42 206 q14 -18 26 -2 t26 -6"
        fill="none"
        stroke={STROKE}
        strokeWidth="1.8"
      />
      <text x="24" y="18" fontSize="10.5" letterSpacing="1.2" fill={INK} opacity="0.55">
        WRITTEN SCOPE
      </text>

      <text x="212" y="18" fontSize="10.5" letterSpacing="1.2" fill={INK} opacity="0.55">
        ANY CHANGE
      </text>
      {["QUOTED", "APPROVED", "BUILT"].map((step, i) => {
        const y = 44 + i * 62;
        return (
          <g key={step}>
            <rect x="212" y={y} width="164" height="38" fill="none" stroke={STROKE} />
            <text x="228" y={y + 24} fontSize="12" letterSpacing="1.1" fill={INK} opacity="0.8">
              {step}
            </text>
            {i < 2 && (
              <path
                d={`M294 ${y + 38} l0 14 m-5 -6 l5 6 l5 -6`}
                fill="none"
                stroke={STROKE}
                strokeWidth="1.4"
              />
            )}
          </g>
        );
      })}
    </Frame>
  );
}

/** Handover: four assets, all moving one direction, at launch. */
function Handover() {
  const assets = ["REPOSITORY", "HOSTING", "ANALYTICS", "DOMAIN"];
  return (
    <Frame>
      <text x="24" y="26" fontSize="10.5" letterSpacing="1.2" fill={INK} opacity="0.55">
        US
      </text>
      <text x="330" y="26" fontSize="10.5" letterSpacing="1.2" fill={INK} opacity="0.55">
        YOU
      </text>
      <line x1="200" y1="34" x2="200" y2="216" stroke="var(--color-divider)" strokeDasharray="4 5" />
      <text
        x="200"
        y="232"
        fontSize="10.5"
        letterSpacing="1.2"
        textAnchor="middle"
        fill={INK}
        opacity="0.55"
      >
        LAUNCH
      </text>
      {assets.map((asset, i) => {
        const y = 56 + i * 42;
        return (
          <g key={asset}>
            <rect x="24" y={y - 13} width="104" height="26" fill={FAINT} />
            <text x="34" y={y + 4} fontSize="9.5" letterSpacing="0.9" fill={INK} opacity="0.8">
              {asset}
            </text>
            <path
              d={`M136 ${y} l108 0 m-10 -5 l10 5 l-10 5`}
              fill="none"
              stroke={STROKE}
              strokeWidth="1.4"
            />
            <rect x="256" y={y - 13} width="120" height="26" fill="none" stroke={STROKE} />
            <path
              d={`M266 ${y} l6 7 l12 -14`}
              fill="none"
              stroke={STROKE}
              strokeWidth="1.8"
            />
            <text x="292" y={y + 4} fontSize="9.5" letterSpacing="0.9" fill={INK} opacity="0.8">
              TRANSFERRED
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

const FIGURES: Record<FigureName, () => React.ReactElement> = {
  cadence: Cadence,
  scope: Scope,
  handover: Handover,
};

export function WhyFigure({
  name,
  title,
  className,
}: {
  name: FigureName;
  title: string;
  className?: string;
}) {
  const Shape = FIGURES[name];
  return (
    <svg
      viewBox="0 0 400 250"
      className={`h-auto w-full ${className ?? ""}`}
      role="img"
      aria-label={title}
      fontFamily="var(--font-heading), sans-serif"
    >
      <title>{title}</title>
      <Shape />
    </svg>
  );
}

export type { FigureName };
