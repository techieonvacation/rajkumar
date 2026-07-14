"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Globe,
  Target,
  Users,
  Lightbulb,
  Award,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

/* ─── Animation helpers ──────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/* ─── Data ───────────────────────────────────────────────────────── */

const timeline = [
  {
    year: "2010",
    title: "International Trade Career Begins",
    description:
      "Joined a leading multinational trading house managing India's export corridors to East Asia, building deep expertise in supply-chain negotiations and bilateral tariff structures.",
  },
  {
    year: "2012",
    title: "First India-China Government Delegation",
    description:
      "Selected as part of an official commercial delegation to Beijing and Shanghai, facilitating direct dialogue between Indian chambers of commerce and Chinese state enterprises.",
  },
  {
    year: "2015",
    title: "Certified Mandarin Interpreter",
    description:
      "Attained professional Mandarin certification and served as a senior interpreter for Fortune 500 executive boardroom sessions, treaty negotiations, and trade summits.",
  },
  {
    year: "2018",
    title: "Founded Independent Consulting Practice",
    description:
      "Established Rajesh Kumar Consulting to provide partner-level advisory to corporations seeking market access, regulatory clarity, and cultural fluency in the India-China corridor.",
  },
  {
    year: "2022",
    title: "200+ Global Clients Milestone",
    description:
      "Surpassed 200 corporate clients across industries including pharma, tech, manufacturing, luxury retail, and logistics — with engagements spanning 18 countries.",
  },
];

const values = [
  {
    icon: Globe,
    title: "Cultural Intelligence",
    description:
      "Business is ultimately human. Deep cultural fluency — not mere translation — is what converts potential partnerships into lasting commercial relationships.",
  },
  {
    icon: Target,
    title: "Strategic Precision",
    description:
      "Every engagement is grounded in rigorous market analysis, regulatory mapping, and competitive positioning. We deliver insight, not just information.",
  },
  {
    icon: Users,
    title: "Long-term Partnerships",
    description:
      "Our measure of success is not the signed contract but the thriving, compliant, profitable business our clients build over years — with us alongside them.",
  },
  {
    icon: Lightbulb,
    title: "Honest Counsel",
    description:
      "When a market is not ready, when a deal carries hidden risk, or when timing is wrong — we say so. Uncomfortable truths protect our clients' capital and reputation.",
  },
];

const languages = [
  { name: "Mandarin Chinese", native: "普通话", level: 95, label: "Professional Fluency" },
  { name: "English", native: "English", level: 100, label: "Native / Professional" },
  { name: "Hindi", native: "हिन्दी", level: 100, label: "Native" },
  { name: "Spanish", native: "Español", level: 55, label: "Conversational" },
];

const countries = [
  { flag: "🇨🇳", name: "China" },
  { flag: "🇮🇳", name: "India" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇬🇧", name: "UK" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇭🇰", name: "Hong Kong" },
  { flag: "🇲🇾", name: "Malaysia" },
];

/* ─── Component ──────────────────────────────────────────────────── */

export default function AboutClient() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-24">
      {/* ── Hero biography ─────────────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={fadeUp}>
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">
            About
          </p>
          <h1 className="section-heading text-3xl min-[580px]:text-4xl mb-8">
            Rajesh Kumar
          </h1>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid min-[580px]:grid-cols-[1fr_260px] gap-8 items-start"
        >
          <div className="space-y-5">
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
              For more than fifteen years, Rajesh Kumar has stood at the intersection
              of two of the world&apos;s most dynamic economies — guiding corporations,
              delegations, and institutions through the complex terrain of India-China
              commercial engagement. His practice is built on a rare combination of
              deep linguistic fluency, hands-on government experience, and a track
              record of measurable results for global enterprises.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
              Having participated in multiple official bilateral delegations and worked
              directly with Chinese state enterprises, private conglomerates, and
              provincial trade bodies, Rajesh brings an insider&apos;s understanding of
              how decisions are actually made — beyond what any publicly available
              briefing can reveal.
            </p>
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
              His mission is straightforward: turn cultural and geographic distance into
              competitive advantage for the clients he serves.
            </p>
          </div>

          {/* Stat card */}
          <div className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-6">
            {[
              { value: "15+", label: "Years of experience" },
              { value: "200+", label: "Global clients served" },
              { value: "18", label: "Countries engaged" },
              { value: "4", label: "Languages spoken" },
            ].map((stat) => (
              <div key={stat.label}>
                <p
                  className="text-2xl font-semibold"
                  style={{ color: "oklch(0.35 0.18 264)" }}
                >
                  {stat.value}
                </p>
                <p className="text-[13px] text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ── Mission / Vision / Philosophy ──────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 variants={fadeUp} className="section-heading text-2xl">
          Vision &amp; Philosophy
        </motion.h2>

        <div className="grid min-[580px]:grid-cols-3 gap-5">
          {[
            {
              label: "Mission",
              text: "To eliminate the informational and cultural barriers that prevent world-class corporations from capturing the full value of the India-China growth story.",
            },
            {
              label: "Vision",
              text: "A world where cross-border commercial relationships are built on genuine understanding, mutual respect, and rigorous strategic preparation.",
            },
            {
              label: "Philosophy",
              text: "No market entry succeeds on PowerPoint alone. Relationships, local knowledge, and patient execution are the true currency of cross-border business.",
            },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={fadeUp}
              className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-3"
            >
              <p
                className="text-xs font-semibold tracking-widest uppercase"
                style={{ color: "oklch(0.35 0.18 264)" }}
              >
                {item.label}
              </p>
              <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Professional Timeline ───────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 variants={fadeUp} className="section-heading text-2xl">
          Career Timeline
        </motion.h2>

        <div className="relative space-y-0">
          {/* Vertical connector */}
          <div
            className="absolute left-[19px] top-6 bottom-6 w-px"
            style={{ background: "oklch(0.35 0.18 264 / 15%)" }}
          />

          {timeline.map((entry, i) => (
            <motion.div
              key={entry.year}
              variants={fadeUp}
              custom={i}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              {/* Dot */}
              <div className="relative flex-none">
                <div
                  className="mt-1 w-10 h-10 rounded-full flex items-center justify-center text-[11px] font-semibold text-primary-foreground z-10 relative"
                  style={{ background: "oklch(0.35 0.18 264)" }}
                >
                  {entry.year.slice(2)}
                </div>
              </div>

              {/* Content */}
              <div className="bg-card rounded-2xl p-5 min-[580px]:p-8 flex-1 space-y-2">
                <p className="text-[12px] font-semibold tracking-widest uppercase text-primary">
                  {entry.year}
                </p>
                <h3 className="font-semibold text-[15px] text-foreground">
                  {entry.title}
                </h3>
                <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Countries worked in ─────────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 variants={fadeUp} className="section-heading text-2xl">
          Global Footprint
        </motion.h2>
        <motion.p variants={fadeUp} className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-2xl">
          Rajesh has worked across 18 countries, conducting on-the-ground due
          diligence, leading negotiation teams, and facilitating executive delegations.
        </motion.p>
        <motion.div
          variants={stagger}
          className="grid grid-cols-3 min-[580px]:grid-cols-4 gap-3"
        >
          {countries.map((c) => (
            <motion.div
              key={c.name}
              variants={fadeUp}
              className="bg-card rounded-2xl p-4 flex items-center gap-3"
            >
              <span className="text-2xl">{c.flag}</span>
              <span className="text-[13px] font-medium text-foreground">{c.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Core Values ─────────────────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 variants={fadeUp} className="section-heading text-2xl">
          Core Values
        </motion.h2>
        <div className="grid min-[580px]:grid-cols-2 gap-5">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "oklch(0.35 0.18 264 / 10%)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "oklch(0.35 0.18 264)" }} />
                </div>
                <h3 className="font-semibold text-[15px] text-foreground">{v.title}</h3>
                <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── Languages ───────────────────────────────────────────────── */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-8"
      >
        <motion.h2 variants={fadeUp} className="section-heading text-2xl">
          Languages
        </motion.h2>
        <motion.div variants={stagger} className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-7">
          {languages.map((lang) => (
            <motion.div key={lang.name} variants={fadeUp} className="space-y-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[15px] font-medium text-foreground">{lang.name}</span>
                  <span className="ml-2 text-[13px] text-muted-foreground">{lang.native}</span>
                </div>
                <span className="text-[12px] text-muted-foreground">{lang.label}</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: "oklch(0.35 0.18 264)" }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="bg-card rounded-2xl p-5 min-[580px]:p-12 text-center space-y-6"
      >
        <div
          className="inline-flex w-12 h-12 rounded-full items-center justify-center mx-auto"
          style={{ background: "oklch(0.35 0.18 264 / 10%)" }}
        >
          <MessageSquare className="w-5 h-5" style={{ color: "oklch(0.35 0.18 264)" }} />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Let&apos;s Work Together
        </h2>
        <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-md mx-auto">
          Whether you&apos;re exploring a new market, navigating a complex negotiation, or
          building a long-term India-China strategy — let&apos;s start with a conversation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "oklch(0.35 0.18 264)" }}
        >
          Get in Touch <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.section>
    </main>
  );
}
