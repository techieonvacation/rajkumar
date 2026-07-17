"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getHero, getStats, updateHero } from "@/lib/actions/home";
import { heroSchema, type HeroFormValues, type FloatCard } from "@/lib/validators/home";
import { StatsManager } from "@/components/admin/hero/stats-manager";
import { ImageUpload } from "@/components/admin/image-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Plus, Trash2, ExternalLink, Star } from "lucide-react";

type Stat = Awaited<ReturnType<typeof getStats>>[number];

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
      bullets: [],
      cta1Label: "",
      cta1Url: "",
      cta2Label: "",
      cta2Url: "",
      socialProof: "",
      image: "",
      imageName: "",
      imageRole: "",
      floatCards: [],
      published: true,
    },
  });

  const bullets = useFieldArray({ control, name: "bullets" });
  const cards = useFieldArray({ control, name: "floatCards" });

  useEffect(() => {
    Promise.all([getHero(), getStats()]).then(([hero, statsData]) => {
      reset({
        badge: hero.badge,
        headline: hero.headline,
        highlight: hero.highlight,
        headlineSuffix: hero.headlineSuffix,
        tagline: hero.tagline,
        subheadline: hero.subheadline,
        bullets: hero.bullets.map((value) => ({ value })),
        cta1Label: hero.cta1Label,
        cta1Url: hero.cta1Url,
        cta2Label: hero.cta2Label,
        cta2Url: hero.cta2Url,
        socialProof: hero.socialProof,
        image: hero.image,
        imageName: hero.imageName,
        imageRole: hero.imageRole,
        floatCards: (hero.floatCards as unknown as FloatCard[]) ?? [],
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
          ...data,
          bullets: data.bullets.map((b) => b.value).filter(Boolean),
          floatCards: data.floatCards,
        });
        reset(data);
        toast.success("Hero saved");
      } catch {
        toast.error("Failed to save hero");
      }
    });
  };

  const headline = watch("headline");
  const highlight = watch("highlight");
  const headlineSuffix = watch("headlineSuffix");
  const badge = watch("badge");
  const tagline = watch("tagline");

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-muted" />
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="h-96 animate-pulse rounded-2xl bg-muted" />
          <div className="h-96 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-semibold">Hero section</h1>
              <p className="text-sm text-muted-foreground">
                Matches the live homepage hero layout
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" />
                <span className="hidden sm:inline">View live</span>
              </Link>
            </Button>
            <Button type="submit" disabled={isPending || !isDirty}>
              <Save className="mr-1.5 h-4 w-4" />
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 min-[580px]:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Left — portrait
              </p>
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    subfolder="hero"
                    label=""
                    aspect="3 / 4"
                  />
                )}
              />
              <div className="space-y-1.5">
                <Label htmlFor="imageName">Portrait alt text</Label>
                <Input id="imageName" {...register("imageName")} placeholder="Rajesh Kumar" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-semibold">Floating cards</h2>
                    <p className="text-xs text-muted-foreground">Max 3 on the portrait</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => cards.append({ icon: "", title: "", subtitle: "" })}
                    disabled={cards.fields.length >= 3}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5" /> Add
                  </Button>
                </div>
                {cards.fields.map((field, index) => (
                  <div key={field.id} className="grid gap-2 rounded-xl bg-background p-3 min-[580px]:grid-cols-[56px_1fr_1fr_auto]">
                    <Input {...register(`floatCards.${index}.icon`)} placeholder="🌏" aria-label="Icon" />
                    <Input {...register(`floatCards.${index}.title`)} placeholder="Title" />
                    <Input {...register(`floatCards.${index}.subtitle`)} placeholder="Subtitle" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 text-destructive"
                      onClick={() => cards.remove(index)}
                      aria-label="Remove card"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 min-[580px]:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Navbar (uses hero data)
              </p>
              <div className="space-y-1.5">
                <Label htmlFor="imageRole">Navbar tag</Label>
                <Input id="imageRole" {...register("imageRole")} placeholder="India-China Consultant" />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 min-[580px]:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                Right — content
              </p>
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
                  <Label htmlFor="highlight">Highlight</Label>
                  <Input id="highlight" {...register("highlight")} placeholder="India & China" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="headlineSuffix">Title suffix</Label>
                  <Input id="headlineSuffix" {...register("headlineSuffix")} placeholder="for Global Growth" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tagline">Accent tagline</Label>
                <Input id="tagline" {...register("tagline")} placeholder="India-China Business Consultant" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="subheadline">Description</Label>
                <Textarea id="subheadline" rows={4} {...register("subheadline")} />
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-5 min-[580px]:p-6">
              <div className="flex items-center justify-between">
                <Label>Highlight bullets</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => bullets.append({ value: "" })}>
                  <Plus className="mr-1 h-3.5 w-3.5" /> Add
                </Button>
              </div>
              {bullets.fields.map((field, index) => (
                <div key={field.id} className="flex gap-2">
                  <Input {...register(`bullets.${index}.value`)} placeholder={`Bullet ${index + 1}`} />
                  <Button type="button" variant="ghost" size="sm" className="h-9 w-9 shrink-0 p-0 text-destructive" onClick={() => bullets.remove(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5 min-[580px]:p-6">
              <Label>Buttons</Label>
              <div className="grid gap-4 min-[580px]:grid-cols-2">
                <Input {...register("cta1Label")} placeholder="Primary label" />
                <Input {...register("cta1Url")} placeholder="Primary URL" />
                <Input {...register("cta2Label")} placeholder="Secondary label" />
                <Input {...register("cta2Url")} placeholder="Secondary URL" />
              </div>
              <Input {...register("socialProof")} placeholder="Social proof line" />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-5 py-4">
              <div>
                <Label htmlFor="published">Published</Label>
                <p className="text-xs text-muted-foreground">Show hero on homepage</p>
              </div>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-5">
              <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Preview
              </p>
              <div className="rounded-xl bg-background p-4">
                {badge && <p className="text-sm font-semibold">{badge}</p>}
                <p className="mt-2 font-heading text-xl font-semibold">
                  {headline || "Title"}{" "}
                  {highlight && <span className="text-primary">{highlight}</span>}
                  {headlineSuffix && <> {headlineSuffix}</>}
                </p>
                {tagline && <p className="mt-2 text-sm text-primary">{tagline}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="mt-8">
        <StatsManager initial={stats} />
      </div>
    </div>
  );
}
