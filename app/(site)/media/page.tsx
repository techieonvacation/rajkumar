"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, ZoomIn } from "lucide-react";

/* ── Types ───────────────────────────────────────────────────────────────────── */

type MediaCategory =
  | "All"
  | "Events"
  | "Conferences"
  | "Travel"
  | "Corporate"
  | "Awards";

interface MediaItem {
  id: string;
  title: string;
  date: string;
  location: string;
  category: Exclude<MediaCategory, "All">;
  description: string;
  aspectClass: string; // for varying heights in masonry
  emoji: string; // placeholder icon
}

/* ── Data ────────────────────────────────────────────────────────────────────── */

const CATEGORIES: MediaCategory[] = [
  "All",
  "Events",
  "Conferences",
  "Travel",
  "Corporate",
  "Awards",
];

const ITEMS: MediaItem[] = [
  {
    id: "1",
    title: "India-China Business Summit, New Delhi",
    date: "October 2023",
    location: "New Delhi, India",
    category: "Conferences",
    description:
      "Keynote address at the annual India-China Business Summit, outlining trade facilitation frameworks for the post-pandemic era.",
    aspectClass: "aspect-[4/3]",
    emoji: "🎤",
  },
  {
    id: "2",
    title: "Meeting with Commerce Ministry Officials, Beijing",
    date: "June 2023",
    location: "Beijing, China",
    category: "Events",
    description:
      "High-level meetings at the Ministry of Commerce (MOFCOM) facilitating bilateral trade discussions for Indian pharmaceutical companies.",
    aspectClass: "aspect-[3/4]",
    emoji: "🤝",
  },
  {
    id: "3",
    title: "CIIE — China International Import Expo",
    date: "November 2022",
    location: "Shanghai, China",
    category: "Conferences",
    description:
      "Attended CIIE as official Indian delegate, facilitating introductions between 14 Indian exporters and Chinese importers.",
    aspectClass: "aspect-[16/10]",
    emoji: "🌏",
  },
  {
    id: "4",
    title: "Factory Visit — Shenzhen Manufacturing District",
    date: "March 2023",
    location: "Shenzhen, China",
    category: "Travel",
    description:
      "Due diligence factory visits for an Indian electronics company evaluating component sourcing partnerships.",
    aspectClass: "aspect-[4/3]",
    emoji: "🏭",
  },
  {
    id: "5",
    title: "Excellence in Cross-Cultural Business Award",
    date: "February 2023",
    location: "Mumbai, India",
    category: "Awards",
    description:
      "Received the Excellence in Cross-Cultural Business award from the Indo-China Chamber of Commerce.",
    aspectClass: "aspect-[3/4]",
    emoji: "🏆",
  },
  {
    id: "6",
    title: "Executive Workshop — Tata Group Leadership",
    date: "August 2023",
    location: "Bengaluru, India",
    category: "Corporate",
    description:
      "Full-day executive workshop on China market entry strategy for the Tata Group leadership team.",
    aspectClass: "aspect-[4/3]",
    emoji: "🎓",
  },
  {
    id: "7",
    title: "Great Wall Walk — Cultural Immersion",
    date: "October 2019",
    location: "Mutianyu, Beijing",
    category: "Travel",
    description:
      "Cultural immersion programme conducted for an Indian executive delegation visiting China for the first time.",
    aspectClass: "aspect-[16/10]",
    emoji: "🏔️",
  },
  {
    id: "8",
    title: "Confucius Institute Lecture — IIT Bombay",
    date: "January 2024",
    location: "Mumbai, India",
    category: "Events",
    description:
      "Guest lecture on Mandarin for Business at IIT Bombay's Confucius Institute, attended by 200+ students and professionals.",
    aspectClass: "aspect-[4/3]",
    emoji: "🏛️",
  },
  {
    id: "9",
    title: "India Brand Equity Foundation (IBEF) Panel",
    date: "September 2023",
    location: "New Delhi, India",
    category: "Conferences",
    description:
      "Panellist at the IBEF annual summit on 'India as a Global Manufacturing Hub', discussing the China+1 opportunity.",
    aspectClass: "aspect-[3/4]",
    emoji: "📊",
  },
  {
    id: "10",
    title: "Corporate Advisory Retreat — Mahindra Group",
    date: "July 2022",
    location: "Pune, India",
    category: "Corporate",
    description:
      "Strategic advisory retreat with Mahindra Group executives on electric vehicle supply chain localisation.",
    aspectClass: "aspect-[4/3]",
    emoji: "🚗",
  },
  {
    id: "11",
    title: "Ambassador's Reception — Chinese Embassy",
    date: "January 2023",
    location: "New Delhi, India",
    category: "Events",
    description:
      "Invited guest at the Chinese Embassy's Spring Festival reception for Indian business and government leaders.",
    aspectClass: "aspect-[16/10]",
    emoji: "🏮",
  },
  {
    id: "12",
    title: "Best Trade Facilitator Award — FICCI",
    date: "December 2022",
    location: "New Delhi, India",
    category: "Awards",
    description:
      "Recognised by the Federation of Indian Chambers of Commerce as the year's outstanding trade facilitator for India-China commerce.",
    aspectClass: "aspect-[4/3]",
    emoji: "🥇",
  },
];

/* ── Lightbox ─────────────────────────────────────────────────────────────────── */

function Lightbox({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          className="relative z-10 bg-card rounded-2xl overflow-hidden max-w-2xl w-full"
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image placeholder */}
          <div className="w-full aspect-[16/9] bg-muted flex items-center justify-center relative">
            <span className="text-8xl opacity-30">{item.emoji}</span>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="absolute top-3 right-3">
              <span className="bg-primary/90 text-primary-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">
                {item.category}
              </span>
            </div>
          </div>

          {/* Info */}
          <div className="p-5 min-[580px]:p-6">
            <h3 className="font-semibold text-[16px] text-foreground mb-2">
              {item.title}
            </h3>
            <div className="flex flex-wrap gap-4 text-[12px] text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {item.date}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {item.location}
              </span>
            </div>
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
              {item.description}
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Gallery card ─────────────────────────────────────────────────────────────── */

function GalleryCard({
  item,
  onOpen,
}: {
  item: MediaItem;
  onOpen: (item: MediaItem) => void;
}) {
  return (
    <motion.button
      onClick={() => onOpen(item)}
      className="group relative block w-full text-left rounded-2xl overflow-hidden bg-card"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image placeholder */}
      <div className={`relative w-full ${item.aspectClass} bg-muted`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-25">{item.emoji}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-card/90 backdrop-blur-sm text-foreground text-[11px] font-medium px-2.5 py-1 rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-medium text-[13px] text-foreground leading-snug mb-1.5 line-clamp-2">
          {item.title}
        </h3>
        <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {item.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {item.location.split(",")[0]}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────────────── */

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<MediaCategory>("All");
  const [lightboxItem, setLightboxItem] = useState<MediaItem | null>(null);

  const filtered =
    activeCategory === "All"
      ? ITEMS
      : ITEMS.filter((item) => item.category === activeCategory);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-14 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase mb-3">
            Media &amp; Gallery
          </p>
          <h1 className="section-heading text-3xl min-[580px]:text-4xl font-semibold mb-4">
            Events &amp; Highlights
          </h1>
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-xl">
            A visual record of conferences, corporate engagements, travel, and
            recognition spanning Rajesh&apos;s 15+ year career bridging India and China.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-4 max-w-7xl mx-auto mb-10">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-colors duration-150 ${
                cat === activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-[11px] opacity-70">
                  ({ITEMS.filter((i) => i.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          >
            {filtered.map((item) => (
              <div key={item.id} className="break-inside-avoid">
                <GalleryCard item={item} onOpen={setLightboxItem} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-[14px]">
              No items in this category yet.
            </p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </main>
  );
}
