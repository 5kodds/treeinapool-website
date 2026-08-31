import { z } from "zod";

export const PROJECT_TYPES = [
  "Prototype → production",
  "Product design",
  "Full-cycle build",
  "AI & automation",
  "Not sure yet",
] as const;

export const BUDGET_BANDS = [
  "Under $5k / ₦8m",
  "$5k–$15k / ₦8m–₦24m",
  "$15k–$40k / ₦24m–₦64m",
  "$40k+ / ₦64m+",
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

// D17: budget bands shown on the rebuild path.
export const REBUILD_BUDGET_BANDS = [
  "Under $10k / ₦16m",
  "$10k–$25k / ₦16m–₦40m",
  "$25k–$60k / ₦40m–₦96m",
  "$60k+ / ₦96m+",
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
