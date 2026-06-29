"use server";

import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

// ── Blog Posts ────────────────────────────────────────────────────────────────

export async function getBlogPosts() {
  return prisma.blogPost.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getBlogPost(id: string) {
  return prisma.blogPost.findUnique({ where: { id } });
}

export async function createBlogPost(data: {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  readTime?: number;
  published?: boolean;
  featured?: boolean;
  seoTitle?: string;
  seoDesc?: string;
  ogImage?: string;
}) {
  const post = await prisma.blogPost.create({
    data: {
      ...data,
      publishedAt: data.published ? new Date() : null,
    },
  });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true, post };
}

export async function updateBlogPost(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    readTime: number;
    published: boolean;
    featured: boolean;
    seoTitle: string;
    seoDesc: string;
    ogImage: string;
  }>
) {
  const existing = await prisma.blogPost.findUnique({ where: { id } });
  const wasPublished = existing?.published ?? false;
  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt:
        data.published && !wasPublished ? new Date() : existing?.publishedAt,
    },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/admin/blog");
  return { success: true, post };
}

export async function deleteBlogPost(id: string) {
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true, slug: post.slug };
}

// ── Services ──────────────────────────────────────────────────────────────────

export async function getServices() {
  return prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function getService(id: string) {
  return prisma.service.findUnique({ where: { id } });
}

export async function createService(data: {
  title: string;
  slug: string;
  icon?: string;
  heroImage?: string;
  summary?: string;
  description?: string;
  benefits?: string[];
  process?: unknown;
  deliverables?: string[];
  duration?: string;
  investment?: string;
  faqs?: unknown;
  ctaLabel?: string;
  ctaUrl?: string;
  featured?: boolean;
  published?: boolean;
}) {
  const service = await prisma.service.create({ data: data as Parameters<typeof prisma.service.create>[0]["data"] });
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true, service };
}

export async function updateService(id: string, data: Record<string, unknown>) {
  const service = await prisma.service.update({ where: { id }, data: data as Parameters<typeof prisma.service.update>[0]["data"] });
  revalidatePath("/services");
  revalidatePath(`/services/${service.slug}`);
  revalidatePath("/admin/services");
  return { success: true, service };
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true };
}

// ── Contacts ──────────────────────────────────────────────────────────────────

export async function getContacts(status?: string) {
  return prisma.contact.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function updateContactStatus(id: string, status: string) {
  const contact = await prisma.contact.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/admin/contacts");
  return { success: true, contact };
}

export async function deleteContact(id: string) {
  await prisma.contact.delete({ where: { id } });
  revalidatePath("/admin/contacts");
  return { success: true };
}

// ── Site Config ───────────────────────────────────────────────────────────────

export async function getSiteConfig() {
  return prisma.siteConfig.upsert({
    where: { id: "singleton" },
    create: { id: "singleton" },
    update: {},
  });
}

export async function updateSiteConfig(data: Record<string, unknown>) {
  const config = await prisma.siteConfig.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", ...data as Parameters<typeof prisma.siteConfig.upsert>[0]["create"] },
    update: data as Parameters<typeof prisma.siteConfig.upsert>[0]["update"],
  });
  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { success: true, config };
}

// ── Testimonials ──────────────────────────────────────────────────────────────

export async function getTestimonials() {
  return prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
}

export async function createTestimonial(data: {
  name: string;
  title?: string;
  company?: string;
  text: string;
  rating?: number;
  avatar?: string;
  country?: string;
  featured?: boolean;
  published?: boolean;
}) {
  const t = await prisma.testimonial.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true, testimonial: t };
}

export async function updateTestimonial(id: string, data: Record<string, unknown>) {
  const t = await prisma.testimonial.update({ where: { id }, data: data as Parameters<typeof prisma.testimonial.update>[0]["data"] });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true, testimonial: t };
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return { success: true };
}

// ── Page SEO ──────────────────────────────────────────────────────────────────

export async function getPageSeo(id: string) {
  return prisma.pageSeo.findUnique({ where: { id } });
}

export async function updatePageSeo(
  id: string,
  data: {
    title: string;
    description: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    canonical?: string;
    noIndex?: boolean;
  }
) {
  const seo = await prisma.pageSeo.upsert({
    where: { id },
    create: { id, ...data },
    update: data,
  });
  revalidatePath("/admin/seo");
  return { success: true, seo };
}

// ── Activity Logging ──────────────────────────────────────────────────────────

export async function logActivity(data: {
  action: string;
  entity?: string;
  entityId?: string;
  details?: string;
  ipAddress?: string;
}) {
  return prisma.activityLog.create({
    data: {
      action: data.action,
      entity: data.entity ?? "",
      entityId: data.entityId ?? "",
      details: data.details ?? "",
      ipAddress: data.ipAddress ?? "",
    },
  });
}

// ── Dashboard Statistics ──────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [contactsCount, blogPostsCount, servicesCount, testimonialsCount, recentContacts, recentPosts, activityLogs] = await Promise.all([
    prisma.contact.count(),
    prisma.blogPost.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.contact.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
    prisma.blogPost.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: { id: true, title: true, createdAt: true, published: true },
    }),
    prisma.activityLog.findMany({
      take: 10,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    stats: {
      contacts: contactsCount,
      blogPosts: blogPostsCount,
      services: servicesCount,
      testimonials: testimonialsCount,
    },
    recentContacts,
    recentPosts,
    activityLogs,
  };
}
