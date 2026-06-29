"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

interface CompanyLogo {
  name: string;
  country: "IN" | "CN" | "GLOBAL";
  sector: string;
}

const companies: CompanyLogo[] = [
  { name: "Tata Consultancy", country: "IN", sector: "Technology" },
  { name: "Alibaba Group", country: "CN", sector: "E-Commerce" },
  { name: "Mahindra & Mahindra", country: "IN", sector: "Manufacturing" },
  { name: "Huawei Technologies", country: "CN", sector: "Telecom" },
  { name: "Reliance Industries", country: "IN", sector: "Conglomerate" },
  { name: "BYD Auto", country: "CN", sector: "Automotive" },
  { name: "Infosys", country: "IN", sector: "Technology" },
  { name: "CNOOC International", country: "CN", sector: "Energy" },
  { name: "Wipro Global", country: "IN", sector: "Technology" },
  { name: "Haier Group", country: "CN", sector: "Consumer Electronics" },
  { name: "Sun Pharma", country: "IN", sector: "Pharma" },
  { name: "Lenovo India", country: "GLOBAL", sector: "Technology" },
];

const doubledCompanies = [...companies, ...companies];

const countryColor: Record<CompanyLogo["country"], string> = {
  IN: "oklch(0.35 0.18 264)",
  CN: "oklch(0.52 0.22 29)",
  GLOBAL: "oklch(0.55 0.18 140)",
};

const countryLabel: Record<CompanyLogo["country"], string> = {
  IN: "IN",
  CN: "CN",
  GLOBAL: "GL",
};

const countryFlag: Record<CompanyLogo["country"], string> = {
  IN: "🇮🇳",
  CN: "🇨🇳",
  GLOBAL: "🌍",
};

export function ClientsMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <section className="overflow-hidden bg-card py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-5 min-[580px]:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 flex flex-col items-center gap-2 text-center"
        >
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Trusted by Global Enterprises
          </p>
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-border/60" />
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground/60">🇮🇳 India</span>
              <span className="mx-1 text-muted-foreground/30">·</span>
              <span className="text-[11px] text-muted-foreground/60">🇨🇳 China</span>
              <span className="mx-1 text-muted-foreground/30">·</span>
              <span className="text-[11px] text-muted-foreground/60">🌍 Global</span>
            </div>
            <div className="h-px w-12 bg-border/60" />
          </div>
        </motion.div>
      </div>

      {/* Marquee strip — full bleed */}
      <div
        className="relative cursor-default"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Client companies marquee"
      >
        {/* Fade masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 sm:w-36"
          style={{
            background:
              "linear-gradient(to right, var(--color-card) 0%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 sm:w-36"
          style={{
            background:
              "linear-gradient(to left, var(--color-card) 0%, transparent 100%)",
          }}
        />

        <div
          className="flex gap-3 animate-marquee"
          style={{
            animationDuration: "38s",
            width: "max-content",
            animationPlayState: paused ? "paused" : "running",
          }}
          aria-hidden="true"
        >
          {doubledCompanies.map((company, index) => (
            <div
              key={`${company.name}-${index}`}
              className="flex shrink-0 items-center gap-3 rounded-xl bg-background px-5 py-3.5 transition-colors hover:bg-background/80"
            >
              {/* Country flag + badge */}
              <span className="text-base leading-none">{countryFlag[company.country]}</span>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-heading text-[13px] font-medium tracking-tight text-foreground whitespace-nowrap">
                  {company.name}
                </span>
                <span className="text-[10.5px] text-muted-foreground/70 whitespace-nowrap">
                  {company.sector}
                </span>
              </div>
              {/* Country tag */}
              <span
                className="flex h-4 items-center rounded px-1.5 text-[9px] font-semibold text-white"
                style={{ background: countryColor[company.country] }}
              >
                {countryLabel[company.country]}
              </span>
            </div>
          ))}
        </div>

        {/* Pause indicator */}
        {paused && (
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <span className="rounded-full bg-background px-3 py-1 text-[10px] font-medium text-muted-foreground shadow-lg">
              Paused
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
