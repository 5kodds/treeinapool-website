import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { FaqSection } from "@/components/FaqSection";
import { faqsForPage, PROCESS_STAGES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How a TreeInAPool engagement runs, stage by stage, plus answers to the top pre-sales questions.",
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
