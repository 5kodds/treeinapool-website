import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { CtaLink } from "@/components/ui/CtaLink";
import { InsightReadTracker } from "@/components/InsightReadTracker";
import { renderMarkdown } from "@/lib/markdown";
import {
  getAllInsights,
  getInsightBySlug,
  getRelatedInsights,
} from "@/lib/insights";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllInsights().map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return {};

  return {
    title: insight.title,
    description: insight.summary,
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: insight.title,
      description: insight.summary,
      type: "article",
      publishedTime: insight.date,
      url: `${SITE_URL}/insights/${insight.slug}`,
    },
  };
}

export default async function InsightPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const { html, toc } = renderMarkdown(insight.body);
  const related = getRelatedInsights(slug, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.summary,
    datePublished: insight.date,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: `${SITE_URL}/insights/${insight.slug}`,
  };

  return (
    <>
      <InsightReadTracker slug={slug} />

      <Container>
        <nav
          aria-label="Breadcrumb"
          className="pt-6 text-[13px] tracking-wide text-muted-2"
        >
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          <span className="px-1.5">/</span>{" "}
          <Link href="/insights" className="underline">
            Insights
          </Link>{" "}
          <span className="px-1.5">/</span> <span>{insight.title}</span>
        </nav>
      </Container>

      <section className="pt-8 pb-10 md:pb-12">
        <Container>
          <div className="flex flex-wrap items-center gap-3">
            <Tag>{insight.category}</Tag>
            <span className="text-[13px] text-muted-2">
              {insight.date} · {insight.readingTime}
            </span>
          </div>
          <h1 className="-ml-[0.05em] mt-5 max-w-[24ch] text-[clamp(32px,4.6vw,62px)] uppercase leading-[1.06] tracking-wide">
            {insight.title}
          </h1>
          <p className="mt-6 max-w-[62ch] text-[17px] leading-7 text-muted">
            {insight.summary}
          </p>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-12">
        <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
          {toc.length > 1 && (
            <nav
              aria-label="On this page"
              className="md:sticky md:top-24 md:self-start"
            >
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-accent-700)]">
                On this page
              </span>
              <ul className="flex flex-col gap-2 border-l border-[var(--color-divider)] pl-4">
                {toc.map((entry) => (
                  <li key={entry.id}>
                    <a
                      href={`#${entry.id}`}
                      className="text-[14px] leading-6 no-underline"
                    >
                      {entry.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <article
            className="article-body max-w-[70ch]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
          <Container>
            <span className="kicker">Read next</span>
            <hr className="hr mb-8" />
            <div className="grid gap-8 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/insights/${item.slug}`}
                  className="text-inherit no-underline"
                >
                  <article className="blueprint h-full p-6">
                    <i className="corner tl" aria-hidden="true" />
                    <i className="corner tr" aria-hidden="true" />
                    <i className="corner bl" aria-hidden="true" />
                    <i className="corner br" aria-hidden="true" />
                    <Tag>{item.category}</Tag>
                    <h3 className="mt-3 text-xl uppercase leading-6 tracking-wide">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-6 text-muted">
                      {item.summary}
                    </p>
                  </article>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Want this applied to your project?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Bring the messy version. Thirty minutes and you leave with a
              scope, a price, and a date.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="insight" position="closing-cta">
              Book a free discovery call
            </CtaLink>
          </div>
        </Container>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
