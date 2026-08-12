"use server";

import type { HomeWorkItem, HomeWorksSection, Prisma } from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  WORK_ITEM_DEFAULTS,
  WORKS_SECTION_DEFAULTS,
} from "@/lib/home/section-defaults";
import type { WorksSectionData } from "@/lib/home/section-types";
import { ITEM_ORDER_BY, requireAdmin, revalidateSection } from "./shared";

const ADMIN_PATH = "/admin/home/works";

function fallbackSection(): HomeWorksSection {
  const now = new Date();
  return {
    id: "singleton",
    ...WORKS_SECTION_DEFAULTS,
    createdAt: now,
    updatedAt: now,
  };
}

function fallbackItems(): HomeWorkItem[] {
  const now = new Date();
  return WORK_ITEM_DEFAULTS.map((item, index) => ({
    id: `work-item-${index}`,
    ...item,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSection(): Promise<HomeWorksSection> {
  const existing = await prisma.homeWorksSection.findUnique({
    where: { id: "singleton" },
  });
  if (existing) return existing;

  const created = await prisma.homeWorksSection.create({
    data: { id: "singleton", ...WORKS_SECTION_DEFAULTS },
  });

  if ((await prisma.homeWorkItem.count()) === 0) {
    for (const item of WORK_ITEM_DEFAULTS) {
      await prisma.homeWorkItem.create({ data: item });
    }
  }

  return created;
}

export async function getPublishedWorksSection(): Promise<WorksSectionData | null> {
  const section = await safeQuery(
    () => prisma.homeWorksSection.findUnique({ where: { id: "singleton" } }),
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
      prisma.homeWorkItem.findMany({
        where: { published: true },
        orderBy: ITEM_ORDER_BY,
      }),
    [],
  );

  return { section, items };
}

export async function getWorksSectionAdmin(): Promise<WorksSectionData> {
  await requireAdmin();
  const section = await withRetry(() => ensureSection());
  const items = await prisma.homeWorkItem.findMany({ orderBy: ITEM_ORDER_BY });
  return { section, items };
}

export async function updateWorksSection(
  data: Prisma.HomeWorksSectionUpdateInput,
) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.homeWorksSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: {
        id: "singleton",
        ...WORKS_SECTION_DEFAULTS,
        ...(data as Prisma.HomeWorksSectionCreateInput),
      },
    }),
  );
  revalidateSection(ADMIN_PATH);
  return { success: true, section };
}

export async function createWorkItem(data: Prisma.HomeWorkItemCreateInput) {
  await requireAdmin();
  const item = await prisma.homeWorkItem.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, item };
}

export async function updateWorkItem(
  id: string,
  data: Prisma.HomeWorkItemUpdateInput,
) {
  await requireAdmin();
  const item = await prisma.homeWorkItem.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, item };
}

export async function deleteWorkItem(id: string) {
  await requireAdmin();
  await prisma.homeWorkItem.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderWorkItems(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeWorkItem.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}
