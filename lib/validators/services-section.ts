import { z } from "zod";

export const servicesSectionSchema = z.object({
  eyebrow: z.string().default("What I Offer"),
  title: z.string().min(1, "Title is required"),
  titleAccent: z.string().default("Services"),
  description: z.string().default(""),
  viewAllLabel: z.string().default("View full service catalogue"),
  viewAllUrl: z.string().default("/services"),
  ctaLabel: z.string().default("Discuss your requirements"),
  ctaUrl: z.string().default("/contact"),
  published: z.boolean().default(true),
});

export type ServicesSectionFormValues = z.infer<typeof servicesSectionSchema>;
