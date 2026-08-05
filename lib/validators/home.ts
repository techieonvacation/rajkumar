import { z } from "zod";

export const floatCardSchema = z.object({
  icon: z.string().default(""),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().default(""),
});

export const heroSchema = z.object({
  badge: z.string().default(""),
  headline: z.string().min(1, "Headline is required"),
  highlight: z.string().default(""),
  headlineSuffix: z.string().default(""),
  subheadline: z.string().default(""),
  tagline: z.string().default(""),
  bullets: z.array(z.object({ value: z.string() })).default([]),
  cta1Label: z.string().default(""),
  cta1Url: z.string().default(""),
  cta2Label: z.string().default(""),
  cta2Url: z.string().default(""),
  socialProof: z.string().default(""),
  image: z.string().default(""),
  imageName: z.string().default(""),
  imageRole: z.string().default(""),
  floatCards: z.array(floatCardSchema).default([]),
  marqueeItems: z.array(z.object({ value: z.string() })).default([]),
  published: z.boolean().default(true),
});

export const statSchema = z.object({
  label: z.string().min(1, "Label is required"),
  value: z.string().min(1, "Value is required"),
  suffix: z.string().default(""),
  icon: z.string().default(""),
  order: z.number().default(0),
  published: z.boolean().default(true),
});

export type HeroFormValues = z.infer<typeof heroSchema>;
export type StatFormValues = z.infer<typeof statSchema>;
export type FloatCard = z.infer<typeof floatCardSchema>;
