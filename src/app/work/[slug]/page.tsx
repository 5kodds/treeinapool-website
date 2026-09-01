import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudyImages, imageAlt } from "@/lib/case-study-images";
import { Container } from "@/components/ui/Container";
import { Frame } from "@/components/ui/Frame";
import { Tag } from "@/components/ui/Tag";
import { StatTile } from "@/components/ui/StatTile";
import { CtaLink } from "@/components/ui/CtaLink";
import { CaseStudyReadTracker } from "@/components/CaseStudyReadTracker";
import { FaqSection } from "@/components/FaqSection";
import { faqsForPage, SITE_URL } from "@/lib/site";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};
  return {
    title: caseStudy.title,
    description: caseStudy.summary,
    alternates: { canonical: `/work/${caseStudy.slug}` },
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.summary,
      type: "article",
      url: `${SITE_URL}/work/${caseStudy.slug}`,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const all = getAllCaseStudies();
  const next = all[(all.findIndex((c) => c.slug === slug) + 1) % all.length];
  const images = caseStudyImages(slug);

  return (
    <>
      <CaseStudyReadTracker slug={slug} />

      <Container>
        <nav
          aria-label="Breadcrumb"
          className="pt-6 text-[13px] tracking-wide text-muted-2"
        >
          <Link href="/" className="underline">
            Home
          </Link>{" "}
          <span className="px-1.5">/</span>{" "}
          <Link href="/work" className="underline">
            Work
          </Link>{" "}
          <span className="px-1.5">/</span> <span>{caseStudy.title}</span>
        </nav>
      </Container>

      <section className="pt-8 pb-10 md:pb-12">
        <Container>
          <span className="kicker">
            Case study · {caseStudy.category} · {caseStudy.year}
          </span>
          <hr className="hr mb-7" />
          <h1 className="-ml-[0.05em] max-w-[22ch] text-[clamp(36px,5.4vw,76px)] uppercase leading-[1.04] tracking-wide">
            {caseStudy.title}
          </h1>
          <p className="mt-7 max-w-[58ch] text-[17px] leading-7 text-muted">
            {caseStudy.summary}
          </p>
        </Container>
      </section>

      <section className="pb-14">
        <Container>
          {images ? (
            <div className="relative aspect-[21/9] overflow-hidden border border-[var(--color-divider)]">
              <Image
                src={images.hero}
                alt={imageAlt(images, caseStudy.title)}
                fill
                priority
                sizes="(min-width: 1100px) 1040px, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className="flex aspect-[21/9] items-center justify-center border border-[var(--color-divider)]"
              style={{
                background:
                  "repeating-linear-gradient(135deg, color-mix(in srgb, var(--color-accent-600) 8%, transparent) 0 14px, transparent 14px 28px)",
              }}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-2">
                {caseStudy.category}
              </span>
            </div>
          )}
          {images?.credit && (
            <p className="mt-3 text-[13px] leading-6 text-muted-2">
              {images.credit}
            </p>
          )}
        </Container>
      </section>

      <section className="pb-16">
        <Container>
          <Frame className="p-0">
            <header className="flex flex-wrap border-b border-[var(--color-divider)]">
              <span className="min-w-[16ch] flex-1 px-6 py-3 text-[13px] font-semibold uppercase leading-6 tracking-[0.08em]">
                Client &amp; context
              </span>
            </header>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Client", caseStudy.client],
                ["Sector", caseStudy.sector],
                ["Engagement", caseStudy.engagement],
                ["Duration", caseStudy.duration],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`px-6 py-5 ${i < 3 ? "border-r border-[var(--color-divider)]" : ""} ${i > 0 ? "border-t sm:border-t-0" : ""} border-[var(--color-divider)]`}
                >
                  <span className="block text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {label}
                  </span>
                  <p className="mt-2 text-[22px] uppercase leading-[24px]">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </Frame>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-10">
        <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
          <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
            Problem
          </h2>
          <div>
            <p className="max-w-[64ch] text-[17px] leading-7">
              {caseStudy.problem}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {caseStudy.problemTags.map((tag) => (
                <Tag key={tag} variant="outline">
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-10">
        <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
          <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
            Approach
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {caseStudy.approach.map((step, i) => (
              <Frame key={step.title} className="p-5">
                <span className="block text-[28px] leading-[28px] text-[var(--color-accent-700)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2.5 text-[19px] uppercase leading-[22px] tracking-wide">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-6 text-muted">
                  {step.body}
                </p>
              </Frame>
            ))}
          </div>
        </Container>
      </section>

      {caseStudy.outcomes.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-10">
          <Container>
            <span className="kicker">Outcome</span>
            <hr className="hr mb-8" />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {caseStudy.outcomes.map((o) => (
                <StatTile key={o.label} stat={o.stat} label={o.label} />
              ))}
            </div>
            <p className="mt-7 max-w-[70ch] text-[13px] leading-6 text-muted-2">
              Every figure here must be one the client has confirmed. Where a
              number is not yet available, the cell stays bracketed rather than
              guessed.
            </p>
          </Container>
        </section>
      )}

      {caseStudy.stack.length > 0 && (
        <section className="border-t border-[var(--color-divider)] py-10">
          <Container className="grid gap-12 md:grid-cols-[3fr_9fr]">
            <h2 className="text-[28px] uppercase leading-[30px] tracking-wide">
              Stack
            </h2>
            <div className="flex flex-wrap content-start gap-2.5">
              {caseStudy.stack.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </Container>
        </section>
      )}

      {caseStudy.testimonial && (
        <section className="border-y border-[var(--color-divider)] bg-[color-mix(in_srgb,var(--color-accent-600)_7%,transparent)] py-16 md:py-20">
          <Container>
            <figure className="m-0">
              <blockquote className="m-0 max-w-[36ch] text-[clamp(26px,3.4vw,44px)] uppercase leading-[1.12] tracking-wide">
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 text-[15px] leading-6 text-muted">
                , {caseStudy.testimonial.name}
              </figcaption>
            </figure>
          </Container>
        </section>
      )}

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container>
          <FaqSection
            items={faqsForPage("/work")}
            page={`/work/${slug}`}
            title="Working with us"
          />
        </Container>
      </section>

      <section className="border-t border-[var(--color-divider)] py-14 md:py-16">
        <Container className="grid gap-10 md:grid-cols-[7fr_5fr] md:items-center">
          <div>
            <h2 className="text-[clamp(28px,3.4vw,44px)] uppercase leading-[1.06] tracking-wide">
              Have a process that looks like this?
            </h2>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-muted">
              Bring the messy version. Thirty minutes on a call and you will
              have a scope, a price, and a date.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <CtaLink href="/contact" page="case-study" position="closing-cta">
              Book a free discovery call
            </CtaLink>
            {next && next.slug !== slug && (
              <Link href={`/work/${next.slug}`} className="btn btn-ghost">
                Next case study →
              </Link>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
