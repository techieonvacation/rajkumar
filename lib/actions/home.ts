"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { withRetry, safeQuery } from "@/lib/db/resilient";
import { revalidatePath } from "next/cache";
import type { Prisma, Hero, Stat } from "@prisma/client";

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
    cta1Label: "Book a Call",
    cta1Url: "/contact",
    cta2Label: "Explore Services",
    cta2Url: "/services",
    socialProof: "",
    image: "",
    imageName: "",
    imageRole: "",
    floatCards: [],
    marqueeItems: [],
    published: true,
    createdAt: now,
    updatedAt: now,
  };
}

export async function getHero(): Promise<Hero> {
  const hero = await safeQuery(
    () => prisma.hero.findUnique({ where: { id: "singleton" } }),
    null
  );
  return hero ?? defaultHero();
}

export async function getPublishedHero(): Promise<Hero | null> {
  const hero = await safeQuery(
    () => prisma.hero.findUnique({ where: { id: "singleton" } }),
    null
  );
  if (!hero?.published) return null;
  return hero;
}

export async function updateHero(data: Prisma.HeroUpdateInput) {
  await requireAdmin();
  const hero = await withRetry(() =>
    prisma.hero.upsert({
      where: { id: "singleton" },
      update: data,
      create: { id: "singleton", ...(data as Prisma.HeroCreateInput) },
    })
  );
  revalidatePath("/");
  revalidatePath("/admin/hero");
  return { success: true, hero };
}

// ── Stats ──────────────────────────────────────────────────────────────────────

export async function getStats(): Promise<Stat[]> {
  return safeQuery(
    () =>
      prisma.stat.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      }),
    []
  );
}

export async function getPublishedStats(): Promise<Stat[]> {
  return safeQuery(
    () =>
      prisma.stat.findMany({
        where: { published: true },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      }),
    []
  );
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
