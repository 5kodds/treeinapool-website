import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { FaqSection } from "@/components/FaqSection";
import { Tag } from "@/components/ui/Tag";
import {
  BUDGETS,
  DISCOVERY_OUTPUTS,
  faqsForPage,
  MONTHLY_REPORT,
  PROCESS_STAGES,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a TreeInAPool engagement runs, stage by stage, plus answers to the top pre-sales questions.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>Process</Kicker>
          <h1 className="-ml-[0.05em] max-w-[22ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            No black box, stage by stage.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-muted">
            Four stages, each with a fixed duration and a clear answer to
            &quot;what do I get, and what do I need to do.&quot;
          </p>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-6 border-t border-[var(--color-divider)] pt-10 sm:grid-cols-2">
            {PROCESS_STAGES.map((stage) => (
              <Frame key={stage.n} className="p-6">
                <span className="block text-[34px] leading-[34px] text-[var(--color-accent-700)]">
                  {stage.n}
                </span>
                <div className="mt-3 flex items-baseline justify-between gap-3">
                  <h2 className="text-2xl uppercase leading-[26px] tracking-wide">
                    {stage.name}
                  </h2>
                  <span className="whitespace-nowrap text-sm text-muted">
                    {stage.duration}
                  </span>
                </div>
                <p className="mt-3 text-[15px] leading-6 text-muted">
                  {stage.body}
                </p>
                <p className="mt-4 border-t border-[var(--color-divider)] pt-4 text-sm leading-6">
                  <span className="font-semibold text-[var(--color-accent-700)]">
                    You do:{" "}
                  </span>
                  {stage.client}
                </p>
              </Frame>
            ))}
          </div>
        </Container>
      </section>

      {/* What a discovery week produces */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <Kicker>What a discovery week actually produces</Kicker>
          <p className="mb-8 max-w-[62ch] text-[17px] leading-7 text-muted">
            &quot;Discovery&quot; is the word agencies use for the week you pay
            for and can&apos;t inspect. Here is the full list of what lands on
            your side of the table at the end of ours — whether or not you
            continue with us.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {DISCOVERY_OUTPUTS.map((output, index) => (
              <Frame key={output.title} className="p-6">
                <span className="block text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl uppercase leading-6 tracking-wide">
                  {output.title}
                </h3>
                <p className="mt-3 text-[15px] leading-6 text-muted">
                  {output.body}
                </p>
              </Frame>
            ))}
          </div>
        </Container>
      </section>

      {/* Instrumentation before build */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-12 md:grid-cols-[5fr_7fr] md:items-start">
          <div>
            <Kicker>Baseline first, ship second, prove third</Kicker>
            <h2 className="text-[clamp(26px,3vw,38px)] uppercase leading-[1.1] tracking-wide">
              We measure before we build
            </h2>
          </div>
          <div className="article-body max-w-[62ch]">
            <p>
              Most agency work cannot be proved to have worked, because nobody
              wrote down what &quot;before&quot; looked like. We take the
              baseline in discovery — load times, drop-off points, how long the
              manual process actually takes — and record it in the scope.
            </p>
            <p>
              That order matters commercially. It means the launch conversation
              is about measured movement rather than impressions, and it means
              we can be told we were wrong. An agency that never baselines can
              never be held to a number, which is convenient for the agency and
              expensive for you.
            </p>
            <ol>
              <li>
                <strong>Baseline.</strong> Instrument the current state and
                agree which numbers this project is meant to move.
              </li>
              <li>
                <strong>Ship.</strong> Build in two-week sprints, each ending on
                a live URL.
              </li>
              <li>
                <strong>Prove.</strong> Re-measure the same numbers after launch
                and publish the comparison, including where it fell short.
              </li>
            </ol>
          </div>
        </Container>
      </section>

      {/* Budgets */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <Kicker>Budgets we commit to</Kicker>
          <p className="mb-8 max-w-[62ch] text-[17px] leading-7 text-muted">
            These are thresholds, not aspirations: a build does not ship below
            them without a written note explaining why, agreed with you.
          </p>
          <Frame className="p-0">
            <div
              className="overflow-x-auto"
              role="region"
              aria-label="Performance and accessibility budgets table"
              tabIndex={0}
            >
              <table className="table-tp min-w-[640px]">
                <thead>
                  <tr>
                    <th scope="col">Metric</th>
                    <th scope="col">Commitment</th>
                    <th scope="col">How it&apos;s held</th>
                  </tr>
                </thead>
                <tbody>
                  {BUDGETS.map((budget) => (
                    <tr key={budget.metric}>
                      <td className="text-[15px]">{budget.metric}</td>
                      <td className="whitespace-nowrap text-lg text-[var(--color-accent-700)]">
                        {budget.commitment}
                      </td>
                      <td className="text-[14px] text-muted">{budget.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Frame>
          <p className="mt-4 text-[13px] leading-6 text-muted-2">
            We hold this site to the same numbers — see{" "}
            <a href="/performance">our current measurements</a> and{" "}
            <a href="/accessibility">our accessibility statement</a>.
          </p>
        </Container>
      </section>

      {/* Monthly report */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-12 md:grid-cols-[5fr_7fr] md:items-start">
          <div>
            <Kicker>What a monthly report contains</Kicker>
            <p className="max-w-[46ch] text-[15px] leading-7 text-muted">
              One page, same shape every month, sent whether or not the month
              went well.
            </p>
          </div>
          <ul className="border-t border-[var(--color-divider)]">
            {MONTHLY_REPORT.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-[var(--color-divider)] py-4 text-[16px] leading-7"
              >
                <Tag variant="outline">Included</Tag>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <FaqSection items={faqsForPage("/process")} page="/process" />
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Ready to see it run on your project?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Thirty minutes, and you leave with a written scope, a price, and a
              date.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="process" position="closing-cta">
              Book a free discovery call
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
