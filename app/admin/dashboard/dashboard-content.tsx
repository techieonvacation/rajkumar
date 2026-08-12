"use client";

import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  FileText,
  Briefcase,
  FolderKanban,
  TrendingUp,
  Clock,
  ArrowUpRight,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ─── Monthly contact data ───────────────────────────────────────────────────── */

const MONTHLY_CONTACTS = [
  { month: "Jan", contacts: 4 },
  { month: "Feb", contacts: 7 },
  { month: "Mar", contacts: 5 },
  { month: "Apr", contacts: 12 },
  { month: "May", contacts: 9 },
  { month: "Jun", contacts: 15 },
  { month: "Jul", contacts: 11 },
  { month: "Aug", contacts: 8 },
  { month: "Sep", contacts: 14 },
  { month: "Oct", contacts: 18 },
  { month: "Nov", contacts: 13 },
  { month: "Dec", contacts: 10 },
];

/* ─── Status color map ───────────────────────────────────────────────────────── */

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  read: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  replied: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  archived: "bg-muted text-muted-foreground",
};

/* ─── Types ──────────────────────────────────────────────────────────────────── */

interface DashboardContentProps {
  stats: {
    contacts: number;
    blogPosts: number;
    homeServices: number;
    homeWorks: number;
  };
  recentContacts: Array<{
    id: string;
    name: string;
    email: string;
    status: string;
    service?: string;
  }>;
  recentPosts: Array<{
    id: string;
    title: string;
    published: boolean;
    category?: string;
    views?: number;
  }>;
  activityLogs: Array<{
    id: string;
    action: string;
    details?: string;
    createdAt: Date;
  }>;
}

/* ─── Stat card ──────────────────────────────────────────────────────────────── */

interface StatCard {
  label: string;
  value: number;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  href: string;
  trend?: string;
}

function StatCardItem({ card }: { card: StatCard }) {
  return (
    <Link
      href={card.href}
      className="group flex flex-col gap-4 rounded-2xl bg-card p-5 transition-colors hover:bg-muted/50"
    >
      <div className="flex items-start justify-between">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconBg}`}>
          <card.icon className={`h-5 w-5 ${card.iconColor}`} />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground" />
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {card.label}
        </p>
        <p className="mt-1 font-heading text-3xl font-semibold tabular-nums text-foreground">
          {card.value}
        </p>
        {card.trend && (
          <p className="mt-1 text-[11px] text-muted-foreground/60">{card.trend}</p>
        )}
      </div>
    </Link>
  );
}

/* ─── Dashboard ──────────────────────────────────────────────────────────────── */

export function DashboardContent({
  stats,
  recentContacts,
  recentPosts,
  activityLogs,
}: DashboardContentProps) {
  const statCards: StatCard[] = [
    {
      label: "Total Contacts",
      value: stats.contacts,
      icon: MessageSquare,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      href: "/admin/contacts",
      trend: "All enquiries",
    },
    {
      label: "Blog Posts",
      value: stats.blogPosts,
      icon: FileText,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      href: "/admin/blog",
      trend: "Published & drafts",
    },
    {
      label: "Homepage Services",
      value: stats.homeServices,
      icon: Briefcase,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      href: "/admin/home/services",
      trend: "Service rows",
    },
    {
      label: "Homepage Works",
      value: stats.homeWorks,
      icon: FolderKanban,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
      href: "/admin/home/works",
      trend: "Portfolio slides",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div>
        <h1 className="font-heading text-xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your portfolio CMS
        </p>
      </div>

      {/* Stat cards — no borders */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCardItem key={card.label} card={card} />
        ))}
      </div>

      {/* Chart + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Contact chart */}
        <div className="lg:col-span-2 rounded-2xl bg-card p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Contact Requests
              </h2>
              <p className="text-[11px] text-muted-foreground">This year</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_CONTACTS} barSize={18}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(0.5 0 0 / 0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-card)",
                  border: "1px solid oklch(0.5 0 0 / 0.1)",
                  borderRadius: "12px",
                  fontSize: "12px",
                  boxShadow: "0 8px 24px oklch(0 0 0 / 0.12)",
                }}
                cursor={{ fill: "oklch(0.5 0 0 / 0.05)" }}
              />
              <Bar
                dataKey="contacts"
                fill="oklch(0.35 0.18 264)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity feed */}
        <div className="rounded-2xl bg-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-muted">
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Recent Activity
              </h2>
            </div>
          </div>
          {activityLogs.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          ) : (
            <div className="space-y-4">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex gap-3">
                  <div className="relative mt-1 flex shrink-0 flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <div className="mt-1 flex-1 w-px bg-border/40" />
                  </div>
                  <div className="pb-3">
                    <p className="text-xs font-medium text-foreground">
                      {log.action}
                    </p>
                    {log.details && (
                      <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                        {log.details}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-muted-foreground/50">
                      {formatDate(log.createdAt, {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent contacts + blog posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Recent Contacts */}
        <div className="rounded-2xl bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Messages
            </h2>
            <Link
              href="/admin/contacts"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:opacity-80 transition-opacity"
            >
              View all
              <TrendingUp className="h-3 w-3" />
            </Link>
          </div>
          {recentContacts.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8">
              <MessageSquare className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No contacts yet.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentContacts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
                      {c.name[0].toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {c.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {c.email}
                        {c.service ? ` · ${c.service}` : ""}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-medium ${
                      STATUS_COLORS[c.status] ?? ""
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Blog Posts */}
        <div className="rounded-2xl bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">
              Recent Posts
            </h2>
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-primary hover:opacity-80 transition-opacity"
            >
              View all
              <TrendingUp className="h-3 w-3" />
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8">
              <FileText className="h-8 w-8 text-muted-foreground/30" />
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/40"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {post.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {post.category}
                      {post.views != null ? ` · ${post.views.toLocaleString()} views` : ""}
                    </p>
                  </div>
                  <Badge
                    variant={post.published ? "default" : "secondary"}
                    className="shrink-0 text-[10.5px]"
                  >
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
