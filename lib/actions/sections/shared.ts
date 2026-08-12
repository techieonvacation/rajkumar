import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export function revalidateSection(adminPath: string) {
  revalidatePath("/");
  revalidatePath(adminPath);
}

export const ITEM_ORDER_BY = [
  { order: "asc" as const },
  { createdAt: "asc" as const },
];
