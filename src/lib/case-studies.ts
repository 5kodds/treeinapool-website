import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "case-studies");

export type ApproachStep = { title: string; body: string };
export type OutcomeStat = { stat: string; label: string };
export type Testimonial = { quote: string; name: string } | null;

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  year: number;
  client: string;
  sector: string;
  engagement: string;
  duration: string;
  summary: string;
  problem: string;
  problemTags: string[];
  approach: ApproachStep[];
  outcomes: OutcomeStat[];
  stack: string[];
  testimonial: Testimonial;
  featured: boolean;
};

function readCaseStudyFile(filename: string): CaseStudy {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data } = matter(raw);
  const slug = filename.replace(/\.md$/, "");
  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "",
    year: data.year ?? new Date().getFullYear(),
    client: data.client ?? "[ Client name ]",
    sector: data.sector ?? "",
    engagement: data.engagement ?? "",
    duration: data.duration ?? "",
    summary: data.summary ?? "",
    problem: data.problem ?? "",
    problemTags: data.problemTags ?? [],
    approach: data.approach ?? [],
    outcomes: data.outcomes ?? [],
    stack: data.stack ?? [],
    testimonial: data.testimonial ?? null,
    featured: Boolean(data.featured),
  };
}

export function getAllCaseStudies(): CaseStudy[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(readCaseStudyFile)
    .sort((a, b) => b.year - a.year);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return getAllCaseStudies().find((c) => c.slug === slug);
}

export function getFeaturedCaseStudies(limit = 2): CaseStudy[] {
  const all = getAllCaseStudies();
  const featured = all.filter((c) => c.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
