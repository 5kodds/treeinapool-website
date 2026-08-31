import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";
import { getAllCaseStudies, getCaseStudyBySlug } from "@/lib/case-studies";

export const alt = "TreeInAPool case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  return renderOgImage({
    kicker: caseStudy ? `Case study · ${caseStudy.category}` : "Case study",
    title: caseStudy?.title ?? "Case study",
  });
}
