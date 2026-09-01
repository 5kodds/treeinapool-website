import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { FaqSection } from "@/components/FaqSection";
import { faqsForPage } from "@/lib/site";
import { getAllCaseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies: the problems we were brought, what we built, and the numbers after launch.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>Work</Kicker>
          <h1 className="-ml-[0.05em] max-w-[20ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            Proof, not portfolio filler.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-muted">
            Every case study follows the same template: the problem, what we did
            about it, and the numbers after launch. Each one says plainly
            whether it was built for a client or is our own product, because a
            portfolio that blurs the two is not evidence of anything. Where a
            figure has not been confirmed, none is shown.
          </p>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container>
          {caseStudies.length > 0 ? (
            <div className="grid gap-10 sm:grid-cols-2">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          ) : (
            <p className="text-muted">
              Case studies are being written up, check back soon.
            </p>
          )}
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <FaqSection items={faqsForPage("/work")} page="/work" />
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[30ch] text-[clamp(26px,3vw,38px)] uppercase leading-[1.1] tracking-wide">
            Have a process that looks like this?
          </h2>
          <CtaLink href="/contact" page="work" position="closing-cta">
            Book a free discovery call
          </CtaLink>
        </Container>
      </section>
    </>
  );
}
