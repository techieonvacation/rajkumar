import * as React from "react";
import { sectionPaddingClass, siteContainerClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export const SECTION_TONES = {
  default: "bg-background",
  muted: "border-y border-border/60 bg-card/20",
  dark: "text-white",
} as const;

export const DARK_SECTION_SURFACE = "oklch(12.5% 0 0)";

interface SectionShellProps extends React.ComponentProps<"section"> {
  tone?: keyof typeof SECTION_TONES;
  containerClassName?: string;
  children: React.ReactNode;
}

export function SectionShell({
  tone = "default",
  className,
  containerClassName,
  children,
  style,
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        sectionPaddingClass,
        SECTION_TONES[tone],
        className
      )}
      style={
        tone === "dark"
          ? { background: DARK_SECTION_SURFACE, ...style }
          : style
      }
      {...props}
    >
      <div className={cn(siteContainerClass, containerClassName)}>{children}</div>
    </section>
  );
}
