import type { NavItem } from "@prisma/client";

export type NavItemWithChildren = NavItem & { children: NavItem[] };

/** Admin UI row: top-level nav item with nested children. */
export type NavItemRow = NavItemWithChildren;

export interface NavChildLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChildLink[];
}

export interface NavbarProfile {
  name: string;
  tag?: string;
  avatar?: string;
}

export interface SiteNavigation {
  profile: NavbarProfile;
  links: NavLink[];
  announcement: {
    enabled: boolean;
    text: string;
    linkLabel: string;
    linkHref: string;
    mobileText: string;
  };
  cta: {
    label: string;
    href: string;
  };
  mobile: {
    badgeText: string;
    footerNote: string;
  };
}
