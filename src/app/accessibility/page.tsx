import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { CONTACT_EMAIL } from "@/lib/site";
import { getPerformanceReport } from "@/lib/performance";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Our accessibility commitment for this site: WCAG 2.1 AA as the target, what gets tested, and how to report a problem.",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  const report = getPerformanceReport();
  const home = report?.pages.find((page) => page.path === "/");

  return (
    <section className="py-14 md:py-20">
      <Container>
        <Kicker>Accessibility</Kicker>
        <h1 className="-ml-[0.05em] max-w-[20ch] text-[clamp(32px,4.4vw,54px)] uppercase leading-[1.06] tracking-wide">
          What we commit to, and how to hold us to it
        </h1>

        <div className="mt-10 grid gap-12 md:grid-cols-[8fr_4fr] md:items-start">
          <div className="article-body max-w-[68ch]">
            <h2>The target</h2>
            <p>
              We aim for this site to conform to{" "}
              <a
                href="https://www.w3.org/TR/WCAG21/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WCAG 2.1 Level AA
              </a>
              . That is a commitment, not a certification: it means we test
              against it, we treat failures as bugs, and we fix them rather than
              documenting them as known issues.
            </p>

            <h2>What gets tested, and how</h2>
            <ul>
              <li>
                <strong>Automated.</strong> <code>npm run a11y</code> runs
                axe-core against every route at desktop and mobile widths and
                fails the build on any serious or critical violation. It runs in
                CI on every push.
              </li>
              <li>
                <strong>Keyboard.</strong> Every interactive element —
                navigation dropdowns, the mobile menu, accordions, the quote
                carousel, both forms — is reachable and operable with a keyboard
                alone, with a visible focus ring and Escape closing anything
                that opens.
              </li>
              <li>
                <strong>Motion.</strong> Animation is decoration. Visitors with{" "}
                <code>prefers-reduced-motion</code> set see content in its final
                state immediately, and nothing auto-advances.
              </li>
              <li>
                <strong>Zoom.</strong> Pinch-zoom is never disabled. Text scales
                to 200% without loss of content, which is why you will not find{" "}
                <code>user-scalable=no</code> in our markup.
              </li>
            </ul>

            <h2>Where we know we fall short</h2>
            <p>
              Automated tools catch roughly a third of accessibility problems.
              We have not yet run this site past assistive-technology users, and
              until we have, that is an honest gap rather than a solved problem.
              Where placeholder content still sits on the site, it is marked as
              placeholder rather than dressed up as real.
            </p>

            <h2>Reporting a problem</h2>
            <p>
              If something here is hard or impossible to use, email{" "}
              <a href={`mailto:${CONTACT_EMAIL}?subject=Accessibility`}>
                {CONTACT_EMAIL}
              </a>{" "}
              with the page and what happened. We reply within one business day
              and treat access barriers as higher priority than feature work.
            </p>

            <h2>The same standard on client work</h2>
            <p>
              Accessibility and performance budgets are part of every build
              scope, not an upsell. The QA pass before launch covers both, and
              the numbers go in the handover document.
            </p>
          </div>

          <Frame className="p-6">
            <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
              Current measurement
            </span>
            {home ? (
              <>
                <p className="mt-4 font-[family-name:var(--font-heading)] text-[44px] font-semibold leading-none">
                  {home.scores.accessibility}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-muted-2">
                  Lighthouse accessibility score, home page, measured{" "}
                  {report?.measuredOn}.
                </p>
                <p className="mt-4 border-t border-[var(--color-divider)] pt-4 text-[13px] leading-5 text-muted-2">
                  A score is a smoke test, not a pass mark. The axe run and the
                  keyboard pass are what we actually gate on.
                </p>
              </>
            ) : (
              <p className="mt-4 text-[15px] leading-6 text-muted">
                No measured run recorded yet — run <code>npm run perf</code>.
              </p>
            )}
          </Frame>
        </div>
      </Container>
    </section>
  );
}
