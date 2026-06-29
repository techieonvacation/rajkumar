"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, CalendarDays, ChevronRight, ChevronDown, Globe } from "lucide-react";
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
      { label: "Market Entry Strategy", href: "/services/market-entry", description: "Enter India or China markets with confidence" },
      { label: "India-China Consulting", href: "/services/india-china-consulting", description: "End-to-end corridor advisory" },
      { label: "Chinese Interpretation", href: "/services/interpretation", description: "HSK-6 Mandarin for high-stakes meetings" },
      { label: "Business Delegations", href: "/services/delegations", description: "Curated government & industry programs" },
      { label: "Corporate Training", href: "/services/training", description: "Cross-cultural competency workshops" },
      { label: "Risk & Compliance", href: "/services/risk-compliance", description: "Due diligence and geopolitical risk" },
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
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    const stored = sessionStorage.getItem("rk-announce-dismissed");
    if (stored) setDismissed(true);
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
        <Link href="/contact" className="underline underline-offset-2 hover:opacity-90">
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
      className="group flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-primary/25 rounded-xl"
      aria-label="Rajesh Kumar — Home"
    >
      {/* RK monogram */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          "bg-primary text-primary-foreground",
          "font-heading text-[13px] font-semibold tracking-tight",
          "transition-opacity group-hover:opacity-90"
        )}
        aria-hidden="true"
      >
        RK
      </div>

      {/* Name + title */}
      <div className="flex flex-col leading-none">
        <span className="font-heading text-[15px] font-semibold tracking-tight text-foreground">
          Rajesh Kumar
        </span>
        <span className="text-[11px] font-light text-muted-foreground mt-0.5">
          India‑China Business Consultant
        </span>
      </div>
    </Link>
  );
}

/* ─── Desktop nav link (with optional dropdown) ──────────────────────────────── */

function DesktopNavLink({ label, href, active, children }: NavLink & { active: boolean }) {
  const [open, setOpen] = React.useState(false);
  const hasDropdown = children && children.length > 0;
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={hasDropdown ? openMenu : undefined}
      onMouseLeave={hasDropdown ? closeMenu : undefined}
    >
      <Link
        href={href}
        className={cn(
          "relative flex items-center gap-0.5 px-1 py-1 text-[13.5px] font-medium transition-colors",
          "outline-none focus-visible:ring-2 focus-visible:ring-primary/25 rounded-md",
          active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
        aria-current={active ? "page" : undefined}
      >
        {label}
        {hasDropdown && (
          <ChevronDown
            className={cn("size-3.5 transition-transform duration-200", open ? "rotate-180" : "")}
          />
        )}
        {/* Active underline */}
        {active && (
          <motion.span
            layoutId="nav-active-underline"
            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary"
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {hasDropdown && open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            className="absolute left-0 top-[calc(100%+8px)] z-50 w-72 rounded-2xl bg-popover p-1.5 shadow-xl"
          >
            {children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className="group flex flex-col rounded-xl px-3.5 py-2.5 transition-colors hover:bg-muted"
              >
                <span className="text-[13px] font-medium text-foreground group-hover:text-primary transition-colors">
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
  const hasChildren = children && children.length > 0;

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
            className={cn("size-4 transition-transform", expanded ? "rotate-180" : "")}
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
                    className="flex rounded-xl px-4 py-2 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
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

/* ─── Main Navbar ────────────────────────────────────────────────────────────── */

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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

      {/* Nav bar */}
      <header
        className={cn(
          "relative w-full transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-xl shadow-sm"
            : "bg-background/80 backdrop-blur-md"
        )}
        role="banner"
      >
        <nav
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <NavLogo />

          {/* Desktop links */}
          <div
            className="hidden items-center gap-0.5 lg:flex"
            role="list"
            aria-label="Site navigation links"
          >
            {NAV_LINKS.map((link) => (
              <div key={link.href} role="listitem">
                <DesktopNavLink {...link} active={isActive(link.href)} />
              </div>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Language badge */}
            <div className="hidden sm:flex items-center gap-1.5 rounded-xl bg-muted px-3 py-2 text-[12px] font-medium text-muted-foreground">
              <Globe className="size-3.5" strokeWidth={1.75} />
              HSK‑6
            </div>

            {/* CTA */}
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

            {/* Hamburger */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
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
                  {/* Mobile nav header */}
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

                  {/* Availability badge */}
                  <div className="mx-4 mt-3 flex items-center gap-2 rounded-xl bg-primary/10 px-4 py-2.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[12px] font-medium text-primary">
                      Available for Q3 2026
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

                  {/* CTA */}
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

        {/* Scroll progress bar */}
        <ScrollProgress />
      </header>
    </div>
  );
}
