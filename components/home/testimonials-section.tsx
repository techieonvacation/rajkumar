"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  initials: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Rajesh's ability to navigate both the regulatory labyrinth in Beijing and the cultural nuances of Indian deal-making is exceptional. He helped us close a JV that our team had been stalled on for two years — in under six months.",
    name: "Vikram Mehta",
    title: "Chief Strategy Officer",
    company: "Aarav Infrastructure Ltd.",
    initials: "VM",
    color: "oklch(0.35 0.18 264)",
  },
  {
    quote:
      "Having an advisor who speaks fluent Mandarin and understands Chinese business etiquette at a deep level is invaluable. Rajesh acted as more than a consultant — he was our cultural bridge in every negotiation.",
    name: "Sarah Lim",
    title: "VP of International Expansion",
    company: "NovaBridge Capital, Singapore",
    initials: "SL",
    color: "oklch(0.52 0.22 29)",
  },
  {
    quote:
      "The market entry roadmap Rajesh prepared for our pharma portfolio was comprehensive and actionable. We launched in three Chinese cities within 18 months, ahead of schedule and within budget.",
    name: "Dr. Anil Kapoor",
    title: "Managing Director",
    company: "BioVantage Pharmaceuticals",
    initials: "AK",
    color: "oklch(0.45 0.15 200)",
  },
  {
    quote:
      "Our corporate training programme on cross-cultural communication transformed how our leadership team engages with Chinese partners. Rajesh's frameworks are practical, memorable, and immediately applicable.",
    name: "Priya Nair",
    title: "Head of Learning & Development",
    company: "TechDome Group",
    initials: "PN",
    color: "oklch(0.55 0.18 140)",
  },
  {
    quote:
      "Rajesh facilitated our delegation to Shanghai and Guangzhou with meticulous preparation. Every meeting was purposeful, every connection genuine. We returned with three signed MoUs.",
    name: "Ravi Shankar",
    title: "Chairman",
    company: "Shankar Exports Pvt. Ltd.",
    initials: "RS",
    color: "oklch(0.75 0.14 85)",
  },
];

/* ─── Single testimonial card ───────────────────────────────────────────────── */

function TestimonialCard({
  t,
  slot,
}: {
  t: Testimonial;
  slot: number;
}) {
  return (
    <motion.div
      key={`${t.name}-${slot}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, delay: slot * 0.07 }}
      className={`flex flex-col gap-5 rounded-2xl bg-card p-6 ${
        slot === 2 ? "hidden lg:flex" : ""
      }`}
    >
      {/* Quote mark decoration */}
      <Quote
        className="size-7 text-primary/25"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      {/* Stars */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className="size-4 fill-current"
            style={{ color: "oklch(0.75 0.14 85)" }}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="flex-1 text-[13.5px] font-light leading-relaxed text-muted-foreground">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Thin divider */}
      <div className="h-px w-full bg-border/60" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
          style={{ background: t.color }}
          aria-hidden="true"
        >
          {t.initials}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-heading text-[13px] font-medium tracking-tight text-foreground truncate">
            {t.name}
          </p>
          <p className="text-[11px] text-muted-foreground truncate">
            {t.title}, {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Testimonials Section ───────────────────────────────────────────────────── */

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const total = testimonials.length;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance pauses on hover
  useEffect(() => {
    if (hovered) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, hovered]);

  const getVisibleIndices = () =>
    Array.from({ length: 3 }, (_, i) => (activeIndex + i) % total);

  return (
    <section
      className="overflow-hidden bg-background py-20 md:py-28"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mx-auto max-w-7xl px-5 min-[580px]:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Client outcomes
            </span>
            <h2 className="section-heading text-[22px] min-[580px]:text-[28px]">
              What Clients Say
            </h2>
            <p className="max-w-lg text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px]">
              Real outcomes from executives who trusted Rajesh to navigate
              their most complex cross-border challenges.
            </p>
          </div>

          {/* Prev / Next — desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <ChevronLeft className="size-5" strokeWidth={1.75} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <ChevronRight className="size-5" strokeWidth={1.75} />
            </button>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {getVisibleIndices().map((testimonialIndex, slot) => (
              <TestimonialCard
                key={`${testimonialIndex}-${slot}`}
                t={testimonials[testimonialIndex]}
                slot={slot}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Controls row */}
        <div className="mt-8 flex items-center justify-between">
          {/* Dot indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next — mobile */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <ChevronLeft className="size-4" strokeWidth={1.75} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <ChevronRight className="size-4" strokeWidth={1.75} />
            </button>
          </div>

          {/* Pause indicator */}
          {hovered && (
            <span className="hidden md:block text-[11px] text-muted-foreground/50">
              Auto-advance paused
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
