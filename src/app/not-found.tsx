import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { CtaLink } from "@/components/ui/CtaLink";
import { faqsForPage, NAV } from "@/lib/site";
import { getAllInsights } from "@/lib/insights";

export default function NotFound() {
  const destinations = NAV.filter((group) => group.href && !group.cta);
  const latest = getAllInsights().slice(0, 3);
  const questions = faqsForPage("/").slice(0, 3);

  return (
    <section className="py-20 md:py-24">
      <Container>
        <span className="kicker">404</span>
        <hr className="hr mb-8" />
        <h1 className="max-w-[18ch] text-[clamp(34px,5vw,60px)] uppercase leading-[1.06] tracking-wide">
          That page didn&apos;t ship.
        </h1>
        <p className="mt-6 max-w-[48ch] text-base leading-7 text-muted">
          The page you&apos;re looking for doesn&apos;t exist, or it moved.
          Here&apos;s everything else.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <Frame className="p-6">
            <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
              Go somewhere useful
            </span>
            <ul className="mt-4 flex flex-col gap-2 text-[15px]">
              {destinations.map((group) => (
                <li key={group.name}>
                  <Link href={group.href!}>{group.name}</Link>
                </li>
              ))}
            </ul>
          </Frame>

          {latest.length > 0 && (
            <Frame className="p-6">
              <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                Latest writing
              </span>
              <ul className="mt-4 flex flex-col gap-3 text-[15px] leading-6">
                {latest.map((insight) => (
                  <li key={insight.slug}>
                    <Link href={`/insights/${insight.slug}`}>
                      {insight.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Frame>
          )}

          <Frame className="p-6">
            <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
              Common questions
            </span>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] leading-6">
              {questions.map((faq) => (
                <li key={faq.q}>
                  <Link href="/process">{faq.q}</Link>
                </li>
              ))}
            </ul>
          </Frame>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <CtaLink href="/contact" page="404" position="body">
            Book a free discovery call
          </CtaLink>
          <CtaLink href="/" variant="secondary" page="404" position="body">
            Back to home
          </CtaLink>
        </div>
      </Container>
    </section>
  );
}
