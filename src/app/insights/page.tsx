import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { InsightsIndex } from "@/components/InsightsIndex";
import { getAllInsights, getInsightCategories } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical writing on scoping, pricing and running a software build — the things we explain on discovery calls, written down.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  const insights = getAllInsights();
  const categories = getInsightCategories();

  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>Insights</Kicker>
          <h1 className="-ml-[0.05em] max-w-[22ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            The things we explain on every call.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-muted">
            Scoping, pricing, and how a build actually runs week to week.
            Written to be useful whether or not you ever hire us.
          </p>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container>
          {insights.length > 0 ? (
            <InsightsIndex insights={insights} categories={categories} />
          ) : (
            <p className="text-muted">
              First articles are being written — check back soon.
            </p>
          )}
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Rather ask us directly?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Thirty minutes on a call and you leave with a written scope, a
              price, and a date.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="insights" position="closing-cta">
              Book a free discovery call
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
