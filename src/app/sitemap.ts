import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllCaseStudies } from "@/lib/case-studies";
import { getAllInsights } from "@/lib/insights";
import { getAllTeardowns } from "@/lib/teardowns";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/work", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/insights", priority: 0.7, changeFrequency: "weekly" as const },
    {
      path: "/performance",
      priority: 0.6,
      changeFrequency: "monthly" as const,
    },
    { path: "/teardowns", priority: 0.6, changeFrequency: "monthly" as const },
    {
      path: "/accessibility",
      priority: 0.3,
      changeFrequency: "yearly" as const,
    },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" as const },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" as const },
  ].map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const caseStudyRoutes = getAllCaseStudies().map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const insightRoutes = getAllInsights().map((insight) => ({
    url: `${SITE_URL}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const teardownRoutes = getAllTeardowns().map((teardown) => ({
    url: `${SITE_URL}/teardowns/${teardown.slug}`,
    lastModified: new Date(teardown.auditedOn),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...caseStudyRoutes,
    ...insightRoutes,
    ...teardownRoutes,
  ];
}
