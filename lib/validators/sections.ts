import { z } from "zod";

const url = z.string().default("");
const text = z.string().default("");

export const aboutSectionSchema = z.object({
  tagline: text,
  title: z.string().min(1, "Title is required"),
  text: text,
  image1: url,
  image1Alt: text,
  image2: url,
  image2Alt: text,
  shapeImage: url,
  clientsUrl: url,
  clientsCount: z.number().min(0),
  clientsCountSuffix: text,
  clientsCountDuration: z.number().min(0.1),
  clientsLabel: text,
  pointsPerColumn: z.number().min(1),
  pointIcon: text,
  experienceCount: z.number().min(0),
  experienceDuration: z.number().min(0.1),
  experienceSuffix: text,
  experienceLabel: text,
  callIcon: text,
  callLabel: text,
  callNumber: text,
  callUrl: url,
  ctaLabel: text,
  ctaUrl: url,
  published: z.boolean(),
});

export const counterSectionSchema = z.object({
  tagline: text,
  title: z.string().min(1, "Title is required"),
  align: z.enum(["left", "center"]),
  bgShape: url,
  published: z.boolean(),
});

export const homeServicesSectionSchema = z.object({
  tagline: text,
  title: z.string().min(1, "Title is required"),
  titleImage: url,
  circleText: text,
  circleRadius: z.number().min(1),
  circleUrl: url,
  circleIcon: url,
  published: z.boolean(),
});

export const worksSectionSchema = z.object({
  bigText: text,
  tagline: text,
  title: z.string().min(1, "Title is required"),
  circleText: text,
  circleRadius: z.number().min(1),
  circleUrl: url,
  circleIcon: url,
  shape1: url,
  shape2: url,
  autoplayDelay: z.number().min(0),
  loop: z.boolean(),
  spaceBetween: z.number().min(0),
  slidesMobile: z.number().min(1).max(8),
  slidesTablet: z.number().min(1).max(8),
  slidesDesktop: z.number().min(1).max(8),
  slidesWide: z.number().min(1).max(8),
  lightbox: z.boolean(),
  published: z.boolean(),
});

export const whyChooseSectionSchema = z.object({
  tagline: text,
  title: z.string().min(1, "Title is required"),
  text: text,
  ctaLabel: text,
  ctaUrl: url,
  clientImage: url,
  clientName: text,
  clientRole: text,
  image: url,
  imageAlt: text,
  shape1: url,
  shape2: url,
  shape3: url,
  published: z.boolean(),
});

export const processSectionSchema = z.object({
  tagline: text,
  title: z.string().min(1, "Title is required"),
  align: z.enum(["left", "center"]),
  bgImage: url,
  shape1: url,
  shape2: url,
  shapeStepIndex: z.number().min(-1),
  published: z.boolean(),
});

export type AboutSectionFormValues = z.infer<typeof aboutSectionSchema>;
export type CounterSectionFormValues = z.infer<typeof counterSectionSchema>;
export type HomeServicesSectionFormValues = z.infer<
  typeof homeServicesSectionSchema
>;
export type WorksSectionFormValues = z.infer<typeof worksSectionSchema>;
export type WhyChooseSectionFormValues = z.infer<typeof whyChooseSectionSchema>;
export type ProcessSectionFormValues = z.infer<typeof processSectionSchema>;
