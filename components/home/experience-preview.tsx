"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { FancyButton } from "@/components/ui/fancy-button";

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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function ExperiencePreview() {
  return (
    <section className="bg-card py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 min-[580px]:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Career journey
            </span>
            <h2 className="section-heading text-[22px] min-[580px]:text-[28px]">
              Professional Journey
            </h2>
            <p className="max-w-lg text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px]">
              15+ years spanning academia, industry associations, global
              consulting, and independent practice.
            </p>
          </div>
          <Link
            href="/experience"
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-primary hover:opacity-80 transition-opacity"
          >
            Full experience
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-4.75 top-3 bottom-3 w-px bg-linear-to-b from-primary/60 via-border/60 to-transparent md:left-5.75" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="flex flex-col gap-0"
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className="relative flex gap-7 pb-10 last:pb-0 md:gap-12"
              >
                {/* Dot */}
                <div className="relative z-10 shrink-0 pt-1">
                  {milestone.current ? (
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary md:h-12 md:w-12">
                      {/* Pulse ring */}
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                      <span className="text-base leading-none">{milestone.flag}</span>
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background md:h-12 md:w-12">
                      <div className="h-3 w-3 rounded-full bg-primary/50 ring-4 ring-primary/10 md:h-3.5 md:w-3.5" />
                    </div>
                  )}
                </div>

                {/* Content card */}
                <div className="flex flex-1 flex-col gap-4 rounded-2xl bg-background p-5 min-[580px]:p-6">
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-heading text-[15px] font-medium tracking-tight text-foreground min-[580px]:text-[16px]">
                        {milestone.role}
                      </h3>
                      <p className="text-[13px] font-semibold text-primary">
                        {milestone.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3 text-muted-foreground/60" />
                        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          {milestone.year}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="size-3 text-muted-foreground/60" />
                        <span className="text-[12px] text-muted-foreground">
                          {milestone.flag} {milestone.country}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Achievement */}
                  <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
                    {milestone.achievement}
                  </p>

                  {/* Current badge */}
                  {milestone.current && (
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[11px] font-medium text-primary uppercase tracking-wider">
                        Currently Active
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <FancyButton variant="explore" href="/experience">
            View full career history
          </FancyButton>
        </motion.div>
      </div>
    </section>
  );
}
