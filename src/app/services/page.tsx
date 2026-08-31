import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CtaLink } from "@/components/ui/CtaLink";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Accordion } from "@/components/ui/Accordion";
import { FaqSection } from "@/components/FaqSection";
import {
  CURRENCY_NOTE,
  faqsForPage,
  SERVICES,
  SHOW_WHATSAPP,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four fixed-scope ways to work with TreeInAPool: prototype to production, product design, full-cycle builds, and AI & automation.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container className="grid gap-12 md:grid-cols-[7fr_4fr] md:items-end">
          <div>
            <Kicker>Services</Kicker>
            <h1 className="-ml-[0.05em] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
              <span className="block">Four ways in.</span>
              <span className="block">One fixed scope each.</span>
            </h1>
            <p className="mt-7 max-w-[56ch] text-[17px] leading-7 text-muted">
              Every engagement is priced and dated before it starts. Pick the
              one that matches where you are; if none of them do, the discovery
              call sorts it out.
            </p>
          </div>
          <Frame className="p-0">
            <div className="border-b border-[var(--color-divider)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              Jump to
            </div>
            <div className="flex flex-col">
              {SERVICES.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.code.toLowerCase()}`}
                  className={`px-5 py-2.5 text-sm ${i < SERVICES.length - 1 ? "border-b border-[var(--color-divider)]" : ""}`}
                >
                  {s.code} · {s.name}
                </a>
              ))}
            </div>
          </Frame>
        </Container>
      </section>

      {/* Comparison table */}
      <section className="pb-14 md:pb-16">
        <Container>
          <Frame className="p-0">
            <header className="flex flex-wrap border-b border-[var(--color-divider)]">
              <span className="min-w-[16ch] flex-1 px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em]">
                Service comparison
              </span>
              <span className="whitespace-nowrap border-l border-[var(--color-divider)] px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em] text-muted">
                {CURRENCY_NOTE}
              </span>
            </header>
            <div className="overflow-x-auto">
              <table className="table-tp min-w-[640px]">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Service</th>
                    <th scope="col">Who it&apos;s for</th>
                    <th scope="col">Timeline</th>
                    <th scope="col">Starting from</th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((s) => (
                    <tr key={s.id}>
                      <td className="pl-6 text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                        {s.code}
                      </td>
                      <td className="text-[15px]">{s.name}</td>
                      <td className="text-[15px] text-muted">{s.who}</td>
                      <td className="whitespace-nowrap text-lg">
                        {s.timeline}
                      </td>
                      <td className="whitespace-nowrap text-lg">
                        {s.bandNgn} / {s.bandUsd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="m-0 border-t border-[var(--color-divider)] px-6 py-3 text-[13px] leading-6 text-muted">
              Bands are placeholders pending the founder&apos;s final numbers
              (decision D3). Final scope and price are confirmed in writing
              after the discovery call.
            </p>
          </Frame>
        </Container>
      </section>

      {/* Service detail sections */}
      {SERVICES.map((s) => (
        <section
          key={s.id}
          id={s.code.toLowerCase()}
          className="border-t border-[var(--color-divider)] pt-10 pb-16"
        >
          <Container className="grid gap-12 md:grid-cols-[4fr_8fr]">
            <div>
              <span className="block text-[34px] leading-[34px] text-[var(--color-accent-700)]">
                {s.code}
              </span>
              <h2 className="mt-3 text-[34px] uppercase leading-[36px] tracking-wide">
                {s.name}
              </h2>
              <p className="mt-4 text-[15px] leading-6 text-muted">
                {s.summary}
              </p>
              <div className="mt-6">
                <CtaLink
                  href="/contact"
                  page="services"
                  position={`detail-${s.code}`}
                >
                  Book a call about {s.code}
                </CtaLink>
              </div>
            </div>

            <div className="grid gap-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                    What it is
                  </span>
                  <p className="max-w-[60ch] text-[15px] leading-7 text-muted">
                    {s.whatItIs}
                  </p>
                </div>
                <div>
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                    Who it&apos;s for
                  </span>
                  <p className="max-w-[60ch] text-[15px] leading-7 text-muted">
                    {s.whoItsFor}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Frame className="p-5">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                    What&apos;s included
                  </span>
                  <ul className="list-disc space-y-1 pl-[18px] text-sm leading-6">
                    {s.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Frame>
                <Frame className="p-5">
                  <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                    Facts
                  </span>
                  <div className="flex justify-between gap-3 border-b border-[var(--color-divider)] py-2 text-sm">
                    <span>Timeline</span>
                    <span className="whitespace-nowrap text-lg">
                      {s.timeline}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3 border-b border-[var(--color-divider)] py-2 text-sm">
                    <span>From</span>
                    <span className="whitespace-nowrap text-lg">
                      {s.bandNgn} / {s.bandUsd}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3 py-2 text-sm">
                    <span>You end up owning</span>
                    <span className="whitespace-nowrap text-lg">{s.owns}</span>
                  </div>
                </Frame>
              </div>

              <div>
                <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                  {s.code} questions
                </span>
                <Accordion
                  items={s.faqs}
                  page={`/services#${s.code.toLowerCase()}`}
                />
              </div>
            </div>
          </Container>
        </section>
      ))}

      {/* General FAQs */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <FaqSection items={faqsForPage("/services")} page="/services" />
        </Container>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Not sure which one you need?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              That is what the discovery call is for. Thirty minutes, and you
              leave with a recommendation in writing — including &quot;you
              don&apos;t need us yet&quot; when that is the honest answer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="services" position="closing-cta">
              Book a free discovery call
            </CtaLink>
            {SHOW_WHATSAPP && <WhatsAppLink className="btn btn-ghost" />}
          </div>
        </Container>
      </section>
    </>
  );
}
