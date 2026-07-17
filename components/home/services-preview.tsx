import {
  getServicesSection,
  getPublishedServicesForSection,
} from "@/lib/actions/services-section";
import { ServicesSection } from "@/components/services/services-section";
import { mapPublishedServices } from "@/lib/services-section-map";

export async function ServicesPreview() {
  const [section, services] = await Promise.all([
    getServicesSection(),
    getPublishedServicesForSection(),
  ]);

  return (
    <ServicesSection
      section={section}
      services={mapPublishedServices(services)}
      showViewAll
    />
  );
}
