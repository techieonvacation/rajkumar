import * as React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getSiteNavigation } from "@/lib/actions/navigation";
import "./template-sections.css";

export const metadata: Metadata = {
  // Individual pages override specific fields; base values come from root layout.tsx
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = await getSiteNavigation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar navigation={navigation} />

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
