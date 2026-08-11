import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const TILE_SIZES = {
  sm: "size-9 rounded-xl [&>svg]:size-4",
  md: "size-11 rounded-2xl [&>svg]:size-5",
  lg: "size-14 rounded-2xl [&>svg]:size-6",
} as const;

const TILE_TONES = {
  default:
    "bg-primary/10 text-primary ring-1 ring-primary/20 group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary",
  solid: "bg-primary text-primary-foreground ring-1 ring-primary",
  invert:
    "border border-white/12 bg-white/[0.04] text-primary group-hover:border-primary/50 group-hover:bg-primary group-hover:text-white",
} as const;

interface IconTileProps extends React.ComponentProps<"span"> {
  icon: LucideIcon;
  size?: keyof typeof TILE_SIZES;
  tone?: keyof typeof TILE_TONES;
}

export function IconTile({
  icon: Icon,
  size = "md",
  tone = "default",
  className,
  ...props
}: IconTileProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center transition-colors duration-300",
        TILE_SIZES[size],
        TILE_TONES[tone],
        className
      )}
      {...props}
    >
      <Icon strokeWidth={1.6} aria-hidden="true" />
    </span>
  );
}
