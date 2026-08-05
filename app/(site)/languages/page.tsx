"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Metadata } from "next";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

interface SkillBar {
  label: string;
  value: number;
}

interface Language {
  id: string;
  flag: string;
  name: string;
  nativeName: string;
  proficiency: string;
  level: string; // CEFR
  levelColor: string;
  speaking: number;
  reading: number;
  writing: number;
  listening: number;
  certificates: string[];
  culturalNote: string;
  yearsLearning?: string;
}

const LANGUAGES: Language[] = [
  {
    id: "mandarin",
    flag: "🇨🇳",
    name: "Chinese (Mandarin)",
    nativeName: "普通话 (Pǔtōnghuà)",
    proficiency: "Native / C2",
    level: "C2",
    levelColor: "bg-primary text-primary-foreground",
    speaking: 99,
    reading: 98,
    writing: 96,
    listening: 99,
    certificates: [
      "HSK Level 6 — Score 287/300 (2015)",
      "International Chinese Language Teacher Certificate (2010)",
      "Business Chinese Proficiency Test — Advanced (2013)",
    ],
    culturalNote:
      "Rajesh acquired Mandarin over seven years of study and immersion, culminating in two years of residence in Beijing and Shanghai. His proficiency extends to regional dialects, business idioms (商业用语), and the formal registers required in government and legal contexts. He regularly conducts negotiations, delivers lectures, and drafts contracts entirely in Mandarin.",
    yearsLearning: "22 years",
  },
  {
    id: "english",
    flag: "🇬🇧",
    name: "English",
    nativeName: "English",
    proficiency: "Fluent / C2",
    level: "C2",
    levelColor: "bg-primary text-primary-foreground",
    speaking: 98,
    reading: 99,
    writing: 97,
    listening: 98,
    certificates: [
      "IELTS Academic — Band 8.5 (2008)",
      "Cambridge CPE — Grade A (2009)",
    ],
    culturalNote:
      "English is Rajesh's primary language for international business, academic writing, and executive advisory. His written communication is recognised for precision and clarity, particularly in complex multi-jurisdictional business contexts where ambiguity carries legal risk.",
  },
  {
    id: "hindi",
    flag: "🇮🇳",
    name: "Hindi",
    nativeName: "हिन्दी",
    proficiency: "Native / C2",
    level: "C2",
    levelColor: "bg-primary text-primary-foreground",
    speaking: 100,
    reading: 99,
    writing: 98,
    listening: 100,
    certificates: [
      "Hindi Sahitya Sammelan — Prathama (2003)",
    ],
    culturalNote:
      "Hindi is Rajesh's mother tongue, spoken natively from childhood in Rajasthan. It provides a foundational cultural perspective for advising Chinese companies entering the Indian market, particularly in Tier 2 and Tier 3 cities where English penetration remains limited.",
  },
  {
    id: "spanish",
    flag: "🇪🇸",
    name: "Spanish",
    nativeName: "Español",
    proficiency: "Intermediate / B2",
    level: "B2",
    levelColor: "bg-muted text-foreground",
    speaking: 72,
    reading: 80,
    writing: 70,
    listening: 75,
    certificates: [
      "DELE B2 — Instituto Cervantes (2020)",
    ],
    culturalNote:
      "Rajesh began studying Spanish during the COVID period as a bridge to Latin American markets, where China's Belt and Road investments have created significant India-proxy opportunities. He is currently expanding toward C1.",
    yearsLearning: "4 years",
  },
];

function ProgressBar({ label, value }: SkillBar) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] text-muted-foreground">{label}</span>
        <span className="text-[13px] font-medium text-foreground">{value}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

function CEFRBadge({ level }: { level: string }) {
  const colorMap: Record<string, string> = {
    C2: "bg-primary text-primary-foreground",
    C1: "bg-primary/80 text-primary-foreground",
    B2: "bg-muted text-foreground",
    B1: "bg-muted text-muted-foreground",
    A2: "bg-muted text-muted-foreground",
    A1: "bg-muted text-muted-foreground",
  };
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wider ${colorMap[level] ?? "bg-muted text-foreground"}`}
    >
      CEFR {level}
    </span>
  );
}

function LanguageCard({ lang, index }: { lang: Language; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const skills: SkillBar[] = [
    { label: "Speaking", value: lang.speaking },
    { label: "Reading", value: lang.reading },
    { label: "Writing", value: lang.writing },
    { label: "Listening", value: lang.listening },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="text-4xl leading-none pt-1">{lang.flag}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-semibold text-[18px] text-foreground">{lang.name}</h3>
              <CEFRBadge level={lang.level} />
            </div>
            <p className="text-[13px] text-muted-foreground">{lang.nativeName}</p>
            <p className="text-[13px] font-medium text-primary mt-1">
              {lang.proficiency}
            </p>
            {lang.yearsLearning && (
              <p className="text-[12px] text-muted-foreground mt-0.5">
                {lang.yearsLearning} of study &amp; immersion
              </p>
            )}
          </div>
        </div>

        {/* Skill breakdown */}
        <div className="space-y-3.5">
          {skills.map((skill) => (
            <ProgressBar key={skill.label} label={skill.label} value={skill.value} />
          ))}
        </div>

        {/* Cultural note */}
        <div className="pt-2">
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
            {lang.culturalNote}
          </p>
        </div>

        {/* Certificates */}
        {lang.certificates.length > 0 && (
          <div className="pt-2 border-t border-border/50">
            <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase mb-3">
              Language Certificates
            </p>
            <ul className="space-y-1.5">
              {lang.certificates.map((cert) => (
                <li key={cert} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[6px] flex-shrink-0" />
                  <span className="text-[13px] font-light text-muted-foreground">{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function LanguagesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-14 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase mb-3">
            Language Proficiency
          </p>
          <h1 className={cn(sectionHeadingClass, "text-3xl min-[580px]:text-4xl font-semibold mb-4")}>
            Languages
          </h1>
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-xl">
            Language is Rajesh&apos;s most differentiating professional asset. Native
            Mandarin and Hindi fluency — combined with C2 English — allows him to
            operate in boardrooms, government chambers, and factory floors without a
            translator, removing a layer of friction that costs deals.
          </p>
        </div>

        {/* Quick stats */}
        <div className="flex flex-wrap gap-8 mt-10">
          {[
            { label: "Languages Spoken", value: "4" },
            { label: "Native / C2 Languages", value: "3" },
            { label: "Language Certificates", value: "8" },
            { label: "Countries Communicated In", value: "30+" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-semibold text-primary">{s.value}</p>
              <p className="text-[12px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Language cards */}
      <section className="px-4 max-w-7xl mx-auto pb-16">
        <div className="grid lg:grid-cols-2 gap-6">
          {LANGUAGES.map((lang, i) => (
            <LanguageCard key={lang.id} lang={lang} index={i} />
          ))}
        </div>
      </section>

      {/* Why language matters CTA */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <div className="bg-primary rounded-2xl p-6 min-[580px]:p-10">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-widest text-primary-foreground/70 uppercase mb-3">
              The Language Advantage
            </p>
            <h2 className="text-[22px] font-semibold text-primary-foreground leading-snug mb-4">
              &ldquo;The moment I switch to Mandarin, the room changes.&rdquo;
            </h2>
            <p className="text-[14px] font-light leading-relaxed text-primary-foreground/80 mb-6">
              Speaking a counterpart&apos;s language signals respect, commitment, and
              cultural intelligence that no interpreter can replicate. Chinese business
              culture values long-term relationships (guanxi) — and those relationships
              deepen dramatically when built without the friction of translation.
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary-foreground text-primary font-medium rounded-xl px-6 py-3 text-[14px] hover:opacity-90 transition-opacity"
            >
              Book Language Coaching
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
