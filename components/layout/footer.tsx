import * as React from "react";
import Link from "next/link";
import {
  Linkedin,
  Twitter,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Data ───────────────────────────────────────────────────────────────────── */

const SERVICES_LINKS = [
  { label: "Market Entry Strategy", href: "/services#market-entry" },
  { label: "China Business Setup", href: "/services#business-setup" },
  { label: "Cross-Border Trade", href: "/services#cross-border-trade" },
  { label: "Regulatory & Compliance", href: "/services#regulatory" },
  { label: "Business Delegation", href: "/services#delegation" },
  { label: "Translation & Interpretation", href: "/services#translation" },
  { label: "Corporate Training", href: "/services#training" },
];

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rajeshkumar",
    icon: Linkedin,
    handle: "rajeshkumar",
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/rajeshkumar",
    icon: Twitter,
    handle: "@rajeshkumar",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@rajeshkumar",
    icon: Youtube,
    handle: "Rajesh Kumar Insights",
  },
  {
    label: "WeChat",
    href: "#wechat",
    icon: MessageCircle,
    handle: "RajeshKumar_CN",
    isWechat: true,
  },
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "rajesh@rajeshkumar.com",
    href: "mailto:rajesh@rajeshkumar.com",
  },
  {
    icon: Phone,
    label: "Phone / WhatsApp",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
  },
  {
    icon: MessageCircle,
    label: "WeChat ID",
    value: "RajeshKumar_CN",
    href: "#wechat",
  },
  {
    icon: MapPin,
    label: "Based In",
    value: "New Delhi, India — Beijing, China",
    href: undefined,
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────────── */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-5 font-heading text-[13px] font-semibold uppercase tracking-widest text-white/50">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const commonClass = cn(
    "inline-flex items-center gap-1 text-[13.5px] font-light text-white/60",
    "transition-colors hover:text-white",
    "outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/30",
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClass}
        aria-label={`${children} (opens in new tab)`}
      >
        {children}
        <ExternalLink className="size-3 opacity-50" />
      </a>
    );
  }

  return (
    <Link href={href} className={commonClass}>
      {children}
    </Link>
  );
}

/* ─── Columns ────────────────────────────────────────────────────────────────── */

function BrandColumn() {
  return (
    <div className="flex flex-col gap-5">
      {/* Logo */}
      <Link
        href="/"
        className="group flex items-center gap-3 w-fit outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl"
        aria-label="Rajesh Kumar — Home"
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            "bg-white/10 text-white",
            "font-heading text-base font-semibold tracking-tight",
            "transition-colors group-hover:bg-white/15"
          )}
          aria-hidden="true"
        >
          RK
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-heading text-base font-semibold tracking-tight text-white">
            Rajesh Kumar
          </span>
        </div>
      </Link>

      {/* Tagline */}
      <p className="max-w-[240px] text-[13.5px] font-light leading-relaxed text-white/55">
        Bridging two of the world&rsquo;s largest economies. 15+ years of
        experience in India-China business strategy and cross-border growth.
      </p>

      {/* Social icons */}
      <div className="flex items-center gap-2" role="list" aria-label="Social media links">
        {SOCIAL_LINKS.map(({ label, href, icon: Icon, isWechat }) => (
          <div key={label} role="listitem">
            <a
              href={href}
              target={isWechat ? undefined : "_blank"}
              rel={isWechat ? undefined : "noopener noreferrer"}
              aria-label={label}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-xl",
                "bg-white/8 text-white/60",
                "transition-colors hover:bg-white/15 hover:text-white",
                "outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              )}
            >
              <Icon className="size-[17px]" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicesColumn() {
  return (
    <div>
      <FooterHeading>Services</FooterHeading>
      <ul className="flex flex-col gap-2.5" role="list">
        {SERVICES_LINKS.map(({ label, href }) => (
          <li key={href} role="listitem">
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QuickLinksColumn() {
  return (
    <div>
      <FooterHeading>Quick Links</FooterHeading>
      <ul className="flex flex-col gap-2.5" role="list">
        {QUICK_LINKS.map(({ label, href }) => (
          <li key={href} role="listitem">
            <FooterLink href={href}>{label}</FooterLink>
          </li>
        ))}
      </ul>

      {/* Schedule CTA */}
      <div className="mt-6">
        <Link
          href="/contact"
          className={cn(
            "inline-flex items-center gap-2 rounded-xl",
            "bg-primary px-4 py-2.5 text-[13px] font-medium text-white",
            "transition-opacity hover:opacity-90",
            "outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          )}
        >
          Book a Call
          <ArrowUpRight className="size-4" strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}

function ContactColumn() {
  return (
    <div>
      <FooterHeading>Contact</FooterHeading>
      <ul className="flex flex-col gap-4" role="list">
        {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
          <li key={label} role="listitem">
            <div className="flex items-start gap-3">
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/8 text-white/50"
                aria-hidden="true"
              >
                <Icon className="size-[14px]" strokeWidth={1.75} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10.5px] uppercase tracking-wider text-white/35 font-medium">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={cn(
                      "text-[13.5px] font-light text-white/65",
                      "transition-colors hover:text-white",
                      "outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-white/30"
                    )}
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-[13.5px] font-light text-white/65">
                    {value}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────────── */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[oklch(0.09_0.010_264)] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main grid */}
      <div className="mx-auto max-w-340 px-5 min-[580px]:px-8">
        <div className="py-14 lg:py-16">
          <div
            className={cn(
              "grid grid-cols-1 gap-10",
              "sm:grid-cols-2",
              "lg:grid-cols-4 lg:gap-8 xl:gap-12"
            )}
          >
            <BrandColumn />
            <ServicesColumn />
            <QuickLinksColumn />
            <ContactColumn />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/8" role="separator" />

        {/* Bottom bar */}
        <div
          className={cn(
            "flex flex-col gap-3 py-5",
            "sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <p className="text-[12px] font-light text-white/35">
            &copy; {currentYear} Rajesh Kumar. All rights reserved.
          </p>

          <nav
            className="flex items-center gap-4"
            aria-label="Legal links"
          >
            <FooterLink href="/privacy-policy" className="text-[12px]">
              Privacy Policy
            </FooterLink>
            <FooterLink href="/terms" className="text-[12px]">
              Terms of Service
            </FooterLink>
            <FooterLink href="/sitemap.xml" className="text-[12px]">
              Sitemap
            </FooterLink>
          </nav>
        </div>
      </div>
    </footer>
  );
}
