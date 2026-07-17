import type { Metadata } from "next";
import { ServicesSection } from "@/components/services/services-section";
import { FancyButton } from "@/components/ui/fancy-button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Rajesh Kumar's expert consulting services spanning India-China business strategy, Chinese interpretation, market entry, corporate training, and risk advisory.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesSection showCta />

      <section className="border-t border-border/60 bg-card/30 pb-20 pt-4">
        <div className="mx-auto max-w-6xl px-5 min-[580px]:px-8">
          <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border/70 bg-card px-6 py-8 min-[580px]:flex-row min-[580px]:items-center min-[580px]:px-8">
            <div className="space-y-2">
              <h3 className="font-heading text-lg font-semibold text-foreground min-[580px]:text-xl">
                Not sure which service fits your needs?
              </h3>
              <p className="max-w-xl text-sm font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px]">
                Book a complimentary 30-minute discovery call to find out.
              </p>
            </div>
            <FancyButton
              variant="slide"
              href="/contact"
              className="shrink-0"
            >
              Book a Call
            </FancyButton>
          </div>
        </div>
      </section>
    </main>
  );
}
