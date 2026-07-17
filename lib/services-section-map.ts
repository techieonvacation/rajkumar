import type { PublishedServiceItem } from "@/lib/actions/services-section";

export interface ServiceRowItem {
  id: string;
  title: string;
  description: string;
  href: string;
}

export function mapPublishedServices(
  items: PublishedServiceItem[]
): ServiceRowItem[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description:
      item.summary ||
      item.description.replace(/<[^>]+>/g, "").slice(0, 220),
    href: `/services/${item.slug}`,
  }));
}
