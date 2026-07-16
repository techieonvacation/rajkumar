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

async function main() {
  const existing = await prisma.hero.findUnique({ where: { id: "singleton" } });

  const heroContent = {
    badge: "India · China Business Consultant",
    headline: "Bridging",
    highlight: "India & China",
    headlineSuffix: "for Global Growth",
    subheadline:
      "Partner-level consulting in market entry, cross-border trade, corporate strategy, and Chinese language expertise — built on 15 years of on-the-ground experience across Asia.",
    bullets: [
      "HSK Level 6 Mandarin — fluent in business & legal contexts",
      "200+ enterprises advised across 30 countries",
      "Former Deloitte Asia-Pacific Senior Manager",
    ],
    cta1Label: "Schedule Consultation",
    cta1Url: "/contact",
    cta2Label: "View Services",
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
    console.log("✓ Hero seeded");
  } else {
    console.log("• Hero already has content — left untouched");
  }

  const statCount = await prisma.stat.count();
  if (statCount === 0) {
    await prisma.stat.createMany({
      data: [
        { label: "Years Experience", value: "15", suffix: "+", icon: "award", order: 0 },
        { label: "Countries Served", value: "30", suffix: "+", icon: "globe", order: 1 },
        { label: "Clients Advised", value: "200", suffix: "+", icon: "users", order: 2 },
        { label: "Market Entries", value: "50", suffix: "+", icon: "trending-up", order: 3 },
      ],
    });
    console.log("✓ 4 stats seeded");
  } else {
    console.log(`• ${statCount} stats already exist — left untouched`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
