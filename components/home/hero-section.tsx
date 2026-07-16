"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BadgeCheck } from "lucide-react";
import type { Hero, Stat } from "@prisma/client";
import { getStatIcon } from "@/lib/icon-map";
import type { FloatCard } from "@/lib/validators/home";

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
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" strokeWidth={1.75} />
        </div>
        <span className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-foreground min-[580px]:text-3xl">
          {num !== null ? count : stat.value}
          {rest}
          {stat.suffix && (
            <span style={{ color: "var(--accent-red)" }}>{stat.suffix}</span>
          )}
        </span>
      </div>
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
      aria-hidden="true"
      style={{
        backgroundImage:
          "radial-gradient(circle, oklch(0.35 0.18 264) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    />
  );
}

function FloatingCard({ card, className }: { card: FloatCard; className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-xl min-[580px]:p-4 ${className ?? ""}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
        {card.icon || "✦"}
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <p className="font-heading text-[13px] font-semibold text-foreground">
          {card.title}
        </p>
        {card.subtitle && (
          <p className="text-[11px] text-muted-foreground">{card.subtitle}</p>
        )}
      </div>
    </div>
  );
}

const FLOAT_POSITIONS = [
  "absolute -bottom-5 -left-4 min-[580px]:-bottom-6 min-[580px]:-left-6",
  "absolute -right-3 top-8 min-[580px]:-right-6",
  "absolute -right-2 top-[56%] min-[580px]:-right-4",
];

interface HeroSectionProps {
  hero: Hero;
  stats: Stat[];
}

export function HeroSection({ hero, stats }: HeroSectionProps) {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
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
    <section className="relative overflow-hidden bg-background py-16 min-[580px]:py-20 md:py-28 lg:py-36">
      <DotGrid />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-40 -top-40 h-[700px] w-[700px] rounded-full opacity-[0.07] dark:opacity-[0.09]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.35 0.18 264) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-20 top-16 h-[500px] w-[500px] rounded-full opacity-[0.04] dark:opacity-[0.06]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.22 29) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 min-[580px]:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 min-[580px]:gap-7"
          >
            {hero.badge && (
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex w-max items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-primary">
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--accent-red)" }}
                  />
                  {hero.badge}
                </span>
              </motion.div>
            )}

            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-heading text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-foreground min-[580px]:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              {hero.headline}
              {hero.highlight && (
                <>
                  {" "}
                  <span className="text-primary">{hero.highlight}</span>
                </>
              )}
              {hero.headlineSuffix && (
                <>
                  <br />
                  {hero.headlineSuffix}
                </>
              )}
            </motion.h1>

            {hero.subheadline && (
              <motion.p
                custom={2}
                variants={fadeUp}
                className="max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[16px]"
              >
                {hero.subheadline}
              </motion.p>
            )}

            {hero.bullets.length > 0 && (
              <motion.ul
                custom={3}
                variants={fadeUp}
                className="flex flex-col gap-2.5"
                aria-label="Areas of expertise"
              >
                {hero.bullets.map((text) => (
                  <li
                    key={text}
                    className="flex items-start gap-2.5 text-[13.5px] font-light text-muted-foreground min-[580px]:text-[14px]"
                  >
                    <BadgeCheck
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      strokeWidth={1.75}
                    />
                    {text}
                  </li>
                ))}
              </motion.ul>
            )}

            <motion.div
              custom={4}
              variants={fadeUp}
              className="flex flex-col gap-3 min-[450px]:flex-row min-[450px]:flex-wrap"
            >
              {hero.cta1Label && (
                <Link
                  href={hero.cta1Url || "/contact"}
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Calendar className="size-4" strokeWidth={1.75} />
                  {hero.cta1Label}
                </Link>
              )}
              {hero.cta2Label && (
                <Link
                  href={hero.cta2Url || "/services"}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-muted px-6 py-3.5 text-[14px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                >
                  {hero.cta2Label}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </motion.div>

            {hero.socialProof && (
              <motion.p
                custom={5}
                variants={fadeUp}
                className="text-[12px] font-light text-muted-foreground/70"
              >
                {hero.socialProof}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.7, delay: 0.25, ease: EASE },
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[320px] min-[580px]:max-w-[380px]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted min-[580px]:rounded-[28px]">
                {hero.image ? (
                  <Image
                    src={hero.image}
                    alt={hero.imageName || "Portrait"}
                    fill
                    priority
                    sizes="(max-width: 580px) 320px, 380px"
                    className="object-cover"
                  />
                ) : (
                  <div className="skeleton h-full w-full" />
                )}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.15 0.01 264 / 0.75) 0%, transparent 100%)",
                  }}
                />
                {(hero.imageName || hero.imageRole) && (
                  <div className="absolute inset-x-0 bottom-0 p-5 min-[580px]:p-6">
                    {hero.imageName && (
                      <p className="font-heading text-[16px] font-semibold text-white">
                        {hero.imageName}
                      </p>
                    )}
                    {hero.imageRole && (
                      <p className="text-[12px] font-light text-white/70">
                        {hero.imageRole}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {floatCards.slice(0, 3).map((card, i) => (
                <div key={card.title + i} className={`hidden min-[450px]:block ${FLOAT_POSITIONS[i]}`}>
                  <FloatingCard card={card} />
                </div>
              ))}

              <div
                className="absolute -right-4 bottom-24 hidden h-5 w-5 rounded-full opacity-60 min-[450px]:block"
                style={{ background: "var(--accent-gold)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -right-7 bottom-16 hidden h-2.5 w-2.5 rounded-full opacity-40 min-[450px]:block"
                style={{ background: "var(--accent-red)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {stats.length > 0 && (
          <div ref={statsRef}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/60 pt-10 min-[580px]:mt-16 min-[580px]:pt-12 md:grid-cols-4"
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
