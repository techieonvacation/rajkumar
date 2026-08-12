"use server";

import type {
  HomeWhyChooseSection,
  HomeWhyChooseSkill,
  Prisma,
} from "@prisma/client";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  WHY_CHOOSE_SECTION_DEFAULTS,
  WHY_CHOOSE_SKILL_DEFAULTS,
} from "@/lib/home/section-defaults";
import type { WhyChooseSectionData } from "@/lib/home/section-types";
import { ITEM_ORDER_BY, requireAdmin, revalidateSection } from "./shared";

const ADMIN_PATH = "/admin/home/why-choose";

function fallbackSection(): HomeWhyChooseSection {
  const now = new Date();
  return {
    id: "singleton",
    ...WHY_CHOOSE_SECTION_DEFAULTS,
    createdAt: now,
    updatedAt: now,
  };
}

function fallbackSkills(): HomeWhyChooseSkill[] {
  const now = new Date();
  return WHY_CHOOSE_SKILL_DEFAULTS.map((skill, index) => ({
    id: `why-choose-skill-${index}`,
    ...skill,
    createdAt: now,
    updatedAt: now,
  }));
}

async function ensureSection(): Promise<HomeWhyChooseSection> {
  const existing = await prisma.homeWhyChooseSection.findUnique({
    where: { id: "singleton" },
  });
  if (existing) return existing;

  const created = await prisma.homeWhyChooseSection.create({
    data: { id: "singleton", ...WHY_CHOOSE_SECTION_DEFAULTS },
  });

  if ((await prisma.homeWhyChooseSkill.count()) === 0) {
    for (const skill of WHY_CHOOSE_SKILL_DEFAULTS) {
      await prisma.homeWhyChooseSkill.create({ data: skill });
    }
  }

  return created;
}

export async function getPublishedWhyChooseSection(): Promise<WhyChooseSectionData | null> {
  const section = await safeQuery(
    () => prisma.homeWhyChooseSection.findUnique({ where: { id: "singleton" } }),
    null,
  );

  if (!section) {
    const fallback = fallbackSection();
    return fallback.published
      ? { section: fallback, skills: fallbackSkills() }
      : null;
  }

  if (!section.published) return null;

  const skills = await safeQuery(
    () =>
      prisma.homeWhyChooseSkill.findMany({
        where: { published: true },
        orderBy: ITEM_ORDER_BY,
      }),
    [],
  );

  return { section, skills };
}

export async function getWhyChooseSectionAdmin(): Promise<WhyChooseSectionData> {
  await requireAdmin();
  const section = await withRetry(() => ensureSection());
  const skills = await prisma.homeWhyChooseSkill.findMany({
    orderBy: ITEM_ORDER_BY,
  });
  return { section, skills };
}

export async function updateWhyChooseSection(
  data: Prisma.HomeWhyChooseSectionUpdateInput,
) {
  await requireAdmin();
  const section = await withRetry(() =>
    prisma.homeWhyChooseSection.upsert({
      where: { id: "singleton" },
      update: data,
      create: {
        id: "singleton",
        ...WHY_CHOOSE_SECTION_DEFAULTS,
        ...(data as Prisma.HomeWhyChooseSectionCreateInput),
      },
    }),
  );
  revalidateSection(ADMIN_PATH);
  return { success: true, section };
}

export async function createWhyChooseSkill(
  data: Prisma.HomeWhyChooseSkillCreateInput,
) {
  await requireAdmin();
  const skill = await prisma.homeWhyChooseSkill.create({ data });
  revalidateSection(ADMIN_PATH);
  return { success: true, skill };
}

export async function updateWhyChooseSkill(
  id: string,
  data: Prisma.HomeWhyChooseSkillUpdateInput,
) {
  await requireAdmin();
  const skill = await prisma.homeWhyChooseSkill.update({ where: { id }, data });
  revalidateSection(ADMIN_PATH);
  return { success: true, skill };
}

export async function deleteWhyChooseSkill(id: string) {
  await requireAdmin();
  await prisma.homeWhyChooseSkill.delete({ where: { id } });
  revalidateSection(ADMIN_PATH);
  return { success: true };
}

export async function reorderWhyChooseSkills(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.homeWhyChooseSkill.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidateSection(ADMIN_PATH);
  return { success: true };
}
