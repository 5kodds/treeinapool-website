import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { FaqSection } from "@/components/FaqSection";
import { faqsForPage, FOUNDER, PROCESS_STAGES } from "@/lib/site";
import founderPhoto from "@/assets/founder-headshot.png";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who builds at TreeInAPool, how the studio works, and why the name.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    name: "Written, not implied",
    body: "Price, timeline and scope are agreed in a document before work starts. Changes are quoted and approved before they're built. Every conversation about money happens before the work, not after it, because that is the conversation that ends most agency relationships badly.",
  },
  {
    name: "Show, don't report",
    body: "A status report is easy to write and impossible to verify. A live URL is neither. Every sprint ends with something you can open, click, and dislike out loud while there is still time to change it.",
  },
  {
    name: "Ownership is not a bargaining chip",
    body: "Code, accounts, domains and infrastructure are yours and transfer at launch. Some agencies keep hold of these to guarantee a retainer. We would rather earn the next engagement by having done the last one well.",
  },
  {
    name: "The honest no",
    body: "Some projects don't need an agency yet, and some need a different one. Saying so on the call costs us a proposal and saves you a quarter. We would rather be the studio that told you the truth early.",
  },
];

/**
 * The panel under the founder copy. Everything here is checkable somewhere
 * public, which is the point: a bio is a claim, a fact table is an invitation
 * to go and look.
 */
const FOUNDER_FACTS: { label: string; value: React.ReactNode }[] = [
  { label: "On your project as", value: "Founder, strategy through handover" },
  {
    label: "Also",
    value: "Co-Founder & COO, Product, AfroMadeIt Global",
  },
  {
    label: "Domains",
    value: "Fintech, ecommerce, media, AI decision support",
  },
  { label: "Shipped", value: "Vuvu.ng, Farm Buddy, AfroMadeIt Global" },
  { label: "Markets", value: "US, UK, Nigeria. Priced in NGN or USD" },
  {
    label: "Elsewhere",
    value: (
      <a href={FOUNDER.profileUrl} rel="me noopener" className="underline">
        LinkedIn
      </a>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>About</Kicker>
          <h1 className="-ml-[0.05em] max-w-[20ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            Small studio. Direct work.
          </h1>
          <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-muted">
            TreeInAPool is a product development agency: a small, senior team
            that takes prototypes and rough operations and turns them into
            software people rely on.
          </p>
        </Container>
      </section>

      {/* Origin */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
          <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
            Origin
          </h2>
          <div>
            <p className="max-w-[62ch] text-[17px] leading-7">
              Most software projects don&apos;t fail in the code. They fail in
              the gap between what a client thought they were buying and what
              the agency thought it was building. It is a gap that only shows up
              at the end, when it&apos;s expensive.
            </p>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-7 text-muted">
              TreeInAPool came out of building. Vuvu.ng set the standard.
              Bill payments are unglamorous and unforgiving: the flows are
              short, the tolerance for error is zero, and the product only
              counts once it sits on the phone people already pay with, which
              meant defining every journey from onboarding to receipt and
              taking the web app into both stores rather than stopping at a
              URL.
            </p>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-7 text-muted">
              Farm Buddy was the opposite discipline, a question about input
              rather than output. Its users were never going to type a
              description in English, so the camera became the primary input,
              a voice note became a valid one, and a multimodal model turned a
              photograph into a diagnosis and something to do about it. That
              is a product decision before it is a technical one, and getting
              it wrong would have produced a demo nobody could use.
              AfroMadeIt Global was a third kind of problem, where the build
              is not the hard part and deciding what the business actually
              claims is.
            </p>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-7 text-muted">
              The pattern across all three was the same. The interesting work
              was never the demo. It was the distance between something that
              runs and something a stranger can depend on. Closing that
              distance is what this studio sells.
            </p>
            <div className="mt-8 border-t border-[var(--color-divider)] pt-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                Why &quot;TreeInAPool&quot;
              </span>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-7 text-muted">
                A prototype is a cut flower. It looks alive, it photographs
                well, and it is already dying, because nothing underneath is
                feeding it. A tree is the other thing: rooted, slower to get
                going, and still standing next season. The pool is where we keep
                finding them, a contained space nobody planted for, holding
                something that has to grow anyway. The name is a reminder of
                which of the two we are being paid to produce.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <Kicker>What we hold ourselves to</Kicker>
          <div className="grid gap-6 sm:grid-cols-2">
            {VALUES.map((value, index) => (
              <Frame key={value.name} className="p-6">
                <span className="block text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl uppercase leading-6 tracking-wide">
                  {value.name}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[15px] leading-7 text-muted">
                  {value.body}
                </p>
              </Frame>
            ))}
          </div>
        </Container>
      </section>

      {/* How we work */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
          <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
            How we work
          </h2>
          <div>
            <p className="max-w-[62ch] text-[16px] leading-7 text-muted">
              Every engagement runs the same four stages, whether it&apos;s a
              three-week automation or a fourteen-week build. The durations
              change; the shape doesn&apos;t.
            </p>
            <div className="mt-8 border-t border-[var(--color-divider)]">
              {PROCESS_STAGES.map((stage) => (
                <div
                  key={stage.n}
                  className="grid gap-2 border-b border-[var(--color-divider)] py-4 sm:grid-cols-[64px_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="text-lg text-[var(--color-accent-700)]">
                    {stage.n}
                  </span>
                  <span className="text-[15px] leading-6">
                    <span className="font-[family-name:var(--font-heading)] text-lg font-semibold uppercase">
                      {stage.name}
                    </span>
                    <span className="mt-1 block text-muted">{stage.body}</span>
                  </span>
                  <span className="whitespace-nowrap text-sm text-muted-2">
                    {stage.duration}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <CtaLink
                href="/process"
                variant="ghost"
                page="about"
                position="how-we-work"
              >
                Read the full process →
              </CtaLink>
            </p>
          </div>
        </Container>
      </section>

      {/* Founder */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[4fr_8fr] md:items-start">
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-[var(--color-divider)]">
            <Image
              src={founderPhoto}
              alt="Olaseni Otusanya, founder of TreeInAPool"
              fill
              sizes="(min-width: 768px) 320px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
              Founder
            </span>
            <h2 className="mt-2 text-3xl uppercase leading-[1.1] tracking-wide">
              Olaseni Otusanya
            </h2>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-7 text-muted">
              TreeInAPool is run as a small, hands-on studio rather than a large
              agency with account layers between you and the people building
              your product. On most engagements the founder is in the discovery
              call and the sprint demos, not just the sales call.
            </p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-muted">
              Olaseni is a product and operations lead by trade. Roadmaps,
              PRDs, acceptance criteria, release plans, and a backlog
              prioritised by impact against effort rather than by whoever
              asked most recently. He has run that work across fintech,
              ecommerce and media, which is a polite way of saying he has
              shipped in the three categories where being wrong is visible to
              everybody by Tuesday.
            </p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-muted">
              At Baniri Technologies he owned the definition and launch of
              Vuvu.ng, writing the flows and acceptance criteria for every
              bill-payment journey from onboarding through to the receipt, and
              taking it from a web app to a listing in both stores. He is
              Co-Founder and COO for product at AfroMadeIt Global, a strategic
              HR consultancy operating across US, UK and African markets. His
              own engineering runs to computer vision, forecasting and
              language automation: decision-support systems, where a
              confidently wrong answer costs somebody real money.
            </p>
            <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-muted">
              He arrived at product from an evidence discipline rather than
              from design or engineering, which shows up as an unfashionable
              interest in whether a thing is actually being used, by whom, and
              instead of what. He reads more papers than is strictly good for
              him, holds opinions about empty states he is glad to defend at
              length, and will tell you your project does not need an agency
              yet when that is the true answer. The thread through all of it
              is a mild allergy to software that demos beautifully and folds
              the moment a stranger touches it. Most of this job is declining
              to be impressed by your own prototype.
            </p>

            <Frame className="mt-8 p-5">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                Facts
              </span>
              {FOUNDER_FACTS.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-2 text-sm ${
                    index < FOUNDER_FACTS.length - 1
                      ? "border-b border-[var(--color-divider)]"
                      : ""
                  }`}
                >
                  <span className="text-muted">{fact.label}</span>
                  <span className="text-right text-[15px]">{fact.value}</span>
                </div>
              ))}
            </Frame>

            <div className="mt-8 border-t border-[var(--color-divider)] pt-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                How the team scales
              </span>
              <p className="mt-3 max-w-[62ch] text-[16px] leading-7 text-muted">
                Core discovery, design and architecture stay with the founder on
                every project. Build capacity flexes with a small bench of
                vetted engineers and designers brought in per engagement,
                briefed by, and accountable to, the same person you talked to on
                the discovery call.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <FaqSection items={faqsForPage("/about")} page="/about" />
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Talk to the person building it
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Thirty minutes, direct with the founder, no account manager relay.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="about" position="closing-cta">
              Book a free discovery call
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
