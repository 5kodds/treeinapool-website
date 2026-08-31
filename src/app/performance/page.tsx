import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { formatMs, getPerformanceReport } from "@/lib/performance";

export const metadata: Metadata = {
  title: "Performance",
  description:
    "This site's own Lighthouse and Core Web Vitals figures, with the date they were measured and the command that reproduces them.",
  alternates: { canonical: "/performance" },
};

export default function PerformancePage() {
  const report = getPerformanceReport();

  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>Performance</Kicker>
          <h1 className="-ml-[0.05em] max-w-[22ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            Our own numbers, measured.
          </h1>
          <p className="mt-7 max-w-[60ch] text-[17px] leading-7 text-muted">
            Any agency can say it builds fast sites. This page shows what ours
            actually scores, when it was measured, and the command that
            reproduces it — run it yourself.
          </p>
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          <div className="grid gap-10 md:grid-cols-[7fr_5fr]">
            <div className="article-body max-w-[62ch]">
              <h2>Why speed is revenue</h2>
              <p>
                Every extra second before a page becomes usable costs you
                visitors who never see what you sell. On mobile connections —
                which is most traffic, most of the time — a heavy page-builder
                site can take several seconds to show anything useful, while a
                static site delivers the first meaningful paint in well under
                one.
              </p>
              <p>
                Speed also compounds: faster pages are crawled more thoroughly,
                rank better on Core Web Vitals, and convert better on the same
                traffic. It is the rare technical decision with a direct
                commercial line attached to it — and, unlike most agency claims,
                it is independently verifiable in about thirty seconds.
              </p>
            </div>

            <Frame className="h-fit p-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                Reproduce it
              </span>
              <p className="mt-3 text-[14px] leading-6 text-muted">
                Clone the repository and run:
              </p>
              <pre className="mt-3 overflow-x-auto border border-[var(--color-divider)] bg-[var(--color-surface)] p-3 text-[13px]">
                npm run build && npm run perf
              </pre>
              <p className="mt-3 text-[13px] leading-5 text-muted-2">
                The numbers below are written by that command. Nothing on this
                page is typed in by hand.
              </p>
            </Frame>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14">
        <Container>
          {report ? (
            <>
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
                  Last measured run
                </h2>
                <span className="text-[13px] text-muted-2">
                  {report.measuredOn} · Lighthouse {report.lighthouseVersion} ·{" "}
                  {report.pages[0]?.formFactor ?? "mobile"} profile
                </span>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {report.pages.map((page) => (
                  <Frame key={page.path} className="p-0">
                    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-divider)] px-6 py-3">
                      <span className="text-[13px] font-semibold uppercase leading-6 tracking-[0.08em]">
                        {page.label}
                      </span>
                      <span className="text-[13px] text-muted-2">
                        {page.path}
                      </span>
                    </header>

                    <div className="grid grid-cols-2 sm:grid-cols-4">
                      {[
                        ["Performance", page.scores.performance],
                        ["Accessibility", page.scores.accessibility],
                        ["Best practices", page.scores.bestPractices],
                        ["SEO", page.scores.seo],
                      ].map(([label, score], index) => (
                        <div
                          key={label as string}
                          className={`px-4 py-5 text-center ${index < 3 ? "sm:border-r sm:border-[var(--color-divider)]" : ""} ${index % 2 === 0 ? "border-r border-[var(--color-divider)] sm:border-r" : ""} ${index < 2 ? "border-b border-[var(--color-divider)] sm:border-b-0" : ""}`}
                        >
                          <span className="block font-[family-name:var(--font-heading)] text-[38px] font-semibold leading-none">
                            {score as number}
                          </span>
                          <span className="mt-2 block text-[11px] uppercase tracking-[0.08em] text-muted-2">
                            {label as string}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-[var(--color-divider)]">
                      {[
                        [
                          "Largest contentful paint",
                          formatMs(page.vitals.lcpMs),
                        ],
                        ["First contentful paint", formatMs(page.vitals.fcpMs)],
                        ["Total blocking time", formatMs(page.vitals.tbtMs)],
                        ["Cumulative layout shift", page.vitals.cls.toFixed(3)],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between gap-4 border-b border-[var(--color-divider)] px-6 py-2.5 text-sm last:border-b-0"
                        >
                          <span className="text-muted">{label}</span>
                          <span className="font-[family-name:var(--font-heading)] text-lg font-semibold">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Frame>
                ))}
              </div>

              <p className="mt-8 max-w-[70ch] text-[13px] leading-6 text-muted-2">
                {report.note} Measured against: {report.measuredAgainst}.
                Throttling: {report.pages[0]?.throttling ?? "simulate"}. Lab
                figures vary with hardware and network conditions — treat them
                as a floor for what the architecture can do, not a promise about
                your project.
              </p>
            </>
          ) : (
            <Frame className="p-6">
              <h2 className="text-xl uppercase">No run recorded yet</h2>
              <p className="mt-3 max-w-[60ch] text-[15px] leading-6 text-muted">
                This page only ever shows figures written by an actual
                Lighthouse run. Run{" "}
                <code>npm run build &amp;&amp; npm run perf</code> to generate
                them.
              </p>
            </Frame>
          )}
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Want to know what your site scores?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Send us the URL. We&apos;ll run the same audit and tell you
              what&apos;s costing you visitors — whether or not you hire us to
              fix it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink
              href="/contact?type=rebuild"
              page="performance"
              position="closing-cta"
            >
              Get a free audit
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
