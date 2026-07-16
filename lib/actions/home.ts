"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import type { Prisma, Hero } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

// ── Hero ───────────────────────────────────────────────────────────────────────

function defaultHero(): Hero {
  const now = new Date();
  return {
    id: "singleton",
    badge: "",
    headline: "Bridging",
    highlight: "India & China",
    headlineSuffix: "for Global Growth",
    subheadline: "",
    tagline: "",
    bullets: [],
    cta1Label: "Schedule Consultation",
    cta1Url: "/contact",
    cta2Label: "View Services",
    cta2Url: "/services",
    socialProof: "",
    image: "",
    imageName: "",
    imageRole: "",
    floatCards: [],
    published: true,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getHero(): Promise<Hero> {
  const hero = await prisma.hero.findUnique({ where: { id: "singleton" } });
  return hero ?? defaultHero();
}

export async function updateHero(data: Prisma.HeroUpdateInput) {
  await requireAdmin();
  const existing = await prisma.hero.findUnique({ where: { id: "singleton" } });
  const hero = existing
    ? await prisma.hero.update({ where: { id: "singleton" }, data })
    : await prisma.hero.create({
        data: { id: "singleton", ...(data as Prisma.HeroCreateInput) },
      });
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true, hero };
}

// ── Stats ──────────────────────────────────────────────────────────────────────

export async function getStats() {
  return prisma.stat.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function getPublishedStats() {
  return prisma.stat.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });
}

export async function createStat(data: Prisma.StatCreateInput) {
  await requireAdmin();
  const stat = await prisma.stat.create({ data });
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true, stat };
}

export async function updateStat(id: string, data: Prisma.StatUpdateInput) {
  await requireAdmin();
  const stat = await prisma.stat.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true, stat };
}

export async function deleteStat(id: string) {
  await requireAdmin();
  await prisma.stat.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true };
}

export async function reorderStats(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.stat.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true };
}
