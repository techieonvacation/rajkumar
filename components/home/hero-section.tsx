"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { FancyButton } from "@/components/ui/fancy-button";
import type { Hero, Stat } from "@prisma/client";
import { getStatIcon } from "@/lib/icon-map";
import { HERO_ASSETS, HERO_SOCIAL_LINKS } from "@/lib/hero-assets";
import { cn } from "@/lib/utils";
import { heroPinstripeClass, siteContainerClass } from "@/lib/layout-classes";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: EASE },
  }),
};

function parseValue(value: string) {
  const match = value.match(/^(\d[\d,.]*)(.*)$/);
  if (!match) return { num: null as number | null, rest: value };
  return { num: Number(match[1].replace(/,/g, "")), rest: match[2] };
}

function useCountUp(target: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return count;
}

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const { num, rest } = parseValue(stat.value);
  const count = useCountUp(num ?? 0, 1500, animate && num !== null);
  const Icon = getStatIcon(stat.icon);
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
          <Icon className="size-4" strokeWidth={1.75} />
        </div>
        <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-foreground min-[580px]:text-3xl">
          {num !== null ? count : stat.value}
          {rest}
          {stat.suffix && (
            <span className="text-primary">{stat.suffix}</span>
          )}
        </span>
      </div>
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

interface HeroSectionProps {
  hero: Hero;
  stats: Stat[];
}

export function HeroSection({ hero, stats }: HeroSectionProps) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const greeting = hero.badge || "Hey There!";
  const description =
    hero.subheadline?.trim() || hero.tagline?.trim() || "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={cn(
        heroPinstripeClass,
        "relative overflow-hidden pt-20 pb-4 min-[580px]:pb-8"
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-background" aria-hidden="true" />

      <div
        className="pointer-events-none absolute left-[12%] top-[28%] z-5 hidden animate-float-bob-x opacity-80 xl:block"
        aria-hidden="true"
      >
        <Image
          src={HERO_ASSETS.randomShape}
          alt=""
          width={64}
          height={64}
          className="h-16 w-16"
        />
      </div>
      <div
        className="pointer-events-none absolute right-[12%] top-[22%] z-5 hidden animate-float-bob-y opacity-80 xl:block"
        aria-hidden="true"
      >
        <Image
          src={HERO_ASSETS.sparkle}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8"
        />
      </div>

      <nav
        className="absolute top-1/2 left-[-45px] z-10 hidden -translate-y-1/2 -rotate-90 items-center gap-5 xl:flex"
        aria-label="Social media links"
      >
        {HERO_SOCIAL_LINKS.map(({ label, href }, index) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-primary ${
              index === 0 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className={siteContainerClass}>
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center min-[580px]:max-w-4xl lg:max-w-[44rem] xl:max-w-4xl xl:px-0 xl:py-8"
        >
          <motion.div custom={0} variants={fadeUp} className="w-full">
            <span className="inline-flex items-center justify-center text-lg font-semibold leading-none text-foreground">
              <Image
                src={HERO_ASSETS.sparkleSm}
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
                className="mr-2.5 inline-block h-5 w-5"
              />
              {greeting}
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            className="mt-5 w-full font-heading text-4xl font-bold leading-[1.08] tracking-tight min-[580px]:text-5xl lg:text-[3.25rem] lg:leading-[1.06] xl:text-6xl 2xl:text-[4rem]"
          >
            <span className="text-foreground">
              {hero.headline}
              {hero.highlight && (
                <>
                  {" "}
                  <span className="text-primary">{hero.highlight}</span>
                </>
              )}
            </span>
            {hero.headlineSuffix && (
              <>
                {" "}
                <span className="font-bold text-foreground">
                  {hero.headlineSuffix}
                </span>
              </>
            )}
          </motion.h1>

          {description && (
            <motion.p
              custom={1.5}
              variants={fadeUp}
              className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground min-[580px]:max-w-2xl min-[580px]:text-[15px] min-[580px]:leading-7"
            >
              {description}
            </motion.p>
          )}

          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-10 flex w-full flex-wrap items-center justify-center gap-4"
          >
            {hero.cta1Label && (
              <FancyButton
                variant="explore"
                size="lg"
                href={hero.cta1Url || "/contact"}
              >
                {hero.cta1Label}
              </FancyButton>
            )}

            {hero.cta2Label && (
              <Link
                href={hero.cta2Url || "/services"}
                className="group inline-flex items-center gap-[9px] text-sm font-semibold leading-6 text-foreground transition-colors hover:text-primary"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-popover/90 text-foreground shadow-md shadow-black/20 transition-colors group-hover:border-primary/50 group-hover:bg-card">
                  <Play className="size-4 fill-primary text-primary" strokeWidth={0} />
                </span>
                <span>{hero.cta2Label}</span>
              </Link>
            )}
          </motion.div>

          {hero.socialProof && (
            <motion.p
              custom={4}
              variants={fadeUp}
              className="mt-6 max-w-xl text-xs font-light leading-relaxed text-muted-foreground/70 min-[580px]:text-sm"
            >
              {hero.socialProof}
            </motion.p>
          )}
        </motion.div>

        {stats.length > 0 && (
          <div ref={statsRef} className="relative mt-14 min-[580px]:mt-16 lg:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 min-[580px]:pt-12 md:grid-cols-4"
            >
              {stats.map((stat) => (
                <StatItem key={stat.id} stat={stat} animate={statsVisible} />
              ))}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
