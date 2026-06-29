import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { createBlogPostSchema } from "@/lib/validators/blog";

// ── Auth guard ─────────────────────────────────────────────────────────────────

async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// ── GET /api/admin/blog ────────────────────────────────────────────────────────
// Returns all blog posts (published + drafts) for the admin panel.

export async function GET(request: NextRequest): Promise<NextResponse> {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { searchParams } = new URL(request.url);
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "20", 10));
  const skip = (page - 1) * limit;
  const search = searchParams.get("q") ?? "";
  const published = searchParams.get("published");

  try {
    const where = {
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { excerpt: { contains: search, mode: "insensitive" as const } },
              { category: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(published !== null && published !== ""
        ? { published: published === "true" }
        : {}),
    };

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          category: true,
          tags: true,
          author: true,
          readTime: true,
          views: true,
          published: true,
          featured: true,
          publishedAt: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("[api/admin/blog GET]", err);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

// ── POST /api/admin/blog ───────────────────────────────────────────────────────
// Creates a new blog post.

export async function POST(request: NextRequest): Promise<NextResponse> {
  const guard = await requireAdmin();
  if (guard) return guard;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const parsed = createBlogPostSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: parsed.error.errors[0]?.message ?? "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const data = parsed.data;

  try {
    // Check slug uniqueness
    const existing = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        { error: `A post with slug "${data.slug}" already exists` },
        { status: 409 }
      );
    }

    const post = await prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt ?? "",
        content: data.content ?? "",
        coverImage: data.coverImage ?? "",
        category: data.category ?? "Insights",
        tags: data.tags ?? [],
        author: data.author ?? "Rajesh Kumar",
        authorImage: data.authorImage ?? "",
        readTime: data.readTime ?? 5,
        published: data.published ?? false,
        featured: data.featured ?? false,
        publishedAt: data.published ? (data.publishedAt ?? new Date()) : null,
        seoTitle: data.seoTitle ?? "",
        seoDesc: data.seoDesc ?? "",
        ogImage: data.ogImage ?? "",
        order: data.order ?? 0,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("[api/admin/blog POST]", err);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
