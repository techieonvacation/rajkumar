import type { Metadata } from "next";
import ExperienceClient from "./experience-client";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Rajesh Kumar's full professional history: 15+ years spanning international trade, government advisory, corporate consulting, and language diplomacy across India, China, and 18 countries.",
};

export default function ExperiencePage() {
  return <ExperienceClient />;
}
