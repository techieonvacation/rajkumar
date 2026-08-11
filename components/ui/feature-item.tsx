import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import { bodySmallClass, cardTitleSmallClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

interface FeatureItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureItem({
  icon,
  title,
  description,
  className,
}: FeatureItemProps) {
  return (
    <div className={cn("group flex items-start gap-4", className)}>
      <IconTile icon={icon} />
      <div className="min-w-0">
        <h3 className={cardTitleSmallClass}>{title}</h3>
        <p className={cn(bodySmallClass, "mt-1.5")}>{description}</p>
      </div>
    </div>
  );
}
