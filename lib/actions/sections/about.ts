"use server";

import type {
  HomeAboutClient,
  HomeAboutPoint,
  HomeAboutSection,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  ABOUT_CLIENT_DEFAULTS,
  ABOUT_POINT_DEFAULTS,
  ABOUT_SECTION_DEFAULTS,
} from "@/lib/home/section-defaults";
import type { AboutSectionData } from "@/lib/home/section-types";
import { ITEM_ORDER_BY, requireAdmin, revalidateSection } from "./shared";

const ADMIN_PATH = "/admin/home/about";

function fallbackSection(): HomeAboutSection {
  const now = new Date();
  return {
    id: "singleton",
    ...ABOUT_SECTION_DEFAULTS,
    createdAt: now,
    updatedAt: now,
  };
}

function fallbackPoints(): HomeAboutPoint[] {
  const now = new Date();
  return ABOUT_POINT_DEFAULTS.map((point, index) => ({
    id: `about-point-${index}`,
    ...point,
    createdAt: now,
    updatedAt: now,
  }));
}

function fallbackClients(): HomeAboutClient[] {
  const now = new Date();
  return ABOUT_CLIENT_DEFAULTS.map((client, index) => ({
    id: `about-client-${index}`,
    ...client,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSection(): Promise<HomeAboutSection> {
  const existing = await prisma.homeAboutSection.findUnique({
    where: { id: "singleton" },
  });
  if (existing) return existing;

  const created = await prisma.homeAboutSection.create({
    data: { id: "singleton", ...ABOUT_SECTION_DEFAULTS },
  });

  if ((await prisma.homeAboutPoint.count()) === 0) {
    for (const point of ABOUT_POINT_DEFAULTS) {
      await prisma.homeAboutPoint.create({ data: point });
    }
  }
  if ((await prisma.homeAboutClient.count()) === 0) {
    for (const client of ABOUT_CLIENT_DEFAULTS) {
      await prisma.homeAboutClient.create({ data: client });
    }
  }

  return created;
}

export async function getPublishedAboutSection(): Promise<AboutSectionData | null> {
  const section = await safeQuery(
    () => prisma.homeAboutSection.findUnique({ where: { id: "singleton" } }),
    null,
  );

  if (!section) {
    const fallback = fallbackSection();
    return fallback.published
      ? {
          section: fallback,
          points: fallbackPoints(),
          clients: fallbackClients(),
        }
      : null;
  }

  if (!section.published) return null;

  const [points, clients] = await Promise.all([
    safeQuery(
      () =>
        prisma.homeAboutPoint.findMany({
          where: { published: true },
          orderBy: ITEM_ORDER_BY,
        }),
      [],
    ),
    safeQuery(
      () =>
        prisma.homeAboutClient.findMany({
          where: { published: true },
          orderBy: ITEM_ORDER_BY,
        }),
      [],
    ),
  ]);

  return { section, points, clients };
}

export async function getAboutSectionAdmin(): Promise<AboutSectionData> {
  await requireAdmin();
  const section = await withRetry(() => ensureSection());
  const [points, clients] = await Promise.all([
    prisma.homeAboutPoint.findMany({ orderBy: ITEM_ORDER_BY }),
    prisma.homeAboutClient.findMany({ orderBy: ITEM_ORDER_BY }),
  ]);
  return { section, points, clients };
}

export async function updateAboutSection(
  data: Prisma.HomeAboutSectionUpdateInput,
) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.homeAboutSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: {
        id: "singleton",
        ...ABOUT_SECTION_DEFAULTS,
        ...(data as Prisma.HomeAboutSectionCreateInput),
      },
    }),
  );
  revalidateSection(ADMIN_PATH);
  return { success: true, section };
}

export async function createAboutPoint(data: Prisma.HomeAboutPointCreateInput) {
  await requireAdmin();
  const point = await prisma.homeAboutPoint.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, point };
}

export async function updateAboutPoint(
  id: string,
  data: Prisma.HomeAboutPointUpdateInput,
) {
  await requireAdmin();
  const point = await prisma.homeAboutPoint.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, point };
}

export async function deleteAboutPoint(id: string) {
  await requireAdmin();
  await prisma.homeAboutPoint.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderAboutPoints(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeAboutPoint.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function createAboutClient(
  data: Prisma.HomeAboutClientCreateInput,
) {
  await requireAdmin();
  const client = await prisma.homeAboutClient.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, client };
}

export async function updateAboutClient(
  id: string,
  data: Prisma.HomeAboutClientUpdateInput,
) {
  await requireAdmin();
  const client = await prisma.homeAboutClient.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, client };
}

export async function deleteAboutClient(id: string) {
  await requireAdmin();
  await prisma.homeAboutClient.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderAboutClients(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeAboutClient.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}
