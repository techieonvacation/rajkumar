import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnv() {
  const envPath = join(process.cwd(), ".env");
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnv();

const prisma = new PrismaClient({
  adapter: new PrismaNeonHttp(process.env.DATABASE_URL!, {}),
});

const DEFAULT_SERVICES = [
  {
    title: "India-China Business Consulting",
    slug: "india-china-consulting",
    summary:
      "End-to-end strategic advisory for enterprises seeking to build, grow, or pivot their presence across the India-China corridor.",
    order: 0,
  },
  {
    title: "Market Entry Strategy",
    slug: "market-entry-strategy",
    summary:
      "Regulatory navigation, partner identification, go-to-market planning, and local entity setup for first-time market entrants.",
    order: 1,
  },
  {
    title: "Chinese Interpretation",
    slug: "interpretation-translation",
    summary:
      "HSK-6 certified Mandarin interpreter for high-stakes negotiations, board meetings, site visits, and government liaisons.",
    order: 2,
  },
  {
    title: "Business Delegation Facilitation",
    slug: "business-delegation",
    summary:
      "Curated delegation programs with government officials, industry bodies, and C-suite counterparts in Beijing, Shanghai, and New Delhi.",
    order: 3,
  },
  {
    title: "Corporate Training",
    slug: "corporate-training",
    summary:
      "Cross-cultural competency workshops, Mandarin for business professionals, and China/India market literacy programs for leadership teams.",
    order: 4,
  },
  {
    title: "Risk & Compliance Advisory",
    slug: "risk-compliance-advisory",
    summary:
      "Due diligence, sanctions screening, geopolitical risk assessment, and regulatory compliance frameworks for cross-border operations.",
    order: 5,
  },
] as const;

async function main() {
  const existing = await prisma.hero.findUnique({ where: { id: "singleton" } });

  const heroContent = {
    badge: "Hey There!",
    headline: "Bridging",
    highlight: "India & China",
    headlineSuffix: "for Global Growth",
    tagline: "India-China Business Consultant",
    subheadline:
      "Partner-level consulting in market entry, cross-border trade, corporate strategy, and Chinese language expertise — built on 15 years of on-the-ground experience across Asia.",
    bullets: [
      "HSK Level 6 Mandarin — fluent in business & legal contexts",
      "200+ enterprises advised across 30 countries",
      "Former Deloitte Asia-Pacific Senior Manager",
    ],
    cta1Label: "Book a Call",
    cta1Url: "/contact",
    cta2Label: "Explore Services",
    cta2Url: "/services",
    socialProof: "Trusted by Tata, Deloitte, FICCI & 200+ global enterprises",
    imageName: "Rajesh Kumar",
    imageRole: "India-China Business Consultant",
    floatCards: [
      { icon: "🇨🇳", title: "HSK Level 6", subtitle: "Advanced Mandarin" },
      { icon: "🏢", title: "15+ Years", subtitle: "Cross-border advisory" },
      { icon: "🌏", title: "30+ Countries", subtitle: "Global reach" },
    ],
    published: true,
  };

  if (!existing) {
    await prisma.hero.create({ data: { id: "singleton", ...heroContent } });
    console.log("✓ Hero seeded");
  } else if (!existing.subheadline) {
    await prisma.hero.update({ where: { id: "singleton" }, data: heroContent });
    console.log("✓ Hero updated");
  } else {
    console.log("• Hero already has content — left untouched");
  }

  const statCount = await prisma.stat.count();
  if (statCount === 0) {
    const stats = [
      { label: "Years Experience", value: "15", suffix: "+", icon: "award", order: 0 },
      { label: "Countries Served", value: "30", suffix: "+", icon: "globe", order: 1 },
      { label: "Clients Advised", value: "200", suffix: "+", icon: "users", order: 2 },
      { label: "Market Entries", value: "50", suffix: "+", icon: "trending-up", order: 3 },
    ];
    for (const stat of stats) {
      await prisma.stat.create({ data: stat });
    }
    console.log("✓ 4 stats seeded");
  } else {
    console.log(`• ${statCount} stats already exist — left untouched`);
  }

  const section = await prisma.servicesSection.findUnique({ where: { id: "singleton" } });
  if (!section) {
    await prisma.servicesSection.create({
      data: {
        id: "singleton",
        eyebrow: "What I Offer",
        title: "Consulting",
        titleAccent: "Services",
        description:
          "Specialised advisory services that help organisations unlock the full potential of the world's two largest emerging markets.",
        viewAllLabel: "View full service catalogue",
        viewAllUrl: "/services",
        ctaLabel: "Discuss your requirements",
        ctaUrl: "/contact",
        published: true,
      },
    });
    console.log("✓ Services section seeded");
  } else {
    console.log("• Services section already exists — left untouched");
  }

  for (const service of DEFAULT_SERVICES) {
    const exists = await prisma.service.findUnique({ where: { slug: service.slug } });
    if (!exists) {
      await prisma.service.create({
        data: {
          ...service,
          published: true,
          featured: true,
        },
      });
      console.log(`✓ Service seeded: ${service.title}`);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
