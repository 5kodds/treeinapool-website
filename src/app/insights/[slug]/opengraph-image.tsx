import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/lib/og-image";
import { getAllInsights, getInsightBySlug } from "@/lib/insights";

export const alt = "TreeInAPool insight";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getAllInsights().map((insight) => ({ slug: insight.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  return renderOgImage({
    kicker: insight ? `Insights · ${insight.category}` : "Insights",
    title: insight?.title ?? "Insights",
  });
}
