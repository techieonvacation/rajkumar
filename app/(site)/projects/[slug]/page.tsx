import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────────── */

type Metric = { value: string; label: string };
type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  year: string;
  color: string;
  tagline: string;
  challenge: string;
  solution: string;
  results: string;
  metrics: Metric[];
  gallery: { label: string; description: string }[];
  related: string[];
};

const ALL_PROJECTS: Project[] = [
  {
    slug: "pharma-china-entry",
    title: "China Market Entry for a Mid-Cap Indian Pharma Group",
    client: "Confidential — Indian Pharmaceutical Group",
    industry: "Pharmaceuticals",
    category: "Market Entry",
    year: "2023",
    color: "oklch(0.35 0.18 264 / 8%)",
    tagline: "First NMPA-approved product in 14 months; USD 28M Year-1 revenue.",
    challenge:
      "A mid-cap Indian pharmaceutical company had identified significant demand for its oncology portfolio in China but faced a labyrinthine NMPA approval process, uncertainty around data localisation requirements, and no established distribution relationships. Previous attempts by two consulting firms had stalled at the regulatory stage after 18 months with no approvals.",
    solution:
      "We redesigned the regulatory pathway from scratch — engaging directly with NMPA consultants in Beijing and identifying an expedited approval track applicable to the client's molecule categories. Simultaneously, we identified and vetted three potential Chinese distribution partners, ultimately recommending a Tier-1 distributor with proven oncology networks. Our team provided Mandarin-language support throughout all regulatory submissions and partner negotiations.",
    results:
      "The first product received NMPA approval in 14 months — four months ahead of the revised target. The signed distribution agreement was the largest in the client's history. Year-1 China revenue reached USD 28M, exceeding the board's 3-year target in a single year. The client subsequently retained us for a Phase 2 expansion covering five additional product lines.",
    metrics: [
      { value: "14", label: "Months to NMPA approval" },
      { value: "USD 28M", label: "Year-1 China revenue" },
      { value: "5", label: "Additional products in pipeline" },
      { value: "1", label: "Tier-1 distribution partner secured" },
    ],
    gallery: [
      { label: "Regulatory Pathway", description: "Custom NMPA navigation framework developed for the client's molecule categories." },
      { label: "Partner Selection", description: "Shortlist of 12 distribution partners vetted and presented; due diligence conducted on 3 finalists." },
      { label: "Negotiation Support", description: "Full Mandarin-language negotiation support across 8 sessions in Shanghai and Beijing." },
      { label: "Launch Execution", description: "Go-to-market launch planning and commercial execution support through first product launch." },
    ],
    related: ["luxury-brand-india", "tech-startup-expansion"],
  },
  {
    slug: "auto-jv-facilitation",
    title: "India-China Automotive JV Structuring",
    client: "Confidential — Automotive Tier-1 Supplier",
    industry: "Automotive Manufacturing",
    category: "Consulting",
    year: "2023",
    color: "oklch(0.52 0.22 29 / 8%)",
    tagline: "USD 180M joint venture signed; operational in 8 months.",
    challenge:
      "An Indian Tier-1 automotive supplier sought to establish a manufacturing joint venture with a Chinese partner to supply the rapidly growing EV segment in both markets. The client had identified a prospective partner in Guangdong but lacked the bilateral expertise to structure the JV, negotiate governance terms, and navigate Chinese foreign investment regulations.",
    solution:
      "We led the full JV structuring process — starting with a detailed due diligence report on the proposed Chinese partner, followed by a governance structure recommendation that balanced operational control with Chinese regulatory requirements. Our team served as the primary negotiation interface, conducting all sessions in Mandarin and providing real-time strategic guidance to the client's CFO and legal team across 14 negotiation sessions.",
    results:
      "The JV agreement was signed within 8 months of engagement — well within the client's 12-month target. The structure we designed gave the Indian parent effective operational control while satisfying Chinese foreign investment approval requirements. The JV became operational within 6 months of signing and secured its first OEM contract within the first year.",
    metrics: [
      { value: "USD 180M", label: "JV valuation at signing" },
      { value: "8", label: "Months from engagement to signing" },
      { value: "14", label: "Negotiation sessions led" },
      { value: "6", label: "Months to full operations" },
    ],
    gallery: [
      { label: "Partner Due Diligence", description: "Comprehensive financial, operational, and reputational due diligence on the proposed Chinese JV partner." },
      { label: "Governance Design", description: "JV governance structure designed to balance control and compliance across both jurisdictions." },
      { label: "Negotiation Facilitation", description: "End-to-end negotiation management across 14 sessions, conducted entirely in Mandarin and English." },
      { label: "Regulatory Approval", description: "Navigation of SAMR and MOFCOM approval processes with dedicated Beijing counsel." },
    ],
    related: ["compliance-audit-bilateral", "pharma-china-entry"],
  },
  {
    slug: "textile-trade-expansion",
    title: "Textile Export Expansion into Chinese Retail Channels",
    client: "Confidential — Indian Textile House",
    industry: "Consumer Textiles",
    category: "Trade",
    year: "2022",
    color: "oklch(0.65 0.15 180 / 8%)",
    tagline: "Distribution in 3 major Chinese retail chains; exports tripled in 18 months.",
    challenge:
      "A heritage Indian textile house had built significant brand equity in Europe and the Middle East but had failed to crack Chinese retail channels despite two independent attempts over four years. The barrier was not product quality — it was distribution channel access and the lack of a credible local brand narrative for the Chinese consumer.",
    solution:
      "We repositioned the brand's China entry narrative around Indian artisanal heritage — a category with strong aspirational appeal among upper-middle-class Chinese consumers. We then leveraged our retail distribution network to facilitate introductions with three major Chinese retail chains, managing all commercial negotiations in Mandarin and providing category insight to the client's commercial team.",
    results:
      "Distribution agreements were signed with all three target retail chains within 9 months. Chinese export revenue tripled within 18 months of the first products reaching shelves. The brand has since established an independent WeChat and Tmall presence, converting the pilot into a permanent channel strategy.",
    metrics: [
      { value: "3×", label: "Export revenue growth in 18 months" },
      { value: "3", label: "Major retail chains partnered" },
      { value: "9", label: "Months to signed distribution" },
      { value: "2", label: "Digital channels established" },
    ],
    gallery: [
      { label: "Brand Repositioning", description: "Consumer research and brand narrative development for the Chinese market." },
      { label: "Retail Introductions", description: "Facilitation of introductions with 6 target retail chains; commercial process managed with 3 finalists." },
      { label: "Channel Negotiations", description: "Mandarin-language commercial negotiations covering terms, visual merchandising, and exclusivity." },
      { label: "Digital Launch", description: "WeChat and Tmall store launch planning and partner identification." },
    ],
    related: ["food-agri-export", "mining-supply-chain"],
  },
  {
    slug: "government-delegation-2022",
    title: "CII India-China Investment Facilitation Delegation",
    client: "Confederation of Indian Industry (CII)",
    industry: "Government / Trade Body",
    category: "Consulting",
    year: "2022",
    color: "oklch(0.75 0.14 85 / 8%)",
    tagline: "42 bilateral meetings across Beijing and Shenzhen; 7 MOUs signed.",
    challenge:
      "Following a period of diplomatic tension, CII sought to re-establish direct investment facilitation channels between Indian and Chinese businesses. The delegation needed to demonstrate genuine commercial intent, secure high-level meetings with Chinese counterparts, and produce tangible outcomes — not merely symbolic engagements.",
    solution:
      "We designed the full 10-day delegation programme, curating a list of 28 target Chinese organisations across investment, manufacturing, and technology sectors. We secured meetings with all 28 targets — a 100% acceptance rate achieved through our direct relationships with Chinese trade bodies and industry associations. During the delegation, we provided continuous Mandarin interpretation and real-time strategic guidance.",
    results:
      "The delegation generated 42 bilateral meeting outcomes, exceeded the target of 35. Seven MOUs were signed during the delegation period — the highest number in a CII China delegation in a decade. Three of those MOUs have since converted into formal investment commitments totalling USD 340M.",
    metrics: [
      { value: "42", label: "Bilateral meeting outcomes" },
      { value: "7", label: "MOUs signed during delegation" },
      { value: "USD 340M", label: "Investment commitments post-delegation" },
      { value: "100%", label: "Meeting acceptance rate" },
    ],
    gallery: [
      { label: "Delegation Design", description: "10-day programme structure across Beijing and Shenzhen with curated meeting schedule." },
      { label: "Counterpart Engagement", description: "Direct outreach to 28 Chinese organisations via trade body and private sector relationships." },
      { label: "In-Country Facilitation", description: "Full interpretation and facilitation support across all 42 meeting sessions." },
      { label: "MOU Documentation", description: "Drafting support and review for all 7 MOUs signed during the delegation." },
    ],
    related: ["trade-mission-gujarat", "auto-jv-facilitation"],
  },
  {
    slug: "luxury-brand-india",
    title: "Chinese Luxury Brand India Market Entry",
    client: "Confidential — Chinese Consumer Brand",
    industry: "Luxury Consumer Goods",
    category: "Market Entry",
    year: "2022",
    color: "oklch(0.35 0.18 264 / 8%)",
    tagline: "First Indian retail partnership; brand launched in 5 tier-1 cities.",
    challenge:
      "A high-growth Chinese luxury lifestyle brand sought to establish a physical retail presence in India to capture the rapidly growing HNI consumer segment. The brand had no India experience, no regulatory relationships, and no understanding of the retail landscape or consumer behaviour.",
    solution:
      "We conducted a comprehensive India market entry feasibility study, mapped the competitive luxury retail landscape, and identified the optimal retail format and partnership model. We then facilitated introductions with India's leading luxury retail operators and managed the commercial negotiations, leveraging our knowledge of both Indian and Chinese commercial expectations to bridge the inevitable gap.",
    results:
      "The first Indian retail partnership was established within 9 months. The brand launched simultaneously in 5 tier-1 cities — Delhi, Mumbai, Bengaluru, Hyderabad, and Chennai. First-year India revenue exceeded the brand's global average for new-market launches by 40%.",
    metrics: [
      { value: "9", label: "Months to first retail partnership" },
      { value: "5", label: "Cities at simultaneous launch" },
      { value: "+40%", label: "vs. global new-market average" },
      { value: "1", label: "Anchor retail partnership secured" },
    ],
    gallery: [
      { label: "Feasibility Study", description: "Full India luxury market feasibility report covering consumer segmentation and competitive positioning." },
      { label: "Retail Partner Identification", description: "Assessment of 8 potential Indian retail partners; recommendation of 2 for negotiation." },
      { label: "Commercial Negotiations", description: "End-to-end negotiation support bridging Chinese and Indian commercial expectations." },
      { label: "Launch Planning", description: "5-city simultaneous launch plan covering retail design, PR strategy, and event execution." },
    ],
    related: ["pharma-china-entry", "tech-startup-expansion"],
  },
  {
    slug: "mining-supply-chain",
    title: "India-China Mining Equipment Trade Route",
    client: "Confidential — Indian Mining Conglomerate",
    industry: "Mining & Resources",
    category: "Trade",
    year: "2021",
    color: "oklch(0.52 0.22 29 / 8%)",
    tagline: "35% reduction in equipment procurement costs via direct China-sourcing.",
    challenge:
      "A diversified Indian mining conglomerate was procuring equipment through third-party intermediaries, inflating costs by an estimated 35–40%. A direct China-sourcing strategy had been explored but stalled due to language barriers, supplier qualification uncertainty, and logistics complexity.",
    solution:
      "We designed and executed a direct China-sourcing programme: qualifying 60+ manufacturers across Shandong and Hebei provinces, conducting factory audits (in Mandarin, on-site), establishing quality assurance protocols, and setting up direct commercial relationships with 5 primary and 2 backup suppliers.",
    results:
      "Procurement costs reduced by 35% in Year 1. Supply chain risk score improved due to multi-supplier redundancy. The direct sourcing model became the template for two additional product categories, delivering cumulative savings of USD 18M over three years.",
    metrics: [
      { value: "35%", label: "Procurement cost reduction" },
      { value: "60+", label: "Manufacturers audited" },
      { value: "USD 18M", label: "3-year cumulative savings" },
      { value: "7", label: "Qualified direct suppliers" },
    ],
    gallery: [
      { label: "Supplier Mapping", description: "Identification and mapping of 60+ potential suppliers across Shandong and Hebei provinces." },
      { label: "Factory Audits", description: "On-site quality and compliance audits conducted in Mandarin across 15 shortlisted factories." },
      { label: "Commercial Setup", description: "Direct supply agreements negotiated and signed with 5 primary suppliers." },
      { label: "Logistics Design", description: "End-to-end logistics and customs clearance model designed for ongoing direct imports." },
    ],
    related: ["food-agri-export", "textile-trade-expansion"],
  },
  {
    slug: "tech-startup-expansion",
    title: "Indian Tech Startup China Expansion Strategy",
    client: "Confidential — B2B SaaS Company",
    industry: "Technology / SaaS",
    category: "Market Entry",
    year: "2021",
    color: "oklch(0.65 0.15 180 / 8%)",
    tagline: "Go-to-market playbook delivered; first pilot client signed in 6 months.",
    challenge:
      "A fast-growing Indian B2B SaaS company had identified a Chinese enterprise software gap that its platform could fill. The founders had no China experience, no Mandarin capability, and significant uncertainty about data localisation regulations, which had killed previous SaaS market entries by international competitors.",
    solution:
      "We conducted a detailed regulatory analysis of China's data localisation and cybersecurity requirements specific to the SaaS category, identifying a compliant architecture approach. We then designed a go-to-market strategy focused on a specific vertical where foreign SaaS had historical penetration, and facilitated introductions with potential pilot clients through our Shanghai-based network.",
    results:
      "A detailed go-to-market playbook was delivered within 3 months. The first pilot client — a mid-size Chinese manufacturer — was signed 6 months after engagement. The client has since secured two additional Chinese enterprise clients and is building toward a Series B with China traction as a key growth narrative.",
    metrics: [
      { value: "3", label: "Months to full playbook delivery" },
      { value: "6", label: "Months to first client signed" },
      { value: "3", label: "Chinese enterprise clients to date" },
      { value: "100%", label: "Regulatory compliance maintained" },
    ],
    gallery: [
      { label: "Regulatory Analysis", description: "Comprehensive analysis of MLPS, PIPL, and data localisation requirements applicable to the SaaS category." },
      { label: "Market Sizing", description: "Bottom-up TAM analysis for the target vertical across tier-1 and tier-2 Chinese cities." },
      { label: "Pilot Client Identification", description: "Shortlist of 8 potential pilot clients identified and outreach managed through local network." },
      { label: "Go-to-Market Playbook", description: "Full playbook covering positioning, pricing, channel strategy, and Year-1 milestones." },
    ],
    related: ["pharma-china-entry", "luxury-brand-india"],
  },
  {
    slug: "executive-china-immersion",
    title: "Executive China Immersion Programme",
    client: "Global Financial Services Firm",
    industry: "Financial Services",
    category: "Travel",
    year: "2021",
    color: "oklch(0.75 0.14 85 / 8%)",
    tagline: "12-day programme for 20 senior partners; 100% rated 'exceeded expectations'.",
    challenge:
      "A global financial services firm's senior partners acknowledged a significant gap in their China market understanding, limiting their ability to serve Chinese clients and invest confidently in China-related mandates. A standard study tour would not be sufficient — they needed genuine commercial and cultural immersion.",
    solution:
      "We designed a 12-day bespoke immersion programme combining commercial site visits, structured meetings with Chinese business leaders and government officials, cultural briefings, and private Mandarin language sessions. The programme was built around the partners' actual investment mandates, making every session directly relevant to live decision-making.",
    results:
      "All 20 participants rated the programme as 'exceeded expectations' in the post-programme survey — a first for the firm's executive development team. Three partners subsequently led China-related mandates directly as a result of confidence built during the programme. The firm commissioned a second cohort programme for the following year.",
    metrics: [
      { value: "20", label: "Senior partners participated" },
      { value: "12", label: "Days of immersive programming" },
      { value: "100%", label: "Rated 'exceeded expectations'" },
      { value: "3", label: "China mandates led post-programme" },
    ],
    gallery: [
      { label: "Programme Design", description: "12-day itinerary across Beijing, Shanghai, and Shenzhen — aligned to live investment mandates." },
      { label: "Business Leader Meetings", description: "8 private meetings with Chinese corporate and government leaders arranged through network." },
      { label: "Cultural Briefings", description: "Daily structured briefings on Chinese business culture, history, and commercial etiquette." },
      { label: "Language Sessions", description: "Daily group Mandarin sessions focused on business etiquette phrases and meeting protocol." },
    ],
    related: ["private-business-travel", "government-delegation-2022"],
  },
  {
    slug: "compliance-audit-bilateral",
    title: "Bilateral Compliance Audit — Manufacturing Conglomerate",
    client: "Confidential — Indian Diversified Conglomerate",
    industry: "Heavy Manufacturing",
    category: "Consulting",
    year: "2020",
    color: "oklch(0.35 0.18 264 / 8%)",
    tagline: "18 gaps remediated; zero enforcement action in subsequent 2-year audit period.",
    challenge:
      "A large Indian conglomerate with significant China operations faced increasing regulatory complexity across both jurisdictions — particularly around export controls, transfer pricing, and data handling. A previous internal audit had identified 6 potential gaps; the board suspected the true number was higher.",
    solution:
      "We conducted a comprehensive bilateral compliance audit across 4 business units, reviewing operations against current regulatory requirements in both India and China. Our China-side audit was conducted in Mandarin, directly with local management teams and regulatory interfaces, revealing issues that the internal team had not identified.",
    results:
      "18 compliance gaps were identified — 12 more than the internal audit had found. All 18 were remediated within the agreed 6-month programme. In the subsequent 2-year regulatory audit period, the client received zero enforcement actions across both jurisdictions for the first time in the group's history.",
    metrics: [
      { value: "18", label: "Compliance gaps identified" },
      { value: "6", label: "Months to full remediation" },
      { value: "0", label: "Enforcement actions post-remediation" },
      { value: "4", label: "Business units audited" },
    ],
    gallery: [
      { label: "Audit Scope Design", description: "Tailored audit framework covering export controls, transfer pricing, data localisation, and licensing." },
      { label: "India-Side Review", description: "India regulatory audit across manufacturing, treasury, and trade operations." },
      { label: "China-Side Review", description: "Mandarin-language audit of China operations, directly with local management and regulatory interfaces." },
      { label: "Remediation Programme", description: "Prioritised remediation roadmap with workstream owners, timelines, and board reporting." },
    ],
    related: ["auto-jv-facilitation", "mining-supply-chain"],
  },
  {
    slug: "trade-mission-gujarat",
    title: "Gujarat State Trade Mission to Zhejiang Province",
    client: "Gujarat Chamber of Commerce and Industry",
    industry: "Government / Trade Body",
    category: "Trade",
    year: "2020",
    color: "oklch(0.52 0.22 29 / 8%)",
    tagline: "35 businesses, USD 60M+ in export opportunities identified and matched.",
    challenge:
      "The Gujarat Chamber of Commerce wanted to establish a direct trade relationship with Zhejiang Province — China's most dynamic manufacturing and export hub — to diversify Gujarat's China trading partners beyond traditional commodity channels. Previous missions had produced goodwill but few commercial outcomes.",
    solution:
      "We designed a 7-day trade mission structured around commercial outcomes, not protocol events. Each of the 35 participating businesses was matched in advance with relevant Zhejiang counterparts. All sessions were conducted in Mandarin with structured agendas, and we briefed participants on Zhejiang commercial culture and negotiating norms before departure.",
    results:
      "USD 60M+ in export opportunities were identified and formally documented during the mission. 12 bilateral supply agreements were signed within 6 months of the mission, with a further 8 in negotiation. The Gujarat-Zhejiang trade relationship has since grown into a structured annual exchange programme.",
    metrics: [
      { value: "35", label: "Businesses on the mission" },
      { value: "USD 60M+", label: "Export opportunities identified" },
      { value: "12", label: "Supply agreements signed within 6 months" },
      { value: "7", label: "Days of structured programming" },
    ],
    gallery: [
      { label: "Mission Design", description: "7-day trade mission structure with pre-matched business pairings and structured agendas." },
      { label: "Counterpart Matching", description: "35 Gujarat businesses matched with 42 Zhejiang counterparts across 8 sectors." },
      { label: "In-Mission Facilitation", description: "Full Mandarin interpretation and facilitation across all bilateral sessions." },
      { label: "Outcomes Documentation", description: "Post-mission report documenting 60+ opportunities with follow-up action owners." },
    ],
    related: ["government-delegation-2022", "food-agri-export"],
  },
  {
    slug: "private-business-travel",
    title: "Bespoke China Business Travel — Private Equity",
    client: "Confidential — Asian PE Fund",
    industry: "Private Equity",
    category: "Travel",
    year: "2019",
    color: "oklch(0.65 0.15 180 / 8%)",
    tagline: "8-city, 14-day due diligence trip; 2 portfolio companies subsequently acquired.",
    challenge:
      "An Asian private equity fund's investment committee needed immersive, on-the-ground due diligence across 8 Chinese cities to evaluate 5 potential portfolio acquisitions. The fund had no China office, no Mandarin capability, and needed complete logistical and analytical support for a 4-person deal team.",
    solution:
      "We designed a 14-day, 8-city travel programme structured around the due diligence requirements of each acquisition target. We arranged facility tours, management interviews (in Mandarin), customer reference calls, and local market assessments. We provided continuous Mandarin interpretation and commercial context throughout, and delivered a post-visit assessment memorandum for each target.",
    results:
      "The deal team completed due diligence on all 5 targets within the 14-day programme. The fund subsequently acquired 2 of the 5 companies evaluated. Both acquisitions have performed above fund return targets in the years since closing.",
    metrics: [
      { value: "5", label: "Acquisition targets evaluated" },
      { value: "8", label: "Cities covered in 14 days" },
      { value: "2", label: "Portfolio companies subsequently acquired" },
      { value: "100%", label: "Due diligence completed on schedule" },
    ],
    gallery: [
      { label: "Programme Design", description: "14-day, 8-city itinerary structured around due diligence requirements for each target." },
      { label: "Management Interviews", description: "Facilitated and interpreted 18 management interviews across 5 acquisition targets." },
      { label: "Market Assessments", description: "On-the-ground local market assessments conducted in each city visited." },
      { label: "Post-Visit Memoranda", description: "Commercial assessment memo produced for each of the 5 targets within 48 hours of visit." },
    ],
    related: ["executive-china-immersion", "auto-jv-facilitation"],
  },
  {
    slug: "food-agri-export",
    title: "Indian Agri-Food Export to China",
    client: "Confidential — Indian Agricultural Cooperative",
    industry: "Agriculture / Food",
    category: "Trade",
    year: "2019",
    color: "oklch(0.75 0.14 85 / 8%)",
    tagline: "3 product categories approved; first shipment of USD 4.2M in 11 months.",
    challenge:
      "An Indian agricultural cooperative sought to access the Chinese market for three product categories — mangoes, spices, and processed grain — but faced complex phytosanitary approval requirements, no established Chinese buyer relationships, and no Mandarin capability to navigate government processes.",
    solution:
      "We mapped the full GACC (General Administration of Customs, China) approval pathway for all three product categories, prepared Mandarin-language submissions, and managed the approval process with direct engagement with GACC officials. Simultaneously, we identified and vetted Chinese importers and food distributors with relevant category experience.",
    results:
      "All three product categories received GACC approval within 11 months — a timeline the client's trade association said was 'exceptionally fast'. The first export shipment, valued at USD 4.2M, departed within 30 days of final approval. The cooperative now has an established annual export programme to China generating USD 18M in revenue.",
    metrics: [
      { value: "3", label: "Product categories approved" },
      { value: "11", label: "Months to GACC approval" },
      { value: "USD 4.2M", label: "First shipment value" },
      { value: "USD 18M", label: "Annual China revenue today" },
    ],
    gallery: [
      { label: "GACC Pathway Mapping", description: "Full regulatory approval pathway designed for 3 distinct product categories." },
      { label: "Mandarin Submissions", description: "All GACC application documents prepared in compliant Mandarin." },
      { label: "Importer Identification", description: "8 potential Chinese importers vetted; 2 selected as primary and secondary buyers." },
      { label: "First Shipment Support", description: "End-to-end support through first export shipment, customs clearance, and delivery." },
    ],
    related: ["textile-trade-expansion", "mining-supply-chain"],
  },
];

const projectsBySlug = Object.fromEntries(ALL_PROJECTS.map((p) => [p.slug, p]));

/* ─── generateStaticParams ───────────────────────────────────────── */

export function generateStaticParams() {
  return ALL_PROJECTS.map((p) => ({ slug: p.slug }));
}

/* ─── generateMetadata ───────────────────────────────────────────── */

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = projectsBySlug[slug];
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.tagline,
  };
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default async function ProjectDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const project = projectsBySlug[slug];
  if (!project) notFound();

  const related = project.related
    .map((r) => projectsBySlug[r])
    .filter(Boolean) as Project[];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      {/* Back link */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
      >
        ← All Projects
      </Link>

      {/* Hero */}
      <div className="space-y-6">
        {/* Full-width image placeholder with overlay */}
        <div
          className="relative w-full h-56 min-[580px]:h-72 rounded-2xl overflow-hidden flex items-end"
          style={{ background: project.color }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, oklch(0.12 0.012 264 / 80%) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 p-6 min-[580px]:p-10">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-white/70 mb-2">
              {project.category} · {project.industry} · {project.year}
            </p>
            <h1 className="text-xl min-[580px]:text-2xl font-semibold text-white leading-snug max-w-xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Tagline + client */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <p className="text-[15px] text-muted-foreground max-w-2xl">{project.tagline}</p>
          <p className="text-[12px] text-muted-foreground whitespace-nowrap">
            {project.client}
          </p>
        </div>
      </div>

      {/* Key Metrics */}
      <section className="space-y-5">
        <h2 className={cn(sectionHeadingClass, "text-xl")}>Key Metrics</h2>
        <div className="grid grid-cols-2 min-[580px]:grid-cols-4 gap-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-card rounded-2xl p-5 space-y-1">
              <p
                className="text-xl min-[580px]:text-2xl font-semibold"
                style={{ color: "oklch(0.35 0.18 264)" }}
              >
                {m.value}
              </p>
              <p className="text-[12px] text-muted-foreground leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Challenge / Solution / Results */}
      <div className="grid min-[700px]:grid-cols-3 gap-5">
        {[
          { label: "Challenge", content: project.challenge },
          { label: "Solution", content: project.solution },
          { label: "Results", content: project.results },
        ].map((section) => (
          <div key={section.label} className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-3">
            <p
              className="text-[11px] font-semibold tracking-widest uppercase"
              style={{ color: "oklch(0.35 0.18 264)" }}
            >
              {section.label}
            </p>
            <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      {/* Gallery / Work breakdown */}
      <section className="space-y-5">
        <h2 className={cn(sectionHeadingClass, "text-xl")}>Work Breakdown</h2>
        <div className="grid min-[580px]:grid-cols-2 gap-4">
          {project.gallery.map((item, i) => (
            <div
              key={item.label}
              className="bg-card rounded-2xl overflow-hidden"
            >
              {/* Placeholder image area */}
              <div
                className="h-28 flex items-center justify-center"
                style={{ background: project.color }}
              >
                <span className="text-[12px] font-semibold tracking-wider uppercase text-muted-foreground">
                  Phase {i + 1}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h3 className="text-[14px] font-semibold text-foreground">{item.label}</h3>
                <p className="text-[13px] font-light text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="space-y-5">
          <h2 className={cn(sectionHeadingClass, "text-xl")}>Related Projects</h2>
          <div className="grid min-[580px]:grid-cols-2 gap-5">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/projects/${r.slug}`}
                className="group bg-card rounded-2xl overflow-hidden hover:ring-1 hover:ring-primary/20 transition-all"
              >
                <div
                  className="h-24 flex items-center justify-center"
                  style={{ background: r.color }}
                >
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-muted-foreground">
                    {r.industry}
                  </span>
                </div>
                <div className="p-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-1">
                      {r.category} · {r.year}
                    </p>
                    <h3 className="text-[13px] font-semibold text-foreground leading-snug">
                      {r.title}
                    </h3>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 flex-none mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "oklch(0.35 0.18 264)" }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-card rounded-2xl p-5 min-[580px]:p-10 text-center space-y-5">
        <h2 className="font-semibold text-xl text-foreground">
          Have a similar challenge?
        </h2>
        <p className="text-[14px] font-light text-muted-foreground max-w-md mx-auto">
          Let&apos;s discuss how we can deliver comparable results for your organisation.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-[14px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
          style={{ background: "oklch(0.35 0.18 264)" }}
        >
          Start a Conversation <ArrowUpRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
