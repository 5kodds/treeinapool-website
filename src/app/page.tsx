import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { QuoteCarousel } from "@/components/QuoteCarousel";
import { TrustBar } from "@/components/TrustBar";
import { RevealCard } from "@/components/RevealCard";
import { AltFeatureSection } from "@/components/AltFeatureSection";
import { FaqSection } from "@/components/FaqSection";
import { SprintPlan } from "@/components/SprintPlan";
import { ContactForm } from "@/components/ContactForm";
import { SectionReveal } from "@/components/ui/SectionReveal";
import {
  faqsForPage,
  PERSONALITY_STATEMENT,
  SERVICES,
  SHOW_PLACEHOLDER_PROOF,
  SHOW_WHATSAPP,
  TESTIMONIALS,
  TRUST_ITEMS,
  WHY_US,
} from "@/lib/site";
import { getFeaturedCaseStudies } from "@/lib/case-studies";

export default function Home() {
  const caseStudies = getFeaturedCaseStudies(2);
  const quotes = TESTIMONIALS.filter(
    (quote) => SHOW_PLACEHOLDER_PROOF || !quote.placeholder,
  );
  const trustItems = TRUST_ITEMS.filter(
    (item) => SHOW_PLACEHOLDER_PROOF || !item.placeholder,
  );
  const homeFaqs = faqsForPage("/").slice(0, 5);

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-14 md:pt-24 md:pb-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_4fr] md:items-end md:gap-14">
          <div>
            <h1 className="-ml-[0.05em] text-[clamp(40px,9vw,84px)] uppercase leading-[1.03] tracking-wide">
              <span className="block">We turn prototypes</span>
              <span className="block">into products</span>
              <span className="block text-[var(--color-accent-700)]">
                people pay for.
              </span>
            </h1>
            <p className="mt-8 max-w-[56ch] text-[17px] leading-7 text-muted">
              TreeInAPool is a product development agency. Bring us a no-code
              prototype, a spreadsheet, or a sketch on a whiteboard — we ship
              the production version, designed and built to be maintained.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/contact" page="home" position="hero">
                Book a free discovery call
              </CtaLink>
              <CtaLink
                href="/work"
                variant="ghost"
                page="home"
                position="hero-secondary"
              >
                See the work
              </CtaLink>
            </div>
          </div>
          <Frame className="p-5">
            <span className="kicker">Credibility line</span>
            <p className="mt-3 text-[26px] uppercase leading-[30px]">
              [ 00 ] products shipped since [ year ]
            </p>
            <p className="mt-3 text-[13px] leading-5 text-muted-2">
              Placeholder — needs the real count before launch. No fake logos,
              no invented metrics.
            </p>
          </Frame>
        </Container>
      </section>

      {/* Social proof */}
      {trustItems.length > 0 && (
        <Container>
          <TrustBar items={trustItems} />
        </Container>
      )}

      {quotes.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
          <Container>
            <Kicker>What clients say</Kicker>
            <QuoteCarousel quotes={quotes} />
          </Container>
        </section>
      )}

      {/* Personality statement */}
      <section className="py-14 md:py-20">
        <Container>
          <p className="max-w-[26ch] font-[family-name:var(--font-heading)] text-[clamp(30px,4.4vw,56px)] font-semibold uppercase leading-[1.08] tracking-wide">
            {PERSONALITY_STATEMENT}
          </p>
        </Container>
      </section>

      {/* Services */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionReveal>
            <Kicker>01 · What we build</Kicker>
            <div className="grid gap-8 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <RevealCard key={service.id} service={service} />
              ))}
            </div>
          </SectionReveal>
        </Container>
      </section>

      {/* Why TreeInAPool */}
      <section className="py-14 md:py-20">
        <Container>
          <SectionReveal>
            <Kicker>02 · Why TreeInAPool</Kicker>
            <AltFeatureSection blocks={WHY_US} />
          </SectionReveal>
        </Container>
      </section>

      {/* Featured work */}
      {caseStudies.length > 0 && (
        <section className="py-14 md:py-20">
          <Container>
            <SectionReveal>
              <Kicker>03 · Selected work</Kicker>
              <div className="grid gap-10 sm:grid-cols-2">
                {caseStudies.map((cs) => (
                  <CaseStudyCard key={cs.slug} caseStudy={cs} />
                ))}
              </div>
              <p className="mt-8">
                <Link href="/work" className="text-[14px] leading-6 underline">
                  See every case study →
                </Link>
              </p>
            </SectionReveal>
          </Container>
        </section>
      )}

      {/* Process teaser */}
      <section className="py-14 md:py-20">
        <Container>
          <Kicker>04 · How an engagement runs</Kicker>
          <div className="grid gap-8 border-t border-[var(--color-divider)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                name: "Discover",
                body: "One call, one written scope. You leave knowing price and timeline. 1 week.",
              },
              {
                n: "02",
                name: "Design",
                body: "Flows and screens you approve before a line of product code is written. 2 weeks.",
              },
              {
                n: "03",
                name: "Build",
                body: "Weekly demo on a live URL. You test what exists, not a status report. 4–10 weeks.",
              },
              {
                n: "04",
                name: "Launch",
                body: "Deploy, hand over the code and the accounts, then 30 days of support.",
              },
            ].map((stage, i, arr) => (
              <div
                key={stage.n}
                className={`py-6 ${i < arr.length - 1 ? "lg:border-r lg:border-[var(--color-divider)]" : ""} ${i === 0 ? "lg:pr-6" : "lg:px-6"}`}
              >
                <span className="text-[34px] leading-[34px] text-[var(--color-accent-700)]">
                  {stage.n}
                </span>
                <h3 className="mt-3 text-xl uppercase leading-[22px] tracking-wide">
                  {stage.name}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">
                  {stage.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/process" className="text-[14px] leading-6 underline">
              Read the full process, stage by stage →
            </Link>
          </p>
        </Container>
      </section>

      {/* Roadmap */}
      <section className="py-14 md:py-20">
        <Container>
          <Kicker>05 · The roadmap you get on day one</Kicker>
          <div className="grid gap-12 md:grid-cols-[7fr_4fr] md:items-start">
            <SprintPlan />
            <div>
              <h2 className="text-[32px] uppercase leading-[34px] tracking-wide">
                No black box
              </h2>
              <p className="mt-4 text-[15px] leading-6 text-muted">
                Two-week sprints, each ending in something you can open and
                click. The roadmap is agreed before we start and re-published
                every sprint, so you always know what shipped, what slipped, and
                what is next.
              </p>
              <div className="mt-6 border-t border-[var(--color-divider)]">
                {[
                  ["Sprint length", "2 weeks"],
                  ["Demo cadence", "Every sprint"],
                  ["Scope changes", "Priced, in writing"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-4 border-b border-[var(--color-divider)] py-2.5 text-sm"
                  >
                    <span>{label}</span>
                    <span className="text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20">
        <Container>
          <FaqSection
            items={homeFaqs}
            page="/"
            title="06 · Questions we get asked"
          />
        </Container>
      </section>

      {/* Book the call */}
      <section className="py-14 md:pb-20 md:pt-16">
        <Container className="grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <Kicker>07 · Book the call</Kicker>
            <h2 className="text-[clamp(30px,3.6vw,46px)] uppercase leading-[1.06] tracking-wide">
              Thirty minutes, and you leave with a scope
            </h2>
            <p className="mt-5 max-w-[52ch] text-base leading-7 text-muted">
              Bring whatever you have. We will tell you what it takes to ship
              it, what it costs, and whether we are the right people to build
              it.
            </p>
            {SHOW_WHATSAPP && (
              <div className="mt-7">
                <WhatsAppLink />
              </div>
            )}
          </div>
          <Frame className="p-0">
            <div className="border-b border-[var(--color-divider)] px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em] text-muted">
              Tell us what you&apos;re building
            </div>
            <div className="p-6">
              <ContactForm compact />
            </div>
          </Frame>
        </Container>
      </section>
    </>
  );
}
