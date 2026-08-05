import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights & Publications | Rajesh Kumar",
  description:
    "Expert analysis on India-China business strategy, trade policy, market entry, and cross-border commerce from Rajesh Kumar — India's leading India-China business consultant.",
  openGraph: {
    title: "Insights & Publications | Rajesh Kumar",
    description:
      "Expert analysis on India-China business strategy, trade policy, market entry, and cross-border commerce.",
    type: "website",
  },
};

const CATEGORIES = ["All", "Strategy", "China", "India", "Trade", "Language"] as const;

type Category = (typeof CATEGORIES)[number];

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: number;
  author: string;
  featured?: boolean;
  tags: string[];
}

const POSTS: BlogPost[] = [
  {
    slug: "navigating-india-china-trade-tensions-2024",
    title: "Navigating India-China Trade Tensions: Opportunities Within Constraints",
    excerpt:
      "Despite political headwinds, bilateral trade between India and China exceeded $118 billion in 2023. Here's how forward-thinking businesses are identifying pockets of opportunity within a complex regulatory landscape.",
    category: "Trade",
    date: "2024-11-15",
    readTime: 12,
    author: "Rajesh Kumar",
    featured: true,
    tags: ["Trade Policy", "India-China", "Market Entry"],
  },
  {
    slug: "mandarin-for-business-executives",
    title: "Why Every India-Facing Executive Needs Basic Mandarin: A Practical Guide",
    excerpt:
      "Learning even 200 words of Mandarin signals respect and unlocks trust in Chinese boardrooms. This guide covers the fastest ROI phrases for executives closing cross-border deals.",
    category: "Language",
    date: "2024-10-28",
    readTime: 8,
    author: "Rajesh Kumar",
    tags: ["Mandarin", "Business Chinese", "Executive Skills"],
  },
  {
    slug: "china-market-entry-strategy-2025",
    title: "China Market Entry in 2025: Choosing the Right Structure",
    excerpt:
      "WFOE, JV, or Representative Office? Each structure carries distinct tax, liability, and operational implications. This breakdown helps Indian businesses make the decision with clarity.",
    category: "China",
    date: "2024-10-10",
    readTime: 15,
    author: "Rajesh Kumar",
    featured: true,
    tags: ["Market Entry", "WFOE", "China Business"],
  },
  {
    slug: "india-production-linked-incentive-guide",
    title: "PLI Scheme Decoded: A Guide for Chinese Investors Entering India",
    excerpt:
      "India's Production Linked Incentive scheme has disbursed over ₹3,420 crore across 14 sectors. Here is a plain-language breakdown of eligibility, timelines, and how to apply.",
    category: "India",
    date: "2024-09-22",
    readTime: 11,
    author: "Rajesh Kumar",
    tags: ["PLI", "FDI", "Indian Manufacturing"],
  },
  {
    slug: "guanxi-vs-networking-cultural-contrast",
    title: "Guanxi vs. Networking: Why the Difference Matters for Cross-Border Success",
    excerpt:
      "Western networking is transactional. Chinese guanxi is relational and long-horizon. Understanding this distinction fundamentally changes how Indian companies build partnerships in China.",
    category: "Strategy",
    date: "2024-09-05",
    readTime: 9,
    author: "Rajesh Kumar",
    tags: ["Culture", "Guanxi", "Business Strategy"],
  },
  {
    slug: "supply-chain-diversification-china-plus-one",
    title: "China+1 Strategy: India's Real Readiness and the Gaps That Remain",
    excerpt:
      "Global supply-chain diversification is reshaping manufacturing geography. India wins on labour cost, but lags on logistics and infrastructure. A frank, data-driven assessment.",
    category: "Strategy",
    date: "2024-08-19",
    readTime: 13,
    author: "Rajesh Kumar",
    tags: ["Supply Chain", "Manufacturing", "FDI"],
  },
  {
    slug: "dragon-fruit-dragon-markets",
    title: "Dragon Fruit and Dragon Markets: Agri-Trade Lessons from India-China Commerce",
    excerpt:
      "India's agricultural exports to China remain under-exploited. This case study explores how one farming cooperative doubled export revenues using the right regulatory and logistics pathway.",
    category: "Trade",
    date: "2024-08-01",
    readTime: 7,
    author: "Rajesh Kumar",
    tags: ["Agriculture", "Export", "Trade"],
  },
  {
    slug: "hsk-certification-career-impact",
    title: "HSK Certification: How Language Credentials Unlock Business Doors in China",
    excerpt:
      "The Hanyu Shuiping Kaoshi is not just an academic credential. For business professionals, HSK 5 or 6 signals a depth of commitment that opens relationships no translator can replicate.",
    category: "Language",
    date: "2024-07-14",
    readTime: 6,
    author: "Rajesh Kumar",
    tags: ["HSK", "Chinese Language", "Career"],
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function CategoryChip({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    Strategy: "bg-primary/10 text-primary",
    China: "bg-[oklch(0.52_0.22_29)]/10 text-[oklch(0.52_0.22_29)]",
    India: "bg-[oklch(0.65_0.15_180)]/10 text-[oklch(0.65_0.15_180)]",
    Trade: "bg-[oklch(0.75_0.14_85)]/10 text-[oklch(0.75_0.14_85_/_70%)]",
    Language: "bg-[oklch(0.58_0.18_300)]/10 text-[oklch(0.58_0.18_300)]",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${colorMap[category] ?? "bg-muted text-muted-foreground"}`}
    >
      {category}
    </span>
  );
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-card rounded-2xl overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1">
        {/* Cover placeholder */}
        <div className="relative w-full aspect-[16/9] bg-muted overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl opacity-20">📰</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="absolute top-3 left-3">
            <CategoryChip category={post.category} />
          </div>
        </div>

        <div className="p-5 min-[580px]:p-6 flex flex-col flex-1 gap-3">
          <h3 className="font-semibold text-[15px] leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 text-[12px] text-muted-foreground pt-2 border-t border-border/50">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block md:col-span-2">
      <article className="bg-card rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Cover placeholder */}
          <div className="relative w-full aspect-[4/3] md:aspect-auto bg-muted min-h-[220px] overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-15">📊</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <CategoryChip category={post.category} />
              <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-2.5 py-0.5 text-[11px] font-medium">
                <TrendingUp className="w-3 h-3" />
                Featured
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 min-[580px]:p-8 flex flex-col justify-center gap-4">
            <h3 className="font-semibold text-[18px] leading-snug tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime} min read
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-primary text-[13px] font-medium group-hover:gap-2.5 transition-all duration-200">
              Read article
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  // For static rendering — parse params synchronously via prop (Next.js 15+ async searchParams)
  const activeCategory = "All";

  const featuredPosts = POSTS.filter((p) => p.featured);
  const regularPosts = POSTS.filter((p) => !p.featured);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-14 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase mb-3">
            Knowledge Hub
          </p>
          <h1 className={cn(sectionHeadingClass, "text-3xl min-[580px]:text-4xl font-semibold mb-4")}>
            Insights &amp; Publications
          </h1>
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-xl">
            Analysis, strategy guides, and cultural insights from 15+ years of bridging
            India and China across trade, investment, and diplomacy.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="px-4 max-w-7xl mx-auto mb-10">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-colors duration-150 ${
                cat === activeCategory
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <section className="px-4 max-w-7xl mx-auto mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <FeaturedCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* All posts grid */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <h2 className="text-[13px] font-medium tracking-widest text-muted-foreground uppercase mb-6">
          All Articles
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
