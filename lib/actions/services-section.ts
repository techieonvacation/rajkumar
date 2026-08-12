"use server";

import { prisma } from "@/lib/db/prisma";
import { safeQuery } from "@/lib/db/resilient";
import type { ServicesSection } from "@prisma/client";

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
