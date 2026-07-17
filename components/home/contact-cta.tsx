"use client";

import { motion } from "framer-motion";
import { Phone, Clock, CheckCircle } from "lucide-react";
import { FancyButton } from "@/components/ui/fancy-button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

const trust = [
  { icon: Clock, text: "Responds within 24 hours" },
  { icon: CheckCircle, text: "No commitment required" },
  { icon: Phone, text: "Free 30-min strategy call" },
];

export function ContactCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "oklch(0.10 0.010 264)" }}
    >
      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.9 0 0) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Radial gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute -left-32 top-0 h-96 w-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, oklch(0.35 0.18 264) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -right-20 bottom-0 h-80 w-80 rounded-full opacity-[0.08]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.52 0.22 29) 0%, transparent 70%)",
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.75 0.14 85 / 0.5), transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center min-[580px]:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center gap-8"
        >
          {/* Eyebrow */}
          <motion.span
            custom={0}
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider"
            style={{
              background: "oklch(0.52 0.22 29 / 0.15)",
              color: "oklch(0.80 0.14 85)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ background: "oklch(0.52 0.22 29)" }}
            />
            Available for New Engagements
          </motion.span>

          {/* Heading */}
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-heading text-[2.5rem] font-semibold leading-tight tracking-tight text-white min-[580px]:text-5xl lg:text-6xl"
          >
            Ready to Expand into
            <br />
            <span style={{ color: "oklch(0.80 0.14 85)" }}>
              China or India?
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            custom={2}
            variants={fadeUp}
            className="max-w-xl text-[15px] font-light leading-relaxed"
            style={{ color: "oklch(0.68 0.010 264)" }}
          >
            Whether you&apos;re a first-time entrant or looking to scale an
            existing presence, a single consultation can clarify your strategy
            and save months of costly trial and error.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={3}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-3"
          >
            <FancyButton variant="gradient" size="lg" href="/contact">
              Book a Call
            </FancyButton>
            <FancyButton variant="slide" href="/contact#message">
              Send a Message
            </FancyButton>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            custom={4}
            variants={fadeUp}
            className="flex flex-wrap justify-center gap-x-6 gap-y-2"
          >
            {trust.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon
                  className="size-3.5 shrink-0"
                  style={{ color: "oklch(0.55 0.010 264)" }}
                  strokeWidth={1.75}
                />
                <span
                  className="text-[12px] font-light"
                  style={{ color: "oklch(0.55 0.010 264)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
