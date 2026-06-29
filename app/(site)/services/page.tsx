import type { Metadata } from "next";
import Link from "next/link";
import {
  Briefcase,
  Languages,
  Map,
  Users,
  Plane,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Settings,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Rajesh Kumar's expert consulting services spanning India-China business strategy, Chinese interpretation, market entry, corporate training, and risk advisory.",
};

/* ─── Data ───────────────────────────────────────────────────────── */

const services = [
  {
    slug: "india-china-consulting",
    icon: Briefcase,
    title: "India-China Business Consulting",
    description:
      "End-to-end strategic advisory for corporations seeking to enter, scale, or optimise their presence in either the Indian or Chinese market. We bring 15 years of bilateral expertise to every mandate.",
    benefits: [
      "Bilateral market intelligence and competitive mapping",
      "Regulatory and licensing pathway guidance",
      "Joint venture structuring and partner identification",
    ],
  },
  {
    slug: "interpretation-translation",
    icon: Languages,
    title: "Chinese Interpretation & Translation",
    description:
      "Professional Mandarin-English-Hindi interpretation for boardroom negotiations, government meetings, trade summits, and legal proceedings — with complete confidentiality.",
    benefits: [
      "Simultaneous and consecutive interpretation",
      "Certified document translation",
      "Sector-specific terminology mastery (legal, pharma, tech, trade)",
    ],
  },
  {
    slug: "market-entry-strategy",
    icon: Map,
    title: "Market Entry Strategy",
    description:
      "Structured market entry programmes that move from research to first-revenue in a defined timeline. We manage the full process so your team can focus on the product.",
    benefits: [
      "Feasibility studies and entry-mode analysis",
      "Distributor, partner, and supplier sourcing",
      "Go-to-market planning with phased milestones",
    ],
  },
  {
    slug: "business-delegation",
    icon: Users,
    title: "Business Delegation Services",
    description:
      "Full-service coordination of official and commercial delegations between India and China — from itinerary design and protocol briefing to live facilitation and follow-up.",
    benefits: [
      "High-level meeting facilitation and agenda management",
      "Cultural protocol and etiquette briefings",
      "Post-delegation action planning and relationship tracking",
    ],
  },
  {
    slug: "travel-consulting",
    icon: Plane,
    title: "Travel Consulting",
    description:
      "Bespoke travel programmes for business executives, government officials, and institutional groups — combining logistical excellence with cultural immersion.",
    benefits: [
      "Curated corporate and government travel itineraries",
      "Visa, logistics, and ground-support coordination",
      "In-destination cultural and commercial briefings",
    ],
  },
  {
    slug: "corporate-training",
    icon: GraduationCap,
    title: "Corporate Training",
    description:
      "Tailored workshops and executive programmes on doing business across the India-China corridor — covering negotiation, communication styles, and cross-cultural management.",
    benefits: [
      "Customised half-day to multi-day workshop formats",
      "Real case studies from 200+ engagements",
      "Measurable behavioural outcomes and follow-up coaching",
    ],
  },
  {
    slug: "chinese-language-training",
    icon: BookOpen,
    title: "Chinese Language Training",
    description:
      "Practical Mandarin programmes designed for business professionals who need functional language skills — not academic fluency — to operate confidently in Chinese business contexts.",
    benefits: [
      "Business Mandarin tracks for executives and teams",
      "Sector-specific vocabulary modules",
      "Online and in-person delivery options",
    ],
  },
  {
    slug: "risk-compliance-advisory",
    icon: ShieldCheck,
    title: "Risk & Compliance Advisory",
    description:
      "Proactive identification and mitigation of regulatory, geopolitical, and operational risks facing companies operating across India and China.",
    benefits: [
      "Regulatory change monitoring and impact assessment",
      "Sanctions, tariff, and export-control guidance",
      "Crisis response frameworks for bilateral incidents",
    ],
  },
  {
    slug: "operational-excellence",
    icon: Settings,
    title: "Operational Excellence",
    description:
      "Process optimisation and operational improvement programmes for cross-border supply chains, shared services, and joint venture operations.",
    benefits: [
      "Cross-border supply-chain efficiency diagnostics",
      "Shared-services centre setup and governance",
      "KPI frameworks aligned to bilateral business realities",
    ],
  },
];

/* ─── Page ───────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <section className="space-y-5">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary">
          What I Offer
        </p>
        <h1 className="section-heading text-3xl min-[580px]:text-4xl">
          Expert Consulting Services
        </h1>
        <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-2xl">
          Nine specialised service lines — each built on deep domain knowledge,
          bilateral relationships, and a consistent track record of commercial results
          for corporations operating at the India-China frontier.
        </p>
      </section>

      {/* Services grid */}
      <section className="grid min-[580px]:grid-cols-2 gap-5">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.slug}
              className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-5 flex flex-col"
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                style={{ background: "oklch(0.35 0.18 264 / 10%)" }}
              >
                <Icon className="w-5 h-5" style={{ color: "oklch(0.35 0.18 264)" }} />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-3">
                <h2 className="font-semibold text-[16px] text-foreground leading-snug">
                  {svc.title}
                </h2>
                <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                  {svc.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-1.5 pt-1">
                  {svc.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2
                        className="w-3.5 h-3.5 mt-0.5 flex-none"
                        style={{ color: "oklch(0.35 0.18 264)" }}
                      />
                      <span className="text-[13px] font-light text-muted-foreground leading-snug">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Link */}
              <Link
                href={`/services/${svc.slug}`}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70"
                style={{ color: "oklch(0.35 0.18 264)" }}
              >
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          );
        })}
      </section>

      {/* CTA strip */}
      <section className="bg-card rounded-2xl p-5 min-[580px]:p-8 flex flex-col min-[580px]:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-[16px] text-foreground">
            Not sure which service fits your needs?
          </h3>
          <p className="text-[14px] font-light text-muted-foreground">
            Book a complimentary 30-minute discovery call to find out.
          </p>
        </div>
        <Link
          href="/contact"
          className="flex-none inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90 whitespace-nowrap"
          style={{ background: "oklch(0.35 0.18 264)" }}
        >
          Book a Call <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
