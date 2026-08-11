import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Linkedin, MessageCircle, PhoneCall } from "lucide-react";
import {
  RESOURCE_LINKS,
  SITE_PROFILE,
  USEFUL_LINKS,
} from "@/lib/site-profile";
import { siteContainerClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";

const FOOTER_SURFACE = "oklch(15.5% 0 0)";
const FOOTER_BAR_SURFACE = "oklch(11.5% 0 0)";

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "LinkedIn", href: SITE_PROFILE.linkedin, icon: Linkedin },
  { label: "WhatsApp", href: SITE_PROFILE.whatsapp, icon: MessageCircle },
];

const GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=300&q=80",
    alt: "Business delegation meeting",
  },
  {
    src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=300&q=80",
    alt: "Cross-border strategy session",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=300&q=80",
    alt: "Advisory workshop",
  },
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=300&q=80",
    alt: "Conference keynote",
  },
  {
    src: "https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=300&q=80",
    alt: "Trade exhibition floor",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80",
    alt: "Client negotiation",
  },
];

function BrandMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="size-12 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 24a16 16 0 1 1-8.6-14.2"
        stroke="var(--primary)"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M24 24 39 11m0 0h-9.5M39 11v9.5"
        stroke="var(--primary)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-7 font-heading text-[21px] font-bold tracking-tight text-white">
      {children}
    </h3>
  );
}

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={heading}>
      <FooterHeading>{heading}</FooterHeading>
      <ul className="flex flex-col gap-[18px]" role="list">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "group inline-flex items-center gap-3 text-[15px] font-light text-white/60",
                "transition-colors duration-300 hover:text-primary",
                "outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary/40"
              )}
            >
              <span
                className="size-[7px] shrink-0 rounded-full bg-white/35 transition-colors duration-300 group-hover:bg-primary"
                aria-hidden="true"
              />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative text-white"
      style={{ background: FOOTER_SURFACE }}
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className={siteContainerClass}>
        <div className="grid grid-cols-1 gap-12 py-16 min-[580px]:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.8fr)_minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-10 lg:py-20 xl:gap-14">
          <div className="flex flex-col">
            <Link
              href="/"
              className="flex w-fit items-center gap-3 outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-primary/40"
              aria-label={`${SITE_PROFILE.name} — Home`}
            >
              <BrandMark />
              <span className="font-heading text-[32px] font-bold uppercase leading-none tracking-tight min-[580px]:text-[37px]">
                <span className="text-white">Rajesh</span>
                <span className="text-primary">Kumar</span>
              </span>
            </Link>

            <p className="mt-7 max-w-[21rem] text-[15px] font-light leading-[1.75] text-white/55">
              India–China business consulting for market entry, trade,
              compliance and cross-cultural operations.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <PhoneCall
                className="size-9 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="h-12 w-px bg-primary" aria-hidden="true" />
              <span className="flex flex-col gap-1">
                <a
                  href={SITE_PROFILE.phoneHref}
                  className={cn(
                    "font-heading text-[21px] font-bold leading-none tracking-tight text-white",
                    "transition-colors duration-300 hover:text-primary",
                    "outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-primary/40"
                  )}
                >
                  {SITE_PROFILE.phone}
                </a>
                <span className="text-[13px] font-bold text-primary">
                  Call 24/7
                </span>
              </span>
            </div>

            <ul className="mt-9 flex items-center gap-3.5" role="list">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={cn(
                      "flex size-[46px] items-center justify-center rounded-full",
                      "border border-dashed border-white/25 text-white/60",
                      "transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                      "outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    )}
                  >
                    <Icon className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${SITE_PROFILE.email}`}
                  aria-label="Email"
                  className={cn(
                    "flex size-[46px] items-center justify-center rounded-full",
                    "border border-dashed border-white/25 font-heading text-[13px] font-semibold text-white/60",
                    "transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground",
                    "outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  )}
                >
                  @
                </a>
              </li>
            </ul>
          </div>

          <LinkColumn heading="Useful Links" links={USEFUL_LINKS} />
          <LinkColumn heading="Resource" links={RESOURCE_LINKS} />

          <div>
            <FooterHeading>Instagram</FooterHeading>
            <ul className="grid max-w-[22rem] grid-cols-3 gap-2.5" role="list">
              {GALLERY.map(({ src, alt }) => (
                <li key={src}>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative block aspect-square overflow-hidden rounded-lg",
                      "outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    )}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      sizes="110px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span
                      className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/35"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ background: FOOTER_BAR_SURFACE }}>
        <div className={siteContainerClass}>
          <div className="flex flex-col items-center gap-3 py-6 min-[580px]:flex-row min-[580px]:justify-center">
            <p className="text-center text-[14px] font-bold text-white/55">
              Copyright &copy; {currentYear}{" "}
              <span className="text-primary">Rajesh Kumar</span>. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
