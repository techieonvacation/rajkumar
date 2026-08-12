"use server";

import type {
  HomeServiceCard,
  HomeServicesSection,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  SERVICE_CARD_DEFAULTS,
  SERVICES_SECTION_DEFAULTS,
} from "@/lib/home/section-defaults";
import type { ServicesSectionData } from "@/lib/home/section-types";
import { ITEM_ORDER_BY, requireAdmin, revalidateSection } from "./shared";

const ADMIN_PATH = "/admin/home/services";

function fallbackSection(): HomeServicesSection {
  const now = new Date();
  return {
    id: "singleton",
    ...SERVICES_SECTION_DEFAULTS,
    createdAt: now,
    updatedAt: now,
  };
}

function fallbackCards(): HomeServiceCard[] {
  const now = new Date();
  return SERVICE_CARD_DEFAULTS.map((card, index) => ({
    id: `service-card-${index}`,
    ...card,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSection(): Promise<HomeServicesSection> {
  const existing = await prisma.homeServicesSection.findUnique({
    where: { id: "singleton" },
  });
  if (existing) return existing;

  const created = await prisma.homeServicesSection.create({
    data: { id: "singleton", ...SERVICES_SECTION_DEFAULTS },
  });

  if ((await prisma.homeServiceCard.count()) === 0) {
    for (const card of SERVICE_CARD_DEFAULTS) {
      await prisma.homeServiceCard.create({ data: card });
    }
  }

  return created;
}

export async function getPublishedHomeServicesSection(): Promise<ServicesSectionData | null> {
  const section = await safeQuery(
    () => prisma.homeServicesSection.findUnique({ where: { id: "singleton" } }),
    null,
  );

  if (!section) {
    const fallback = fallbackSection();
    return fallback.published
      ? { section: fallback, cards: fallbackCards() }
      : null;
  }

  if (!section.published) return null;

  const cards = await safeQuery(
    () =>
      prisma.homeServiceCard.findMany({
        where: { published: true },
        orderBy: ITEM_ORDER_BY,
      }),
    [],
  );

  return { section, cards };
}

export async function getHomeServicesSectionAdmin(): Promise<ServicesSectionData> {
  await requireAdmin();
  const section = await withRetry(() => ensureSection());
  const cards = await prisma.homeServiceCard.findMany({
    orderBy: ITEM_ORDER_BY,
  });
  return { section, cards };
}

export async function updateHomeServicesSection(
  data: Prisma.HomeServicesSectionUpdateInput,
) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.homeServicesSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: {
        id: "singleton",
        ...SERVICES_SECTION_DEFAULTS,
        ...(data as Prisma.HomeServicesSectionCreateInput),
      },
    }),
  );
  revalidateSection(ADMIN_PATH);
  return { success: true, section };
}

export async function createServiceCard(
  data: Prisma.HomeServiceCardCreateInput,
) {
  await requireAdmin();
  const card = await prisma.homeServiceCard.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, card };
}

export async function updateServiceCard(
  id: string,
  data: Prisma.HomeServiceCardUpdateInput,
) {
  await requireAdmin();
  const card = await prisma.homeServiceCard.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, card };
}

export async function deleteServiceCard(id: string) {
  await requireAdmin();
  await prisma.homeServiceCard.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderServiceCards(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeServiceCard.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}
