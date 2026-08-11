"use server";

import { prisma } from "@/lib/db/prisma";
import { safeQuery } from "@/lib/db/resilient";
import type { BlogPost } from "@prisma/client";

export type LatestPost = Pick<
  BlogPost,
  "id" | "title" | "slug" | "excerpt" | "coverImage" | "category" | "views" | "publishedAt" | "createdAt"
>;

export async function getLatestPosts(limit = 3): Promise<LatestPost[]> {
  return safeQuery(
    () =>
      prisma.blogPost.findMany({
        where: { published: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          category: true,
          views: true,
          publishedAt: true,
          createdAt: true,
        },
      }),
    []
  );
}
