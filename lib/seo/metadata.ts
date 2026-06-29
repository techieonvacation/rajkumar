import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rajeshkumar.com";
const SITE_NAME = "Rajesh Kumar — India-China Business Consultant";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-image.jpg`;

export interface GeneratePageMetadataOptions {
  title: string;
  description: string;
  /** Relative path, e.g. "/about" or "/blog/my-post" */
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  /** Additional Open Graph / Twitter keywords */
  keywords?: string[];
}

/**
 * Generates consistent page-level Metadata for use in layout.tsx / page.tsx.
 *
 * Usage:
 * ```ts
 * export const metadata = generatePageMetadata({
 *   title: "About",
 *   description: "Learn about Rajesh Kumar...",
 *   path: "/about",
 * });
 * ```
 */
export function generatePageMetadata(
  options: GeneratePageMetadataOptions
): Metadata {
  const { title, description, path, ogImage, noIndex = false, keywords } = options;

  const canonicalUrl = `${BASE_URL}${path}`;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title: {
      default: `${title} | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: keywords ?? [],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: `${title} — Rajesh Kumar`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rajeshkumar",
      creator: "@rajeshkumar",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [resolvedOgImage],
    },
  };
}

/**
 * Generates Metadata for a blog post / article page.
 */
export interface BlogPostMetadataOptions {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  publishedAt?: Date | string | null;
  author?: string;
  tags?: string[];
  seoTitle?: string;
  seoDesc?: string;
  ogImage?: string;
}

export function generateBlogPostMetadata(post: BlogPostMetadataOptions): Metadata {
  const resolvedTitle = post.seoTitle || post.title;
  const resolvedDesc = post.seoDesc || post.excerpt;
  const canonicalUrl = `${BASE_URL}/blog/${post.slug}`;
  const resolvedOgImage = post.ogImage ?? post.coverImage ?? DEFAULT_OG_IMAGE;

  const publishedTime =
    post.publishedAt instanceof Date
      ? post.publishedAt.toISOString()
      : post.publishedAt ?? undefined;

  return {
    title: {
      default: `${resolvedTitle} | ${SITE_NAME}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: resolvedDesc,
    keywords: post.tags ?? [],
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: resolvedDesc,
      publishedTime,
      authors: [post.author ?? "Rajesh Kumar"],
      tags: post.tags,
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@rajeshkumar",
      creator: "@rajeshkumar",
      title: resolvedTitle,
      description: resolvedDesc,
      images: [resolvedOgImage],
    },
  };
}
