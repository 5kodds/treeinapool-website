import { z } from "zod";

export const PROJECT_TYPES = [
  "Prototype → production",
  "Product design",
  "Full-cycle build",
  "AI & automation",
  "Not sure yet",
] as const;

/**
 * These mirror the published starting-from bands on /services, so the number
 * someone picks here means the same thing it meant on the page that sent
 * them. The last two options exist because a form that forces a guess
 * collects a guess.
 */
export const BUDGET_BANDS = [
  "Under ₦4m / under $7.5k",
  "₦4m to ₦12m / $7.5k to $22k",
  "₦12m to ₦30m / $22k to $55k",
  "Above the bands, custom scope",
  "Prefer to discuss on the call",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  projectType: z.enum(PROJECT_TYPES),
  budgetBand: z.enum(BUDGET_BANDS),
  message: z
    .string()
    .trim()
    .min(10, "Give us a bit more detail (10+ characters)")
    .max(1000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const PLATFORMS = [
  "WordPress",
  "Webflow",
  "Shopify",
  "Squarespace/Wix",
  "Custom build",
  "Not sure",
] as const;

export const CONVERSION_GOALS = [
  "Enquiries / leads",
  "Online sales",
  "Bookings",
  "Sign-ups / trials",
  "Something else",
] as const;

export const TIMELINES = [
  "As soon as possible",
  "Next quarter",
  "This year",
  "Exploring options",
] as const;

// D17: budget bands on the rebuild path, anchored to the S1 starting band.
export const REBUILD_BUDGET_BANDS = [
  "Under ₦6.5m / under $12k",
  "₦6.5m to ₦16m / $12k to $30k",
  "₦16m to ₦35m / $30k to $65k",
  "Above the bands, custom scope",
  "Prefer to discuss on the call",
] as const;

export const rebuildSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  siteUrl: z
    .string()
    .trim()
    .min(1, "Add the site you'd like rebuilt")
    .max(300)
    .refine(
      (value) => /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/.test(value),
      "Enter a valid site address",
    ),
  platform: z.enum(PLATFORMS),
  conversionGoal: z.enum(CONVERSION_GOALS),
  timeline: z.enum(TIMELINES),
  budgetBand: z.enum(REBUILD_BUDGET_BANDS),
  message: z.string().trim().max(1000).optional(),
});

export type RebuildFormValues = z.infer<typeof rebuildSchema>;
