/**
 * JSON-LD structured data generators for Rajesh Kumar — India-China Business Consultant.
 * Output is consumed by page components via <script type="application/ld+json">.
 *
 * Spec references:
 *   https://schema.org/Person
 *   https://schema.org/Organization
 *   https://schema.org/Service
 *   https://schema.org/Article
 *   https://schema.org/FAQPage
 *   https://schema.org/BreadcrumbList
 *   https://schema.org/WebSite
 */

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://rajeshkumar.com";

// ── Shared types ───────────────────────────────────────────────────────────────

export interface ServiceInput {
  title: string;
  slug: string;
  description: string;
  summary?: string;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  coverImage?: string;
  publishedAt?: Date | string | null;
  updatedAt?: Date | string;
  author?: string;
  authorImage?: string;
  category?: string;
  tags?: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

// ── 1. Person ─────────────────────────────────────────────────────────────────

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Rajesh Kumar",
    alternateName: ["Rajesh Kumar India-China Consultant", "India China Business Expert"],
    url: BASE_URL,
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/rajesh-kumar.jpg`,
      width: 800,
      height: 800,
    },
    jobTitle: "India-China Business Consultant",
    description:
      "Senior India-China business consultant specializing in cross-border trade, market entry strategy, joint ventures, and supply chain optimization between India and China.",
    knowsAbout: [
      "India-China Trade",
      "Cross-border Business Development",
      "Market Entry Strategy",
      "Joint Ventures",
      "Supply Chain Optimization",
      "Regulatory Compliance",
      "Chinese Business Culture",
      "Mergers and Acquisitions",
      "Foreign Direct Investment",
      "Manufacturing Partnerships",
    ],
    knowsLanguage: [
      {
        "@type": "Language",
        name: "Hindi",
        alternateName: "hi",
      },
      {
        "@type": "Language",
        name: "Mandarin Chinese",
        alternateName: "zh",
      },
      {
        "@type": "Language",
        name: "English",
        alternateName: "en",
      },
    ],
    nationality: {
      "@type": "Country",
      name: "India",
    },
    worksFor: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Rajesh Kumar Consulting",
    },
    sameAs: [
      // Populated from SiteConfig in production — add real profile URLs below
      // "https://www.linkedin.com/in/rajeshkumar-india-china/",
      // "https://twitter.com/rajeshkumar",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${BASE_URL}/contact`,
      availableLanguage: ["English", "Hindi", "Chinese"],
    },
  } as const;
}

// ── 2. Organization ───────────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${BASE_URL}/#organization`,
    name: "Rajesh Kumar Consulting",
    alternateName: "RK India-China Consulting",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/logo.png`,
      width: 200,
      height: 60,
    },
    image: `${BASE_URL}/images/og-image.jpg`,
    description:
      "Premium consulting firm specializing in India-China business facilitation, market entry, trade advisory, and cross-border partnerships.",
    founder: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Rajesh Kumar",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "China" },
    ],
    serviceType: [
      "Business Consulting",
      "Market Entry Strategy",
      "Trade Advisory",
      "Cross-border Facilitation",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${BASE_URL}/contact`,
      availableLanguage: ["English", "Hindi", "Chinese"],
    },
    sameAs: [],
  } as const;
}

// ── 3. Service ────────────────────────────────────────────────────────────────

export function serviceSchema(service: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description || service.summary,
    url: `${BASE_URL}/services/${service.slug}`,
    provider: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Rajesh Kumar",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "China" },
    ],
    serviceType: "Business Consulting",
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/contact`,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
  };
}

// ── 4. Article (Blog) ─────────────────────────────────────────────────────────

export function articleSchema(post: BlogPostInput) {
  const publishedDate =
    post.publishedAt instanceof Date
      ? post.publishedAt.toISOString()
      : post.publishedAt ?? new Date().toISOString();

  const modifiedDate =
    post.updatedAt instanceof Date
      ? post.updatedAt.toISOString()
      : post.updatedAt ?? publishedDate;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt ?? "",
    url: `${BASE_URL}/blog/${post.slug}`,
    datePublished: publishedDate,
    dateModified: modifiedDate,
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: post.author ?? "Rajesh Kumar",
      image: post.authorImage
        ? {
            "@type": "ImageObject",
            url: post.authorImage,
          }
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Rajesh Kumar Consulting",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    image: post.coverImage
      ? {
          "@type": "ImageObject",
          url: post.coverImage,
        }
      : `${BASE_URL}/images/og-image.jpg`,
    articleSection: post.category ?? "Insights",
    keywords: post.tags?.join(", ") ?? "",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
  };
}

// ── 5. FAQ ────────────────────────────────────────────────────────────────────

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── 6. Breadcrumb ─────────────────────────────────────────────────────────────

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href.startsWith("http")
        ? item.href
        : `${BASE_URL}${item.href}`,
    })),
  };
}

// ── 7. Website with SearchAction ──────────────────────────────────────────────

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "Rajesh Kumar — India-China Business Consultant",
    url: BASE_URL,
    description:
      "Premium consulting for India-China cross-border business — market entry, trade advisory, joint ventures, and supply chain strategy.",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en",
  } as const;
}
