"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Globe,
  TrendingUp,
  Users,
  Award,
  BadgeCheck,
  Languages,
  Building2,
} from "lucide-react";
import Link from "next/link";

/* ─── Animation variants ─────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

/* ─── Count-up hook ──────────────────────────────────────────────────────────── */

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Stat item ──────────────────────────────────────────────────────────────── */

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
}

const stats: Stat[] = [
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { value: 30, suffix: "+", label: "Countries Served", icon: Globe },
  { value: 200, suffix: "+", label: "Clients Advised", icon: Users },
  { value: 50, suffix: "+", label: "Market Entries", icon: TrendingUp },
];

function StatItem({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, 1600, animate);
  const Icon = stat.icon;
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="size-4" strokeWidth={1.75} />
        </div>
        <span
          className="font-heading text-2xl font-semibold tracking-tight tabular-nums text-foreground min-[580px]:text-3xl"
          style={{ color: "inherit" }}
        >
          {count}
          <span style={{ color: "oklch(0.52 0.22 29)" }}>{stat.suffix}</span>
        </span>
      </div>
      <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {stat.label}
      </span>
    </div>
  );
}

/* ─── Dot-grid background ────────────────────────────────────────────────────── */

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

/* ─── Floating credential card ───────────────────────────────────────────────── */

interface FloatCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  className?: string;
}

function FloatCard({ icon, title, subtitle, className }: FloatCardProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-xl min-[580px]:p-4 ${className ?? ""}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <p className="font-heading text-[13px] font-semibold text-foreground">
          {title}
        </p>
        <p className="text-[11px] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}

/* ─── Expertise list item ────────────────────────────────────────────────────── */

function ExpertItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-2 text-[13.5px] font-light text-muted-foreground min-[580px]:text-[14px]">
      <BadgeCheck className="size-4 shrink-0 text-primary" strokeWidth={1.75} />
      {text}
    </li>
  );
}

/* ─── Hero Section ───────────────────────────────────────────────────────────── */

export function HeroSection() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

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
    <section className="relative overflow-hidden bg-background py-20 md:py-28 lg:py-36">
      {/* Dot grid */}
      <DotGrid />

      {/* Radial gradient mesh */}
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
        <div
          className="absolute bottom-0 left-1/2 h-[250px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse, oklch(0.75 0.14 85) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 min-[580px]:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ── Left: Content ────────────────────────────────────────────────── */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-7"
          >
            {/* Eyebrow chip */}
            <motion.div custom={0} variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-primary">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ background: "oklch(0.52 0.22 29)" }}
                />
                India · China Business Consultant
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-heading text-[2.75rem] font-semibold leading-[1.06] tracking-tight text-foreground min-[580px]:text-5xl md:text-6xl lg:text-[4.25rem]"
            >
              Bridging{" "}
              <span className="text-primary">India&nbsp;&amp;&nbsp;China</span>
              <br />
              for Global Growth
            </motion.h1>

            {/* Tagline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              className="max-w-xl text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[16px]"
            >
              Partner-level consulting in market entry, cross-border trade,
              corporate strategy, and Chinese language expertise — built on
              15&nbsp;years of on-the-ground experience across Asia.
            </motion.p>

            {/* Expertise bullet list */}
            <motion.ul
              custom={3}
              variants={fadeUp}
              className="flex flex-col gap-2"
              aria-label="Areas of expertise"
            >
              <ExpertItem text="HSK Level 6 Mandarin — fluent in business & legal contexts" />
              <ExpertItem text="200+ enterprises advised across 30 countries" />
              <ExpertItem text="Former Deloitte Asia-Pacific Senior Manager" />
            </motion.ul>

            {/* CTA buttons */}
            <motion.div custom={4} variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-6 py-3.5 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Calendar className="size-4" strokeWidth={1.75} />
                Schedule Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-muted px-6 py-3.5 text-[14px] text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                View Services
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            {/* Social proof micro-line */}
            <motion.p
              custom={5}
              variants={fadeUp}
              className="text-[12px] font-light text-muted-foreground/70"
            >
              Trusted by Tata, Deloitte, FICCI &amp; 200+ global enterprises
            </motion.p>
          </motion.div>

          {/* ── Right: Visual card ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
            }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[340px] min-[580px]:max-w-[380px]">

              {/* Main photo container */}
              <div className="overflow-hidden rounded-2xl min-[580px]:rounded-[28px] bg-muted aspect-[3/4]">
                {/* Photo shimmer placeholder */}
                <div className="skeleton h-full w-full" />
                {/* Gradient overlay at bottom */}
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 rounded-b-2xl min-[580px]:rounded-b-[28px]"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.15 0.01 264 / 0.7) 0%, transparent 100%)",
                  }}
                />
                {/* Name overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-5 min-[580px]:p-6">
                  <p className="font-heading text-[16px] font-semibold text-white">
                    Rajesh Kumar
                  </p>
                  <p className="text-[12px] font-light text-white/70">
                    India-China Business Consultant
                  </p>
                </div>
              </div>

              {/* Float card — HSK Level */}
              <div className="absolute -bottom-5 -left-5 min-[580px]:-bottom-6 min-[580px]:-left-6">
                <FloatCard
                  icon="🇨🇳"
                  title="HSK Level 6"
                  subtitle="Advanced Mandarin"
                />
              </div>

              {/* Float card — Years */}
              <div className="absolute -right-4 top-8 min-[580px]:-right-6">
                <FloatCard
                  icon={<Building2 className="size-5 text-primary" strokeWidth={1.75} />}
                  title="15+ Years"
                  subtitle="Cross-border advisory"
                />
              </div>

              {/* Float card — Countries */}
              <div className="absolute -right-2 top-[55%] min-[580px]:-right-4">
                <FloatCard
                  icon={<Languages className="size-5 text-primary" strokeWidth={1.75} />}
                  title="30+ Countries"
                  subtitle="Global reach"
                />
              </div>

              {/* Decorative dots */}
              <div
                className="absolute -right-4 bottom-24 h-5 w-5 rounded-full opacity-60"
                style={{ background: "oklch(0.75 0.14 85)" }}
                aria-hidden="true"
              />
              <div
                className="absolute -right-7 bottom-16 h-2.5 w-2.5 rounded-full opacity-40"
                style={{ background: "oklch(0.52 0.22 29)" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>
        </div>

        {/* ── Stats row ────────────────────────────────────────────────────────── */}
        <div ref={statsRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={statsVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border/60 pt-12 md:grid-cols-4"
          >
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} animate={statsVisible} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
