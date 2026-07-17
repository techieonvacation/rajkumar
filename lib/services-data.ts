export interface ConsultingService {
  title: string;
  description: string;
  href: string;
}

export const SERVICES_SECTION = {
  eyebrow: "What I Offer",
  title: "Consulting",
  titleAccent: "Services",
  description:
    "Specialised advisory services that help organisations unlock the full potential of the world's two largest emerging markets.",
} as const;

export const CONSULTING_SERVICES: ConsultingService[] = [
  {
    title: "India-China Business Consulting",
    description:
      "End-to-end strategic advisory for enterprises seeking to build, grow, or pivot their presence across the India-China corridor.",
    href: "/services/india-china-consulting",
  },
  {
    title: "Market Entry Strategy",
    description:
      "Regulatory navigation, partner identification, go-to-market planning, and local entity setup for first-time market entrants.",
    href: "/services/market-entry-strategy",
  },
  {
    title: "Chinese Interpretation",
    description:
      "HSK-6 certified Mandarin interpreter for high-stakes negotiations, board meetings, site visits, and government liaisons.",
    href: "/services/interpretation-translation",
  },
  {
    title: "Business Delegation Facilitation",
    description:
      "Curated delegation programs with government officials, industry bodies, and C-suite counterparts in Beijing, Shanghai, and New Delhi.",
    href: "/services/business-delegation",
  },
  {
    title: "Corporate Training",
    description:
      "Cross-cultural competency workshops, Mandarin for business professionals, and China/India market literacy programs for leadership teams.",
    href: "/services/corporate-training",
  },
  {
    title: "Risk & Compliance Advisory",
    description:
      "Due diligence, sanctions screening, geopolitical risk assessment, and regulatory compliance frameworks for cross-border operations.",
    href: "/services/risk-compliance-advisory",
  },
];
