import { z } from "zod";

export const navigationSettingsSchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  brandTag: z.string().default(""),
  avatar: z.string().default(""),
  announcementEnabled: z.boolean().default(true),
  announcementText: z.string().default(""),
  announcementLinkLabel: z.string().default(""),
  announcementLinkHref: z.string().default("/contact"),
  announcementMobileText: z.string().default(""),
  ctaLabel: z.string().min(1, "CTA label is required"),
  ctaHref: z.string().min(1, "CTA URL is required"),
  mobileBadgeText: z.string().default(""),
  mobileFooterNote: z.string().default(""),
  useCmsNav: z.boolean().default(true),
});

export const navItemSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "URL is required"),
  published: z.boolean().default(true),
});

export const navChildSchema = z.object({
  label: z.string().min(1, "Label is required"),
  href: z.string().min(1, "URL is required"),
  description: z.string().default(""),
  published: z.boolean().default(true),
});

export type NavigationSettingsFormValues = z.infer<typeof navigationSettingsSchema>;
