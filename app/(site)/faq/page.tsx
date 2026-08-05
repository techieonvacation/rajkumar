import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Rajesh Kumar's consulting services, process, engagement models, and expertise in India-China business.",
};

const faqs = [
  {
    category: "General",
    items: [
      {
        q: "Who do you typically work with?",
        a: "I work primarily with C-suite executives, government officials, institutional investors, and senior managers at mid-to-large enterprises that are either entering the Indian or Chinese market or scaling operations in both. Engagements are typically strategic in nature — not transactional.",
      },
      {
        q: "How do your engagements typically begin?",
        a: "Every engagement starts with a complimentary 30-minute discovery call where I assess your objectives, constraints, and timeline. From there, I propose an engagement scope, timeline, and investment. We proceed only when there is clear mutual fit.",
      },
      {
        q: "Do you work with startups?",
        a: "On a selective basis. I work with Series B+ startups expanding internationally where the India-China corridor is a strategic priority. Early-stage companies are usually better served by advisory networks rather than senior consulting.",
      },
    ],
  },
  {
    category: "Services",
    items: [
      {
        q: "What exactly does your India-China consulting service cover?",
        a: "It covers the full spectrum of bilateral commercial activity: market feasibility, regulatory navigation, partner identification, joint venture structuring, supply chain optimisation, and post-entry scaling. The scope is customised per engagement — some clients need one phase; others engage end-to-end.",
      },
      {
        q: "Can you help with both market entry into China from India AND the reverse?",
        a: "Yes. I have equal experience facilitating Indian companies entering China and Chinese companies entering India. Each direction has its own regulatory, cultural, and commercial nuances — I navigate both fluently.",
      },
      {
        q: "Do you offer language interpretation for one-off events or only ongoing engagements?",
        a: "Both. I provide Mandarin-English-Hindi interpretation for one-off boardroom meetings, trade delegations, and government summits, as well as ongoing embedded interpretation for extended engagements and negotiations.",
      },
      {
        q: "What is the minimum engagement duration for your consulting services?",
        a: "Project-based engagements typically run 4–12 weeks. Advisory retainers are available on a quarterly or annual basis. I do not take on engagements shorter than 4 weeks, as meaningful strategic work requires proper context development.",
      },
    ],
  },
  {
    category: "China Business",
    items: [
      {
        q: "How do you navigate the current geopolitical tensions between India and China?",
        a: "With precision and realism. I advise clients on structuring relationships that are resilient to geopolitical shifts — using offshore entities, third-country intermediaries where appropriate, and building genuine local relationships rather than paper partnerships. I am candid about risks and do not oversell the market.",
      },
      {
        q: "Do I need to visit China personally, or can you handle the groundwork remotely?",
        a: "I can front the initial groundwork remotely or in-person on your behalf, and I advise whether a client visit is a strategic advantage or a premature commitment. For high-stakes negotiations, in-person presence is often decisive — I will tell you when it matters.",
      },
      {
        q: "How long does it realistically take to establish a presence in China?",
        a: "A WFOE registration takes 3–6 months under normal conditions. The commercial footprint — finding the right distributor, onboarding staff, landing first revenue — realistically takes 12–24 months from start. Anyone promising faster timelines without significant local existing relationships is not being straight with you.",
      },
    ],
  },
  {
    category: "India Business",
    items: [
      {
        q: "What sectors do you specialise in for the Indian market?",
        a: "Manufacturing, pharmaceuticals, renewable energy, infrastructure, consumer goods, and education — sectors with significant India-China trade flows. I also have deep experience in government relations in India, which is often decisive in regulated sectors.",
      },
      {
        q: "Can you help with Indian regulatory approvals for Chinese investment?",
        a: "I advise on the strategic dimensions and connect clients with the appropriate legal and regulatory advisors. Regulatory approvals require licensed professionals; I help frame the strategy, map the stakeholders, and ensure your advisors are working to the right brief.",
      },
    ],
  },
  {
    category: "Language & Culture",
    items: [
      {
        q: "What is your Mandarin proficiency level?",
        a: "I am a native-level Mandarin speaker (C2) certified through HSK6 and professional interpretation qualifications. I have interpreted at senior government level in both countries and in complex commercial negotiations. I also speak Cantonese at conversational level.",
      },
      {
        q: "Do you provide cultural training separate from language training?",
        a: "Yes. Cross-cultural business training (negotiation styles, decision-making hierarchies, relationship-building protocols, gift and etiquette conventions) is available as a standalone half-day workshop or embedded within a broader consulting engagement.",
      },
    ],
  },
  {
    category: "Process & Fees",
    items: [
      {
        q: "How are your fees structured?",
        a: "Fees are project-based or retainer-based depending on scope. Project fees are fixed and quoted upfront after the discovery call. Retainers are monthly, billed quarterly in advance. I do not charge by the hour for strategic consulting — that incentive structure does not align with delivering outcomes.",
      },
      {
        q: "Do you offer any guarantees?",
        a: "I guarantee the quality of my work and full effort on every engagement. I do not guarantee outcomes — anyone who does in geopolitically complex markets is misleading you. What I do guarantee is an honest assessment of your odds before we begin.",
      },
      {
        q: "How do I get started?",
        a: "Book a 30-minute discovery call via the contact page. Come prepared with a clear problem statement, your timeline, and your budget range. That is all I need to tell you whether — and how — I can help.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 space-y-16">
      {/* Hero */}
      <section className="space-y-5">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary">
          Questions
        </p>
        <h1 className={cn(sectionHeadingClass, "text-3xl min-[580px]:text-4xl")}>
          Frequently Asked Questions
        </h1>
        <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-2xl">
          Straight answers to the questions I hear most often. If yours is not here,
          the contact page is always open.
        </p>
      </section>

      {/* FAQ Groups */}
      <div className="space-y-12">
        {faqs.map((group) => (
          <section key={group.category} className="space-y-4">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              {group.category}
            </h2>
            <div className="bg-card rounded-2xl overflow-hidden">
              <Accordion type="single" collapsible>
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${group.category}-${i}`}
                    className="px-5 min-[580px]:px-8 border-b border-border/40 last:border-0"
                  >
                    <AccordionTrigger className="text-[14px] font-medium text-foreground py-5 hover:no-underline text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[13px] font-light leading-relaxed text-muted-foreground pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-card rounded-2xl p-5 min-[580px]:p-8 flex flex-col min-[580px]:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="font-semibold text-[16px] text-foreground">
            Still have a question?
          </h3>
          <p className="text-[14px] font-light text-muted-foreground">
            Reach out directly — I respond to every serious enquiry.
          </p>
        </div>
        <Link
          href="/contact"
          className="flex-none inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90 whitespace-nowrap"
          style={{ background: "oklch(0.35 0.18 264)" }}
        >
          Contact Me <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
