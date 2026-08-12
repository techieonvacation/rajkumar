import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  ABOUT_CLIENT_DEFAULTS,
  ABOUT_POINT_DEFAULTS,
  ABOUT_SECTION_DEFAULTS,
  COUNTER_ITEM_DEFAULTS,
  COUNTER_SECTION_DEFAULTS,
  PROCESS_SECTION_DEFAULTS,
  PROCESS_STEP_DEFAULTS,
  SERVICE_CARD_DEFAULTS,
  SERVICES_SECTION_DEFAULTS,
  WHY_CHOOSE_SECTION_DEFAULTS,
  WHY_CHOOSE_SKILL_DEFAULTS,
  WORK_ITEM_DEFAULTS,
  WORKS_SECTION_DEFAULTS,
} from "../lib/home/section-defaults";

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

async function seedSingleton<T>(
  label: string,
  delegate: {
    findUnique(args: { where: { id: string } }): Promise<T | null>;
    create(args: { data: Record<string, unknown> }): Promise<T>;
  },
  defaults: Record<string, unknown>,
) {
  const existing = await delegate.findUnique({ where: { id: "singleton" } });
  if (existing) {
    console.log(`• ${label} already exists — left untouched`);
    return;
  }
  await delegate.create({ data: { id: "singleton", ...defaults } });
  console.log(`✓ ${label} seeded`);
}

async function seedItems<T>(
  label: string,
  delegate: {
    count(): Promise<number>;
    create(args: { data: T }): Promise<unknown>;
  },
  defaults: readonly T[],
) {
  const existing = await delegate.count();
  if (existing > 0) {
    console.log(`• ${existing} ${label} already present — left untouched`);
    return;
  }
  for (const entry of defaults) {
    await delegate.create({ data: entry });
  }
  console.log(`✓ ${defaults.length} ${label} seeded`);
}

async function main() {
  await seedSingleton(
    "About section",
    prisma.homeAboutSection,
    ABOUT_SECTION_DEFAULTS,
  );
  await seedItems("about points", prisma.homeAboutPoint, ABOUT_POINT_DEFAULTS);
  await seedItems(
    "about client avatars",
    prisma.homeAboutClient,
    ABOUT_CLIENT_DEFAULTS,
  );

  await seedSingleton(
    "Counter section",
    prisma.homeCounterSection,
    COUNTER_SECTION_DEFAULTS,
  );
  await seedItems("counters", prisma.homeCounterItem, COUNTER_ITEM_DEFAULTS);

  await seedSingleton(
    "Home services section",
    prisma.homeServicesSection,
    SERVICES_SECTION_DEFAULTS,
  );
  await seedItems(
    "service cards",
    prisma.homeServiceCard,
    SERVICE_CARD_DEFAULTS,
  );

  await seedSingleton(
    "Works section",
    prisma.homeWorksSection,
    WORKS_SECTION_DEFAULTS,
  );
  await seedItems("works", prisma.homeWorkItem, WORK_ITEM_DEFAULTS);

  await seedSingleton(
    "Why Choose section",
    prisma.homeWhyChooseSection,
    WHY_CHOOSE_SECTION_DEFAULTS,
  );
  await seedItems(
    "skill bars",
    prisma.homeWhyChooseSkill,
    WHY_CHOOSE_SKILL_DEFAULTS,
  );

  await seedSingleton(
    "Process section",
    prisma.homeProcessSection,
    PROCESS_SECTION_DEFAULTS,
  );
  await seedItems("process steps", prisma.homeProcessStep, PROCESS_STEP_DEFAULTS);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  });
