import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${SITE_NAME} handles the information you send through this site.`,
};

export default function PrivacyPage() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <Kicker>Privacy</Kicker>
        <h1 className="-ml-[0.05em] max-w-[20ch] text-[clamp(32px,4.4vw,54px)] uppercase leading-[1.06] tracking-wide">
          What we collect, and why
        </h1>

        <Frame className="mt-8 p-5">
          <p className="m-0 text-[14px] leading-6 text-muted">
            <strong>Template copy pending legal review (D12).</strong> This page
            describes how the site is actually built, but it has not been
            reviewed by a lawyer and is not yet a binding privacy notice.
            Replace before launch.
          </p>
        </Frame>

        <div className="article-body mt-10 max-w-[70ch]">
          <h2>Information you give us</h2>
          <p>
            The contact form collects your name, email address, the type of
            project you select, the budget band you select, and whatever you
            write in the message field. The newsletter form collects your email
            address only.
          </p>
          <p>
            We use that information to reply to you and, where you asked for it,
            to send you new writing. We do not sell it, and we do not share it
            with anyone outside the delivery provider named below.
          </p>

          <h2>Where it goes</h2>
          <p>
            Form submissions are delivered to us by email through a third-party
            form provider. [ Name the provider and link its privacy policy once
            the provider decision is final — D14. ] Your message is stored in
            our email account for as long as the enquiry is relevant.
          </p>

          <h2>Analytics</h2>
          <p>
            The site records anonymous, aggregate usage events — which pages
            were viewed, which buttons were clicked — with no cookies and no
            cross-site tracking. We cannot identify an individual visitor from
            this data.
          </p>

          <h2>Your choices</h2>
          <p>
            You can ask us what we hold about you, ask us to correct it, or ask
            us to delete it. Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will
            act on it. Every newsletter email includes an unsubscribe link.
          </p>

          <h2>Changes</h2>
          <p>
            If this notice changes materially, the updated version is published
            here with a new date.
          </p>
        </div>
      </Container>
    </section>
  );
}
