import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getHero } from "@/lib/actions/home";
import { HERO_ASSETS } from "@/lib/hero-assets";

export const metadata: Metadata = {
  // Individual pages override specific fields; base values come from root layout.tsx
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hero = await getHero();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        profile={{
          name: hero.imageName || "Rajesh Kumar",
          tag: hero.imageRole || "India-China Consultant",
          avatar: hero.image || HERO_ASSETS.personFallback,
        }}
      />

      <main
        id="main-content"
        className="flex-1"
        role="main"
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
