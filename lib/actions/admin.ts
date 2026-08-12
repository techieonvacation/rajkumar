"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

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
  await requireAdmin();
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
  await requireAdmin();
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
  await requireAdmin();
  const post = await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  return { success: true, slug: post.slug };
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
  const [contactsCount, blogPostsCount, homeServicesCount, homeWorksCount, recentContacts, recentPosts, activityLogs] = await Promise.all([
    prisma.contact.count(),
    prisma.blogPost.count(),
    prisma.homeServiceCard.count(),
    prisma.homeWorkItem.count(),
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
      homeServices: homeServicesCount,
      homeWorks: homeWorksCount,
    },
    recentContacts,
    recentPosts,
    activityLogs,
  };
}
