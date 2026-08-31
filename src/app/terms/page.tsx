import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms that apply to using the ${SITE_NAME} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <Kicker>Terms</Kicker>
        <h1 className="-ml-[0.05em] max-w-[20ch] text-[clamp(32px,4.4vw,54px)] uppercase leading-[1.06] tracking-wide">
          Terms of use
        </h1>

        <Frame className="mt-8 p-5">
          <p className="m-0 text-[14px] leading-6 text-muted">
            <strong>Template copy pending legal review (D12).</strong> These
            terms cover the website only. They are not a services agreement, and
            they have not been reviewed by a lawyer. Replace before launch.
          </p>
        </Frame>

        <div className="article-body mt-10 max-w-[70ch]">
          <h2>What this covers</h2>
          <p>
            These terms apply to your use of this website. The terms of any
            actual engagement are set out in the written scope and contract
            signed for that project — nothing on this site replaces or overrides
            that document.
          </p>

          <h2>What&apos;s on the site</h2>
          <p>
            Timelines, price bands, and process descriptions published here are
            indicative. They become binding only when they appear in a signed
            scope. Articles are general information, not advice for your
            specific situation.
          </p>

          <h2>Ownership</h2>
          <p>
            The content and design of this site belong to {SITE_NAME}. You are
            welcome to quote or link to articles with attribution; please
            don&apos;t republish them wholesale.
          </p>

          <h2>Liability</h2>
          <p>
            The site is provided as is. We take reasonable care to keep it
            accurate and available, but we don&apos;t accept liability for
            decisions made solely on the basis of what is published here. [
            Clause to be reviewed and set by counsel — D12. ]
          </p>

          <h2>Contact</h2>
          <p>
            Questions about these terms go to{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </Container>
    </section>
  );
}
