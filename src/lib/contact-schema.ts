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
  message: z.string().trim().min(10, "Give us a bit more detail (10+ characters)").max(1000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
