import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const password = process.argv[2];
const email = process.argv[3];

if (!password) {
  console.error('Usage: node scripts/set-admin-password.mts "<password>" [email]');
  process.exit(1);
}

const hash = createHash("sha256").update(password).digest("hex");
const envPath = join(process.cwd(), ".env");

if (!existsSync(envPath)) {
  console.error(".env not found");
  process.exit(1);
}

let content = readFileSync(envPath, "utf-8");

function upsertVar(text: string, key: string, value: string): string {
  const re = new RegExp(`^${key}=.*$`, "gm");
  if (re.test(text)) return text.replace(re, `${key}=${value}`);
  return `${text.trimEnd()}\n${key}=${value}\n`;
}

content = upsertVar(content, "ADMIN_PASSWORD_HASH", hash);
if (email) content = upsertVar(content, "ADMIN_EMAIL", email);

writeFileSync(envPath, content);

console.log("✓ ADMIN_PASSWORD_HASH updated");
if (email) console.log(`✓ ADMIN_EMAIL set to ${email}`);
console.log(`  hash: ${hash}`);
