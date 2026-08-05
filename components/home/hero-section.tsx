"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { FancyButton } from "@/components/ui/fancy-button";
import type { Hero, Stat } from "@prisma/client";
import type { FloatCard } from "@/lib/validators/home";
import { getStatIcon } from "@/lib/icon-map";
import { HERO_ASSETS, HERO_SOCIAL_LINKS } from "@/lib/hero-assets";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const FLOAT_CARD_POSITIONS = [
  "right-0 top-[12%] min-[580px]:right-2",
  "-left-2 bottom-[38%] min-[580px]:-left-4",
  "right-4 bottom-[18%] min-[580px]:right-8",
] as const;

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

function FloatCardBadge({ card }: { card: FloatCard }) {
  return (
    <div className="rounded-2xl border border-border bg-popover/95 px-3.5 py-2.5 text-popover-foreground shadow-lg shadow-black/25 backdrop-blur-md ring-1 ring-border/40 min-[580px]:px-4 min-[580px]:py-3">
      <div className="flex items-center gap-2.5">
        {card.icon && (
          <span className="text-lg leading-none" aria-hidden="true">
            {card.icon}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-foreground min-[580px]:text-sm">
            {card.title}
          </p>
          {card.subtitle && (
            <p className="truncate text-[10px] text-muted-foreground min-[580px]:text-xs">
              {card.subtitle}
            </p>
          )}
        </div>
      </div>
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
  const floatCards = (hero.floatCards as unknown as FloatCard[]) ?? [];

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
    <section className="hero-pinstripe relative overflow-hidden bg-background pt-[120px]">
      <div className="pointer-events-none absolute inset-0 bg-background" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-primary"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-[18%] top-[24%] z-5 hidden animate-float-bob-x xl:block"
        aria-hidden="true"
      >
        <Image
          src={HERO_ASSETS.randomShape}
          alt=""
          width={80}
          height={80}
          className="h-20 w-20"
        />
      </div>
      <div
        className="pointer-events-none absolute left-[50%] top-40 z-5 hidden animate-float-bob-y xl:block"
        aria-hidden="true"
      >
        <Image
          src={HERO_ASSETS.arrow}
          alt=""
          width={140}
          height={110}
          className="h-[110px] w-[140px]"
        />
      </div>
      <div
        className="pointer-events-none absolute right-[22%] top-[15%] z-5 hidden animate-float-bob-y xl:block"
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

      <div className="site-container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-x-10 xl:gap-x-14 2xl:gap-x-16">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="relative z-9 order-2 flex items-end justify-center lg:order-1 lg:justify-start"
          >
            <div className="relative w-full max-w-md min-[580px]:max-w-lg lg:max-w-none">
              <Image
                src={personSrc}
                alt={hero.imageName || hero.imageRole || "Portrait"}
                width={640}
                height={760}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative z-10 mx-auto block h-auto w-full max-h-[min(420px,58vh)] object-contain object-bottom min-[580px]:max-h-[min(480px,62vh)] lg:mx-0 lg:max-h-[min(580px,calc(100vh-220px))] xl:max-h-[min(640px,calc(100vh-200px))]"
              />

              {floatCards.slice(0, 3).map((card, index) => (
                <motion.div
                  key={`${card.title}-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35 + index * 0.1, ease: EASE }}
                  className={`absolute z-20 hidden min-[580px]:block ${FLOAT_CARD_POSITIONS[index] ?? FLOAT_CARD_POSITIONS[0]}`}
                >
                  <FloatCardBadge card={card} />
                </motion.div>
              ))}

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

          <motion.div
            initial="hidden"
            animate="visible"
            className="relative order-1 flex w-full min-w-0 flex-col justify-center lg:order-2 lg:py-6 xl:py-10"
          >
            <div className="w-full min-w-0 max-w-2xl lg:max-w-none">
            <motion.div custom={0} variants={fadeUp}>
              <span className="inline-flex items-center text-lg font-semibold leading-none text-foreground">
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
              className="mt-5 mb-6 font-heading text-4xl font-bold leading-[1.08] tracking-tight min-[580px]:text-5xl lg:text-[3.25rem] lg:leading-[1.06] xl:text-6xl 2xl:text-[4rem]"
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

            {hero.tagline && (
              <motion.p
                custom={1.5}
                variants={fadeUp}
                className="mb-4 text-base font-medium uppercase tracking-[0.12em] leading-relaxed text-muted-foreground"
              >
                {hero.tagline}
              </motion.p>
            )}

            {hero.bullets.length > 0 && (
              <motion.ul
                custom={2}
                variants={fadeUp}
                className="mb-4 space-y-2.5"
              >
                {hero.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground min-[580px]:text-[15px]"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {hero.subheadline && (
              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-base font-normal leading-relaxed text-muted-foreground min-[580px]:leading-7"
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
                className="mt-6 text-xs font-light leading-relaxed text-muted-foreground/70 min-[580px]:text-sm"
              >
                {hero.socialProof}
              </motion.p>
            )}
            </div>
          </motion.div>
        </div>

        {stats.length > 0 && (
          <div ref={statsRef} className="relative mt-14 min-[580px]:mt-16 lg:mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 min-[580px]:pt-12 md:grid-cols-4"
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
