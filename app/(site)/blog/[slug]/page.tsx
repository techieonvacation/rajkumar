import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Link2,
  Linkedin,
  Twitter,
  ChevronRight,
} from "lucide-react";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

/* ── Types ───────────────────────────────────────────────────────────────────── */

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  author: string;
  authorBio: string;
  authorImage?: string;
  tags: string[];
  toc: { id: string; title: string; level: number }[];
}

/* ── Static data ─────────────────────────────────────────────────────────────── */

const POSTS: BlogPost[] = [
  {
    slug: "navigating-india-china-trade-tensions-2024",
    title:
      "Navigating India-China Trade Tensions: Opportunities Within Constraints",
    excerpt:
      "Despite political headwinds, bilateral trade between India and China exceeded $118 billion in 2023. Here's how forward-thinking businesses are identifying pockets of opportunity within a complex regulatory landscape.",
    content: `
## The $118 Billion Reality

Despite the noise of political discourse, India-China bilateral trade hit a record $118.4 billion in the fiscal year 2022-23. This figure tells a story that media headlines often miss: economic interdependence has a momentum of its own, running parallel to — and sometimes contradicting — diplomatic temperature.

For Indian businesses, the practical question is not whether to engage with China, but how to do so intelligently within the current regulatory and reputational environment.

## Understanding the Regulatory Landscape

Since 2020, India has implemented several key measures affecting China-linked business:

**FDI Restrictions (Press Note 3):** Investments from countries sharing a land border with India — which includes China — now require government approval rather than the automatic route. This has slowed equity-based market entry but has not halted licensing, technology transfer, or component sourcing arrangements.

**Import Tariffs and QCOs:** Quality Control Orders and elevated tariffs on over 2,000 product categories have reshaped import economics. Businesses must now evaluate landed-cost models with precision, identifying where Chinese inputs remain cost-competitive despite duty loads.

**App and Platform Bans:** The banning of 200+ Chinese apps has created market vacuums that both Indian and Western players are rushing to fill — itself an opportunity for businesses that understand the underlying user needs.

## Sectors Where Opportunity Persists

Despite the constraints, several sectors continue to see productive India-China commerce:

### 1. Electronic Components and Semiconductors
India's domestic electronics manufacturing — driven by PLI incentives — still sources a significant share of components from China. Alternative sourcing is a 5-10 year journey; in the interim, strategic sourcing relationships remain essential.

### 2. Specialty Chemicals
Chinese specialty chemical manufacturers supply intermediates that are not yet available at comparable quality-cost from Indian or Southeast Asian producers. Pharmaceutical, agrochemical, and pigment companies operate quietly but steadily in this space.

### 3. Solar and Clean Energy
The IEA estimates that over 90% of solar panel manufacturing capacity remains concentrated in China. India's aggressive renewable energy targets mean that, despite the push for domestic manufacturing, Chinese solar equipment will play a role in the transition period.

### 4. Machinery and Capital Equipment
For sectors receiving PLI incentives — textiles, food processing, pharmaceuticals — Chinese machinery often offers a 30-45% cost advantage over European equivalents at comparable quality tiers. This gap is too wide for most SMEs to ignore.

## Strategic Frameworks for Navigation

### The Disclosed-Undisclosed Framework
Every India-China business interaction now carries reputational and regulatory weight. Companies benefit from a clear internal framework distinguishing between disclosable (to regulators, boards, investors) and non-disclosable elements of their China engagement. Most interactions are fully disclosable and should be treated as such.

### Compliance-First Deal Structuring
Attempting to obscure China origin — through third-country routing or beneficial ownership structures — carries increasing legal risk. The compliance-first approach structures transactions transparently, relies on genuine commercial rationale, and maintains records that can withstand regulatory scrutiny.

### The Long-View Relationship Model
Opportunistic, transaction-only engagement with Chinese counterparts is poor strategy in any environment but particularly so now. The businesses that navigate this landscape best tend to have cultivated multi-year relationships, speak Mandarin or employ those who do, and understand Chinese business culture at a level beyond surface etiquette.

## Practical Steps for 2025

1. **Audit your China exposure** across your supply chain, technology licenses, and equity structure. Understand what is currently required to be disclosed and to whom.
2. **Map alternatives with real timelines** — not aspirational ones. For each China-sourced input, understand the realistic time-to-replacement from an Indian or ASEAN alternative.
3. **Invest in Mandarin-enabled human capital.** Even a single Mandarin-speaking relationship manager transforms the quality of Chinese vendor and partner relationships.
4. **Engage trade counsel proactively.** The regulatory environment is dynamic. Businesses with established relationships with experienced India-China trade counsel are faster to adapt when rules change.

## Conclusion

The India-China business relationship is complex, politically fraught, and commercially indispensable. The $118 billion headline is not an accident — it is the outcome of deep structural complementarity that policy levers can slow but not stop.

The businesses that thrive in this environment are not those who pretend the risks don't exist, nor those who exit wholesale. They are the ones who invest in deep knowledge, strong relationships, and transparent compliance. The opportunity belongs to the prepared.
    `,
    category: "Trade",
    date: "2024-11-15",
    readTime: 12,
    author: "Rajesh Kumar",
    authorBio:
      "Rajesh Kumar is an India-China business consultant with 15+ years of cross-border experience, native-level Mandarin proficiency, and a track record of guiding 200+ corporations across market entry, trade structuring, and government relations in both markets.",
    tags: ["Trade Policy", "India-China", "Market Entry", "Compliance"],
    toc: [
      { id: "the-118-billion-reality", title: "The $118 Billion Reality", level: 2 },
      { id: "understanding-the-regulatory-landscape", title: "Understanding the Regulatory Landscape", level: 2 },
      { id: "sectors-where-opportunity-persists", title: "Sectors Where Opportunity Persists", level: 2 },
      { id: "strategic-frameworks-for-navigation", title: "Strategic Frameworks", level: 2 },
      { id: "practical-steps-for-2025", title: "Practical Steps for 2025", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
  },
  {
    slug: "china-market-entry-strategy-2025",
    title: "China Market Entry in 2025: Choosing the Right Structure",
    excerpt:
      "WFOE, JV, or Representative Office? Each structure carries distinct tax, liability, and operational implications. This breakdown helps Indian businesses make the decision with clarity.",
    content: `
## The Structure Decision

One of the most consequential early decisions for any foreign company entering China is legal structure. Get it right and you have a platform for scalable, compliant growth. Get it wrong and you face years of restructuring costs, regulatory friction, and operational constraints.

## WFOE: Wholly Foreign-Owned Enterprise

A WFOE gives you full operational control and is preferred by businesses with proprietary technology or processes they cannot risk exposing to a local partner. You hire, fire, and operate without JV approvals.

**Best for:** Manufacturing, technology, professional services, e-commerce operations.

**Key considerations:** Higher setup cost, longer establishment timeline (3-6 months), requires registered capital appropriate to your business scope.

## Joint Venture

A JV pairs you with a Chinese partner — ideally one with local relationships, distribution, and regulatory access. The trade-off is shared control and the necessity of genuine alignment with your JV partner.

**Best for:** Sectors with local market complexity (healthcare, education, media, logistics) where local partners provide irreplaceable value.

**Key considerations:** Choose your JV partner with the same rigor as a co-founder. Cultural misalignment, mismatched growth expectations, and profit-distribution disputes are the most common JV failure modes.

## Representative Office

An RO cannot generate revenue or sign contracts in its own name. It is a presence mechanism — useful for market research, relationship-building, and pre-commercialization activities.

**Best for:** Companies in the assessment phase who want physical presence without full commitment.

**Key considerations:** RO staff are technically employed through a government-designated HR agency, which constrains staffing flexibility.

## Conclusion

The right structure depends on your sector, risk profile, partner availability, and growth timeline. Most companies benefit from starting this decision with a 90-day scoping engagement before committing to incorporation. The cost of getting this decision right is trivial compared to the cost of restructuring later.
    `,
    category: "China",
    date: "2024-10-10",
    readTime: 15,
    author: "Rajesh Kumar",
    authorBio:
      "Rajesh Kumar is an India-China business consultant with 15+ years of cross-border experience, native-level Mandarin proficiency, and a track record of guiding 200+ corporations across market entry, trade structuring, and government relations in both markets.",
    tags: ["Market Entry", "WFOE", "China Business", "Legal Structure"],
    toc: [
      { id: "the-structure-decision", title: "The Structure Decision", level: 2 },
      { id: "wfoe-wholly-foreign-owned-enterprise", title: "WFOE", level: 2 },
      { id: "joint-venture", title: "Joint Venture", level: 2 },
      { id: "representative-office", title: "Representative Office", level: 2 },
      { id: "conclusion", title: "Conclusion", level: 2 },
    ],
  },
];

const RELATED: Pick<BlogPost, "slug" | "title" | "category" | "date" | "readTime">[] =
  [
    {
      slug: "guanxi-vs-networking-cultural-contrast",
      title: "Guanxi vs. Networking: Why the Difference Matters",
      category: "Strategy",
      date: "2024-09-05",
      readTime: 9,
    },
    {
      slug: "supply-chain-diversification-china-plus-one",
      title: "China+1 Strategy: India's Real Readiness and the Gaps That Remain",
      category: "Strategy",
      date: "2024-08-19",
      readTime: 13,
    },
    {
      slug: "mandarin-for-business-executives",
      title: "Why Every India-Facing Executive Needs Basic Mandarin",
      category: "Language",
      date: "2024-10-28",
      readTime: 8,
    },
  ];

/* ── Metadata ─────────────────────────────────────────────────────────────────── */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };

  return {
    title: `${post.title} | Rajesh Kumar`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

/* ── Helpers ─────────────────────────────────────────────────────────────────── */

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderContent(content: string) {
  // Minimal markdown-like rendering for static content
  const lines = content.trim().split("\n");
  const html: React.ReactNode[] = [];
  let key = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      html.push(<div key={key++} className="mb-4" />);
    } else if (trimmed.startsWith("### ")) {
      html.push(
        <h3 key={key++} className="text-[16px] font-semibold mt-6 mb-2 text-foreground">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      html.push(
        <h2
          key={key++}
          id={trimmed
            .slice(3)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")}
          className="text-[20px] font-semibold mt-8 mb-3 text-foreground scroll-mt-24"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      html.push(
        <p key={key++} className="font-semibold text-foreground mb-1">
          {trimmed.slice(2, -2)}
        </p>
      );
    } else if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ")) {
      html.push(
        <li key={key++} className="text-[14px] font-light leading-relaxed text-muted-foreground mb-1 ml-5 list-decimal">
          {trimmed.slice(3)}
        </li>
      );
    } else {
      // Parse inline bold
      const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
      html.push(
        <p key={key++} className="text-[14px] font-light leading-relaxed text-muted-foreground mb-4">
          {parts.map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={i} className="font-semibold text-foreground">
                {part.slice(2, -2)}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      );
    }
  }
  return html;
}

/* ── Page ─────────────────────────────────────────────────────────────────────── */

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="pt-24 pb-0 px-4 max-w-7xl mx-auto">
        <nav className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-foreground transition-colors">
            Insights
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      {/* Article layout */}
      <div className="px-4 max-w-7xl mx-auto pb-24">
        <div className="grid lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_300px] gap-10 items-start">
          {/* Main content */}
          <article>
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[12px] font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-2xl min-[580px]:text-3xl font-semibold tracking-tight text-foreground leading-snug mb-4">
                {post.title}
              </h1>
              <p className="text-[14px] font-light leading-relaxed text-muted-foreground mb-5">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[12px] text-muted-foreground pb-6 border-b border-border/50">
                <span className="flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-primary">
                    RK
                  </div>
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime} min read
                </span>
              </div>
            </header>

            {/* Cover image placeholder */}
            <div className="w-full aspect-[16/7] bg-muted rounded-2xl mb-8 flex items-center justify-center">
              <span className="text-5xl opacity-20">📝</span>
            </div>

            {/* Content */}
            <div className="prose-custom">{renderContent(post.content)}</div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/50">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-muted text-muted-foreground rounded-lg px-3 py-1.5 text-[12px]"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Social share */}
            <div className="mt-8 pt-6 border-t border-border/50">
              <p className="text-[13px] font-medium text-muted-foreground mb-3">
                Share this article
              </p>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-muted hover:bg-muted/70 text-muted-foreground rounded-xl px-4 py-2.5 text-[13px] transition-colors">
                  <Link2 className="w-4 h-4" />
                  Copy link
                </button>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://rajeshkumar.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-muted hover:bg-muted/70 text-muted-foreground rounded-xl px-4 py-2.5 text-[13px] transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://rajeshkumar.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-muted hover:bg-muted/70 text-muted-foreground rounded-xl px-4 py-2.5 text-[13px] transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </div>
            </div>

            {/* Author bio */}
            <div className="mt-10 bg-card rounded-2xl p-5 min-[580px]:p-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-muted flex-shrink-0 flex items-center justify-center text-[16px] font-semibold text-primary">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">{post.author}</p>
                  <p className="text-[12px] text-primary mb-3">India-China Business Consultant</p>
                  <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* TOC */}
              <div className="bg-card rounded-2xl p-5">
                <p className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                  Table of Contents
                </p>
                <nav className="space-y-2">
                  {post.toc.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-[13px] text-muted-foreground hover:text-primary transition-colors leading-snug ${
                        item.level === 3 ? "ml-3" : ""
                      }`}
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* CTA */}
              <div className="bg-primary rounded-2xl p-5">
                <p className="font-semibold text-primary-foreground text-[15px] mb-2">
                  Need expert guidance?
                </p>
                <p className="text-[13px] text-primary-foreground/80 mb-4 leading-relaxed">
                  Book a consultation to discuss your India-China business strategy.
                </p>
                <Link
                  href="/contact"
                  className="inline-block w-full text-center bg-primary-foreground text-primary font-medium rounded-xl px-4 py-2.5 text-[13px] hover:opacity-90 transition-opacity"
                >
                  Schedule a Call
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related articles */}
        <section className="mt-16 pt-10 border-t border-border/50">
          <h2 className={cn(sectionHeadingClass, "text-[22px] mb-8")}>Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {RELATED.map((rel) => (
              <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                <div className="bg-card rounded-2xl overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="aspect-[16/9] bg-muted flex items-center justify-center">
                    <span className="text-3xl opacity-20">📄</span>
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-medium text-primary uppercase tracking-wide">
                      {rel.category}
                    </span>
                    <h3 className="font-semibold text-[14px] leading-snug text-foreground mt-1 mb-3 group-hover:text-primary transition-colors">
                      {rel.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(rel.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {rel.readTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>
      </div>
    </main>
  );
}
