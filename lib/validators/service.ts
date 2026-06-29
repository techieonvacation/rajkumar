import { z } from "zod";

// ── Shared types ───────────────────────────────────────────────────────────────

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const processStepSchema = z.object({
  step: z.number().int().min(1),
  title: z.string().min(1, "Step title is required").max(200),
  description: z.string().max(1000).optional().or(z.literal("")),
});

const faqItemSchema = z.object({
  question: z.string().min(5, "Question is required").max(500),
  answer: z.string().min(1, "Answer is required").max(5000),
});

// ── Base schema ────────────────────────────────────────────────────────────────

const serviceBaseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be under 200 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug must be under 200 characters")
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),

  icon: z.string().max(100).optional().or(z.literal("")),

  heroImage: z
    .string()
    .url("Hero image must be a valid URL")
    .optional()
    .or(z.literal("")),

  summary: z
    .string()
    .max(500, "Summary must be under 500 characters")
    .optional()
    .or(z.literal("")),

  description: z.string().optional().or(z.literal("")),

  benefits: z
    .array(z.string().max(500, "Each benefit must be under 500 characters"))
    .optional(),

  process: z.array(processStepSchema).optional(),

  deliverables: z
    .array(z.string().max(300, "Each deliverable must be under 300 characters"))
    .optional(),

  duration: z
    .string()
    .max(100, "Duration must be under 100 characters")
    .optional()
    .or(z.literal("")),

  investment: z
    .string()
    .max(100, "Investment must be under 100 characters")
    .optional()
    .or(z.literal("")),

  faqs: z.array(faqItemSchema).optional(),

  ctaLabel: z
    .string()
    .max(100, "CTA label must be under 100 characters")
    .optional()
    .or(z.literal("")),

  ctaUrl: z
    .string()
    .max(500, "CTA URL must be under 500 characters")
    .optional()
    .or(z.literal("")),

  featured: z.boolean().optional(),

  order: z.number().int().optional(),

  published: z.boolean().optional(),
});

// ── Create schema ─────────────────────────────────────────────────────────────

export const createServiceSchema = serviceBaseSchema.extend({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(200, "Title must be under 200 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(200, "Slug must be under 200 characters")
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),
});

export type CreateServiceInput = z.infer<typeof createServiceSchema>;

// ── Update schema (all optional for PATCH) ────────────────────────────────────

export const updateServiceSchema = serviceBaseSchema.partial();

export type UpdateServiceInput = z.infer<typeof updateServiceSchema>;
