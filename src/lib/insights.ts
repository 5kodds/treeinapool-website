import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "insights");

const WORDS_PER_MINUTE = 220;

export type Insight = {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  readingTime: string;
  draft: boolean;
  /** Raw markdown body. */
  body: string;
};

function readInsightFile(filename: string): Insight {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;

  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title ?? filename,
    date: data.date ? new Date(data.date).toISOString().slice(0, 10) : "",
    category: data.category ?? "General",
    summary: data.summary ?? "",
    readingTime:
      data.readingTime ??
      `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} min read`,
    draft: Boolean(data.draft),
    body: content.trim(),
  };
}

export function getAllInsights(): Insight[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readInsightFile)
    .filter((insight) => !insight.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getInsightBySlug(slug: string): Insight | undefined {
  return getAllInsights().find((insight) => insight.slug === slug);
}

export function getInsightCategories(): string[] {
  return [
    ...new Set(getAllInsights().map((insight) => insight.category)),
  ].sort();
}

export function getRelatedInsights(slug: string, limit = 2): Insight[] {
  const all = getAllInsights();
  const current = all.find((insight) => insight.slug === slug);
  if (!current) return [];

  const sameCategory = all.filter(
    (insight) => insight.slug !== slug && insight.category === current.category,
  );
  const rest = all.filter(
    (insight) => insight.slug !== slug && insight.category !== current.category,
  );

  return [...sameCategory, ...rest].slice(0, limit);
}
