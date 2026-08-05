import type { Metadata } from "next";
import { Award, ExternalLink, CalendarDays, BadgeCheck } from "lucide-react";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Certifications | Rajesh Kumar",
  description:
    "Professional certifications and credentials earned by Rajesh Kumar — including Chinese Language Proficiency (HSK 6), Harvard Business Strategy, and cross-border commerce qualifications.",
  openGraph: {
    title: "Certifications | Rajesh Kumar",
    description:
      "Professional certifications and credentials in language proficiency, business strategy, and international trade.",
    type: "website",
  },
};

interface Certification {
  id: string;
  title: string;
  organization: string;
  orgAbbr: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  skills: string[];
  description: string;
  featured: boolean;
  icon: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    id: "hsk6",
    title: "Hànyǔ Shuǐpíng Kǎoshì (HSK) — Level 6",
    organization: "Hanban / Chinese International Chinese Education Foundation",
    orgAbbr: "CIEF",
    issueDate: "March 2015",
    credentialId: "HSK6-2015-IN-004892",
    credentialUrl: "https://www.chinesetest.cn",
    skills: ["Mandarin Chinese", "Written Chinese", "Academic Chinese"],
    description:
      "HSK 6 is the highest level of the official Chinese government proficiency examination, requiring mastery of 5,000+ vocabulary items and fluency in complex written and spoken Mandarin. Score: 287/300.",
    featured: true,
    icon: "🇨🇳",
  },
  {
    id: "harvard-business-strategy",
    title: "Business Strategy: From Concept to Connection",
    organization: "Harvard Business School Online",
    orgAbbr: "HBS",
    issueDate: "September 2019",
    credentialId: "HBS-2019-BSC-7742",
    credentialUrl: "https://online.hbs.edu",
    skills: ["Business Strategy", "Competitive Analysis", "Value Creation"],
    description:
      "Executive education program covering strategic positioning, competitive advantage, and value chain analysis with application to emerging-market contexts. Completed with distinction.",
    featured: true,
    icon: "🎓",
  },
  {
    id: "imd-negotiation",
    title: "High-Impact Leadership: Negotiation & Influence",
    organization: "IMD Business School, Lausanne",
    orgAbbr: "IMD",
    issueDate: "May 2018",
    credentialId: "IMD-NEG-2018-4421",
    credentialUrl: "https://www.imd.org",
    skills: ["Cross-cultural Negotiation", "Stakeholder Management", "Influence"],
    description:
      "Intensive programme on advanced negotiation techniques in high-stakes cross-cultural contexts, with case study applications from Asia-Pacific markets.",
    featured: false,
    icon: "🤝",
  },
  {
    id: "wto-trade",
    title: "International Trade Law and Policy",
    organization: "World Trade Organization Institute",
    orgAbbr: "WTO",
    issueDate: "November 2017",
    credentialId: "WTO-ITP-2017-318",
    credentialUrl: "https://www.wto.org",
    skills: ["Trade Policy", "WTO Framework", "Tariff Classification"],
    description:
      "Comprehensive training in WTO agreements, dispute settlement mechanisms, trade remedies, and the practical application of international trade law for cross-border commerce.",
    featured: false,
    icon: "⚖️",
  },
  {
    id: "cfa-alternative",
    title: "Certificate in International Investment Analysis",
    organization: "CFA Institute",
    orgAbbr: "CFAI",
    issueDate: "April 2016",
    credentialId: "CFA-CIIA-2016-9901",
    credentialUrl: "https://www.cfainstitute.org",
    skills: ["FDI Analysis", "Emerging Markets", "Investment Structuring"],
    description:
      "Credential covering cross-border investment analysis, FDI structuring, and valuation methodologies with emphasis on emerging Asian markets.",
    featured: false,
    icon: "📈",
  },
  {
    id: "ministry-delegate",
    title: "Ministry of Commerce — India-China Business Delegation Certificate",
    organization: "Ministry of Commerce and Industry, Government of India",
    orgAbbr: "MoCI",
    issueDate: "August 2012",
    credentialId: "GOI-MOC-DEL-2012-047",
    skills: ["Government Relations", "Trade Diplomacy", "Policy Advisory"],
    description:
      "Official recognition as a certified trade delegate representing Indian business interests in the 2012 India-China Commerce Summit, Beijing. Facilitated $240M in B2B introductions.",
    featured: true,
    icon: "🏛️",
  },
  {
    id: "supply-chain",
    title: "Global Supply Chain Management — Advanced",
    organization: "MIT Sloan School of Management (edX)",
    orgAbbr: "MIT",
    issueDate: "January 2021",
    credentialId: "MIT-GSCM-2021-ADV-1182",
    credentialUrl: "https://executive.mit.edu",
    skills: ["Supply Chain Strategy", "Risk Management", "Logistics Optimization"],
    description:
      "Advanced-level certification covering global supply chain design, risk diversification strategies, and the operational impact of geopolitical shifts on Asia-based supply networks.",
    featured: false,
    icon: "🌐",
  },
  {
    id: "mandarin-teacher",
    title: "International Chinese Language Teacher Certificate (ILSTC)",
    organization: "Confucius Institute Headquarters (Hanban)",
    orgAbbr: "Hanban",
    issueDate: "June 2010",
    credentialId: "ILSTC-2010-IN-002",
    credentialUrl: "https://www.chineseteacher.org",
    skills: ["Mandarin Teaching", "Curriculum Design", "Language Training"],
    description:
      "Internationally recognised certification qualifying the holder to teach Standard Mandarin (Pǔtōnghuà) to non-native adults in professional and academic settings.",
    featured: false,
    icon: "📚",
  },
];

function CertCard({ cert }: { cert: Certification }) {
  return (
    <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 flex flex-col gap-4 relative overflow-hidden">
      {cert.featured && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-bl-xl rounded-tr-2xl">
            Featured
          </div>
        </div>
      )}

      {/* Top */}
      <div className="flex items-start gap-4">
        {/* Image / icon placeholder */}
        <div className="w-14 h-14 rounded-xl bg-muted flex-shrink-0 flex items-center justify-center text-2xl">
          {cert.icon}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold tracking-widest text-primary uppercase mb-1">
            {cert.orgAbbr}
          </p>
          <h3 className="font-semibold text-[14px] leading-snug text-foreground">
            {cert.title}
          </h3>
        </div>
      </div>

      {/* Org + date */}
      <div className="space-y-1.5">
        <p className="text-[13px] text-muted-foreground font-light">
          {cert.organization}
        </p>
        <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Issued {cert.issueDate}</span>
          {cert.expiryDate && (
            <>
              <span>·</span>
              <span>Expires {cert.expiryDate}</span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] font-light leading-relaxed text-muted-foreground">
        {cert.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {cert.skills.map((skill) => (
          <span
            key={skill}
            className="bg-muted text-muted-foreground rounded-lg px-2.5 py-1 text-[11px] font-medium"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50 mt-auto">
        {cert.credentialId ? (
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <BadgeCheck className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono">{cert.credentialId}</span>
          </div>
        ) : (
          <div />
        )}

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:opacity-80 transition-opacity"
          >
            Verify
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

export default function CertificationsPage() {
  const featured = CERTIFICATIONS.filter((c) => c.featured);
  const rest = CERTIFICATIONS.filter((c) => !c.featured);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-14 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase mb-3">
            Credentials
          </p>
          <h1 className={cn(sectionHeadingClass, "text-3xl min-[580px]:text-4xl font-semibold mb-4")}>
            Certifications &amp; Qualifications
          </h1>
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-xl">
            A record of professional credentials spanning language proficiency,
            business strategy, international trade law, and executive education from
            leading global institutions.
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-6 mt-8">
          {[
            { label: "Certifications", value: CERTIFICATIONS.length.toString() },
            { label: "Language Credentials", value: "3" },
            { label: "Institutions", value: "8" },
            { label: "Years of Development", value: "15+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl font-semibold text-primary">{s.value}</p>
              <p className="text-[12px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="px-4 max-w-7xl mx-auto mb-12">
        <h2 className={cn(sectionHeadingClass, "text-[20px] mb-6")}>Highlighted Credentials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </section>

      {/* All */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <h2 className={cn(sectionHeadingClass, "text-[20px] mb-6")}>Additional Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <div className="bg-card rounded-2xl p-6 min-[580px]:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                Need credentials verification?
              </p>
              <p className="text-[13px] text-muted-foreground">
                Contact Rajesh directly for official documentation.
              </p>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground font-medium rounded-xl px-6 py-3 text-[14px] hover:opacity-90 transition-opacity flex-shrink-0"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </main>
  );
}
