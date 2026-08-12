import Link from "next/link";
import type { ElementType } from "react";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  FolderKanban,
  ShieldCheck,
  Star,
  Users,
  Workflow,
} from "lucide-react";

const SECTIONS: Array<{
  label: string;
  href: string;
  icon: ElementType;
  description: string;
}> = [
  {
    label: "Hero",
    href: "/admin/hero",
    icon: Star,
    description: "Headline, calls to action, stats row and the marquee strip",
  },
  {
    label: "About Us",
    href: "/admin/home/about",
    icon: Users,
    description: "Imagery, highlight points, experience badge and contact strip",
  },
  {
    label: "The Numbers Speak",
    href: "/admin/home/numbers",
    icon: BarChart3,
    description: "Animated counters with per-tile icons and reveal timing",
  },
  {
    label: "Our Services",
    href: "/admin/home/services",
    icon: Briefcase,
    description: "Service rows, feature lists and hover imagery",
  },
  {
    label: "See Our Works",
    href: "/admin/home/works",
    icon: FolderKanban,
    description: "Portfolio carousel, slide behaviour and lightbox",
  },
  {
    label: "Why Chooses Us",
    href: "/admin/home/why-choose",
    icon: ShieldCheck,
    description: "Skill bars, signature block and showcase artwork",
  },
  {
    label: "Working Process",
    href: "/admin/home/process",
    icon: Workflow,
    description: "Numbered steps over the full-width background",
  },
];

export default function HomeSectionsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Homepage sections
        </h1>
        <p className="text-sm text-muted-foreground">
          Every block on the homepage, in the order it appears
        </p>
      </div>

      <div className="grid gap-4 min-[580px]:grid-cols-2">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group flex items-start gap-4 rounded-2xl border border-border/80 bg-card p-5 shadow-sm transition-colors hover:border-primary/40"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <section.icon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-heading text-sm font-semibold text-foreground">
                {section.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {section.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        ))}
      </div>
    </div>
  );
}
