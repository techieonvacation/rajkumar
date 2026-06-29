import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Rajesh Kumar",
  description:
    "Learn about Rajesh Kumar — India-China business consultant with 15+ years of experience, Mandarin expert, and former government delegate who has helped 200+ global corporations navigate cross-border trade.",
};

export default function AboutPage() {
  return <AboutClient />;
}
