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
import {
  Save,
  Plus,
  Trash2,
  ExternalLink,
  Star,
  GripVertical,
} from "lucide-react";

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

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 rounded-xl bg-muted animate-pulse" />
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 h-96 rounded-2xl bg-muted animate-pulse" />
          <div className="h-96 rounded-2xl bg-muted animate-pulse" />
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
            <h1 className="font-heading text-xl font-semibold">Hero Section</h1>
            <p className="text-sm text-muted-foreground">
              The first thing visitors see on the home page
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

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-4">
            <h2 className="font-heading text-base font-semibold">Content</h2>
            <div className="space-y-1.5">
              <Label htmlFor="badge">Eyebrow badge</Label>
              <Input id="badge" {...register("badge")} placeholder="India · China Business Consultant" />
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="headline">Headline *</Label>
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
                <Label htmlFor="headlineSuffix">Suffix line</Label>
                <Input id="headlineSuffix" {...register("headlineSuffix")} placeholder="for Global Growth" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="subheadline">Subheadline</Label>
              <Textarea id="subheadline" rows={3} {...register("subheadline")} placeholder="Partner-level consulting in market entry…" />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-base font-semibold">Highlight bullets</h2>
                <p className="text-xs text-muted-foreground">Short proof points beside the headline</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => bullets.append({ value: "" })}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add
              </Button>
            </div>
            {bullets.fields.length === 0 && (
              <p className="text-xs text-muted-foreground">No bullets added.</p>
            )}
            {bullets.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input {...register(`bullets.${index}.value`)} placeholder={`Bullet ${index + 1}`} />
                <Button type="button" variant="ghost" size="sm" className="h-9 w-9 shrink-0 p-0 text-red-500 hover:text-red-600" onClick={() => bullets.remove(index)} aria-label="Remove bullet">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-4">
            <h2 className="font-heading text-base font-semibold">Call to action</h2>
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="cta1Label">Primary label</Label>
                <Input id="cta1Label" {...register("cta1Label")} placeholder="Schedule Consultation" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta1Url">Primary URL</Label>
                <Input id="cta1Url" {...register("cta1Url")} placeholder="/contact" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta2Label">Secondary label</Label>
                <Input id="cta2Label" {...register("cta2Label")} placeholder="View Services" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cta2Url">Secondary URL</Label>
                <Input id="cta2Url" {...register("cta2Url")} placeholder="/services" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="socialProof">Social proof line</Label>
              <Input id="socialProof" {...register("socialProof")} placeholder="Trusted by Tata, Deloitte, FICCI…" />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-base font-semibold">Floating cards</h2>
                <p className="text-xs text-muted-foreground">Credential chips over the portrait (max 3 shown)</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => cards.append({ icon: "", title: "", subtitle: "" })} disabled={cards.fields.length >= 3}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add
              </Button>
            </div>
            {cards.fields.length === 0 && (
              <p className="text-xs text-muted-foreground">No cards added.</p>
            )}
            {cards.fields.map((field, index) => (
              <div key={field.id} className="flex items-start gap-2 rounded-xl bg-background p-3">
                <GripVertical className="mt-2.5 h-4 w-4 shrink-0 text-muted-foreground/40" />
                <div className="grid flex-1 gap-2 min-[580px]:grid-cols-[64px_1fr_1fr]">
                  <Input {...register(`floatCards.${index}.icon`)} placeholder="🌏" aria-label="Icon" />
                  <Input {...register(`floatCards.${index}.title`)} placeholder="Title" aria-label="Title" />
                  <Input {...register(`floatCards.${index}.subtitle`)} placeholder="Subtitle" aria-label="Subtitle" />
                </div>
                <Button type="button" variant="ghost" size="sm" className="h-9 w-9 shrink-0 p-0 text-red-500 hover:text-red-600" onClick={() => cards.remove(index)} aria-label="Remove card">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-4">
            <h2 className="font-heading text-base font-semibold">Portrait</h2>
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
              <Label htmlFor="imageName">Overlay name</Label>
              <Input id="imageName" {...register("imageName")} placeholder="Rajesh Kumar" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="imageRole">Overlay role</Label>
              <Input id="imageRole" {...register("imageRole")} placeholder="India-China Business Consultant" />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6 space-y-4">
            <h2 className="font-heading text-base font-semibold">Visibility</h2>
            <div className="flex items-center justify-between rounded-xl bg-background px-4 py-3">
              <div>
                <Label htmlFor="published" className="cursor-pointer">Published</Label>
                <p className="text-xs text-muted-foreground">Show this section publicly</p>
              </div>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 min-[580px]:p-6">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Preview
            </p>
            <div className="rounded-xl bg-background p-4">
              {badge && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">
                  <span className="h-1 w-1 rounded-full" style={{ background: "var(--accent-red)" }} />
                  {badge}
                </span>
              )}
              <p className="mt-2 font-heading text-xl font-semibold leading-tight tracking-tight text-foreground">
                {headline || "Headline"}{" "}
                {highlight && <span className="text-primary">{highlight}</span>}
                {headlineSuffix && <><br />{headlineSuffix}</>}
              </p>
            </div>
          </div>
        </div>
      </div>
      </form>

      <div className="mt-5">
        <StatsManager initial={stats} />
      </div>
    </div>
  );
}
