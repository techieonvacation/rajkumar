"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ensureNavigationSeeded,
  getAdminNavigationBundle,
  updateNavigationSettings,
} from "@/lib/actions/navigation";
import {
  navigationSettingsSchema,
  type NavigationSettingsFormValues,
} from "@/lib/validators/navigation";
import { NavItemsManager } from "@/components/admin/navigation/nav-items-manager";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Compass, ExternalLink, Save, Sparkles } from "lucide-react";
import type { NavItemRow } from "@/lib/navigation-types";

function AdminPanel({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card shadow-sm">
      <header className="border-b border-border/60 px-5 py-4 min-[580px]:px-6">
        <h2 className="font-heading text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p>
        )}
      </header>
      <div className="space-y-4 p-5 min-[580px]:p-6">{children}</div>
    </section>
  );
}

export default function NavigationAdminPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<NavItemRow[]>([]);
  const [isPending, startTransition] = useTransition();
  const [importPending, setImportPending] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<NavigationSettingsFormValues>({
    resolver: zodResolver(navigationSettingsSchema),
    defaultValues: {
      brandName: "",
      brandTag: "",
      avatar: "",
      announcementEnabled: true,
      announcementText: "",
      announcementLinkLabel: "",
      announcementLinkHref: "/contact",
      announcementMobileText: "",
      ctaLabel: "",
      ctaHref: "/contact",
      mobileBadgeText: "",
      mobileFooterNote: "",
      useCmsNav: true,
    },
  });

  const load = async () => {
    const { settings, items: navItems } = await getAdminNavigationBundle();
    reset({
      brandName: settings.brandName,
      brandTag: settings.brandTag,
      avatar: settings.avatar,
      announcementEnabled: settings.announcementEnabled,
      announcementText: settings.announcementText,
      announcementLinkLabel: settings.announcementLinkLabel,
      announcementLinkHref: settings.announcementLinkHref,
      announcementMobileText: settings.announcementMobileText,
      ctaLabel: settings.ctaLabel,
      ctaHref: settings.ctaHref,
      mobileBadgeText: settings.mobileBadgeText,
      mobileFooterNote: settings.mobileFooterNote,
      useCmsNav: settings.useCmsNav,
    });
    setItems(navItems);
    setLoading(false);
  };

  useEffect(() => {
    load().catch(() => {
      toast.error("Failed to load navigation");
      setLoading(false);
    });
  }, []);

  const onSubmit = (data: NavigationSettingsFormValues) => {
    startTransition(async () => {
      try {
        await updateNavigationSettings(data);
        reset(data);
        toast.success("Navigation settings saved");
      } catch {
        toast.error("Failed to save settings");
      }
    });
  };

  const importDefaults = () => {
    setImportPending(true);
    startTransition(async () => {
      try {
        const result = await ensureNavigationSeeded();
        await load();
        toast.success(
          result.seeded
            ? "Default menu imported"
            : "Menu already exists — no changes made"
        );
      } catch {
        toast.error("Failed to import default menu");
      } finally {
        setImportPending(false);
      }
    });
  };

  const brandName = watch("brandName");
  const announcementEnabled = watch("announcementEnabled");
  const announcementText = watch("announcementText");
  const ctaLabel = watch("ctaLabel");

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="h-10 w-56 animate-pulse rounded-xl bg-muted" />
        <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-col gap-4 min-[580px]:flex-row min-[580px]:items-center min-[580px]:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-semibold text-foreground">
              Navigation
            </h1>
            <p className="text-sm text-muted-foreground">
              Header bar, announcement, menu links, and mobile drawer
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {items.length === 0 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-border"
              disabled={importPending || isPending}
              onClick={importDefaults}
            >
              <Sparkles className="mr-1.5 h-4 w-4" />
              Import default menu
            </Button>
          )}
          <Button variant="outline" size="sm" asChild className="border-border">
            <Link href="/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-4 w-4" />
              View live
            </Link>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <AdminPanel
          title="Preview"
          description="Quick read of brand and announcement styling"
        >
          <div className="overflow-hidden rounded-xl border border-border/70">
            {announcementEnabled && (
              <div className="bg-primary px-4 py-2 text-center text-primary-foreground">
                <p className="text-[12px] font-medium">
                  {announcementText || "Announcement text"}{" "}
                  <span className="underline underline-offset-2">Link</span>
                </p>
              </div>
            )}
            <div className="flex items-center justify-between bg-background px-4 py-3">
              <span className="font-heading text-base font-bold text-foreground">
                {brandName || "Brand name"}
              </span>
              <span className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground">
                {ctaLabel || "CTA"}
              </span>
            </div>
          </div>
        </AdminPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel title="Brand" description="Wordmark in the header and mobile drawer">
            <Controller
              name="avatar"
              control={control}
              render={({ field }) => (
                <ImageUpload
                  value={field.value}
                  onChange={field.onChange}
                  subfolder="navigation"
                  label="Portrait (optional, for future use)"
                  aspect="1 / 1"
                />
              )}
            />
            <div className="space-y-1.5">
              <Label htmlFor="brandName">Display name *</Label>
              <Input id="brandName" {...register("brandName")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brandTag">Role tag</Label>
              <Input id="brandTag" {...register("brandTag")} placeholder="India-China Consultant" />
            </div>
          </AdminPanel>

          <AdminPanel title="Header CTA" description="Primary button on desktop and mobile">
            <div className="space-y-1.5">
              <Label htmlFor="ctaLabel">Button label</Label>
              <Input id="ctaLabel" {...register("ctaLabel")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ctaHref">Button URL</Label>
              <Input id="ctaHref" {...register("ctaHref")} placeholder="/contact" />
            </div>
          </AdminPanel>
        </div>

        <AdminPanel
          title="Announcement bar"
          description="Primary-red strip above the navigation pill"
        >
          <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 px-4 py-3">
            <Label htmlFor="announcementEnabled">Show announcement</Label>
            <Controller
              name="announcementEnabled"
              control={control}
              render={({ field }) => (
                <Switch
                  id="announcementEnabled"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="announcementText">Desktop text (before link)</Label>
            <Input id="announcementText" {...register("announcementText")} />
          </div>
          <div className="grid gap-4 min-[580px]:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="announcementLinkLabel">Link label</Label>
              <Input id="announcementLinkLabel" {...register("announcementLinkLabel")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="announcementLinkHref">Link URL</Label>
              <Input id="announcementLinkHref" {...register("announcementLinkHref")} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="announcementMobileText">Mobile drawer banner</Label>
            <Input id="announcementMobileText" {...register("announcementMobileText")} />
          </div>
        </AdminPanel>

        <AdminPanel title="Mobile drawer footer" description="Badge row and note above the CTA">
          <div className="grid gap-4 min-[580px]:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="mobileBadgeText">Badge text</Label>
              <Input id="mobileBadgeText" {...register("mobileBadgeText")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mobileFooterNote">Footer note</Label>
              <Input id="mobileFooterNote" {...register("mobileFooterNote")} />
            </div>
          </div>
        </AdminPanel>

        <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card px-5 py-4 shadow-sm">
          <div>
            <Label htmlFor="useCmsNav" className="text-foreground">
              Use CMS menu links
            </Label>
            <p className="text-xs text-muted-foreground">
              When off, the built-in default menu is shown (settings above still apply)
            </p>
          </div>
          <Controller
            name="useCmsNav"
            control={control}
            render={({ field }) => (
              <Switch id="useCmsNav" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isPending || !isDirty}>
            <Save className="mr-1.5 h-4 w-4" />
            {isPending ? "Saving…" : "Save settings"}
          </Button>
        </div>
      </form>

      <NavItemsManager initial={items} onChange={setItems} />
    </div>
  );
}
