"use client";

import type { ElementType } from "react";
import {
  Globe,
  TrendingUp,
  Languages,
  Users,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Service {
  icon: ElementType;
  title: string;
  description: string;
  href: string;
  tag: string;
}

const services: Service[] = [
  {
    icon: Globe,
    title: "India-China Business Consulting",
    description:
      "End-to-end strategic advisory for enterprises seeking to build, grow, or pivot their presence across the India-China corridor.",
    href: "/services/india-china-consulting",
    tag: "Core",
  },
  {
    icon: TrendingUp,
    title: "Market Entry Strategy",
    description:
      "Regulatory navigation, partner identification, go-to-market planning, and local entity setup for first-time market entrants.",
    href: "/services/market-entry",
    tag: "Strategy",
  },
  {
    icon: Languages,
    title: "Chinese Interpretation",
    description:
      "HSK-6 certified Mandarin interpreter for high-stakes negotiations, board meetings, site visits, and government liaisons.",
    href: "/services/interpretation",
    tag: "Language",
  },
  {
    icon: Users,
    title: "Business Delegation Facilitation",
    description:
      "Curated delegation programs with government officials, industry bodies, and C-suite counterparts in Beijing, Shanghai, and New Delhi.",
    href: "/services/delegations",
    tag: "Delegations",
  },
  {
    icon: GraduationCap,
    title: "Corporate Training",
    description:
      "Cross-cultural competency workshops, Mandarin for business professionals, and China/India market literacy programs for leadership teams.",
    href: "/services/training",
    tag: "Training",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance Advisory",
    description:
      "Due diligence, sanctions screening, geopolitical risk assessment, and regulatory compliance frameworks for cross-border operations.",
    href: "/services/risk-compliance",
    tag: "Advisory",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
};

export function ServicesPreview() {
  return (
    <section className="bg-background py-20 md:py-28">
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
              What I Offer
            </span>
            <h2 className="section-heading text-[22px] min-[580px]:text-[28px]">
              Consulting Services
            </h2>
            <p className="max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px]">
              Specialised advisory services that help organisations unlock the
              full potential of the world&apos;s two largest emerging markets.
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-primary transition-colors hover:opacity-80"
          >
            All services
            <ArrowRight className="size-3.5" />
          </Link>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.title} variants={cardVariants}>
                <Link
                  href={service.href}
                  className="group flex flex-col gap-5 rounded-2xl bg-card p-6 transition-all duration-300 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
                >
                  {/* Top row: icon + number */}
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <span className="font-mono text-[11px] font-medium tabular-nums text-muted-foreground/40 select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-[15px] font-medium tracking-tight text-foreground">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  {/* Bottom: tag + arrow */}
                  <div className="mt-auto flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-medium text-primary">
                      {service.tag}
                    </span>
                    <span className="flex items-center gap-1 text-[12px] font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                      Explore
                      <ArrowRight className="size-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Globe className="size-4" strokeWidth={1.75} />
            Discuss your requirements
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-muted px-6 py-3 text-[14px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
          >
            View full service catalogue
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
