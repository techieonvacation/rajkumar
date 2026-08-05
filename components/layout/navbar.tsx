"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Globe } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FancyButton } from "@/components/ui/fancy-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { cn } from "@/lib/utils";

/* ─── Nav link definitions ───────────────────────────────────────────────────── */

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "Market Entry Strategy",
        href: "/services/market-entry-strategy",
        description: "Enter India or China markets with confidence",
      },
      {
        label: "India-China Consulting",
        href: "/services/india-china-consulting",
        description: "End-to-end corridor advisory",
      },
      {
        label: "Chinese Interpretation",
        href: "/services/interpretation-translation",
        description: "HSK-6 Mandarin for high-stakes meetings",
      },
      {
        label: "Business Delegations",
        href: "/services/business-delegation",
        description: "Curated government & industry programs",
      },
      {
        label: "Corporate Training",
        href: "/services/corporate-training",
        description: "Cross-cultural competency workshops",
      },
      {
        label: "Risk & Compliance",
        href: "/services/risk-compliance-advisory",
        description: "Due diligence and geopolitical risk",
      },
    ],
  },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export interface NavbarProfile {
  name: string;
  tag?: string;
  avatar?: string;
}

interface NavbarProps {
  profile?: NavbarProfile;
}

const DEFAULT_PROFILE: NavbarProfile = {
  name: "Rajesh Kumar",
};

/* ─── Announcement bar ─────────────────────────────────────────────────────── */

function AnnouncementBar() {
  const [dismissed, setDismissed] = React.useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem("rk-announce-dismissed")) setDismissed(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("rk-announce-dismissed", "1");
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="relative border-b border-primary-foreground/10 bg-primary px-4 py-2 text-center text-primary-foreground">
      <p className="text-[12px] font-medium tracking-wide">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground align-middle" />
        Available for Q3 2026 engagements —{" "}
        <Link
          href="/contact"
          className="underline underline-offset-2 hover:opacity-90"
        >
          Book a free 30-min strategy call
        </Link>
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 opacity-70 transition-opacity hover:opacity-100"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

/* ─── Brand wordmark ─────────────────────────────────────────────────────────── */

function NavBrand({
  profile,
  onClick,
}: {
  profile: NavbarProfile;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group shrink-0 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={`${profile.name} — Home`}
    >
      <span className="font-heading text-[15px] font-bold leading-none tracking-tight text-foreground transition-colors group-hover:text-primary min-[480px]:text-base lg:text-lg">
        {profile.name}
      </span>
    </Link>
  );
}

/* ─── Desktop center links ───────────────────────────────────────────────────── */

function DesktopNavLinks({
  links,
  isActive,
}: {
  links: NavLink[];
  isActive: (href: string) => boolean;
}) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const ddTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDD = (href: string) => {
    if (ddTimer.current) clearTimeout(ddTimer.current);
    setOpenDropdown(href);
  };
  const closeDD = () => {
    ddTimer.current = setTimeout(() => setOpenDropdown(null), 160);
  };

  return (
    <div
      className="hidden flex-1 items-center justify-center gap-1 xl:flex"
      onMouseLeave={closeDD}
      role="list"
      aria-label="Site navigation"
    >
      {links.map((link) => {
        const active = isActive(link.href);
        const hasDD = Boolean(link.children?.length);

        return (
          <div
            key={link.href}
            className="relative"
            role="listitem"
            onMouseEnter={() => hasDD && openDD(link.href)}
          >
            <Link
              href={link.href}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-2 text-base font-medium transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
              {hasDD && (
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform duration-200",
                    openDropdown === link.href && "rotate-180"
                  )}
                  strokeWidth={2}
                />
              )}
            </Link>

            <AnimatePresence>
              {hasDD && openDropdown === link.href && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  onMouseEnter={() => {
                    if (ddTimer.current) clearTimeout(ddTimer.current);
                  }}
                  onMouseLeave={closeDD}
                  className="absolute left-1/2 top-[calc(100%+12px)] z-50 w-72 -translate-x-1/2 rounded-2xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl ring-1 ring-border/50"
                >
                  {link.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group flex flex-col rounded-xl px-3.5 py-2.5 transition-colors hover:bg-muted"
                    >
                      <span className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-0.5 text-sm font-light text-muted-foreground">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Mobile nav link ────────────────────────────────────────────────────────── */

function MobileNavLink({
  label,
  href,
  active,
  children,
  onClose,
}: NavLink & { active: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = React.useState(false);
  const hasChildren = Boolean(children?.length);

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
            active
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
          aria-expanded={expanded}
        >
          <span>{label}</span>
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-200",
              expanded && "rotate-180"
            )}
          />
        </button>
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pl-4 pt-1"
            >
              {children!.map((child) => (
                <SheetClose asChild key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onClose}
                    className="flex rounded-xl px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {child.label}
                  </Link>
                </SheetClose>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <SheetClose asChild>
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          "flex items-center justify-between rounded-xl px-4 py-3 text-[14px] font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/30",
          active
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        <span>{label}</span>
        {active && <ChevronRight className="size-4 text-primary" strokeWidth={2} />}
      </Link>
    </SheetClose>
  );
}

/* ─── Main Navbar ────────────────────────────────────────────────────────────── */

export function Navbar({ profile: profileProp }: NavbarProps) {
  const profile = profileProp ?? DEFAULT_PROFILE;
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = React.useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const closeMobileMenu = React.useCallback(() => setMobileOpen(false), []);

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <AnnouncementBar />

      <div className="px-4 py-3 min-[580px]:px-6 lg:px-8">
        <header
          className={cn(
            "mx-auto flex h-17 lg:h-20 max-w-[1320px] items-center gap-3 rounded-full",
            "border border-border bg-background px-3",
            "min-[580px]:px-4 lg:gap-4 lg:px-5"
          )}
          role="banner"
        >
          <nav
            className="flex w-full min-w-0 items-center gap-2 sm:gap-3"
            aria-label="Main navigation"
          >
            <NavBrand profile={profile} />

            <DesktopNavLinks links={NAV_LINKS} isActive={isActive} />

            <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
              <ThemeToggle className="hidden sm:inline-flex" />

              <FancyButton
                variant="slide"
                size="default"
                href="/contact"
                className={cn(
                  "hidden shrink-0 sm:inline-flex",
                  "max-w-none border border-border bg-card text-foreground",
                  "shadow-none hover:border-primary hover:bg-primary hover:text-primary-foreground",
                  "min-w-[12.75rem] md:min-w-[13.25rem]"
                )}
              >
                Book Consultation
              </FancyButton>

              <div className="xl:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={
                        mobileOpen ? "Close navigation menu" : "Open navigation menu"
                      }
                      aria-expanded={mobileOpen}
                      aria-controls="mobile-nav"
                      className="size-10 rounded-full hover:bg-muted"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {mobileOpen ? (
                          <motion.span
                            key="close"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.15 }}
                          >
                            <X className="size-5" strokeWidth={1.75} />
                          </motion.span>
                        ) : (
                          <motion.span
                            key="menu"
                            initial={{ opacity: 0, rotate: 90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.15 }}
                          >
                            <Menu className="size-5" strokeWidth={1.75} />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    showCloseButton={false}
                    id="mobile-nav"
                    className="flex w-[min(82vw,340px)] flex-col gap-0 bg-background p-0"
                  >
                    <SheetHeader className="border-b border-border border-t-4 border-t-primary bg-card px-5 py-4">
                      <div className="flex items-center justify-between">
                        <NavBrand profile={profile} onClick={closeMobileMenu} />
                        <SheetClose asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Close navigation menu"
                            className="rounded-full bg-muted hover:bg-accent"
                          >
                            <X className="size-4" strokeWidth={1.75} />
                          </Button>
                        </SheetClose>
                      </div>
                      <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    </SheetHeader>

                    <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5">
                      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                      <span className="text-[12px] font-medium text-primary">
                        Available for Q3 2026 engagements
                      </span>
                    </div>

                    <nav
                      className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-4"
                      aria-label="Mobile navigation"
                    >
                      {NAV_LINKS.map((link) => (
                        <MobileNavLink
                          key={link.href}
                          {...link}
                          active={isActive(link.href)}
                          onClose={closeMobileMenu}
                        />
                      ))}
                    </nav>

                    <div className="space-y-2 border-t border-border/40 p-4">
                      <div className="flex items-center justify-between px-1">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                          <Globe className="size-3.5" strokeWidth={1.75} />
                          HSK‑6
                        </div>
                        <ThemeToggle />
                      </div>
                      <SheetClose asChild>
                        <FancyButton
                          variant="slide"
                          href="/contact"
                          onClick={closeMobileMenu}
                          className={cn(
                            "w-full max-w-none border border-border bg-card",
                            "hover:border-primary hover:bg-primary hover:text-primary-foreground"
                          )}
                        >
                          Book Consultation
                        </FancyButton>
                      </SheetClose>
                      <p className="text-center text-[11px] text-muted-foreground">
                        Free 30-min strategy call · No commitment
                      </p>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </div>
  );
}
