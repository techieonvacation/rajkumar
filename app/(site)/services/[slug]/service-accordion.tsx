"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = { question: string; answer: string };

export default function ServiceAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-card rounded-2xl divide-y divide-border overflow-hidden">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 p-5 min-[580px]:p-6 text-left hover:bg-muted/50 transition-colors"
          >
            <span className="text-[14px] font-medium text-foreground leading-snug">
              {faq.question}
            </span>
            <ChevronDown
              className="w-4 h-4 flex-none text-muted-foreground transition-transform duration-200"
              style={{
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>

          {open === i && (
            <div className="px-5 pb-5 min-[580px]:px-6 min-[580px]:pb-6">
              <p className="text-[14px] font-light leading-relaxed text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
