import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Briefcase,
  Languages,
  Map,
  Users,
  Plane,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Settings,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";
import ServiceAccordion from "./service-accordion";

/* ─── Service data ───────────────────────────────────────────────── */

type Service = {
  slug: string;
  title: string;
  tagline: string;
  icon: React.ElementType;
  overview: string;
  benefits: string[];
  process: { step: number; title: string; description: string }[];
  deliverables: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

const ALL_SERVICES: Service[] = [
  {
    slug: "india-china-consulting",
    icon: Briefcase,
    title: "India-China Business Consulting",
    tagline: "Partner-level strategic advisory for the world's two largest emerging markets.",
    overview:
      "Our flagship service provides corporations with comprehensive, end-to-end strategic support for any commercial initiative spanning India and China. Drawing on 15 years of bilateral engagement — including government delegations, joint venture structuring, regulatory approvals, and executive representation — we serve as an embedded expert partner rather than a conventional consulting vendor. Each mandate is scoped individually, with deliverables tied directly to business outcomes.",
    benefits: [
      "Access to 15+ years of bilateral market intelligence",
      "Regulatory and licensing pathway guidance for both markets",
      "Joint venture structuring and M&A due diligence support",
      "Partner, distributor, and supplier identification and vetting",
      "Ongoing relationship management with key stakeholders",
      "Board and investor briefing support on bilateral risk",
    ],
    process: [
      { step: 1, title: "Discovery & Scoping", description: "A structured 2-hour session to understand your objectives, constraints, existing relationships, and timeline. We map your opportunity against current market conditions and identify the critical path." },
      { step: 2, title: "Market Intelligence Brief", description: "A comprehensive briefing document covering regulatory environment, competitive landscape, key players, and entry barriers — tailored to your specific sector and target geographies." },
      { step: 3, title: "Strategy Development", description: "A co-created strategic roadmap with phased milestones, resource requirements, risk-adjusted scenarios, and clear success metrics aligned to your board expectations." },
      { step: 4, title: "Execution Support", description: "Active, hands-on support throughout execution: attending meetings, facilitating introductions, managing government relationships, and troubleshooting emerging obstacles." },
      { step: 5, title: "Review & Optimisation", description: "Quarterly performance reviews against agreed KPIs, with adaptive strategy updates as market conditions evolve." },
    ],
    deliverables: [
      "Market intelligence report (50–80 pages)",
      "Strategic roadmap with Gantt and milestone tracker",
      "Vetted shortlist of potential partners/distributors",
      "Regulatory pathway document with timeline estimates",
      "Monthly executive briefing notes",
      "Risk register with mitigation playbooks",
    ],
    faqs: [
      { question: "What sectors do you specialise in?", answer: "We have deep expertise across pharmaceuticals, technology, manufacturing, luxury consumer goods, logistics, and infrastructure — though our bilateral methodology is transferable to most sectors with appropriate customisation." },
      { question: "Do you work with SMEs or only large corporations?", answer: "We work with both. For SMEs, we offer modular engagements that focus on the highest-impact components of a bilateral strategy, making the investment proportionate to scale." },
      { question: "How long does a typical engagement last?", answer: "Initial strategic advisory engagements typically run 3–6 months. Many clients retain us on an ongoing advisory basis thereafter, with monthly or quarterly touchpoints." },
      { question: "Do you have on-the-ground presence in China?", answer: "Yes. We maintain an active professional network across Beijing, Shanghai, Guangzhou, Chengdu, and Shenzhen, with trusted local partners who are vetted over many years of collaboration." },
    ],
    related: ["market-entry-strategy", "risk-compliance-advisory", "business-delegation"],
  },
  {
    slug: "interpretation-translation",
    icon: Languages,
    title: "Chinese Interpretation & Translation",
    tagline: "Professional Mandarin expertise for negotiations, summits, and legal proceedings.",
    overview:
      "Language is the foundation of trust in any high-stakes business context. Our interpretation and translation services go beyond linguistic conversion — we ensure that tone, intent, hierarchy, and cultural nuance are conveyed accurately in every setting. Rajesh holds professional Mandarin certification and has served as lead interpreter for Fortune 500 boardroom sessions, treaty negotiations, state visits, and international trade summits.",
    benefits: [
      "Certified simultaneous and consecutive interpretation",
      "Legal, technical, and business document translation",
      "Confidentiality agreements as standard on all engagements",
      "Sector-specific terminology mastery across 12+ industries",
      "Remote and on-site interpretation available",
      "Same-day or rush translation for urgent requirements",
    ],
    process: [
      { step: 1, title: "Briefing", description: "Pre-engagement briefing to understand the subject matter, key participants, technical vocabulary, and sensitivity level of the proceedings." },
      { step: 2, title: "Preparation", description: "Thorough preparation of industry-specific and context-specific terminology, including review of any available materials, agendas, or prior correspondence." },
      { step: 3, title: "Interpretation / Translation", description: "Delivery of professional interpretation or translation with complete accuracy, appropriate register, and cultural sensitivity." },
      { step: 4, title: "Debrief", description: "Post-session debrief to clarify any ambiguities, provide cultural context on what was communicated, and advise on follow-up communication strategies." },
    ],
    deliverables: [
      "Live interpretation (simultaneous or consecutive)",
      "Certified translated documents",
      "Post-session terminology glossary",
      "Cultural debrief notes",
    ],
    faqs: [
      { question: "What is the difference between simultaneous and consecutive interpretation?", answer: "Simultaneous interpretation happens in real time as the speaker talks, requiring specialised equipment and is used in large conferences. Consecutive interpretation involves the interpreter speaking after the original speaker pauses — preferred for smaller meetings and negotiations." },
      { question: "Can you handle legal and technical documents?", answer: "Yes. We handle legal contracts, patent filings, regulatory submissions, financial statements, and technical manuals. Each document is reviewed by a subject-matter specialist where required." },
      { question: "What languages do you cover beyond Mandarin?", answer: "Our primary capability is Mandarin Chinese-English-Hindi. For other language pairs, we work with a curated network of vetted professional interpreters." },
    ],
    related: ["india-china-consulting", "corporate-training", "chinese-language-training"],
  },
  {
    slug: "market-entry-strategy",
    icon: Map,
    title: "Market Entry Strategy",
    tagline: "Structured programmes that move you from research to first revenue.",
    overview:
      "Market entry is one of the highest-risk and highest-reward decisions a corporation can make. Our Market Entry Strategy service provides a systematic, evidence-based approach to defining and executing the optimal pathway into either the Indian or Chinese market — or both. We manage the full process so your executive team can focus on the product, while we handle the complexity of the market.",
    benefits: [
      "Comprehensive feasibility studies with financial modelling",
      "Entry-mode analysis (wholly owned, JV, licensing, franchise)",
      "Distributor, agent, and partner sourcing and due diligence",
      "Regulatory approval roadmap and timeline",
      "Go-to-market planning with phased commercial milestones",
      "Pilot programme design and validation support",
    ],
    process: [
      { step: 1, title: "Feasibility Assessment", description: "Market sizing, demand validation, competitive positioning, and financial modelling to determine whether — and how — to enter the market." },
      { step: 2, title: "Entry Mode Selection", description: "Evaluation of all viable entry modes against your resources, risk appetite, timeline, and strategic objectives. Clear recommendation with supporting rationale." },
      { step: 3, title: "Partner & Channel Development", description: "Identification, vetting, and engagement of potential distributors, agents, JV partners, or local management teams aligned to your requirements." },
      { step: 4, title: "Regulatory & Legal Setup", description: "Navigation of licensing, registration, and regulatory approvals in partnership with leading local legal counsel." },
      { step: 5, title: "Launch & Ramp", description: "Go-to-market execution support, including sales enablement, channel activation, and early-stage performance management." },
    ],
    deliverables: [
      "Market entry feasibility report",
      "Entry mode recommendation with financial projections",
      "Vetted partner / distributor shortlist",
      "Regulatory approval roadmap",
      "Go-to-market playbook",
      "90-day launch plan",
    ],
    faqs: [
      { question: "How long does a full market entry process take?", answer: "Typically 6–18 months from initial feasibility to first commercial transaction, depending on the sector, entry mode, and regulatory complexity." },
      { question: "Do you provide support after market entry?", answer: "Yes. Many clients retain us for 12–24 months post-entry to support relationship management, performance optimisation, and strategy adaptation." },
    ],
    related: ["india-china-consulting", "risk-compliance-advisory", "business-delegation"],
  },
  {
    slug: "business-delegation",
    icon: Users,
    title: "Business Delegation Services",
    tagline: "High-impact delegations from concept to commercial outcome.",
    overview:
      "Business delegations are powerful tools for establishing relationships, signalling commitment, and accelerating negotiations — but only when executed with precision and cultural intelligence. We manage every dimension of official and commercial delegations between India and China: itinerary design, protocol preparation, meeting facilitation, interpretation, and follow-up action planning.",
    benefits: [
      "Complete delegation logistics and itinerary management",
      "High-level meeting facilitation in Mandarin and English",
      "Cultural protocol and business etiquette briefings",
      "Government and state enterprise access where applicable",
      "Real-time interpretation throughout the delegation",
      "Post-delegation relationship tracking and follow-up",
    ],
    process: [
      { step: 1, title: "Objective Setting", description: "Clarity on delegation objectives, target organisations, key decision-makers, and desired outcomes before any logistics are confirmed." },
      { step: 2, title: "Meeting Identification & Outreach", description: "Leveraging our network to secure meetings with the right counterparts — government ministries, trade bodies, corporate C-suites, and research institutions." },
      { step: 3, title: "Preparation & Briefing", description: "Comprehensive pre-delegation briefings on each counterpart, their priorities, cultural context, and the negotiating dynamics to expect." },
      { step: 4, title: "In-Country Facilitation", description: "On-the-ground management of all meetings, cultural navigation, interpretation, and real-time strategic guidance throughout the delegation." },
      { step: 5, title: "Follow-Up & Action Planning", description: "Structured post-delegation report summarising outcomes, agreed next steps, and a 90-day action plan for each relationship." },
    ],
    deliverables: [
      "Delegation strategy and objectives document",
      "Confirmed meeting schedule with counterpart profiles",
      "Pre-delegation briefing pack",
      "In-country facilitation and interpretation",
      "Post-delegation outcome report and action plan",
    ],
    faqs: [
      { question: "Can you arrange meetings with Chinese government officials?", answer: "We have established relationships with provincial and municipal trade and investment bodies, as well as relevant ministries. Access depends on the nature of the delegation and the sectors involved." },
      { question: "What is the minimum delegation size you support?", answer: "We work with delegations of 2 to 50+ participants. Larger delegations require additional logistics coordination, which we manage through our local partner network." },
    ],
    related: ["india-china-consulting", "interpretation-translation", "travel-consulting"],
  },
  {
    slug: "travel-consulting",
    icon: Plane,
    title: "Travel Consulting",
    tagline: "Bespoke business travel programmes with cultural intelligence built in.",
    overview:
      "Business travel to China and India carries unique logistical and cultural dimensions that generic travel management companies are not equipped to handle. Our travel consulting service is designed for executives, government officials, and institutional delegations who need seamless logistics combined with genuine in-country expertise.",
    benefits: [
      "Bespoke corporate and government travel itineraries",
      "Visa, visa-on-arrival, and entry documentation support",
      "Ground transport, accommodation, and logistics coordination",
      "In-destination cultural and commercial briefings",
      "24/7 in-country support contact",
      "Post-travel debriefs and relationship follow-up",
    ],
    process: [
      { step: 1, title: "Requirement Scoping", description: "Understanding the purpose, participants, timeline, and specific requirements of the travel programme." },
      { step: 2, title: "Itinerary Design", description: "Crafting a detailed itinerary that balances business objectives, cultural experiences, and logistical feasibility." },
      { step: 3, title: "Documentation & Logistics", description: "Managing all visa applications, entry requirements, accommodation, ground transport, and in-destination logistics." },
      { step: 4, title: "In-Country Support", description: "On-the-ground support throughout the visit, including interpreter availability, cultural guidance, and contingency management." },
    ],
    deliverables: [
      "Detailed day-by-day travel itinerary",
      "Visa and documentation checklist and support",
      "Accommodation and transport bookings",
      "Cultural briefing document",
      "Emergency contact and support protocol",
    ],
    faqs: [
      { question: "Do you support leisure travel as well?", answer: "Our primary focus is business and institutional travel. However, we do offer curated cultural immersion programmes for executives and their families in connection with business visits." },
    ],
    related: ["business-delegation", "india-china-consulting"],
  },
  {
    slug: "corporate-training",
    icon: GraduationCap,
    title: "Corporate Training",
    tagline: "Executive programmes that change how your teams operate across cultures.",
    overview:
      "Cross-cultural competence is not a soft skill — it is a commercial differentiator. Our corporate training programmes equip executive teams, negotiators, and managers with the practical knowledge and behavioural skills to operate effectively across the India-China corridor. Every programme draws directly from our 15 years of real engagements, not from academic frameworks alone.",
    benefits: [
      "Customised workshop design aligned to your context",
      "Real case studies from 200+ client engagements",
      "Negotiation strategy and tactics for Chinese and Indian counterparts",
      "Communication styles, hierarchy, and decision-making across cultures",
      "Practical role-play and simulation exercises",
      "Post-programme coaching and reinforcement",
    ],
    process: [
      { step: 1, title: "Needs Analysis", description: "Assessment of participants' current capability, specific business contexts, and desired behavioural outcomes." },
      { step: 2, title: "Programme Design", description: "Tailored curriculum design covering the most relevant content for your teams, in the most effective format." },
      { step: 3, title: "Delivery", description: "Engaging, interactive delivery with real examples, case studies, and practical exercises. Available in-person or virtually." },
      { step: 4, title: "Reinforcement", description: "Post-programme tools, resources, and optional coaching sessions to embed learning in day-to-day behaviour." },
    ],
    deliverables: [
      "Customised programme curriculum",
      "Participant workbooks and reference materials",
      "Live workshop delivery (half-day to 3 days)",
      "Post-programme assessment report",
      "Optional follow-up coaching sessions",
    ],
    faqs: [
      { question: "Can training be delivered remotely?", answer: "Yes. We deliver highly effective virtual programmes using a combination of live sessions, case studies, and asynchronous learning materials." },
      { question: "What team sizes do you work with?", answer: "We work with individual executive teams of 5–15 people as well as large corporate training cohorts of 100+. Format adapts to group size." },
    ],
    related: ["chinese-language-training", "india-china-consulting"],
  },
  {
    slug: "chinese-language-training",
    icon: BookOpen,
    title: "Chinese Language Training",
    tagline: "Business Mandarin for professionals who need results, not academic credentials.",
    overview:
      "Learning Mandarin for business is not the same as learning Mandarin for tourism or academia. Our Chinese Language Training programme is designed for professionals who need to build functional communication skills quickly — enough to navigate meetings, read key documents, and build personal rapport with Chinese counterparts. The curriculum is grounded in real business scenarios from our consulting practice.",
    benefits: [
      "Business Mandarin tracks for executives and teams",
      "Sector-specific vocabulary modules (pharma, tech, legal, trade)",
      "Pronunciation, tones, and professional etiquette",
      "Online, in-person, and intensive formats",
      "Progress tracking with milestone assessments",
      "Optional immersion programmes in China",
    ],
    process: [
      { step: 1, title: "Level Assessment", description: "Initial assessment to place participants at the correct starting level — from zero knowledge to advanced professional." },
      { step: 2, title: "Programme Selection", description: "Choosing the right format: weekly modules, intensive bootcamp, or online self-paced with tutor support." },
      { step: 3, title: "Instruction", description: "Structured, progressive instruction with emphasis on practical conversational fluency and business vocabulary." },
      { step: 4, title: "Application & Practice", description: "Regular real-world application exercises, including simulated business conversations and vocabulary in authentic contexts." },
    ],
    deliverables: [
      "Learning programme with weekly schedule",
      "Mandarin business vocabulary workbook",
      "Audio recordings for tonal practice",
      "Monthly progress assessments",
      "Certificate of completion",
    ],
    faqs: [
      { question: "How long does it take to reach business conversational level?", answer: "With consistent practice (5–7 hours per week), most professionals reach a functional business conversational level within 6–12 months." },
      { question: "Is this suitable for complete beginners?", answer: "Yes. We have programmes that begin from absolute zero, with particular attention to tones and pronunciation, which are the most common early barriers for English speakers." },
    ],
    related: ["corporate-training", "india-china-consulting"],
  },
  {
    slug: "risk-compliance-advisory",
    icon: ShieldCheck,
    title: "Risk & Compliance Advisory",
    tagline: "Proactive risk management for corporations operating at the bilateral frontier.",
    overview:
      "The India-China corridor presents a dynamic and often complex regulatory and geopolitical risk environment. Tariff structures, export controls, sanctions regimes, FDI restrictions, and bilateral tensions all create material risks for corporations with cross-border exposure. Our Risk & Compliance Advisory service provides ongoing monitoring, proactive alerts, and actionable guidance to keep your operations ahead of regulatory change.",
    benefits: [
      "Regulatory change monitoring across both jurisdictions",
      "Sanctions, tariff, and export-control guidance",
      "FDI screening and foreign investment approval support",
      "Data privacy and localisation compliance",
      "Crisis response frameworks for bilateral incidents",
      "Board-level risk reporting",
    ],
    process: [
      { step: 1, title: "Risk Mapping", description: "Comprehensive mapping of all regulatory and geopolitical risk exposures across your India and China operations." },
      { step: 2, title: "Monitoring Setup", description: "Establishing a tailored monitoring framework covering the regulatory areas most material to your business." },
      { step: 3, title: "Ongoing Advisory", description: "Monthly briefings, ad hoc alerts for material regulatory changes, and quarterly risk register reviews." },
      { step: 4, title: "Crisis Response", description: "Rapid-response advisory when bilateral incidents, regulatory changes, or enforcement actions create immediate operational risk." },
    ],
    deliverables: [
      "Initial risk mapping report",
      "Monthly regulatory intelligence briefing",
      "Tailored risk register with heat map",
      "Compliance checklist per jurisdiction",
      "Crisis response playbook",
    ],
    faqs: [
      { question: "Do you provide legal advice?", answer: "We provide strategic risk advisory and commercial guidance. For formal legal opinions, we work alongside your legal counsel and can recommend leading bilateral law firms where required." },
      { question: "How quickly can you respond to a regulatory alert?", answer: "Our retainer clients have a 24-hour response commitment for urgent alerts. Critical bilateral incidents trigger immediate escalation regardless of time zone." },
    ],
    related: ["india-china-consulting", "operational-excellence"],
  },
  {
    slug: "operational-excellence",
    icon: Settings,
    title: "Operational Excellence",
    tagline: "Optimising cross-border operations, supply chains, and joint ventures.",
    overview:
      "Once market entry is complete, the real challenge begins: operating efficiently and competitively across two very different business environments. Our Operational Excellence service focuses on designing, optimising, and governing the operational systems that determine whether a cross-border business performs or underperforms against its strategic potential.",
    benefits: [
      "Cross-border supply chain efficiency diagnostics",
      "Shared services centre design and governance",
      "Joint venture operational governance and KPI frameworks",
      "Procurement optimisation between India and China",
      "Working capital management across dual jurisdictions",
      "People and talent management across cultures",
    ],
    process: [
      { step: 1, title: "Operational Diagnostic", description: "End-to-end assessment of your current cross-border operations, identifying inefficiencies, risks, and missed value opportunities." },
      { step: 2, title: "Redesign", description: "Collaborative redesign of processes, governance structures, and systems to deliver material performance improvement." },
      { step: 3, title: "Implementation Support", description: "Hands-on support through implementation — change management, training, and system cutover." },
      { step: 4, title: "Performance Management", description: "Establishing robust KPI frameworks and management rhythms to sustain performance gains over time." },
    ],
    deliverables: [
      "Operational diagnostic report with priority opportunities",
      "Redesigned process maps and governance structures",
      "Implementation roadmap and change management plan",
      "KPI dashboard design",
      "Quarterly performance review",
    ],
    faqs: [
      { question: "What types of operations do you typically improve?", answer: "We most commonly work on cross-border supply chains, procurement operations, shared services centres, and joint venture governance — though our methodology applies to any cross-border operational context." },
    ],
    related: ["india-china-consulting", "risk-compliance-advisory"],
  },
];

const servicesBySlug = Object.fromEntries(ALL_SERVICES.map((s) => [s.slug, s]));

/* ─── generateStaticParams ───────────────────────────────────────── */

export function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

/* ─── generateMetadata ───────────────────────────────────────────── */

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = servicesBySlug[slug];
  if (!service) return { title: "Service Not Found" };
  return {
    title: service.title,
    description: service.tagline,
  };
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default async function ServiceDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const { slug } = await props.params;
  const service = servicesBySlug[slug];
  if (!service) notFound();

  const Icon = service.icon;
  const related = service.related
    .map((r) => servicesBySlug[r])
    .filter(Boolean) as Service[];

  return (
    <main className="max-w-4xl mx-auto px-4 py-16 space-y-16">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="space-y-6">
        <Link
          href="/services"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors"
        >
          ← All Services
        </Link>

        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-none"
            style={{ background: "oklch(0.35 0.18 264 / 10%)" }}
          >
            <Icon className="w-7 h-7" style={{ color: "oklch(0.35 0.18 264)" }} />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
              Service
            </p>
            <h1 className="section-heading text-2xl min-[580px]:text-3xl">
              {service.title}
            </h1>
            <p className="text-[15px] text-muted-foreground mt-3">{service.tagline}</p>
          </div>
        </div>
      </div>

      {/* ── Main content + Sidebar ─────────────────────────────────── */}
      <div className="grid min-[800px]:grid-cols-[1fr_260px] gap-10 items-start">
        {/* Content */}
        <div className="space-y-14">
          {/* Overview */}
          <section className="space-y-5">
            <h2 className="section-heading text-xl">Overview</h2>
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
              {service.overview}
            </p>
          </section>

          {/* Benefits */}
          <section className="space-y-5">
            <h2 className="section-heading text-xl">Key Benefits</h2>
            <div className="grid min-[580px]:grid-cols-2 gap-3">
              {service.benefits.map((b) => (
                <div key={b} className="flex items-start gap-2.5 bg-card rounded-xl p-4">
                  <CheckCircle2
                    className="w-4 h-4 mt-0.5 flex-none"
                    style={{ color: "oklch(0.35 0.18 264)" }}
                  />
                  <span className="text-[13px] font-light text-muted-foreground leading-snug">
                    {b}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Process */}
          <section className="space-y-5">
            <h2 className="section-heading text-xl">Our Process</h2>
            <div className="space-y-4">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="bg-card rounded-2xl p-5 min-[580px]:p-6 flex gap-5"
                >
                  <div
                    className="w-9 h-9 rounded-full flex-none flex items-center justify-center text-[13px] font-semibold text-primary-foreground"
                    style={{ background: "oklch(0.35 0.18 264)" }}
                  >
                    {step.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-[15px] text-foreground">{step.title}</h3>
                    <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Deliverables */}
          <section className="space-y-5">
            <h2 className="section-heading text-xl">Deliverables</h2>
            <div className="bg-card rounded-2xl p-5 min-[580px]:p-8">
              <ul className="space-y-2.5">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5">
                    <ArrowRight
                      className="w-4 h-4 mt-0.5 flex-none"
                      style={{ color: "oklch(0.35 0.18 264)" }}
                    />
                    <span className="text-[14px] font-light text-muted-foreground">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* FAQs */}
          <section className="space-y-5">
            <h2 className="section-heading text-xl">Frequently Asked Questions</h2>
            <ServiceAccordion faqs={service.faqs} />
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 min-[800px]:sticky min-[800px]:top-8">
          {/* CTA */}
          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-4">
            <h3 className="font-semibold text-[16px] text-foreground">
              Ready to Get Started?
            </h3>
            <p className="text-[13px] font-light text-muted-foreground leading-relaxed">
              Book a complimentary discovery session to explore how this service can
              address your specific objectives.
            </p>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-full py-2.5 px-5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 w-full"
              style={{ background: "oklch(0.35 0.18 264)" }}
            >
              Book a Discovery Call <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-full py-2.5 px-5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted w-full border border-border"
            >
              Send an Enquiry
            </Link>
          </div>

          {/* Related services */}
          {related.length > 0 && (
            <div className="bg-card rounded-2xl p-5 space-y-4">
              <h3 className="font-semibold text-[14px] text-foreground">Related Services</h3>
              <div className="space-y-2">
                {related.map((r) => {
                  const RIcon = r.icon;
                  return (
                    <Link
                      key={r.slug}
                      href={`/services/${r.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-none"
                        style={{ background: "oklch(0.35 0.18 264 / 10%)" }}
                      >
                        <RIcon
                          className="w-3.5 h-3.5"
                          style={{ color: "oklch(0.35 0.18 264)" }}
                        />
                      </div>
                      <span className="text-[13px] font-medium text-foreground">
                        {r.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
