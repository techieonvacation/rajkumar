"use server";

import type {
  HomeCounterItem,
  HomeCounterSection,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  COUNTER_ITEM_DEFAULTS,
  COUNTER_SECTION_DEFAULTS,
} from "@/lib/home/section-defaults";
import type { CounterSectionData } from "@/lib/home/section-types";
import { ITEM_ORDER_BY, requireAdmin, revalidateSection } from "./shared";

const ADMIN_PATH = "/admin/home/numbers";

function fallbackSection(): HomeCounterSection {
  const now = new Date();
  return {
    id: "singleton",
    ...COUNTER_SECTION_DEFAULTS,
    createdAt: now,
    updatedAt: now,
  };
}

function fallbackItems(): HomeCounterItem[] {
  const now = new Date();
  return COUNTER_ITEM_DEFAULTS.map((item, index) => ({
    id: `counter-item-${index}`,
    ...item,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSection(): Promise<HomeCounterSection> {
  const existing = await prisma.homeCounterSection.findUnique({
    where: { id: "singleton" },
  });
  if (existing) return existing;

  const created = await prisma.homeCounterSection.create({
    data: { id: "singleton", ...COUNTER_SECTION_DEFAULTS },
  });

  if ((await prisma.homeCounterItem.count()) === 0) {
    for (const item of COUNTER_ITEM_DEFAULTS) {
      await prisma.homeCounterItem.create({ data: item });
    }
  }

  return created;
}

export async function getPublishedCounterSection(): Promise<CounterSectionData | null> {
  const section = await safeQuery(
    () => prisma.homeCounterSection.findUnique({ where: { id: "singleton" } }),
    null,
  );

  if (!section) {
    const fallback = fallbackSection();
    return fallback.published
      ? { section: fallback, items: fallbackItems() }
      : null;
  }

  if (!section.published) return null;

  const items = await safeQuery(
    () =>
      prisma.homeCounterItem.findMany({
        where: { published: true },
        orderBy: ITEM_ORDER_BY,
      }),
    [],
  );

  return { section, items };
}

export async function getCounterSectionAdmin(): Promise<CounterSectionData> {
  await requireAdmin();
  const section = await withRetry(() => ensureSection());
  const items = await prisma.homeCounterItem.findMany({
    orderBy: ITEM_ORDER_BY,
  });
  return { section, items };
}

export async function updateCounterSection(
  data: Prisma.HomeCounterSectionUpdateInput,
) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.homeCounterSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: {
        id: "singleton",
        ...COUNTER_SECTION_DEFAULTS,
        ...(data as Prisma.HomeCounterSectionCreateInput),
      },
    }),
  );
  revalidateSection(ADMIN_PATH);
  return { success: true, section };
}

export async function createCounterItem(
  data: Prisma.HomeCounterItemCreateInput,
) {
  await requireAdmin();
  const item = await prisma.homeCounterItem.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, item };
}

export async function updateCounterItem(
  id: string,
  data: Prisma.HomeCounterItemUpdateInput,
) {
  await requireAdmin();
  const item = await prisma.homeCounterItem.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, item };
}

export async function deleteCounterItem(id: string) {
  await requireAdmin();
  await prisma.homeCounterItem.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderCounterItems(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeCounterItem.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}
