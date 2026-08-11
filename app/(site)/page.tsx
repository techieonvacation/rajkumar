import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { HeroMarquee } from "@/components/home/hero-marquee";
import { AboutSection } from "@/components/home/about-section";
import { CounterSection } from "@/components/home/counter-section";
import { ServicesSection } from "@/components/home/services-section";
import { WorksSection } from "@/components/home/works-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { ProcessSection } from "@/components/home/process-section";
import { PortfolioSection } from "@/components/home/portfolio-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogSection } from "@/components/home/blog-section";
// import { ContactSection } from "@/components/home/contact-section";
import { getPublishedHero, getPublishedStats } from "@/lib/actions/home";
import {
  organizationSchema,
  personSchema,
  websiteSchema,
} from "@/lib/seo/structured-data";

export const metadata: Metadata = {
  title: "Rajesh Kumar — India-China Business Consultant",
  description:
    "India-China business consulting across market entry, cross-border trade, compliance and cross-cultural operations. 13+ years, HSK 5 Mandarin, CITIC-CLSA alumnus.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rajesh Kumar — India-China Business Consultant",
    description:
      "Market entry, cross-border trade, compliance and language-led advisory between India and China.",
  },
};

export default async function HomePage() {
  const [hero, stats] = await Promise.all([
    getPublishedHero(),
    getPublishedStats(),
  ]);

  const jsonLd = [personSchema(), organizationSchema(), websiteSchema()];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {hero && (
        <>
          <HeroSection hero={hero} stats={stats} />
          <HeroMarquee
            items={hero.marqueeItems?.length ? hero.marqueeItems : undefined}
          />
        </>
      )}

      <AboutSection />
      <CounterSection />
      <ServicesSection />
      <WorksSection />
      <WhyChooseSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <BlogSection />
      {/* Reserved for the dedicated contact page — its layout duplicates the
          testimonial section and the footer already carries the Get In Touch CTA.
      <ContactSection /> */}
    </>
  );
}
