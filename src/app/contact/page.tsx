import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Suspense } from "react";
import { ContactForm } from "@/components/ContactForm";
import { EnquiryTabs } from "@/components/EnquiryTabs";
import { FaqSection } from "@/components/FaqSection";
import { CONTACT_EMAIL, faqsForPage, SHOW_WHATSAPP } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Tell us what you're building. We reply within one business day with next steps.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <Container className="grid gap-14 md:grid-cols-[5fr_7fr] md:items-start">
          <div>
            <Kicker>Book the call</Kicker>
            <h1 className="-ml-[0.05em] text-[clamp(32px,4.4vw,54px)] uppercase leading-[1.06] tracking-wide">
              Thirty minutes, and you leave with a scope
            </h1>
            <p className="mt-6 max-w-[48ch] text-base leading-7 text-muted">
              Fill in the form and we&apos;ll reply within one business day to
              set up the call. Bring whatever you have: a prototype, a
              spreadsheet, or a sketch.
            </p>

            <div className="mt-8 space-y-1 border-t border-[var(--color-divider)] pt-6 text-sm">
              <p className="text-muted">Prefer another channel?</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="block underline">
                {CONTACT_EMAIL}
              </a>
              {SHOW_WHATSAPP && (
                <div className="pt-2">
                  <WhatsAppLink className="btn btn-ghost" />
                </div>
              )}
            </div>
          </div>

          {/* Anchor target for the "Book a call" CTA. Without it, clicking
              that button while already on /contact does nothing visible, and the most prominent control on the page reads
              as broken. */}
          <Frame className="scroll-mt-24 p-0" id="enquiry" tabIndex={-1}>
            <div className="border-b border-[var(--color-divider)] px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em] text-muted">
              Enquiry
            </div>
            <Suspense
              fallback={
                <div className="p-6">
                  <ContactForm />
                </div>
              }
            >
              <EnquiryTabs />
            </Suspense>
          </Frame>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <FaqSection items={faqsForPage("/contact")} page="/contact" />
        </Container>
      </section>
    </>
  );
}
