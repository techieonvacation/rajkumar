"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { MapPin, Calendar, Award } from "lucide-react";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────────── */

type Category = "All" | "Corporate" | "Consulting" | "Advisory";

type Entry = {
  id: string;
  company: string;
  initials: string;
  role: string;
  location: string;
  period: string;
  category: Exclude<Category, "All">;
  responsibilities: string[];
  achievements: string[];
};

const entries: Entry[] = [
  {
    id: "rk-consulting",
    company: "Rajesh Kumar Consulting",
    initials: "RKC",
    role: "Founder & Principal Consultant",
    location: "New Delhi, India (Global)",
    period: "2018 – Present",
    category: "Consulting",
    responsibilities: [
      "Lead all client mandates across India-China business strategy, market entry, and risk advisory",
      "Manage a portfolio of 50+ active corporate clients across 12 sectors",
      "Design and deliver executive education programmes and corporate training workshops",
      "Represent clients in high-stakes negotiations and government meetings in Mandarin",
      "Maintain strategic relationships with government trade bodies in both India and China",
    ],
    achievements: [
      "Grew practice to 200+ clients across 18 countries within 6 years",
      "Facilitated India-China joint ventures with combined value exceeding USD 850M",
      "Recognised by CII as a leading bilateral trade facilitator in 2022",
      "Developed proprietary market entry methodology adopted by two multinational corporations",
    ],
  },
  {
    id: "mea-advisor",
    company: "Ministry of External Affairs, India",
    initials: "MEA",
    role: "Senior Trade Advisor (China Desk) — Contract",
    location: "New Delhi, India",
    period: "2016 – 2018",
    category: "Advisory",
    responsibilities: [
      "Provided specialist advisory to the China Desk on commercial and trade policy matters",
      "Prepared briefing documents for ministerial and ambassador-level meetings with Chinese counterparts",
      "Coordinated bilateral business delegations and trade facilitation missions",
      "Served as primary Mandarin interpreter for sensitive diplomatic and commercial sessions",
    ],
    achievements: [
      "Supported successful ratification of a bilateral trade framework covering 8 sectors",
      "Interpreted for the Commerce Minister across 14 high-level meetings in Beijing and Shanghai",
      "Co-authored the 2017 India-China SME Trade Facilitation White Paper",
    ],
  },
  {
    id: "asiabridge",
    company: "AsiaBridge International",
    initials: "ABI",
    role: "Director, India-China Business Development",
    location: "Singapore / Mumbai",
    period: "2014 – 2016",
    category: "Corporate",
    responsibilities: [
      "Led business development across the India-China corridor for a regional strategic advisory firm",
      "Managed a team of 8 analysts and consultants across Singapore, Mumbai, and Shanghai offices",
      "Oversaw client relationships spanning manufacturing, pharmaceuticals, and consumer goods sectors",
      "Designed and delivered cross-border market entry programmes for 30+ corporate clients annually",
    ],
    achievements: [
      "Grew India-China division revenue by 180% over 2 years",
      "Established the firm's Shanghai representative office",
      "Signed strategic referral partnerships with two Tier-1 China law firms",
      "Named 'Top Performer' in the firm's annual awards both years",
    ],
  },
  {
    id: "certmandarin",
    company: "Beijing Language and Culture University",
    initials: "BLCU",
    role: "Advanced Mandarin Programme — Professional Certification",
    location: "Beijing, China",
    period: "2013 – 2015",
    category: "Advisory",
    responsibilities: [
      "Completed advanced Mandarin language and business culture programme",
      "Specialisation in legal, commercial, and diplomatic terminology",
      "Simultaneous interpretation training under professional programme",
    ],
    achievements: [
      "Graduated with distinction — top 5% of cohort",
      "Attained HSK Level 6 (highest) certification",
      "Recipient of the BLCU Excellence in Language Proficiency Award",
    ],
  },
  {
    id: "sinotrade",
    company: "SinoTrade Partners",
    initials: "STP",
    role: "Senior Trade Consultant",
    location: "Shanghai, China / Mumbai, India",
    period: "2012 – 2014",
    category: "Corporate",
    responsibilities: [
      "Managed end-to-end cross-border trade facilitation for Indian exporters entering China",
      "Conducted market research, competitor analysis, and buyer identification in China",
      "Accompanied client delegations to Chinese trade fairs, including Canton Fair and CIIE",
      "Negotiated commercial contracts on behalf of clients with Chinese manufacturers",
    ],
    achievements: [
      "Facilitated export deals totalling USD 120M in first 18 months",
      "Built a network of 60+ vetted Chinese manufacturers across 6 provinces",
      "Received client satisfaction rating of 97% across all engagements",
    ],
  },
  {
    id: "global-horizon",
    company: "Global Horizon Trading Co.",
    initials: "GHT",
    role: "International Trade Analyst",
    location: "Mumbai, India",
    period: "2010 – 2012",
    category: "Corporate",
    responsibilities: [
      "Analysed trade flows, tariff structures, and market opportunities across East Asian markets",
      "Prepared market entry reports for senior management on China, Japan, and South Korea",
      "Coordinated logistics and documentation for India-China export shipments",
      "Supported the company's first official India-China trade delegation to Beijing in 2012",
    ],
    achievements: [
      "Identified a USD 40M cost reduction opportunity in China-sourced raw materials",
      "Promoted to Senior Analyst within 18 months — fastest in department history",
      "Played key role in the inaugural India-China delegation that established three long-term supplier relationships",
    ],
  },
];

/* ─── Animation helpers ──────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const categories: Category[] = ["All", "Corporate", "Consulting", "Advisory"];

/* ─── Initials badge ─────────────────────────────────────────────── */
function InitialsBadge({ initials }: { initials: string }) {
  return (
    <div
      className="w-12 h-12 rounded-xl flex items-center justify-center text-[11px] font-bold text-primary-foreground flex-none"
      style={{ background: "oklch(0.35 0.18 264)" }}
    >
      {initials}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */

export default function ExperienceClient() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? entries
      : entries.filter((e) => e.category === activeCategory);

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-14">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="space-y-5"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-primary">
          Career History
        </p>
        <h1 className={cn(sectionHeadingClass, "text-3xl min-[580px]:text-4xl")}>Experience</h1>
        <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-2xl">
          Fifteen years of corporate, consulting, and advisory roles spanning India,
          China, Singapore, and beyond — each building the bilateral expertise that
          defines the practice today.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActiveCategory(cat);
              setExpandedId(null);
            }}
            className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all"
            style={
              activeCategory === cat
                ? {
                    background: "oklch(0.35 0.18 264)",
                    color: "oklch(0.98 0 0)",
                  }
                : {
                    background: "oklch(0.94 0.005 264)",
                    color: "oklch(0.30 0.012 264)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-5 top-4 bottom-4 w-px hidden min-[580px]:block"
          style={{ background: "oklch(0.35 0.18 264 / 15%)" }}
        />

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-5"
          >
            {filtered.map((entry) => {
              const isExpanded = expandedId === entry.id;

              return (
                <motion.div
                  key={entry.id}
                  variants={fadeUp}
                  layout
                  className="min-[580px]:pl-16 relative"
                >
                  {/* Dot on timeline — desktop only */}
                  <div
                    className="absolute left-2.5 top-5 w-5 h-5 rounded-full hidden min-[580px]:flex items-center justify-center z-10"
                    style={{ background: "oklch(0.35 0.18 264 / 15%)" }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: "oklch(0.35 0.18 264)" }}
                    />
                  </div>

                  <div className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-5">
                    {/* Header row */}
                    <div className="flex items-start gap-4">
                      <InitialsBadge initials={entry.initials} />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h2 className="font-semibold text-[15px] text-foreground">
                            {entry.company}
                          </h2>
                          <span
                            className="text-[11px] font-semibold tracking-wider uppercase rounded-full px-2.5 py-0.5"
                            style={{
                              background: "oklch(0.35 0.18 264 / 10%)",
                              color: "oklch(0.35 0.18 264)",
                            }}
                          >
                            {entry.category}
                          </span>
                        </div>
                        <p className="text-[14px] font-medium text-foreground mt-0.5">
                          {entry.role}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-2">
                          <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            {entry.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-[12px] text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {entry.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable detail */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="detail"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-5 border-t border-border">
                            {/* Responsibilities */}
                            <div className="space-y-2">
                              <h3 className="text-[12px] font-semibold tracking-widest uppercase text-muted-foreground">
                                Responsibilities
                              </h3>
                              <ul className="space-y-1.5">
                                {entry.responsibilities.map((r) => (
                                  <li
                                    key={r}
                                    className="flex items-start gap-2 text-[13px] font-light text-muted-foreground"
                                  >
                                    <span
                                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-none"
                                      style={{ background: "oklch(0.35 0.18 264)" }}
                                    />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Achievements */}
                            <div className="space-y-2">
                              <h3 className="text-[12px] font-semibold tracking-widest uppercase text-muted-foreground">
                                Key Achievements
                              </h3>
                              <div className="space-y-2">
                                {entry.achievements.map((a) => (
                                  <div
                                    key={a}
                                    className="flex items-start gap-2.5 bg-muted rounded-xl p-3"
                                  >
                                    <Award
                                      className="w-3.5 h-3.5 mt-0.5 flex-none"
                                      style={{ color: "oklch(0.35 0.18 264)" }}
                                    />
                                    <span className="text-[13px] font-light text-muted-foreground leading-snug">
                                      {a}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                      className="text-[13px] font-medium transition-opacity hover:opacity-70"
                      style={{ color: "oklch(0.35 0.18 264)" }}
                    >
                      {isExpanded ? "Hide Details ↑" : "View Details ↓"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
