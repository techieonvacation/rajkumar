"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  LayoutDashboard,
  Star,
  Compass,
  Briefcase,
  FileText,
  MessageSquare,
  LogOut,
  ChevronLeft,
  Menu,
  Shield,
  ExternalLink,
  Bell,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/* ─── Nav items ──────────────────────────────────────────────────────────────── */

const NAV_GROUPS: Array<{
  label: string;
  items: Array<{ label: string; href: string; icon: React.ElementType }>;
}> = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Hero", href: "/admin/hero", icon: Star },
      { label: "Navigation", href: "/admin/navigation", icon: Compass },
      { label: "Services", href: "/admin/services", icon: Briefcase },
      { label: "Blog", href: "/admin/blog", icon: FileText },
    ],
  },
  {
    label: "Inbox",
    items: [
      { label: "Contacts", href: "/admin/contacts", icon: MessageSquare },
    ],
  },
];

// Flat list for page-title lookup
const NAV_ITEMS_FLAT = NAV_GROUPS.flatMap((g) => g.items);

/* ─── Sidebar nav link ───────────────────────────────────────────────────────── */

function NavLink({
  item,
  collapsed,
  onClick,
}: {
  item: { label: string; href: string; icon: React.ElementType };
  collapsed: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-150",
        collapsed ? "justify-center px-2" : "",
        isActive
          ? "bg-sidebar-primary/15 text-sidebar-primary"
          : "text-sidebar-foreground/50 hover:bg-white/5 hover:text-sidebar-foreground/90"
      )}
      title={collapsed ? item.label : undefined}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-sidebar-primary" />
      )}
      <item.icon
        className={cn(
          "shrink-0 transition-colors",
          collapsed ? "h-5 w-5" : "h-4 w-4",
          isActive ? "text-sidebar-primary" : "text-sidebar-foreground/40 group-hover:text-sidebar-foreground/70"
        )}
      />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  );
}

/* ─── Sidebar content ────────────────────────────────────────────────────────── */

function SidebarContent({
  collapsed,
  onNavClick,
}: {
  collapsed: boolean;
  onNavClick?: () => void;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    toast.loading("Signing out…");
    await signOut({ redirect: false });
    toast.dismiss();
    toast.success("Signed out");
    router.push("/admin/login");
  };

  return (
    <div className="flex h-full flex-col bg-sidebar">

      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-sidebar-border px-4 py-5",
          collapsed ? "justify-center px-2" : ""
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary/20">
          <Shield className="h-5 w-5 text-sidebar-primary" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">
              RK Admin
            </p>
            <p className="text-xs text-sidebar-foreground/30 truncate">
              Executive CMS
            </p>
          </div>
        )}
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            {!collapsed && (
              <p className="mb-1.5 px-3 text-[10px] uppercase tracking-widest text-sidebar-foreground/25 font-semibold">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  collapsed={collapsed}
                  onClick={onNavClick}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* View site link */}
      {!collapsed && (
        <div className="border-t border-sidebar-border px-3 py-3">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-sidebar-foreground/40 transition-colors hover:bg-white/5 hover:text-sidebar-foreground/70"
          >
            <ExternalLink className="h-3.5 w-3.5 shrink-0" />
            View live site
          </Link>
        </div>
      )}

      {/* Logout */}
      <div className="border-t border-sidebar-border p-3">
        <button
          onClick={handleLogout}
          className={cn(
            "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-sidebar-foreground/40 transition-all hover:bg-red-500/10 hover:text-red-400",
            collapsed ? "justify-center" : ""
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className={cn("shrink-0", collapsed ? "h-5 w-5" : "h-4 w-4")} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

/* ─── Admin shell ────────────────────────────────────────────────────────────── */

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Derive page title
  const pageTitle = (() => {
    const found = NAV_ITEMS_FLAT.find((n) => n.href === pathname);
    if (found) return found.label;
    const segment = pathname.split("/").filter(Boolean)[1] ?? "dashboard";
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  })();

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const userInitial = (session?.user?.name?.[0] ?? "A").toUpperCase();

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside
        className={cn(
          "hidden md:flex flex-col shrink-0 transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <SidebarContent collapsed={collapsed} />
      </aside>

      {/* ── Right panel ─────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Top bar */}
        <header className="flex h-14 shrink-0 items-center justify-between bg-card px-4 gap-3 border-b border-sidebar-border/30">
          <div className="flex items-center gap-3">

            {/* Mobile hamburger */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex md:hidden items-center justify-center h-8 w-8 rounded-lg hover:bg-muted transition-colors"
                  aria-label="Open sidebar menu"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-60 p-0"
              >
                <SidebarContent
                  collapsed={false}
                  onNavClick={() => setMobileOpen(false)}
                />
              </SheetContent>
            </Sheet>

            {/* Desktop collapse toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex items-center justify-center h-8 w-8 rounded-lg hover:bg-muted transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  collapsed ? "rotate-180" : ""
                )}
              />
            </button>

            <h1 className="text-sm font-semibold text-foreground">{pageTitle}</h1>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* User info */}
            <div className="flex items-center gap-2.5">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-medium text-foreground leading-tight">
                  {session?.user?.name ?? "Admin"}
                </p>
                <p className="text-xs text-muted-foreground leading-tight">
                  {session?.user?.email ?? "admin@site.com"}
                </p>
              </div>
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-5 min-[580px]:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ─── Export ─────────────────────────────────────────────────────────────────── */

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminShell>{children}</AdminShell>
    </SessionProvider>
  );
}
