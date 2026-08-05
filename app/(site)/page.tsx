import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { HeroMarquee } from "@/components/home/hero-marquee";
import { ServicesPreview } from "@/components/home/services-preview";
import { ExperiencePreview } from "@/components/home/experience-preview";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { ContactCTA } from "@/components/home/contact-cta";
import { getPublishedHero, getPublishedStats } from "@/lib/actions/home";

export const metadata: Metadata = {
  title: "Rajesh Kumar — India-China Business Consultant",
  description:
    "Partner-level consulting in India-China market entry, cross-border trade, corporate strategy, and Chinese language expertise. 15+ years, 200+ clients.",
  openGraph: {
    title: "Rajesh Kumar — India-China Business Consultant",
    description:
      "Partner-level consulting in India-China market entry, cross-border trade, corporate strategy, and Chinese language expertise.",
  },
};

export default async function HomePage() {
  const [hero, stats] = await Promise.all([getPublishedHero(), getPublishedStats()]);

  return (
    <>
      {hero && (
        <>
          <HeroSection hero={hero} stats={stats} />
          <HeroMarquee
            items={
              hero.marqueeItems?.length ? hero.marqueeItems : undefined
            }
          />
        </>
      )}
      <ServicesPreview />
      <ExperiencePreview />
      {/* <TestimonialsSection /> */}
      <ContactCTA />
    </>
  );
}
