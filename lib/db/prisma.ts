import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

function createPrismaClient() {
  const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {});
  return new PrismaClient({ adapter });
}

function isClientStale(client: PrismaClient) {
  return typeof (client as PrismaClient & { homeAboutSection?: unknown }).homeAboutSection === "undefined";
}

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

if (!globalThis.__prisma || isClientStale(globalThis.__prisma)) {
  globalThis.__prisma = createPrismaClient();
}

export const prisma = globalThis.__prisma;
