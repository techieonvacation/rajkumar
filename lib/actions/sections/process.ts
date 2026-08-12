"use server";

import type {
  HomeProcessSection,
  HomeProcessStep,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  PROCESS_SECTION_DEFAULTS,
  PROCESS_STEP_DEFAULTS,
} from "@/lib/home/section-defaults";
import type { ProcessSectionData } from "@/lib/home/section-types";
import { ITEM_ORDER_BY, requireAdmin, revalidateSection } from "./shared";

const ADMIN_PATH = "/admin/home/process";

function fallbackSection(): HomeProcessSection {
  const now = new Date();
  return {
    id: "singleton",
    ...PROCESS_SECTION_DEFAULTS,
    createdAt: now,
    updatedAt: now,
  };
}

function fallbackSteps(): HomeProcessStep[] {
  const now = new Date();
  return PROCESS_STEP_DEFAULTS.map((step, index) => ({
    id: `process-step-${index}`,
    ...step,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSection(): Promise<HomeProcessSection> {
  const existing = await prisma.homeProcessSection.findUnique({
    where: { id: "singleton" },
  });
  if (existing) return existing;

  const created = await prisma.homeProcessSection.create({
    data: { id: "singleton", ...PROCESS_SECTION_DEFAULTS },
  });

  if ((await prisma.homeProcessStep.count()) === 0) {
    for (const step of PROCESS_STEP_DEFAULTS) {
      await prisma.homeProcessStep.create({ data: step });
    }
  }

  return created;
}

export async function getPublishedProcessSection(): Promise<ProcessSectionData | null> {
  const section = await safeQuery(
    () => prisma.homeProcessSection.findUnique({ where: { id: "singleton" } }),
    null,
  );

  if (!section) {
    const fallback = fallbackSection();
    return fallback.published
      ? { section: fallback, steps: fallbackSteps() }
      : null;
  }

  if (!section.published) return null;

  const steps = await safeQuery(
    () =>
      prisma.homeProcessStep.findMany({
        where: { published: true },
        orderBy: ITEM_ORDER_BY,
      }),
    [],
  );

  return { section, steps };
}

export async function getProcessSectionAdmin(): Promise<ProcessSectionData> {
  await requireAdmin();
  const section = await withRetry(() => ensureSection());
  const steps = await prisma.homeProcessStep.findMany({
    orderBy: ITEM_ORDER_BY,
  });
  return { section, steps };
}

export async function updateProcessSection(
  data: Prisma.HomeProcessSectionUpdateInput,
) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.homeProcessSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: {
        id: "singleton",
        ...PROCESS_SECTION_DEFAULTS,
        ...(data as Prisma.HomeProcessSectionCreateInput),
      },
    }),
  );
  revalidateSection(ADMIN_PATH);
  return { success: true, section };
}

export async function createProcessStep(
  data: Prisma.HomeProcessStepCreateInput,
) {
  await requireAdmin();
  const step = await prisma.homeProcessStep.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, step };
}

export async function updateProcessStep(
  id: string,
  data: Prisma.HomeProcessStepUpdateInput,
) {
  await requireAdmin();
  const step = await prisma.homeProcessStep.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, step };
}

export async function deleteProcessStep(id: string) {
  await requireAdmin();
  await prisma.homeProcessStep.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderProcessSteps(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeProcessStep.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}
