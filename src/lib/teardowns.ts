import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "teardowns");

/**
 * Every claim slot carries where it came from and when it was seen, so an
 * undated assertion cannot ship. Findings missing either field are dropped
 * at load time rather than rendered.
 */
export type Finding = {
  claim: string;
  detail: string;
  source: string;
  observedOn: string;
};

export type Prediction = {
  metric: string;
  current: string;
  predicted: string;
  measurementPlan: string;
  source: string;
  observedOn: string;
};

export type Teardown = {
  slug: string;
  title: string;
  subject: string;
  subjectUrl: string;
  sector: string;
  auditedOn: string;
  summary: string;
  hypothesis: string;
  findings: Finding[];
  architecture: { title: string; body: string }[];
  predictions: Prediction[];
  draft: boolean;
};

function isDated(item: { source?: string; observedOn?: string }): boolean {
  return Boolean(item.source?.trim() && item.observedOn?.trim());
}

function readTeardownFile(filename: string): Teardown {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, filename), "utf8");
  const { data } = matter(raw);

  return {
    slug: filename.replace(/\.md$/, ""),
    title: data.title ?? filename,
    subject: data.subject ?? "[ Subject pending ]",
    subjectUrl: data.subjectUrl ?? "",
    sector: data.sector ?? "",
    auditedOn: data.auditedOn ? String(data.auditedOn).slice(0, 10) : "",
    summary: data.summary ?? "",
    hypothesis: data.hypothesis ?? "",
    findings: (data.findings ?? []).filter(isDated),
    architecture: data.architecture ?? [],
    predictions: (data.predictions ?? []).filter(isDated),
    draft: Boolean(data.draft),
  };
}

export function getAllTeardowns(): Teardown[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readTeardownFile)
    .filter((teardown) => !teardown.draft)
    .sort((a, b) => b.auditedOn.localeCompare(a.auditedOn));
}

export function getTeardownBySlug(slug: string): Teardown | undefined {
  return getAllTeardowns().find((teardown) => teardown.slug === slug);
}

export const TEARDOWN_DISCLAIMER =
  "Unsolicited analysis. Not a client engagement.";
