"use client";

import { useEffect, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  getServicesSection,
  updateServicesSection,
} from "@/lib/actions/services-section";
import {
  servicesSectionSchema,
  type ServicesSectionFormValues,
} from "@/lib/validators/services-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Save, Layers } from "lucide-react";

export function ServicesSectionSettings() {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<ServicesSectionFormValues>({
    resolver: zodResolver(servicesSectionSchema),
    defaultValues: {
      eyebrow: "What I Offer",
      title: "Consulting",
      titleAccent: "Services",
      description: "",
      viewAllLabel: "View full service catalogue",
      viewAllUrl: "/services",
      ctaLabel: "Discuss your requirements",
      ctaUrl: "/contact",
      published: true,
    },
  });

  useEffect(() => {
    getServicesSection().then((section) => {
      reset({
        eyebrow: section.eyebrow,
        title: section.title,
        titleAccent: section.titleAccent,
        description: section.description,
        viewAllLabel: section.viewAllLabel,
        viewAllUrl: section.viewAllUrl,
        ctaLabel: section.ctaLabel,
        ctaUrl: section.ctaUrl,
        published: section.published,
      });
    });
  }, [reset]);

  const title = watch("title");
  const titleAccent = watch("titleAccent");
  const eyebrow = watch("eyebrow");

  const onSubmit = (data: ServicesSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateServicesSection(data);
        reset(data);
        toast.success("Services section saved");
      } catch {
        toast.error("Failed to save services section");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-heading text-base font-semibold">Section content</h2>
            <p className="text-sm text-muted-foreground">
              Header copy and buttons for the home & services sections
            </p>
          </div>
        </div>
        <Button type="submit" disabled={isPending || !isDirty}>
          <Save className="mr-1.5 h-4 w-4" />
          {isPending ? "Saving…" : "Save section"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="space-y-4 rounded-2xl bg-card p-5 min-[580px]:p-6">
            <h3 className="font-heading text-sm font-semibold">Header</h3>
            <div className="space-y-1.5">
              <Label htmlFor="eyebrow">Eyebrow</Label>
              <Input id="eyebrow" {...register("eyebrow")} placeholder="What I Offer" />
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} placeholder="Consulting" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="titleAccent">Accent word</Label>
                <Input id="titleAccent" {...register("titleAccent")} placeholder="Services" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" rows={4} {...register("description")} />
            </div>
          </div>

          <div className="space-y-4 rounded-2xl bg-card p-5 min-[580px]:p-6">
            <h3 className="font-heading text-sm font-semibold">Buttons</h3>
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="viewAllLabel">View all label</Label>
                <Input id="viewAllLabel" {...register("viewAllLabel")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="viewAllUrl">View all URL</Label>
                <Input id="viewAllUrl" {...register("viewAllUrl")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaLabel">Primary CTA label</Label>
                <Input id="ctaLabel" {...register("ctaLabel")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaUrl">Primary CTA URL</Label>
                <Input id="ctaUrl" {...register("ctaUrl")} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-4 rounded-2xl bg-card p-5 min-[580px]:p-6">
            <h3 className="font-heading text-sm font-semibold">Visibility</h3>
            <div className="flex items-center justify-between rounded-xl bg-background px-4 py-3">
              <div>
                <Label htmlFor="published" className="cursor-pointer">Published</Label>
                <p className="text-xs text-muted-foreground">Show section on the site</p>
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

          <div className="rounded-2xl bg-card p-5 min-[580px]:p-6">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Preview
            </p>
            <div className="rounded-xl bg-background p-4 text-center">
              {eyebrow && (
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
                  {eyebrow}
                </span>
              )}
              <p className="mt-2 font-heading text-lg font-semibold text-foreground">
                {title || "Consulting"}{" "}
                <span className="text-primary">{titleAccent || "Services"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
