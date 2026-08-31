import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Kicker } from "@/components/ui/Kicker";
import { Tag } from "@/components/ui/Tag";
import { CtaLink } from "@/components/ui/CtaLink";
import { getAllTeardowns, TEARDOWN_DISCLAIMER } from "@/lib/teardowns";

export const metadata: Metadata = {
  title: "Teardowns",
  description:
    "Unsolicited analyses of public sites: what we observed, when we observed it, what we would build instead, and the measurable prediction attached.",
  alternates: { canonical: "/teardowns" },
};

export default function TeardownsPage() {
  const teardowns = getAllTeardowns();

  return (
    <>
      <section className="pt-14 pb-10 md:pt-20 md:pb-12">
        <Container>
          <Kicker>Teardowns</Kicker>
          <h1 className="-ml-[0.05em] max-w-[22ch] text-[clamp(34px,5vw,68px)] uppercase leading-[1.04] tracking-wide">
            Analysis, done in public.
          </h1>
          <p className="mt-7 max-w-[60ch] text-[17px] leading-7 text-muted">
            Nobody asked us for these. We picked public sites, recorded what we
            could observe, wrote down what we would build instead, and attached
            a prediction that can be proved wrong. They are how we show our
            thinking without waiting for permission.
          </p>

          <div className="mt-8 border-l-2 border-[var(--color-accent-600)] bg-[color-mix(in_srgb,var(--color-accent-600)_6%,transparent)] px-5 py-4">
            <p className="m-0 max-w-[70ch] text-[15px] leading-6">
              <strong>{TEARDOWN_DISCLAIMER}</strong> Nothing here was
              commissioned, and no teardown describes work we were paid to do —
              those live under <Link href="/work">Work</Link>. We critique the
              artefact, never the people who built it.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-20">
        <Container>
          {teardowns.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2">
              {teardowns.map((teardown) => (
                <Link
                  key={teardown.slug}
                  href={`/teardowns/${teardown.slug}`}
                  className="text-inherit no-underline"
                >
                  <article className="blueprint lift h-full border-dashed p-6">
                    <i className="corner tl" aria-hidden="true" />
                    <i className="corner tr" aria-hidden="true" />
                    <i className="corner bl" aria-hidden="true" />
                    <i className="corner br" aria-hidden="true" />
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag variant="outline">Teardown</Tag>
                      {teardown.sector && <Tag>{teardown.sector}</Tag>}
                      <span className="text-[13px] text-muted-2">
                        {teardown.auditedOn}
                      </span>
                    </div>
                    <h2 className="mt-4 text-[26px] uppercase leading-[30px] tracking-wide">
                      {teardown.title}
                    </h2>
                    <p className="mt-3 text-[15px] leading-6 text-muted">
                      {teardown.summary}
                    </p>
                    <span className="mt-4 inline-block text-[13px] uppercase tracking-[0.06em] text-muted-2">
                      {TEARDOWN_DISCLAIMER}
                    </span>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <Frame className="p-6">
              <h2 className="text-xl uppercase">No teardowns published yet</h2>
              <p className="mt-3 max-w-[62ch] text-[15px] leading-6 text-muted">
                The format and the first subjects are awaiting sign-off
                (decisions D15 and D16). The template lives in{" "}
                <code>content/teardowns/</code> — publishing one is a matter of
                filling it in and clearing the draft flag.
              </p>
            </Frame>
          )}
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Want this done on your site?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Send the URL and we&apos;ll run the same analysis, with the
              numbers and the dates attached — no obligation to hire us
              afterwards.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink
              href="/contact?type=rebuild"
              page="teardowns"
              position="closing-cta"
            >
              Request a teardown
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
