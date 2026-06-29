import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rajeshkumar.com";
const SITE_NAME = "Rajesh Kumar — India-China Business Consultant";
const SITE_DESCRIPTION =
  "Insights on India-China trade, cross-border business, market entry strategy, and Asian business consulting from Rajesh Kumar.";
const AUTHOR_EMAIL = process.env.EMAIL_TO ?? "contact@rajeshkumar.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export async function GET(): Promise<NextResponse> {
  let posts: Array<{
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    category: string;
    tags: string[];
    author: string;
    publishedAt: Date | null;
    updatedAt: Date;
  }> = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 50,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        content: true,
        coverImage: true,
        category: true,
        tags: true,
        author: true,
        publishedAt: true,
        updatedAt: true,
      },
    });
  } catch (err) {
    console.error("[rss] DB fetch failed:", err);
    // Return an empty feed rather than a 500
  }

  const buildDate = new Date().toUTCString();
  const lastBuildDate =
    posts[0]?.publishedAt?.toUTCString() ?? buildDate;

  const items = posts
    .map((post) => {
      const url = `${BASE_URL}/blog/${post.slug}`;
      const pubDate = (post.publishedAt ?? post.updatedAt).toUTCString();
      const description = post.excerpt
        ? escapeXml(post.excerpt)
        : escapeXml(stripHtml(post.content).slice(0, 300));
      const fullContent = escapeXml(post.content);

      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${description}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <author>${AUTHOR_EMAIL} (${escapeXml(post.author)})</author>
      <category>${escapeXml(post.category)}</category>
      ${post.tags.map((t) => `<category>${escapeXml(t)}</category>`).join("\n      ")}
      ${post.coverImage ? `<enclosure url="${escapeXml(post.coverImage)}" type="image/jpeg" />` : ""}
    </item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>3600</ttl>
    <image>
      <url>${BASE_URL}/images/logo.png</url>
      <title>${escapeXml(SITE_NAME)}</title>
      <link>${BASE_URL}</link>
    </image>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
