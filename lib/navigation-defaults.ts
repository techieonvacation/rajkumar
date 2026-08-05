import type { NavLink, SiteNavigation } from "@/lib/navigation-types";

/** Fallback menu when CMS is empty or disabled. */
export const DEFAULT_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Market Entry Strategy",
        href: "/services/market-entry-strategy",
        description: "Enter India or China markets with confidence",
      },
      {
        label: "India-China Consulting",
        href: "/services/india-china-consulting",
        description: "End-to-end corridor advisory",
      },
      {
        label: "Chinese Interpretation",
        href: "/services/interpretation-translation",
        description: "HSK-6 Mandarin for high-stakes meetings",
      },
      {
        label: "Business Delegations",
        href: "/services/business-delegation",
        description: "Curated government & industry programs",
      },
      {
        label: "Corporate Training",
        href: "/services/corporate-training",
        description: "Cross-cultural competency workshops",
      },
      {
        label: "Risk & Compliance",
        href: "/services/risk-compliance-advisory",
        description: "Due diligence and geopolitical risk",
      },
    ],
  },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function defaultSiteNavigation(): SiteNavigation {
  return {
    profile: { name: "Rajesh Kumar", tag: "India-China Consultant" },
    links: DEFAULT_NAV_LINKS,
    announcement: {
      enabled: true,
      text: "Available for Q3 2026 engagements —",
      linkLabel: "Book a free 30-min strategy call",
      linkHref: "/contact",
      mobileText: "Available for Q3 2026 engagements",
    },
    cta: {
      label: "Book Consultation",
      href: "/contact",
    },
    mobile: {
      badgeText: "HSK‑6",
      footerNote: "Free 30-min strategy call · No commitment",
    },
  };
}

/** Seed payload for Prisma (top-level items with nested children). */
export const DEFAULT_NAV_SEED: Array<{
  label: string;
  href: string;
  order: number;
  children?: Array<{
    label: string;
    href: string;
    description: string;
    order: number;
  }>;
}> = DEFAULT_NAV_LINKS.map((link, order) => ({
  label: link.label,
  href: link.href,
  order,
  children: link.children?.map((child, childOrder) => ({
    label: child.label,
    href: child.href,
    description: child.description ?? "",
    order: childOrder,
  })),
}));

export function defaultNavigationSettingsSeed() {
  return {
    id: "singleton" as const,
    brandName: "Rajesh Kumar",
    brandTag: "India-China Business Consultant",
    avatar: "",
    announcementEnabled: true,
    announcementText: "Available for Q3 2026 engagements —",
    announcementLinkLabel: "Book a free 30-min strategy call",
    announcementLinkHref: "/contact",
    announcementMobileText: "Available for Q3 2026 engagements",
    ctaLabel: "Book Consultation",
    ctaHref: "/contact",
    mobileBadgeText: "HSK‑6",
    mobileFooterNote: "Free 30-min strategy call · No commitment",
    useCmsNav: true,
  };
}
