import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Tag } from "@/components/ui/Tag";
import { CtaLink } from "@/components/ui/CtaLink";
import {
  getAllTeardowns,
  getTeardownBySlug,
  TEARDOWN_DISCLAIMER,
} from "@/lib/teardowns";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllTeardowns().map((teardown) => ({ slug: teardown.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const teardown = getTeardownBySlug(slug);
  if (!teardown) return {};

  return {
    title: `${teardown.title}, teardown`,
    description: teardown.summary,
    alternates: { canonical: `/teardowns/${teardown.slug}` },
  };
}

export default async function TeardownPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const teardown = getTeardownBySlug(slug);
  if (!teardown) notFound();

  return (
    <>
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="pt-6 text-[13px] tracking-wide text-muted-2"
        >
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          <span className="px-1.5">/</span>{" "}
          <Link href="/teardowns" className="underline">
            Teardowns
          </Link>{" "}
          <span className="px-1.5">/</span> <span>{teardown.title}</span>
        </nav>
      </Container>

      <section className="pt-8 pb-10">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <Tag variant="outline">Teardown</Tag>
            {teardown.sector && <Tag>{teardown.sector}</Tag>}
            <span className="text-[13px] text-muted-2">
              Audited {teardown.auditedOn}
            </span>
          </div>

          <h1 className="-ml-[0.05em] mt-5 max-w-[24ch] text-[clamp(32px,4.6vw,62px)] uppercase leading-[1.06] tracking-wide">
            {teardown.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-7 text-muted">
            {teardown.summary}
          </p>

          <div className="mt-8 border-l-2 border-[var(--color-accent-600)] bg-[color-mix(in_srgb,var(--color-accent-600)_6%,transparent)] px-5 py-4">
            <p className="m-0 max-w-[70ch] text-[15px] leading-6">
              <strong>{TEARDOWN_DISCLAIMER}</strong> {teardown.subject} did not
              commission this analysis and has no relationship with TreeInAPool.
              Everything below is drawn from publicly observable behaviour on
              the date stated, and describes the artefact, not the team who
              built it.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-10">
        <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
          <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
            Subject
          </h2>
          <Frame className="p-0">
            <div className="grid sm:grid-cols-3">
              {[
                ["Subject", teardown.subject],
                ["Sector", teardown.sector || ", "],
                ["Audited on", teardown.auditedOn],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  className={`px-6 py-5 ${index < 2 ? "border-b border-[var(--color-divider)] sm:border-b-0 sm:border-r" : ""} border-[var(--color-divider)]`}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {label}
                  </span>
                  <p className="mt-2 text-[20px] uppercase leading-[24px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Frame>
        </Container>
      </section>

      {teardown.findings.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-10">
          <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
            <div>
              <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
                Findings
              </h2>
              <p className="mt-3 max-w-[32ch] text-[13px] leading-5 text-muted-2">
                Each finding carries how it was observed and when. Anything
                undated is not published.
              </p>
            </div>
            <div className="border-t border-[var(--color-divider)]">
              {teardown.findings.map((finding, index) => (
                <div
                  key={finding.claim}
                  className="border-b border-[var(--color-divider)] py-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[13px] font-semibold tracking-[0.08em] text-[var(--color-accent-700)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[19px] uppercase leading-[24px] tracking-wide">
                      {finding.claim}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-[64ch] text-[15px] leading-7 text-muted">
                    {finding.detail}
                  </p>
                  <p className="mt-3 text-[13px] leading-5 text-muted-2">
                    Source: {finding.source} · Observed {finding.observedOn}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {teardown.hypothesis && (
        <section className="border-t border-[var(--color-divider)] py-10">
          <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
            <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
              Hypothesis
            </h2>
            <p className="max-w-[64ch] text-[17px] leading-7">
              {teardown.hypothesis}
            </p>
          </Container>
        </section>
      )}

      {teardown.architecture.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-10">
          <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
            <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
              What we&apos;d build
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {teardown.architecture.map((item, index) => (
                <Frame key={item.title} className="p-5">
                  <span className="block text-[28px] leading-[28px] text-[var(--color-accent-700)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2.5 text-[19px] uppercase leading-[22px] tracking-wide">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-muted">
                    {item.body}
                  </p>
                </Frame>
              ))}
            </div>
          </Container>
        </section>
      )}

      {teardown.predictions.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-10">
          <Container>
            <span className="kicker">The prediction</span>
            <hr className="hr mb-8" />
            <p className="mb-8 max-w-[70ch] text-[15px] leading-7 text-muted">
              A teardown without a falsifiable prediction is just an opinion.
              Each row below states what we expect to change, and how it would
              be measured after launch.
            </p>
            <Frame className="p-0">
              <div
                className="overflow-x-auto"
                role="region"
                aria-label="Prediction table"
                tabIndex={0}
              >
                <table className="table-tp min-w-[720px]">
                  <thead>
                    <tr>
                      <th scope="col">Metric</th>
                      <th scope="col">Observed now</th>
                      <th scope="col">Predicted</th>
                      <th scope="col">How it gets measured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teardown.predictions.map((prediction) => (
                      <tr key={prediction.metric}>
                        <td className="text-[15px]">{prediction.metric}</td>
                        <td className="whitespace-nowrap text-lg">
                          {prediction.current}
                        </td>
                        <td className="whitespace-nowrap text-lg text-[var(--color-accent-700)]">
                          {prediction.predicted}
                        </td>
                        <td className="text-[14px] text-muted">
                          {prediction.measurementPlan}
                          <span className="mt-1 block text-[12px] text-muted-2">
                            Baseline source: {prediction.source} ·{" "}
                            {prediction.observedOn}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Frame>
          </Container>
        </section>
      )}

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Disagree with any of this?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Tell us where the analysis is wrong and we&apos;ll publish the
              correction. If you&apos;d rather have it done on your own site,
              that&apos;s a conversation too.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink
              href="/contact?type=rebuild"
              page="teardown"
              position="closing-cta"
            >
              Talk about a rebuild
            </CtaLink>
          </div>
        </Container>
      </section>
    </>
  );
}
