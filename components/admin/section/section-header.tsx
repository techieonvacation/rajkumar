"use client";

import Link from "next/link";
import type { ElementType } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Save } from "lucide-react";

interface SectionHeaderProps {
  icon: ElementType;
  title: string;
  description: string;
  previewHash?: string;
  isPending: boolean;
  isDirty: boolean;
}

export function SectionHeader({
  icon: Icon,
  title,
  description,
  previewHash = "",
  isPending,
  isDirty,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 min-[580px]:flex-row min-[580px]:items-center min-[580px]:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h1 className="font-heading text-xl font-semibold text-foreground">
            {title}
          </h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild className="border-border">
          <Link
            href={`/${previewHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="mr-1.5 h-4 w-4" />
            View live
          </Link>
        </Button>
        <Button type="submit" disabled={isPending || !isDirty}>
          <Save className="mr-1.5 h-4 w-4" />
          {isPending ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </div>
  );
}
