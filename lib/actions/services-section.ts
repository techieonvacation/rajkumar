"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { withRetry, safeQuery } from "@/lib/db/resilient";
import { revalidatePath } from "next/cache";
import type { Prisma, ServicesSection } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function defaultServicesSection(): ServicesSection {
  const now = new Date();
  return {
    id: "singleton",
    eyebrow: "What I Offer",
    title: "Consulting",
    titleAccent: "Services",
    description:
      "Specialised advisory services that help organisations unlock the full potential of the world's two largest emerging markets.",
    viewAllLabel: "View full service catalogue",
    viewAllUrl: "/services",
    ctaLabel: "Discuss your requirements",
    ctaUrl: "/contact",
    published: true,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getServicesSection(): Promise<ServicesSection> {
  const section = await safeQuery(
    () => prisma.servicesSection.findUnique({ where: { id: "singleton" } }),
    null
  );
  return section ?? defaultServicesSection();
}

export async function getPublishedServicesSection(): Promise<ServicesSection | null> {
  const section = await safeQuery(
    () => prisma.servicesSection.findUnique({ where: { id: "singleton" } }),
    null
  );
  if (!section?.published) return null;
  return section;
}

export async function updateServicesSection(data: Prisma.ServicesSectionUpdateInput) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.servicesSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...(data as Prisma.ServicesSectionCreateInput) },
    })
  );
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
  return { success: true, section };
}

export async function getPublishedServicesForSection() {
  return safeQuery(
    () =>
      prisma.service.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        select: {
          id: true,
          title: true,
          slug: true,
          summary: true,
          description: true,
          order: true,
        },
      }),
    []
  );
}

export type PublishedServiceItem = Awaited<
  ReturnType<typeof getPublishedServicesForSection>
>[number];
