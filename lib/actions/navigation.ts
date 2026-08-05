"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { safeQuery, withRetry } from "@/lib/db/resilient";
import {
  defaultNavigationSettingsSeed,
  defaultSiteNavigation,
  DEFAULT_NAV_LINKS,
  DEFAULT_NAV_SEED,
} from "@/lib/navigation-defaults";
import type { NavLink, SiteNavigation, NavItemWithChildren } from "@/lib/navigation-types";
import type { NavigationSettings, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function mapItemsToLinks(items: NavItemWithChildren[], publishedOnly: boolean): NavLink[] {
  const filtered = publishedOnly ? items.filter((i) => i.published) : items;

  return filtered.map((item) => {
    const childRows = publishedOnly
      ? item.children.filter((c) => c.published)
      : item.children;

    const children = childRows
      .sort((a, b) => a.order - b.order)
      .map((child) => ({
        label: child.label,
        href: child.href,
        description: child.description || undefined,
      }));

    return {
      label: item.label,
      href: item.href,
      ...(children.length > 0 ? { children } : {}),
    };
  });
}

function mapSettingsToNavigation(
  settings: NavigationSettings,
  links: NavLink[]
): SiteNavigation {
  return {
    profile: {
      name: settings.brandName,
      tag: settings.brandTag || undefined,
      avatar: settings.avatar || undefined,
    },
    links,
    announcement: {
      enabled: settings.announcementEnabled,
      text: settings.announcementText,
      linkLabel: settings.announcementLinkLabel,
      linkHref: settings.announcementLinkHref,
      mobileText: settings.announcementMobileText,
    },
    cta: {
      label: settings.ctaLabel,
      href: settings.ctaHref,
    },
    mobile: {
      badgeText: settings.mobileBadgeText,
      footerNote: settings.mobileFooterNote,
    },
  };
}

function settingsFromDefaults(
  hero?: { imageName: string; imageRole: string; image: string } | null
): NavigationSettings {
  const seed = defaultNavigationSettingsSeed();
  const now = new Date();
  return {
    id: "singleton",
    brandName: hero?.imageName || seed.brandName,
    brandTag: hero?.imageRole || seed.brandTag,
    avatar: hero?.image || seed.avatar,
    announcementEnabled: seed.announcementEnabled,
    announcementText: seed.announcementText,
    announcementLinkLabel: seed.announcementLinkLabel,
    announcementLinkHref: seed.announcementLinkHref,
    announcementMobileText: seed.announcementMobileText,
    ctaLabel: seed.ctaLabel,
    ctaHref: seed.ctaHref,
    mobileBadgeText: seed.mobileBadgeText,
    mobileFooterNote: seed.mobileFooterNote,
    useCmsNav: seed.useCmsNav,
    createdAt: now,
    updatedAt: now,
  };
}

/** Read-only: never writes (Neon HTTP adapter does not support upsert/transactions). */
async function loadSettings(): Promise<NavigationSettings> {
  const row = await safeQuery(
    () => prisma.navigationSettings.findUnique({ where: { id: "singleton" } }),
    null
  );
  if (row) return row;

  const hero = await safeQuery(
    () => prisma.hero.findUnique({ where: { id: "singleton" } }),
    null
  );
  return settingsFromDefaults(hero);
}

async function persistNavigationSettings(
  data: Prisma.NavigationSettingsUpdateInput
): Promise<NavigationSettings> {
  const existing = await prisma.navigationSettings.findUnique({
    where: { id: "singleton" },
  });

  if (existing) {
    return prisma.navigationSettings.update({
      where: { id: "singleton" },
      data,
    });
  }

  const seed = defaultNavigationSettingsSeed();
  return prisma.navigationSettings.create({
    data: {
      id: "singleton",
      brandName: seed.brandName,
      brandTag: seed.brandTag,
      avatar: seed.avatar,
      announcementEnabled: seed.announcementEnabled,
      announcementText: seed.announcementText,
      announcementLinkLabel: seed.announcementLinkLabel,
      announcementLinkHref: seed.announcementLinkHref,
      announcementMobileText: seed.announcementMobileText,
      ctaLabel: seed.ctaLabel,
      ctaHref: seed.ctaHref,
      mobileBadgeText: seed.mobileBadgeText,
      mobileFooterNote: seed.mobileFooterNote,
      useCmsNav: seed.useCmsNav,
      ...(data as Prisma.NavigationSettingsCreateInput),
    },
  });
}

async function loadNavItems(publishedOnly: boolean): Promise<NavItemWithChildren[]> {
  const items = await safeQuery(
    () =>
      prisma.navItem.findMany({
        where: {
          parentId: null,
          ...(publishedOnly ? { published: true } : {}),
        },
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        include: {
          children: {
            where: publishedOnly ? { published: true } : undefined,
            orderBy: [{ order: "asc" }, { createdAt: "asc" }],
          },
        },
      }),
    [] as NavItemWithChildren[]
  );
  return items;
}

export async function getNavigationSettings(): Promise<NavigationSettings> {
  return loadSettings();
}

export async function getSiteNavigation(): Promise<SiteNavigation> {
  const settings = await loadSettings();
  const defaults = defaultSiteNavigation();

  if (!settings.useCmsNav) {
    return {
      ...defaults,
      profile: {
        name: settings.brandName || defaults.profile.name,
        tag: settings.brandTag || defaults.profile.tag,
        avatar: settings.avatar || defaults.profile.avatar,
      },
      announcement: {
        enabled: settings.announcementEnabled,
        text: settings.announcementText || defaults.announcement.text,
        linkLabel: settings.announcementLinkLabel || defaults.announcement.linkLabel,
        linkHref: settings.announcementLinkHref || defaults.announcement.linkHref,
        mobileText: settings.announcementMobileText || defaults.announcement.mobileText,
      },
      cta: {
        label: settings.ctaLabel || defaults.cta.label,
        href: settings.ctaHref || defaults.cta.href,
      },
      mobile: {
        badgeText: settings.mobileBadgeText || defaults.mobile.badgeText,
        footerNote: settings.mobileFooterNote || defaults.mobile.footerNote,
      },
      links: DEFAULT_NAV_LINKS,
    };
  }

  const items = await loadNavItems(true);
  const links =
    items.length > 0 ? mapItemsToLinks(items, true) : DEFAULT_NAV_LINKS;

  return mapSettingsToNavigation(settings, links);
}

export async function getAdminNavigationBundle(): Promise<{
  settings: NavigationSettings;
  items: NavItemWithChildren[];
}> {
  await requireAdmin();
  const [settings, items] = await Promise.all([
    loadSettings(),
    loadNavItems(false),
  ]);
  return { settings, items };
}

export async function updateNavigationSettings(
  data: Prisma.NavigationSettingsUpdateInput
) {
  await requireAdmin();
  const settings = await withRetry(() => persistNavigationSettings(data));
  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true, settings };
}

export async function createNavItem(data: {
  label: string;
  href: string;
  description?: string;
  parentId?: string | null;
  published?: boolean;
}) {
  await requireAdmin();
  const parentId = data.parentId ?? null;
  const count = await prisma.navItem.count({ where: { parentId } });
  const item = await prisma.navItem.create({
    data: {
      label: data.label,
      href: data.href,
      description: data.description ?? "",
      parentId,
      published: data.published ?? true,
      order: count,
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true, item };
}

export async function updateNavItem(
  id: string,
  data: Prisma.NavItemUpdateInput
) {
  await requireAdmin();
  const item = await prisma.navItem.update({ where: { id }, data });
  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true, item };
}

export async function deleteNavItem(id: string) {
  await requireAdmin();
  await prisma.navItem.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true };
}

export async function reorderNavItems(ids: string[]) {
  await requireAdmin();
  for (let index = 0; index < ids.length; index++) {
    await prisma.navItem.update({
      where: { id: ids[index] },
      data: { order: index },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true };
}

export async function createNavChild(
  parentId: string,
  data: {
    label: string;
    href: string;
    description?: string;
    published?: boolean;
  }
) {
  return createNavItem({
    label: data.label,
    href: data.href,
    description: data.description,
    parentId,
    published: data.published,
  });
}

export async function updateNavChild(
  id: string,
  data: Prisma.NavItemUpdateInput
) {
  return updateNavItem(id, data);
}

export async function deleteNavChild(id: string) {
  return deleteNavItem(id);
}

export async function reorderNavChildren(_parentId: string, ids: string[]) {
  return reorderNavItems(ids);
}

export async function ensureNavigationSeeded() {
  await requireAdmin();

  const settingsRow = await prisma.navigationSettings.findUnique({
    where: { id: "singleton" },
  });
  if (!settingsRow) {
    const hero = await prisma.hero.findUnique({ where: { id: "singleton" } });
    const seed = settingsFromDefaults(hero);
    await prisma.navigationSettings.create({
      data: {
        id: "singleton",
        brandName: seed.brandName,
        brandTag: seed.brandTag,
        avatar: seed.avatar,
        announcementEnabled: seed.announcementEnabled,
        announcementText: seed.announcementText,
        announcementLinkLabel: seed.announcementLinkLabel,
        announcementLinkHref: seed.announcementLinkHref,
        announcementMobileText: seed.announcementMobileText,
        ctaLabel: seed.ctaLabel,
        ctaHref: seed.ctaHref,
        mobileBadgeText: seed.mobileBadgeText,
        mobileFooterNote: seed.mobileFooterNote,
        useCmsNav: seed.useCmsNav,
      },
    });
  }

  const count = await prisma.navItem.count({ where: { parentId: null } });
  if (count > 0) {
    return { success: true, seeded: false };
  }

  for (const item of DEFAULT_NAV_SEED) {
    const parent = await prisma.navItem.create({
      data: {
        label: item.label,
        href: item.href,
        order: item.order,
        published: true,
      },
    });

    if (item.children?.length) {
      for (const child of item.children) {
        await prisma.navItem.create({
          data: {
            label: child.label,
            href: child.href,
            description: child.description,
            order: child.order,
            published: true,
            parentId: parent.id,
          },
        });
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/navigation");
  return { success: true, seeded: true };
}
