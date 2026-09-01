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
  "Under ₦9m / under $16k",
  "₦9m to ₦26m / $16k to $48k",
  "₦26m to ₦60m / $48k to $110k",
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
  "Under ₦14m / under $24k",
  "₦14m to ₦30m / $24k to $55k",
  "₦30m to ₦65m / $55k to $120k",
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
