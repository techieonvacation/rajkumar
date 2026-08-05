"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Calendar,
  Linkedin,
  Twitter,
  Youtube,
  Send,
  ChevronDown,
} from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validators/contact";
import { submitContactForm } from "@/lib/actions/contact";
import { sectionHeadingClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

/* ── Static data ─────────────────────────────────────────────────────────────── */

const SERVICES = [
  "Market Entry Strategy (India or China)",
  "Trade Facilitation & Tariff Navigation",
  "Government Relations & Regulatory Affairs",
  "Joint Venture Structuring & Partner Search",
  "Cross-Cultural Business Training",
  "Mandarin Language Coaching",
  "Due Diligence & Risk Assessment",
  "Supply Chain Optimization",
  "Keynote Speaking & Executive Education",
];

const BUDGET_RANGES = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000 – $150,000",
  "$150,000+",
  "Prefer to discuss",
];

const COUNTRIES = [
  "India",
  "China",
  "United States",
  "United Kingdom",
  "Singapore",
  "United Arab Emirates",
  "Germany",
  "Japan",
  "South Korea",
  "Australia",
  "Canada",
  "France",
  "Netherlands",
  "Switzerland",
  "Hong Kong",
  "Taiwan",
  "Thailand",
  "Vietnam",
  "Malaysia",
  "Indonesia",
  "Other",
];

/* ── Field component ─────────────────────────────────────────────────────────── */

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-[12px] text-destructive mt-1.5">{message}</p>;
}

/* ── Main component ──────────────────────────────────────────────────────────── */

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      country: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(data);
      if (result.success) {
        toast.success("Message sent successfully!", {
          description:
            "Thank you for reaching out. Rajesh will respond within 1-2 business days.",
        });
        reset();
      } else {
        toast.error("Failed to send message", {
          description: result.error ?? "Please try again or email directly.",
        });
      }
    } catch {
      toast.error("Something went wrong", {
        description: "Please try again or email directly at rajesh@rajeshkumar.com",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-14 px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <p className="text-[13px] font-medium tracking-widest text-primary uppercase mb-3">
            Get in Touch
          </p>
          <h1 className={cn(sectionHeadingClass, "text-3xl min-[580px]:text-4xl font-semibold mb-4")}>
            Start a Conversation
          </h1>
          <p className="text-[14px] font-light leading-relaxed text-muted-foreground max-w-xl">
            Whether you&apos;re exploring a market entry, structuring a cross-border
            partnership, or need cultural and linguistic advisory — let&apos;s talk.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="px-4 max-w-7xl mx-auto pb-24">
        <div className="grid lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-10 items-start">
          {/* ── Left: Contact info ── */}
          <div className="space-y-6">
            {/* Primary contact */}
            <div className="bg-card rounded-2xl p-5 min-[580px]:p-8 space-y-5">
              <h2 className={cn(sectionHeadingClass, "text-[18px]")}>Contact Information</h2>

              <div className="space-y-4 pt-2">
                <a
                  href="mailto:rajesh@rajeshkumar.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5 uppercase tracking-wide">
                      Email
                    </p>
                    <p className="text-[14px] font-medium text-foreground group-hover:text-primary transition-colors">
                      rajesh@rajeshkumar.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5 uppercase tracking-wide">
                      Phone
                    </p>
                    <p className="text-[14px] font-medium text-foreground group-hover:text-primary transition-colors">
                      +91 98765 43210
                    </p>
                  </div>
                </a>

                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.52_0.22_150)]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4.5 h-4.5 text-[oklch(0.52_0.22_150)]" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5 uppercase tracking-wide">
                      WhatsApp
                    </p>
                    <p className="text-[14px] font-medium text-foreground group-hover:text-primary transition-colors">
                      Message on WhatsApp
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5 uppercase tracking-wide">
                      Office Address
                    </p>
                    <p className="text-[14px] font-light text-muted-foreground leading-relaxed">
                      Level 12, Prestige Trade Tower
                      <br />
                      Palace Road, Bengaluru 560001
                      <br />
                      Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] text-muted-foreground mb-0.5 uppercase tracking-wide">
                      Business Hours
                    </p>
                    <p className="text-[14px] font-light text-muted-foreground leading-relaxed">
                      Mon – Fri: 9:00 AM – 7:00 PM IST
                      <br />
                      Sat: 10:00 AM – 2:00 PM IST
                      <br />
                      <span className="text-[12px]">
                        Also available for international time zones
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendly CTA */}
            <div className="bg-primary rounded-2xl p-5 min-[580px]:p-8">
              <div className="flex items-start gap-3 mb-4">
                <Calendar className="w-5 h-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-primary-foreground text-[15px] mb-1">
                    Schedule a Free Discovery Call
                  </p>
                  <p className="text-[13px] text-primary-foreground/80 leading-relaxed">
                    Book a 30-minute call to explore how Rajesh can help your business
                    navigate India-China opportunities.
                  </p>
                </div>
              </div>
              <a
                href="https://calendly.com/rajeshkumar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center bg-primary-foreground text-primary font-medium rounded-xl px-4 py-3 text-[14px] hover:opacity-90 transition-opacity"
              >
                Book on Calendly
              </a>
            </div>

            {/* Social links */}
            <div className="bg-card rounded-2xl p-5 min-[580px]:p-8">
              <p className="text-[12px] font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                Follow &amp; Connect
              </p>
              <div className="flex gap-3">
                <a
                  href="https://linkedin.com/in/rajeshkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://twitter.com/rajeshkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter / X"
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Twitter className="w-4.5 h-4.5" />
                </a>
                <a
                  href="https://youtube.com/@rajeshkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <Youtube className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-card rounded-2xl overflow-hidden">
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-[12px] text-muted-foreground">
                    Bengaluru, Karnataka, India
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-[12px] text-muted-foreground">
                  Prestige Trade Tower, Palace Road, Bengaluru 560001
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <div className="bg-card rounded-2xl p-5 min-[580px]:p-8">
            <h2 className={cn(sectionHeadingClass, "text-[18px] mb-6")}>Send a Message</h2>
            <p className="text-[14px] font-light leading-relaxed text-muted-foreground mb-8 -mt-2">
              Fill in the details below and Rajesh will personally respond within
              1-2 business days.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[13px] font-medium text-foreground mb-1.5"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Vikram Sharma"
                    {...register("name")}
                    className="w-full bg-muted rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground placeholder:text-muted-foreground/50 transition"
                  />
                  <FieldError message={errors.name?.message} />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-[13px] font-medium text-foreground mb-1.5"
                  >
                    Email Address <span className="text-destructive">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="vikram@company.com"
                    {...register("email")}
                    className="w-full bg-muted rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground placeholder:text-muted-foreground/50 transition"
                  />
                  <FieldError message={errors.email?.message} />
                </div>
              </div>

              {/* Phone + Company */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-[13px] font-medium text-foreground mb-1.5"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    {...register("phone")}
                    className="w-full bg-muted rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground placeholder:text-muted-foreground/50 transition"
                  />
                  <FieldError message={errors.phone?.message} />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-[13px] font-medium text-foreground mb-1.5"
                  >
                    Company / Organisation
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Sharma Industries Pvt. Ltd."
                    {...register("company")}
                    className="w-full bg-muted rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground placeholder:text-muted-foreground/50 transition"
                  />
                  <FieldError message={errors.company?.message} />
                </div>
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="block text-[13px] font-medium text-foreground mb-1.5"
                >
                  Country
                </label>
                <div className="relative">
                  <select
                    id="country"
                    {...register("country")}
                    className="w-full appearance-none bg-muted rounded-xl px-4 py-3.5 pr-10 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground transition"
                  >
                    <option value="">Select your country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <FieldError message={errors.country?.message} />
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-[13px] font-medium text-foreground mb-1.5"
                >
                  Service Interested In
                </label>
                <div className="relative">
                  <select
                    id="service"
                    {...register("service")}
                    className="w-full appearance-none bg-muted rounded-xl px-4 py-3.5 pr-10 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground transition"
                  >
                    <option value="">Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <FieldError message={errors.service?.message} />
              </div>

              {/* Budget */}
              <div>
                <label
                  htmlFor="budget"
                  className="block text-[13px] font-medium text-foreground mb-1.5"
                >
                  Budget Range
                </label>
                <div className="relative">
                  <select
                    id="budget"
                    {...register("budget")}
                    className="w-full appearance-none bg-muted rounded-xl px-4 py-3.5 pr-10 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground transition"
                  >
                    <option value="">Select a budget range</option>
                    {BUDGET_RANGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
                <FieldError message={errors.budget?.message} />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-[13px] font-medium text-foreground mb-1.5"
                >
                  Message <span className="text-destructive">*</span>
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your business goal, the challenge you're facing, or the opportunity you want to explore..."
                  {...register("message")}
                  className="w-full bg-muted rounded-xl px-4 py-3.5 outline-none focus:ring-2 focus:ring-primary/25 text-[14px] text-foreground placeholder:text-muted-foreground/50 transition resize-none"
                />
                <FieldError message={errors.message?.message} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium rounded-xl px-6 py-3.5 text-[14px] hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-[12px] text-muted-foreground">
                By submitting this form you agree to being contacted about your inquiry.
                Your information is never shared with third parties.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
