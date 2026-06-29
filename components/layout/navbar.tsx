"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CalendarDays, ChevronDown, ChevronRight, Globe } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
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
        href: "/services/market-entry",
        description: "Enter India or China markets with confidence",
      },
      {
        label: "India-China Consulting",
        href: "/services/india-china-consulting",
        description: "End-to-end corridor advisory",
      },
      {
        label: "Chinese Interpretation",
        href: "/services/interpretation",
        description: "HSK-6 Mandarin for high-stakes meetings",
      },
      {
        label: "Business Delegations",
        href: "/services/delegations",
        description: "Curated government & industry programs",
      },
      {
        label: "Corporate Training",
        href: "/services/training",
        description: "Cross-cultural competency workshops",
      },
      {
        label: "Risk & Compliance",
        href: "/services/risk-compliance",
        description: "Due diligence and geopolitical risk",
      },
    ],
  },
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/* ─── Scroll progress bar ─────────────────────────────────────────────────────── */

function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 h-0.5 w-full bg-border/30">
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

/* ─── Announcement bar ────────────────────────────────────────────────────────── */

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
    <div className="relative bg-primary px-4 py-2 text-center text-primary-foreground">
      <p className="text-[12px] font-medium">
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary-foreground/70 align-middle" />
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
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 opacity-70 hover:opacity-100 transition-opacity"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

/* ─── Logo ───────────────────────────────────────────────────────────────────── */

function NavLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
      aria-label="Rajesh Kumar — Home"
    >
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          "bg-primary text-primary-foreground",
          "font-heading text-base font-semibold tracking-tight",
          "transition-opacity group-hover:opacity-90"
        )}
        aria-hidden="true"
      >
        RK
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-heading text-base font-semibold tracking-tight text-foreground">
          Rajesh Kumar
        </span>
      </div>
    </Link>
  );
}

/* ─── Desktop pill nav — React Bits PillNav pattern via Framer Motion ─────────── */
/*
 * The sliding pill background (layoutId="nav-pill") mirrors the React Bits
 * PillNav effect without GSAP. Priority: hovered > active, so only ONE pill
 * exists at a time and Framer Motion slides it smoothly between items.
 */

function DesktopPillNav({
  links,
  isActive,
}: {
  links: NavLink[];
  isActive: (href: string) => boolean;
}) {
  const [hoveredHref, setHoveredHref] = React.useState<string | null>(null);
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
      className="hidden lg:flex items-center rounded-full bg-muted/80 p-1.5"
      onMouseLeave={() => {
        setHoveredHref(null);
        closeDD();
      }}
      role="list"
      aria-label="Site navigation"
    >
      {links.map((link) => {
        const active = isActive(link.href);
        const hasDD = Boolean(link.children?.length);
        /* Show the sliding pill for the hovered item; fall back to active when nothing is hovered */
        const showPill =
          hoveredHref === link.href ||
          (hoveredHref === null && active);

        return (
          <div
            key={link.href}
            className="relative"
            role="listitem"
            onMouseEnter={() => {
              setHoveredHref(link.href);
              hasDD ? openDD(link.href) : closeDD();
            }}
          >
            <Link
              href={link.href}
              className={cn(
                "relative flex items-center gap-1 rounded-full px-3.5 py-2",
                "text-sm font-medium",
                "outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
                showPill ? "text-foreground" : "text-muted-foreground transition-colors duration-100 hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              {/* Sliding pill background — shared layoutId keeps it one element */}
              {showPill && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-background"
                  style={{ zIndex: 0 }}
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 38 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
              {hasDD && (
                <ChevronDown
                  className={cn(
                    "relative z-10 size-3.5 transition-transform duration-200",
                    openDropdown === link.href && "rotate-180"
                  )}
                  strokeWidth={2}
                />
              )}
            </Link>

            {/* Dropdown */}
            <AnimatePresence>
              {hasDD && openDropdown === link.href && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  onMouseEnter={() => {
                    if (ddTimer.current) clearTimeout(ddTimer.current);
                    setHoveredHref(link.href);
                  }}
                  onMouseLeave={closeDD}
                  className="absolute left-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl bg-popover p-1.5 shadow-xl"
                >
                  {link.children!.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group flex flex-col rounded-xl px-3.5 py-2.5 transition-colors hover:bg-muted"
                    >
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-0.5 text-[11.5px] font-light text-muted-foreground">
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

/* ─── Mobile nav link ─────────────────────────────────────────────────────────── */

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
            "flex w-full items-center justify-between rounded-xl px-4 py-3",
            "text-[14px] font-medium transition-colors",
            "outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
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
          "flex items-center justify-between rounded-xl px-4 py-3",
          "text-[14px] font-medium transition-colors",
          "outline-none focus-visible:ring-2 focus-visible:ring-primary/25",
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

/* ─── Main Navbar ─────────────────────────────────────────────────────────────── */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <div className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <AnnouncementBar />

      {/* Main header */}
      <header
        className={cn(
          "relative w-full transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm"
            : "bg-background/80 backdrop-blur-md"
        )}
        role="banner"
      >
        {/*
         * Three-column layout:
         *   [logo, flex-none] | [pill nav, flex-1 centered] | [controls, flex-none]
         * Mobile collapses the pill nav; logo and controls remain visible.
         */}
        <nav
          className="mx-auto flex h-16 max-w-340 items-center px-5 min-[580px]:px-8"
          aria-label="Main navigation"
        >
          {/* ── Logo ──────────────────────────────────────────────────────────── */}
          <div className="flex-none">
            <NavLogo />
          </div>

          {/* ── Desktop pill nav (lg+) — centred in the remaining space ───────── */}
          <div className="hidden lg:flex flex-1 justify-center px-6">
            <DesktopPillNav links={NAV_LINKS} isActive={isActive} />
          </div>

          {/* ── Right controls ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 flex-none ml-auto lg:ml-0">
            <ThemeToggle />

            {/* Language / proficiency badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-muted px-3 py-2 text-sm font-medium text-muted-foreground">
              <Globe className="size-3.5" strokeWidth={1.75} />
              HSK‑6
            </div>

            {/* Primary CTA */}
            <Link
              href="/contact"
              className={cn(
                "hidden sm:inline-flex items-center gap-2 rounded-xl",
                "bg-primary px-4 py-2.5 text-[13.5px] font-medium text-primary-foreground",
                "transition-opacity hover:opacity-90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                "whitespace-nowrap"
              )}
            >
              <CalendarDays className="size-4" strokeWidth={1.75} />
              Book Consultation
            </Link>

            {/* Hamburger (mobile / tablet) */}
            <div className="lg:hidden">
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
                    className="rounded-xl hover:bg-muted"
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
                  className="w-[min(82vw,340px)] flex flex-col gap-0 p-0 bg-background"
                >
                  {/* Mobile header */}
                  <SheetHeader className="px-5 py-4 border-b border-border/40">
                    <div className="flex items-center justify-between">
                      <NavLogo onClick={closeMobileMenu} />
                      <SheetClose asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Close navigation menu"
                          className="rounded-xl bg-muted hover:bg-accent"
                        >
                          <X className="size-4" strokeWidth={1.75} />
                        </Button>
                      </SheetClose>
                    </div>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>

                  {/* Availability chip */}
                  <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                    <span className="text-[12px] font-medium text-primary">
                      Available for Q3 2026 engagements
                    </span>
                  </div>

                  {/* Nav links */}
                  <nav
                    className="flex flex-col gap-0.5 p-4 flex-1 overflow-y-auto"
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

                  {/* Mobile CTA */}
                  <div className="p-4 border-t border-border/40 space-y-2">
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex w-full items-center justify-center gap-2 rounded-xl",
                          "bg-primary px-4 py-3 text-[14px] font-medium text-primary-foreground",
                          "transition-opacity hover:opacity-90"
                        )}
                      >
                        <CalendarDays className="size-4" strokeWidth={1.75} />
                        Book Consultation
                      </Link>
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

        {/* Scroll progress */}
        <ScrollProgress />
      </header>
    </div>
  );
}
