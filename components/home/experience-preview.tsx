"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { FancyButton } from "@/components/ui/fancy-button";
import { SectionHeader } from "@/components/home/section-header";
import { siteContainerClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

interface Milestone {
  year: string;
  company: string;
  role: string;
  achievement: string;
  country: string;
  flag: string;
  current?: boolean;
}

const milestones: Milestone[] = [
  {
    year: "2024 – Present",
    company: "Rajesh Kumar Consulting",
    role: "Founder & Principal Consultant",
    achievement:
      "Built an independent practice advising 20+ Fortune 500 companies on India-China corridor strategy and cross-border M&A.",
    country: "India",
    flag: "🇮🇳",
    current: true,
  },
  {
    year: "2018 – 2024",
    company: "Deloitte India",
    role: "Senior Manager — Asia Pacific Advisory",
    achievement:
      "Led a 12-person team delivering market entry mandates worth $2B+ in aggregate deal value across China, Vietnam, and India.",
    country: "Asia Pacific",
    flag: "🌏",
  },
  {
    year: "2013 – 2018",
    company: "FICCI China Desk",
    role: "Head of China Business Development",
    achievement:
      "Facilitated 40+ Indian business delegations to China, resulting in MoUs and joint ventures across manufacturing, pharma, and tech.",
    country: "China",
    flag: "🇨🇳",
  },
  {
    year: "2008 – 2013",
    company: "Beijing Normal University",
    role: "Research Scholar & Language Specialist",
    achievement:
      "Attained HSK Level 6 proficiency and authored a bilingual study on Sino-Indian trade policy frameworks under WTO accession rules.",
    country: "Beijing, China",
    flag: "🇨🇳",
  },
];

const metrics = [
  { value: "15+", label: "Years" },
  { value: "$2B+", label: "Deal value" },
  { value: "20+", label: "Fortune 500 clients" },
  { value: "40+", label: "Delegations" },
] as const;

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

function TimelineEntry({
  milestone,
  isLast,
}: {
  milestone: Milestone;
  isLast: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative grid gap-5 md:grid-cols-[10.5rem_minmax(0,1fr)] md:gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12",
        !isLast && "pb-10 md:pb-12"
      )}
    >
      <div className="relative md:pr-5 lg:pr-6">
        {!isLast && (
          <span
            className="absolute right-0 top-3.5 hidden h-full w-px bg-border md:block"
            aria-hidden
          />
        )}
        <span
          className={cn(
            "absolute right-0 top-3 z-1 hidden size-2 translate-x-1/2 rounded-full ring-4 ring-background md:block",
            milestone.current ? "bg-primary" : "bg-muted-foreground/45"
          )}
          aria-hidden
        />

        <div className="flex w-full items-start gap-4 pl-5 md:w-auto md:flex-col md:items-end md:gap-3 md:pl-0 md:pt-0.5">
          <span
            className={cn(
              "absolute left-0 top-1.5 size-2 rounded-full ring-4 ring-background md:hidden",
              milestone.current ? "bg-primary" : "bg-muted-foreground/45"
            )}
            aria-hidden
          />
          <time
            dateTime={milestone.year.replace(/\s/g, "")}
            className={cn(
              "shrink-0 text-[12px] font-medium uppercase tracking-[0.12em] min-[580px]:text-[13px]",
              milestone.current ? "text-primary" : "text-muted-foreground"
            )}
          >
            {milestone.year}
          </time>
          <span className="hidden text-[12px] text-muted-foreground md:inline">
            {milestone.flag} {milestone.country}
          </span>
        </div>
      </div>

      <div
        className={cn(
          "relative border-l border-border/70 pl-5 md:border-0 md:pl-0",
          milestone.current &&
            "md:rounded-2xl md:border md:border-primary/20 md:bg-primary/4 md:p-6 lg:p-7"
        )}
      >
        <span className="mb-2 inline-flex text-[12px] text-muted-foreground md:hidden">
          {milestone.flag} {milestone.country}
        </span>

        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {milestone.company}
        </p>
        <h3 className="mt-1.5 font-heading text-[18px] font-semibold leading-snug tracking-tight text-foreground min-[580px]:text-[20px]">
          {milestone.role}
          {milestone.current && (
            <span className="ml-2.5 inline-block align-middle text-[10px] font-semibold uppercase tracking-wider text-primary">
              · Present
            </span>
          )}
        </h3>
        <p className="mt-3 max-w-2xl text-[14px] font-light leading-relaxed text-muted-foreground">
          {milestone.achievement}
        </p>
      </div>
    </div>
  );
}

export function ExperiencePreview() {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className={siteContainerClass}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto max-w-3xl"
        >
          <SectionHeader
            align="center"
            eyebrow="Experience"
            title="A career across"
            highlight="borders & boardrooms"
            description="Academia, industry associations, global consulting, and independent practice — focused on the India–China corridor."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
          className="mx-auto mt-12 max-w-5xl md:mt-14"
        >
          <div className="overflow-hidden rounded-2xl border border-border/80 bg-background shadow-[0_1px_2px_oklch(0_0_0/4%)] md:rounded-3xl">
            <div className="grid grid-cols-2 divide-x divide-y divide-border/60 border-b border-border/60 sm:grid-cols-4 sm:divide-y-0">
              {metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col items-center justify-center gap-1 px-4 py-5 text-center sm:py-6"
                >
                  <span className="font-heading text-2xl font-semibold tracking-tight text-foreground tabular-nums min-[580px]:text-[28px]">
                    {m.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="px-5 py-10 min-[580px]:px-8 min-[580px]:py-12 lg:px-12 lg:py-14">
              <div className="mb-10 flex flex-col gap-4 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Timeline
                  </p>
                  <p className="mt-2 font-heading text-lg font-medium text-foreground min-[580px]:text-xl">
                    2008 — Present
                  </p>
                </div>
                <Link
                  href="/experience"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary transition-opacity hover:opacity-75"
                >
                  Full experience
                  <ArrowUpRight className="size-3.5" strokeWidth={2} />
                </Link>
              </div>

              <div className="flex flex-col">
                {milestones.map((milestone, index) => (
                  <TimelineEntry
                    key={milestone.year}
                    milestone={milestone}
                    isLast={index === milestones.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
          className="mt-10 flex justify-center md:mt-12"
        >
          <FancyButton variant="explore" href="/experience">
            View full career history
          </FancyButton>
        </motion.div>
      </div>
    </section>
  );
}
