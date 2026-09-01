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
import { getPerformanceReport, formatMs } from "@/lib/performance";

export default function Home() {
  const caseStudies = getFeaturedCaseStudies(2);
  const quotes = TESTIMONIALS.filter(
    (quote) => SHOW_PLACEHOLDER_PROOF || !quote.placeholder,
  );
  const trustItems = TRUST_ITEMS.filter(
    (item) => SHOW_PLACEHOLDER_PROOF || !item.placeholder,
  );
  const homeFaqs = faqsForPage("/").slice(0, 5);
  const perf = getPerformanceReport();
  /**
   * Only a run against a real deployment earns a place on the home page. A
   * local build has no CDN and shares a CI machine, so its numbers swing by
   * fifteen points between runs: too noisy to headline, and publishing the
   * bad end would understate the product as badly as publishing the good end
   * would flatter it. Until `PERF_BASE_URL=<domain> npm run perf` has been
   * run, this block stays off and /performance carries the local figures
   * with their caveat.
   */
  const perfIsLive = Boolean(perf?.measuredAgainst?.includes("live deployment"));
  const perfHome = perfIsLive
    ? perf?.pages.find((page) => page.path === "/")
    : undefined;
  /**
   * A bare "96" and "2.6s" mean nothing to someone who does not use
   * Lighthouse daily, and a number shown without the target it is being
   * judged against is decoration. Each stat carries its scale, what it
   * actually means, and whether it clears the budget published on /process.
   */
  const homeStats = perfHome
    ? [
        {
          value: String(perfHome.scores.performance),
          scale: "/100",
          label: "Performance",
          plain: "How fast the page is to use, not just to look at",
          budget: "90 or above",
          pass: perfHome.scores.performance >= 90,
        },
        {
          value: String(perfHome.scores.accessibility),
          scale: "/100",
          label: "Accessibility",
          plain: "Usable with a keyboard, a screen reader, or poor eyesight",
          budget: "95 or above",
          pass: perfHome.scores.accessibility >= 95,
        },
        {
          value: formatMs(perfHome.vitals.lcpMs),
          scale: null,
          label: "Largest paint",
          plain: "When the main content finishes appearing on a 4G phone",
          budget: "under 2.5s",
          pass: perfHome.vitals.lcpMs < 2500,
        },
        {
          value: perfHome.vitals.cls.toFixed(3),
          scale: null,
          label: "Layout shift",
          plain: "How much the page jumps around while it loads",
          budget: "under 0.1",
          pass: perfHome.vitals.cls < 0.1,
        },
      ]
    : [];

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
              prototype, a spreadsheet, or a sketch on a whiteboard. We ship the
              production version, designed and built to be maintained.
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
            <span className="kicker">Proof you can open</span>
            <p className="mt-3 text-[26px] uppercase leading-[30px]">
              A payments product in both app stores, taking real money from
              real users
            </p>
            <p className="mt-3 text-[13px] leading-5 text-muted-2">
              Vuvu.ng shipped in November 2024 and has been running since.
              Every claim on this site links to the thing itself, and no figure
              goes up until the client has confirmed it.{" "}
              <Link href="/work" className="underline">
                See the work
              </Link>
              .
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

      {perfHome && (
        <section className="border-t border-[var(--color-divider)] py-12">
          <Container>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <span className="kicker mb-0">Measured, not claimed</span>
              <span className="text-[13px] text-muted-2">
                Lighthouse {perf?.measuredOn}, throttled mobile ·{" "}
                <Link href="/performance" className="underline">
                  how it was measured
                </Link>
              </span>
            </div>
            <p className="mt-4 max-w-[70ch] text-[15px] leading-6 text-muted">
              These are this site&apos;s own scores against the budgets we
              commit to on every build. We publish them because an agency that
              will not measure its own site is unlikely to measure yours.
            </p>
            <dl className="mt-6 grid grid-cols-1 gap-6 border-t border-[var(--color-divider)] pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {homeStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-[family-name:var(--font-heading)] text-[clamp(30px,3.4vw,44px)] font-semibold leading-none">
                    {stat.value}
                    {stat.scale && (
                      <span className="text-[0.5em] font-normal text-muted-2">
                        {stat.scale}
                      </span>
                    )}
                  </dd>
                  <dt className="mt-2 text-[13px] leading-5">
                    <span className="block font-semibold">{stat.label}</span>
                    <span className="mt-0.5 block text-muted-2">
                      {stat.plain}
                    </span>
                    <span
                      className={`mt-1 block text-[11px] uppercase tracking-[0.08em] ${
                        stat.pass
                          ? "text-[var(--color-accent-700)]"
                          : "text-muted"
                      }`}
                    >
                      {stat.pass ? "Meets" : "Misses"} our budget, {stat.budget}
                    </span>
                  </dt>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      )}

      {quotes.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
          <Container>
            <Kicker as="h2">What clients say</Kicker>
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
            <Kicker as="h2">01 · What we build</Kicker>
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
            <Kicker as="h2">02 · Why TreeInAPool</Kicker>
            <AltFeatureSection blocks={WHY_US} />
          </SectionReveal>
        </Container>
      </section>

      {/* Featured work */}
      {caseStudies.length > 0 && (
        <section className="py-14 md:py-20">
          <Container>
            <SectionReveal>
              <Kicker as="h2">03 · Selected work</Kicker>
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
          <Kicker as="h2">04 · How an engagement runs</Kicker>
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
          <Kicker as="h2">05 · The roadmap you get on day one</Kicker>
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
