import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db/prisma";
import { updateBlogPostSchema } from "@/lib/validators/blog";

type RouteContext = { params: Promise<{ id: string }> };

// ── Auth guard ─────────────────────────────────────────────────────────────────

async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

// ── GET /api/admin/blog/[id] ───────────────────────────────────────────────────

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ post });
  } catch (err) {
    console.error("[api/admin/blog/[id] GET]", err);
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

// ── PATCH /api/admin/blog/[id] ─────────────────────────────────────────────────

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 }
    );
  }

  const parsed = updateBlogPostSchema.safeParse(body);
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
    // Ensure the post exists
    const existing = await prisma.blogPost.findUnique({
      where: { id },
      select: { id: true, published: true, publishedAt: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // If slug is being changed, verify uniqueness
    if (data.slug) {
      const slugConflict = await prisma.blogPost.findFirst({
        where: { slug: data.slug, id: { not: id } },
        select: { id: true },
      });
      if (slugConflict) {
        return NextResponse.json(
          { error: `A post with slug "${data.slug}" already exists` },
          { status: 409 }
        );
      }
    }

    // Auto-set publishedAt when toggling to published
    const publishedAt =
      data.published === true && !existing.published
        ? (data.publishedAt ?? new Date())
        : data.published === false
        ? null
        : data.publishedAt ?? existing.publishedAt;

    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt,
      },
    });

    return NextResponse.json({ post: updated });
  } catch (err) {
    console.error("[api/admin/blog/[id] PATCH]", err);
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

// ── DELETE /api/admin/blog/[id] ────────────────────────────────────────────────

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse> {
  const guard = await requireAdmin();
  if (guard) return guard;

  const { id } = await params;

  try {
    const existing = await prisma.blogPost.findUnique({
      where: { id },
      select: { id: true },
    });
    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    await prisma.blogPost.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[api/admin/blog/[id] DELETE]", err);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
