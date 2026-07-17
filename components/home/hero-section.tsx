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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-chart-3/10 text-chart-3">
          <Icon className="size-4" strokeWidth={1.75} />
        </div>
        <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-foreground min-[580px]:text-3xl">
          {num !== null ? count : stat.value}
          {rest}
          {stat.suffix && (
            <span className="text-destructive">{stat.suffix}</span>
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
  const personSrc = hero.image || HERO_ASSETS.personFallback;

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
      className="relative overflow-hidden bg-cover bg-center pt-[120px]"
      style={{ backgroundImage: `url(${HERO_ASSETS.bg})` }}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-background"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-24 -top-24 h-[520px] w-[520px] rounded-full bg-[oklch(77.18%_0.139_225.88/0.12)] blur-3xl dark:bg-[oklch(77.18%_0.139_225.88/0.08)]" />
        <div className="absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full bg-[oklch(82.10%_0.20_150.16/0.10)] blur-3xl dark:bg-[oklch(82.10%_0.20_150.16/0.07)]" />
        <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-[oklch(63.17%_0.206_354.04/0.08)] blur-3xl dark:bg-[oklch(63.17%_0.206_354.04/0.05)]" />
      </div>

      <div
        className="pointer-events-none absolute left-[18%] top-[24%] z-[5] hidden animate-float-bob-x xl:block"
        aria-hidden="true"
      >
        <Image src={HERO_ASSETS.randomShape} alt="" width={80} height={80} />
      </div>
      <div
        className="pointer-events-none absolute left-[50%] top-40 z-[5] hidden animate-float-bob-y xl:block"
        aria-hidden="true"
      >
        <Image src={HERO_ASSETS.arrow} alt="" width={140} height={110} />
      </div>
      <div
        className="pointer-events-none absolute right-[22%] top-[15%] z-[5] hidden animate-float-bob-y xl:block"
        aria-hidden="true"
      >
        <Image src={HERO_ASSETS.sparkle} alt="" width={32} height={32} />
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
            className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-foreground ${index === 0 ? "text-foreground" : "text-muted-foreground"
              }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="relative mx-auto max-w-[1320px] px-5 min-[580px]:px-8 lg:px-10 xl:px-[60px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-stretch lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20">
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative order-1 flex flex-col justify-center lg:order-2 lg:py-8 lg:pl-10 xl:pl-14 2xl:pl-[4.5rem]"
          >
            <motion.div custom={0} variants={fadeUp}>
              <span className="inline-flex items-center text-lg font-semibold leading-none text-foreground">
                <Image
                  src={HERO_ASSETS.sparkleSm}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                  className="mr-2.5 inline-block"
                />
                {greeting}
              </span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-5 mb-[25px] font-heading text-4xl font-bold leading-[1.08] tracking-tight lg:text-6xl"
            >
              <span className="text-foreground pr-2">
                {hero.headline}
                {hero.highlight && <> {hero.highlight}</>}
              </span>
              {hero.headlineSuffix && (
                <>
                  <span className="font-bold text-muted-foreground">
                    {hero.headlineSuffix}
                  </span>
                </>
              )}
            </motion.h1>

            {hero.subheadline && (
              <motion.p
                custom={2}
                variants={fadeUp}
                className="max-w-[520px] text-base font-normal leading-[26px] text-muted-foreground"
              >
                {hero.subheadline}
              </motion.p>
            )}

            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-4"
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
                  className="group inline-flex items-center gap-[9px] text-sm font-semibold leading-6 text-foreground transition-colors hover:text-chart-3"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(102,102,102,0.16)] bg-card/80 shadow-sm transition-colors group-hover:border-chart-3/40">
                    <Play className="size-4 fill-chart-3 text-chart-3" strokeWidth={0} />
                  </span>
                  <span>{hero.cta2Label}</span>
                </Link>
              )}
            </motion.div>

            {hero.socialProof && (
              <motion.p
                custom={4}
                variants={fadeUp}
                className="mt-6 max-w-[520px] text-xs font-light leading-[26px] text-muted-foreground/70"
              >
                {hero.socialProof}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="relative z-[9] order-2 flex items-end justify-center lg:order-1 lg:justify-start"
          >
            <div className="relative w-full max-w-[600px] lg:max-w-[560px] xl:max-w-[620px]">
              <Image
                src={personSrc}
                alt={hero.imageName || "Portrait"}
                width={640}
                height={760}
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="relative z-10 mx-auto block h-auto w-full max-h-[min(420px,58vh)] object-contain object-bottom min-[580px]:max-h-[min(480px,62vh)] lg:mx-0 lg:max-h-[min(580px,calc(100vh-220px))] xl:max-h-[min(640px,calc(100vh-200px))]"
              />
              <div
                className="pointer-events-none absolute -left-2.5 bottom-12 -z-10 hidden xl:block"
                aria-hidden="true"
              >
                <Image
                  src={HERO_ASSETS.shape}
                  alt=""
                  width={566}
                  height={566}
                  priority
                  className="h-auto w-auto max-w-none"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {stats.length > 0 && (
          <div ref={statsRef} className="relative mt-14 min-[580px]:mt-16 lg:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/60 pt-10 min-[580px]:pt-12 md:grid-cols-4"
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
