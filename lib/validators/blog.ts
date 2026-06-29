import { z } from "zod";

// ── Shared field definitions ───────────────────────────────────────────────────

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const blogPostBaseSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be under 255 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(255, "Slug must be under 255 characters")
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),

  excerpt: z
    .string()
    .max(500, "Excerpt must be under 500 characters")
    .optional()
    .or(z.literal("")),

  content: z.string().optional().or(z.literal("")),

  coverImage: z
    .string()
    .url("Cover image must be a valid URL")
    .optional()
    .or(z.literal("")),

  category: z
    .string()
    .max(100, "Category must be under 100 characters")
    .optional()
    .or(z.literal("")),

  tags: z.array(z.string().max(50, "Each tag must be under 50 characters")).optional(),

  author: z
    .string()
    .max(100, "Author name must be under 100 characters")
    .optional()
    .or(z.literal("")),

  authorImage: z
    .string()
    .url("Author image must be a valid URL")
    .optional()
    .or(z.literal("")),

  readTime: z
    .number()
    .int()
    .min(1, "Read time must be at least 1 minute")
    .max(120, "Read time must be under 120 minutes")
    .optional(),

  published: z.boolean().optional(),

  featured: z.boolean().optional(),

  publishedAt: z
    .string()
    .datetime({ message: "publishedAt must be a valid ISO 8601 datetime" })
    .transform((v) => new Date(v))
    .optional()
    .or(z.date().optional()),

  seoTitle: z
    .string()
    .max(70, "SEO title must be under 70 characters")
    .optional()
    .or(z.literal("")),

  seoDesc: z
    .string()
    .max(160, "SEO description must be under 160 characters")
    .optional()
    .or(z.literal("")),

  ogImage: z
    .string()
    .url("OG image must be a valid URL")
    .optional()
    .or(z.literal("")),

  order: z.number().int().optional(),
});

// ── Create schema (title + slug are required) ─────────────────────────────────

export const createBlogPostSchema = blogPostBaseSchema.extend({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(255, "Title must be under 255 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(255, "Slug must be under 255 characters")
    .regex(slugRegex, "Slug must contain only lowercase letters, numbers, and hyphens"),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;

// ── Update schema (all fields optional for partial updates) ───────────────────

export const updateBlogPostSchema = blogPostBaseSchema.partial();

export type UpdateBlogPostInput = z.infer<typeof updateBlogPostSchema>;
