"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ServicesSection } from "@prisma/client";
import { FancyButton } from "@/components/ui/fancy-button";
import { HERO_ASSETS } from "@/lib/hero-assets";
import type { ServiceRowItem } from "@/lib/services-section-map";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface ServicesSectionProps {
  section: ServicesSection;
  services: ServiceRowItem[];
  showIntro?: boolean;
  showViewAll?: boolean;
  showCta?: boolean;
  className?: string;
}

function ServiceRow({
  service,
  index,
}: {
  service: ServiceRowItem;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    >
      <Link
        href={service.href}
        className={cn(
          "group grid grid-cols-1 gap-5 rounded-2xl border border-border/70 bg-card/40 p-5",
          "transition-colors duration-300 hover:border-primary/35 hover:bg-card/70",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          "min-[900px]:grid-cols-[4.5rem_minmax(12rem,18rem)_1fr_auto] min-[900px]:items-center min-[900px]:gap-8 min-[900px]:px-8 min-[900px]:py-7"
        )}
      >
        <span className="font-heading text-3xl font-semibold tabular-nums text-muted-foreground/45 transition-colors group-hover:text-primary/70 min-[900px]:text-4xl">
          {number}
        </span>

        <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground min-[900px]:text-xl">
          {service.title}
        </h3>

        <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground min-[900px]:text-[15px] min-[900px]:leading-7">
          {service.description}
        </p>

        <span
          className={cn(
            "inline-flex size-12 shrink-0 items-center justify-center self-start rounded-full border border-primary/70",
            "text-primary transition-all duration-300",
            "group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
            "min-[900px]:size-14"
          )}
          aria-hidden="true"
        >
          <ArrowUpRight className="size-5 min-[900px]:size-6" strokeWidth={1.75} />
        </span>
      </Link>
    </motion.article>
  );
}

export function ServicesSection({
  section,
  services,
  showIntro = true,
  showViewAll = false,
  showCta = false,
  className,
}: ServicesSectionProps) {
  if (!section.published) return null;

  return (
    <section className={cn("relative overflow-hidden bg-background py-20 md:py-28", className)}>
      <div
        className="pointer-events-none absolute -left-8 top-16 h-40 w-40 opacity-35 md:left-6 md:top-20 md:h-52 md:w-52 md:opacity-45"
        aria-hidden="true"
      >
        <Image
          src={HERO_ASSETS.randomShape}
          alt=""
          fill
          className="object-contain object-left-top"
          sizes="208px"
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 min-[580px]:px-8">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <div className="mb-5 inline-flex items-center justify-center gap-2">
            <Image
              src={HERO_ASSETS.sparkleSm}
              alt=""
              width={18}
              height={18}
              className="shrink-0"
            />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {section.eyebrow}
            </span>
          </div>

          <h2 className="font-heading text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-tight text-foreground">
            {section.title}{" "}
            <span className="text-primary">{section.titleAccent}</span>
          </h2>

          {showIntro && section.description && (
            <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px] min-[580px]:leading-7">
              {section.description}
            </p>
          )}
        </motion.header>

        {services.length > 0 ? (
          <div className="flex flex-col gap-4 md:gap-5">
            {services.map((service, index) => (
              <ServiceRow key={service.id} service={service} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border/70 bg-card/30 px-6 py-12 text-center">
            <p className="text-sm text-muted-foreground">
              No published services yet. Add services from the admin panel.
            </p>
          </div>
        )}

        {(showViewAll || showCta) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {showViewAll && section.viewAllLabel && (
              <FancyButton variant="explore" href={section.viewAllUrl || "/services"}>
                {section.viewAllLabel}
              </FancyButton>
            )}
            {showCta && section.ctaLabel && (
              <FancyButton variant="gradient" href={section.ctaUrl || "/contact"}>
                {section.ctaLabel}
              </FancyButton>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
