import type { ReactNode } from "react";
import { AnimatedTitle } from "./animated-title";

interface SectionTitleProps {
  tagline: string;
  align?: "left" | "center";
  children: ReactNode;
}

export function SectionTitle({
  tagline,
  align = "left",
  children,
}: SectionTitleProps) {
  return (
    <div className={`section-title ${align === "center" ? "text-center" : "text-left"}`}>
      <div className="section-title__tagline-box">
        <div className="section-title__tagline-shape-1" />
        <span className="section-title__tagline">{tagline}</span>
        <div className="section-title__tagline-shape-2" />
      </div>
      <AnimatedTitle>
        <h2 className="section-title__title">{children}</h2>
      </AnimatedTitle>
    </div>
  );
}
