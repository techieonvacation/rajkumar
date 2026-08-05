"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getHero, getStats, updateHero } from "@/lib/actions/home";
import { heroSchema, type HeroFormValues } from "@/lib/validators/home";
import { StatsManager } from "@/components/admin/hero/stats-manager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { heroPinstripeClass } from "@/lib/layout-classes";
import { cn } from "@/lib/utils";
import { Save, Plus, Trash2, ExternalLink, Star, LayoutTemplate } from "lucide-react";

type Stat = Awaited<ReturnType<typeof getStats>>[number];

function AdminPanel({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/80 bg-card shadow-sm",
        className
      )}
    >
      <header className="border-b border-border/60 px-5 py-4 min-[580px]:px-6">
        <h2 className="font-heading text-sm font-semibold text-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </header>
      <div className="space-y-4 p-5 min-[580px]:p-6">{children}</div>
    </section>
  );
}

export default function HeroAdminPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stat[]>([]);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<HeroFormValues>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      badge: "",
      headline: "",
      highlight: "",
      headlineSuffix: "",
      tagline: "",
      subheadline: "",
      cta1Label: "",
      cta1Url: "",
      cta2Label: "",
      cta2Url: "",
      socialProof: "",
      marqueeItems: [],
      published: true,
    },
  });

  const marquee = useFieldArray({ control, name: "marqueeItems" });

  useEffect(() => {
    Promise.all([getHero(), getStats()]).then(([hero, statsData]) => {
      reset({
        badge: hero.badge,
        headline: hero.headline,
        highlight: hero.highlight,
        headlineSuffix: hero.headlineSuffix,
        tagline: hero.tagline,
        subheadline: hero.subheadline,
        cta1Label: hero.cta1Label,
        cta1Url: hero.cta1Url,
        cta2Label: hero.cta2Label,
        cta2Url: hero.cta2Url,
        socialProof: hero.socialProof,
        marqueeItems: (hero.marqueeItems ?? []).map((value) => ({ value })),
        published: hero.published,
      });
      setStats(statsData);
      setLoading(false);
    });
  }, [reset]);

  const onSubmit = (data: HeroFormValues) => {
    startTransition(async () => {
      try {
        await updateHero({
          badge: data.badge,
          headline: data.headline,
          highlight: data.highlight,
          headlineSuffix: data.headlineSuffix,
          tagline: data.tagline,
          subheadline: data.subheadline,
          cta1Label: data.cta1Label,
          cta1Url: data.cta1Url,
          cta2Label: data.cta2Label,
          cta2Url: data.cta2Url,
          socialProof: data.socialProof,
          marqueeItems: data.marqueeItems.map((m) => m.value).filter(Boolean),
          published: data.published,
        });
        reset(data);
        toast.success("Hero saved");
      } catch {
        toast.error("Failed to save hero");
      }
    });
  };

  const badge = watch("badge");
  const headline = watch("headline");
  const highlight = watch("highlight");
  const headlineSuffix = watch("headlineSuffix");
  const subheadline = watch("subheadline");
  const tagline = watch("tagline");
  const cta1Label = watch("cta1Label");
  const cta2Label = watch("cta2Label");
  const socialProof = watch("socialProof");
  const marqueePreview = watch("marqueeItems");

  const descriptionPreview =
    subheadline?.trim() || tagline?.trim() || "";

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <div className="h-10 w-56 animate-pulse rounded-xl bg-muted" />
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        <div className="h-96 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-4 min-[580px]:flex-row min-[580px]:items-center min-[580px]:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-semibold text-foreground">
                Homepage hero
              </h1>
              <p className="text-sm text-muted-foreground">
                Centered hero, stats row, and marquee — header lives under Navigation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild className="border-border">
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" />
                View live
              </Link>
            </Button>
            <Button type="submit" disabled={isPending || !isDirty}>
              <Save className="mr-1.5 h-4 w-4" />
              {isPending ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>

        <AdminPanel
          title="Live preview"
          description="Approximate layout of the published homepage hero"
        >
          <div
            className={cn(
              "overflow-hidden rounded-xl border border-border/70",
              heroPinstripeClass
            )}
          >
            <div className="bg-background/95 px-4 py-8 text-center min-[580px]:px-8">
              {badge && (
                <p className="text-sm font-semibold text-foreground">{badge}</p>
              )}
              <p className="mt-3 font-heading text-2xl font-bold leading-tight tracking-tight min-[580px]:text-3xl">
                {headline || "Headline"}{" "}
                {highlight && (
                  <span className="text-primary">{highlight}</span>
                )}
                {headlineSuffix && (
                  <span className="text-foreground"> {headlineSuffix}</span>
                )}
              </p>
              {descriptionPreview && (
                <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {descriptionPreview}
                </p>
              )}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {cta1Label && (
                  <span className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                    {cta1Label}
                  </span>
                )}
                {cta2Label && (
                  <span className="text-xs font-semibold text-foreground">
                    {cta2Label}
                  </span>
                )}
              </div>
              {socialProof && (
                <p className="mt-4 text-xs text-muted-foreground/80">
                  {socialProof}
                </p>
              )}
            </div>
            <div className="flex gap-6 overflow-hidden bg-primary px-4 py-3">
              {(marqueePreview?.length
                ? marqueePreview.map((m) => m.value).filter(Boolean)
                : ["Marquee phrase"]
              )
                .slice(0, 3)
                .map((label, i) => (
                  <span
                    key={`${label}-${i}`}
                    className="shrink-0 text-xs font-semibold uppercase tracking-wide text-primary-foreground"
                  >
                    {label}
                  </span>
                ))}
            </div>
          </div>
        </AdminPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Headline & copy"
            description="Greeting, title parts, and body text beneath the headline"
          >
            <div className="space-y-1.5">
              <Label htmlFor="badge">Greeting</Label>
              <Input id="badge" {...register("badge")} placeholder="Hey There!" />
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-3">
              <div className="space-y-1.5 min-[580px]:col-span-1">
                <Label htmlFor="headline">Title *</Label>
                <Input id="headline" {...register("headline")} placeholder="Bridging" />
                {errors.headline && (
                  <p className="text-xs text-destructive">{errors.headline.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="highlight">Highlight (primary color)</Label>
                <Input id="highlight" {...register("highlight")} placeholder="India & China" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="headlineSuffix">Title suffix</Label>
                <Input
                  id="headlineSuffix"
                  {...register("headlineSuffix")}
                  placeholder="for Global Growth"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subheadline">Description</Label>
              <Textarea
                id="subheadline"
                rows={4}
                {...register("subheadline")}
                placeholder="Partner-level consulting…"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tagline">Fallback description</Label>
              <Input
                id="tagline"
                {...register("tagline")}
                placeholder="Shown only if description above is empty"
              />
            </div>
          </AdminPanel>

          <div className="space-y-6">
            <AdminPanel title="Calls to action" description="Primary button and secondary play-style link">
              <div className="grid gap-4 min-[580px]:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Primary label</Label>
                  <Input {...register("cta1Label")} placeholder="Book a Call" />
                </div>
                <div className="space-y-1.5">
                  <Label>Primary URL</Label>
                  <Input {...register("cta1Url")} placeholder="/contact" />
                </div>
                <div className="space-y-1.5">
                  <Label>Secondary label</Label>
                  <Input {...register("cta2Label")} placeholder="Explore Services" />
                </div>
                <div className="space-y-1.5">
                  <Label>Secondary URL</Label>
                  <Input {...register("cta2Url")} placeholder="/services" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="socialProof">Social proof line</Label>
                <Input
                  id="socialProof"
                  {...register("socialProof")}
                  placeholder="Trusted by…"
                />
              </div>
            </AdminPanel>

            <AdminPanel
              title="Marquee strip"
              description="Scrolling phrases on the primary-red band below the hero"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs text-muted-foreground">
                  Leave empty to use the default phrases on the site.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0 border-border"
                  onClick={() => marquee.append({ value: "" })}
                >
                  <Plus className="mr-1 h-3.5 w-3.5" />
                  Add phrase
                </Button>
              </div>
              {marquee.fields.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border/80 bg-background px-4 py-6 text-center text-xs text-muted-foreground">
                  No custom phrases — defaults will show on the homepage.
                </p>
              ) : (
                marquee.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`marqueeItems.${index}.value`)}
                      placeholder="THE BEST SOLUTION"
                      className="uppercase"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 shrink-0 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => marquee.remove(index)}
                      aria-label="Remove phrase"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </AdminPanel>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-border/80 bg-card px-5 py-4 shadow-sm">
          <div className="flex items-center gap-3">
            <LayoutTemplate className="h-5 w-5 text-muted-foreground" />
            <div>
              <Label htmlFor="published" className="text-foreground">
                Published
              </Label>
              <p className="text-xs text-muted-foreground">
                When off, the hero and custom marquee are hidden on the homepage
              </p>
            </div>
          </div>
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>
      </form>

      <div className="mt-8">
        <StatsManager initial={stats} />
      </div>
    </div>
  );
}
