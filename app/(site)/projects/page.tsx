"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────────────── */

type Category = "All" | "Consulting" | "Trade" | "Market Entry" | "Travel";

type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  outcome: string;
  year: string;
  category: Exclude<Category, "All">;
  color: string;
};

const projects: Project[] = [
  {
    slug: "pharma-china-entry",
    title: "China Market Entry for a Mid-Cap Indian Pharma Group",
    client: "Confidential — Indian Pharma",
    industry: "Pharmaceuticals",
    outcome: "First product registered with NMPA in 14 months; USD 28M Year-1 revenue.",
    year: "2023",
    category: "Market Entry",
    color: "oklch(0.35 0.18 264 / 8%)",
  },
  {
    slug: "auto-jv-facilitation",
    title: "India-China Automotive JV Structuring",
    client: "Confidential — Automotive Tier-1",
    industry: "Automotive Manufacturing",
    outcome: "USD 180M joint venture signed with a Tier-1 Guangdong manufacturer; operational in 8 months.",
    year: "2023",
    category: "Consulting",
    color: "oklch(0.52 0.22 29 / 8%)",
  },
  {
    slug: "textile-trade-expansion",
    title: "Textile Export Expansion into Chinese Retail Channels",
    client: "Confidential — Indian Textile House",
    industry: "Consumer Textiles",
    outcome: "Distribution agreements secured with 3 major Chinese retail chains; exports tripled in 18 months.",
    year: "2022",
    category: "Trade",
    color: "oklch(0.65 0.15 180 / 8%)",
  },
  {
    slug: "government-delegation-2022",
    title: "CII India-China Investment Facilitation Delegation",
    client: "Confederation of Indian Industry",
    industry: "Government / Trade Body",
    outcome: "42 bilateral meetings across Beijing and Shenzhen; 7 MOUs signed during the delegation.",
    year: "2022",
    category: "Consulting",
    color: "oklch(0.75 0.14 85 / 8%)",
  },
  {
    slug: "luxury-brand-india",
    title: "Chinese Luxury Brand India Market Entry",
    client: "Confidential — Chinese Consumer Brand",
    industry: "Luxury Consumer Goods",
    outcome: "First Indian retail partnership established within 9 months; brand launched in 5 tier-1 cities.",
    year: "2022",
    category: "Market Entry",
    color: "oklch(0.35 0.18 264 / 8%)",
  },
  {
    slug: "mining-supply-chain",
    title: "India-China Mining Equipment Trade Route",
    client: "Confidential — Mining Conglomerate",
    industry: "Mining & Resources",
    outcome: "35% reduction in procurement costs via direct China-sourcing; supply chain risk score improved.",
    year: "2021",
    category: "Trade",
    color: "oklch(0.52 0.22 29 / 8%)",
  },
  {
    slug: "tech-startup-expansion",
    title: "Indian Tech Startup China Expansion Strategy",
    client: "Confidential — B2B SaaS",
    industry: "Technology / SaaS",
    outcome: "Go-to-market playbook delivered; first pilot client signed in Shanghai within 6 months.",
    year: "2021",
    category: "Market Entry",
    color: "oklch(0.65 0.15 180 / 8%)",
  },
  {
    slug: "executive-china-immersion",
    title: "Executive China Immersion Programme",
    client: "Global Financial Services Firm",
    industry: "Financial Services",
    outcome: "12-day curated programme for 20 senior partners; 100% rated 'exceeded expectations'.",
    year: "2021",
    category: "Travel",
    color: "oklch(0.75 0.14 85 / 8%)",
  },
  {
    slug: "compliance-audit-bilateral",
    title: "Bilateral Compliance Audit — Manufacturing Conglomerate",
    client: "Confidential — Indian Conglomerate",
    industry: "Heavy Manufacturing",
    outcome: "18 regulatory gaps identified and remediated; zero enforcement action in subsequent 2-year audit period.",
    year: "2020",
    category: "Consulting",
    color: "oklch(0.35 0.18 264 / 8%)",
  },
  {
    slug: "trade-mission-gujarat",
    title: "Gujarat State Trade Mission to Zhejiang Province",
    client: "Gujarat Chamber of Commerce",
    industry: "Government / Trade Body",
    outcome: "Trade mission of 35 businesses; export opportunities of USD 60M+ identified and matched.",
    year: "2020",
    category: "Trade",
    color: "oklch(0.52 0.22 29 / 8%)",
  },
  {
    slug: "private-business-travel",
    title: "Bespoke China Business Travel — Private Equity",
    client: "Confidential — PE Fund",
    industry: "Private Equity",
    outcome: "8-city, 14-day due diligence travel programme for 4-person investment team; 2 portfolio companies acquired.",
    year: "2019",
    category: "Travel",
    color: "oklch(0.65 0.15 180 / 8%)",
  },
  {
    slug: "food-agri-export",
    title: "Indian Agri-Food Export to China",
    client: "Confidential — Agri Cooperative",
    industry: "Agriculture / Food",
    outcome: "3 product categories approved for China export; first shipment of USD 4.2M within 11 months.",
    year: "2019",
    category: "Trade",
    color: "oklch(0.75 0.14 85 / 8%)",
  },
];

/* ─── Animation helpers ──────────────────────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const categories: Category[] = ["All", "Consulting", "Trade", "Market Entry", "Travel"];

/* ─── Page ───────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="space-y-5"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-primary">
          Case Studies
        </p>
        <h1 className="section-heading text-3xl min-[580px]:text-4xl">
          Selected Projects
        </h1>
        <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-2xl">
          A curated selection of engagements illustrating the breadth and depth of
          work delivered for corporations, governments, and institutions across the
          India-China commercial corridor.
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
            onClick={() => setActiveCategory(cat)}
            className="rounded-full px-4 py-1.5 text-[13px] font-medium transition-all"
            style={
              activeCategory === cat
                ? { background: "oklch(0.35 0.18 264)", color: "oklch(0.98 0 0)" }
                : { background: "oklch(0.94 0.005 264)", color: "oklch(0.30 0.012 264)" }
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeCategory}
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid min-[580px]:grid-cols-2 gap-5"
        >
          {filtered.map((project) => (
            <motion.div key={project.slug} variants={fadeUp} layout>
              <Link href={`/projects/${project.slug}`} className="block group">
                <motion.div
                  className="bg-card rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer"
                  whileHover={{ scale: 1.015 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Image placeholder */}
                  <div
                    className="h-40 flex items-center justify-center relative overflow-hidden"
                    style={{ background: project.color }}
                  >
                    <div className="text-center space-y-1 px-4">
                      <p className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                        {project.industry}
                      </p>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ background: "oklch(0.35 0.18 264)" }}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 min-[580px]:p-6 flex-1 flex flex-col space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground">
                          {project.category} · {project.year}
                        </p>
                        <h2 className="mt-1 text-[14px] font-semibold text-foreground leading-snug">
                          {project.title}
                        </h2>
                      </div>
                    </div>
                    <p className="text-[12px] text-muted-foreground">{project.client}</p>
                    <p className="text-[13px] font-light leading-relaxed text-muted-foreground flex-1">
                      {project.outcome}
                    </p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-muted-foreground text-[14px]">
          No projects found in this category.
        </div>
      )}
    </main>
  );
}
