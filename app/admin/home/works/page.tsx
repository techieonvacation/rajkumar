"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FolderKanban } from "lucide-react";
import {
  createWorkItem,
  deleteWorkItem,
  getWorksSectionAdmin,
  reorderWorkItems,
  updateWorkItem,
  updateWorksSection,
} from "@/lib/actions/sections/works";
import {
  worksSectionSchema,
  type WorksSectionFormValues,
} from "@/lib/validators/sections";
import { AdminPanel } from "@/components/admin/section/admin-panel";
import { SectionHeader } from "@/components/admin/section/section-header";
import {
  ImageField,
  PublishToggle,
  RichTitleField,
} from "@/components/admin/section/fields";
import { ItemManager } from "@/components/admin/section/item-manager";
import { SectionSkeleton } from "@/components/admin/section/section-skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { WorksSectionData } from "@/lib/home/section-types";

export default function WorksSectionAdminPage() {
  const [data, setData] = useState<WorksSectionData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<WorksSectionFormValues>({
    resolver: zodResolver(worksSectionSchema),
  });

  useEffect(() => {
    getWorksSectionAdmin().then((result) => {
      const { section } = result;
      reset({
        bigText: section.bigText,
        tagline: section.tagline,
        title: section.title,
        circleText: section.circleText,
        circleRadius: section.circleRadius,
        circleUrl: section.circleUrl,
        circleIcon: section.circleIcon,
        shape1: section.shape1,
        shape2: section.shape2,
        autoplayDelay: section.autoplayDelay,
        loop: section.loop,
        spaceBetween: section.spaceBetween,
        slidesMobile: section.slidesMobile,
        slidesTablet: section.slidesTablet,
        slidesDesktop: section.slidesDesktop,
        slidesWide: section.slidesWide,
        lightbox: section.lightbox,
        published: section.published,
      });
      setData(result);
    });
  }, [reset]);

  const onSubmit = (values: WorksSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateWorksSection(values);
        reset(values);
        toast.success("Works section saved");
      } catch {
        toast.error("Failed to save the Works section");
      }
    });
  };

  if (!data) return <SectionSkeleton />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionHeader
          icon={FolderKanban}
          title="See Our Works"
          description="Portfolio carousel, watermark text and the rotating badge"
          previewHash="#works"
          isPending={isPending}
          isDirty={isDirty}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Heading"
            description="Watermark, tagline and the animated title"
          >
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bigText">Watermark text</Label>
                <Input
                  id="bigText"
                  {...register("bigText")}
                  placeholder="portfolio"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  {...register("tagline")}
                  placeholder="See Our Works"
                />
              </div>
            </div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <RichTitleField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  error={errors.title?.message}
                />
              )}
            />
          </AdminPanel>

          <AdminPanel
            title="Rotating badge"
            description="Circular text button beside the heading"
          >
            <div className="space-y-1.5">
              <Label htmlFor="circleText">Circular text</Label>
              <Input id="circleText" {...register("circleText")} />
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="circleRadius">Radius (px)</Label>
                <Input
                  id="circleRadius"
                  type="number"
                  step="0.1"
                  {...register("circleRadius", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="circleUrl">Link</Label>
                <Input
                  id="circleUrl"
                  {...register("circleUrl")}
                  placeholder="/projects"
                />
              </div>
            </div>
            <Controller
              name="circleIcon"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Badge icon"
                  folder="home/works"
                  aspect="1 / 1"
                />
              )}
            />
          </AdminPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Carousel behaviour"
            description="Autoplay, looping and how many cards show per breakpoint"
          >
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="autoplayDelay">Autoplay delay (ms)</Label>
                <Input
                  id="autoplayDelay"
                  type="number"
                  {...register("autoplayDelay", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="spaceBetween">Gap between cards (px)</Label>
                <Input
                  id="spaceBetween"
                  type="number"
                  {...register("spaceBetween", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="slidesMobile">Mobile</Label>
                <Input
                  id="slidesMobile"
                  type="number"
                  min={1}
                  {...register("slidesMobile", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slidesTablet">Tablet</Label>
                <Input
                  id="slidesTablet"
                  type="number"
                  min={1}
                  {...register("slidesTablet", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slidesDesktop">Desktop</Label>
                <Input
                  id="slidesDesktop"
                  type="number"
                  min={1}
                  {...register("slidesDesktop", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slidesWide">Wide</Label>
                <Input
                  id="slidesWide"
                  type="number"
                  min={1}
                  {...register("slidesWide", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3">
              <Label htmlFor="loop" className="cursor-pointer">
                Loop slides
              </Label>
              <Controller
                name="loop"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="loop"
                    checked={field.value ?? true}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-background px-4 py-3">
              <Label htmlFor="lightbox" className="cursor-pointer">
                Open images in a lightbox
              </Label>
              <Controller
                name="lightbox"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="lightbox"
                    checked={field.value ?? true}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </AdminPanel>

          <AdminPanel
            title="Decorative shapes"
            description="Large background artwork behind the carousel"
          >
            <Controller
              name="shape1"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Shape one"
                  folder="home/works"
                  aspect="923 / 1948"
                />
              )}
            />
            <Controller
              name="shape2"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Shape two"
                  folder="home/works"
                  aspect="1358 / 1948"
                />
              )}
            />
          </AdminPanel>
        </div>

        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <PublishToggle
              checked={field.value ?? true}
              onChange={field.onChange}
              description="When off, the entire Works section is hidden on the homepage"
            />
          )}
        />
      </form>

      <ItemManager
        title="Work"
        description="Slides in the portfolio carousel"
        addLabel="Add work"
        emptyText="No works yet — add the first project slide."
        items={data.items}
        blank={{
          image: "",
          title: "",
          text: "",
          year: "",
          url: "/projects",
          tags: [],
        }}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          { name: "text", label: "Summary", type: "textarea", rows: 2 },
          { name: "year", label: "Year", type: "text", half: true },
          { name: "url", label: "Link", type: "text", half: true },
          {
            name: "tags",
            label: "Tags",
            type: "list",
            rows: 3,
            hint: "One per line.",
          },
          {
            name: "image",
            label: "Image",
            type: "image",
            folder: "home/works",
            aspect: "460 / 350",
          },
        ]}
        getTitle={(item) => item.title}
        getMeta={(item) =>
          [item.year, item.tags.join(", ")].filter(Boolean).join(" · ")
        }
        getImage={(item) => item.image}
        onCreate={async (values) => {
          const { item } = await createWorkItem(
            values as Parameters<typeof createWorkItem>[0],
          );
          return item;
        }}
        onUpdate={async (id, values) => {
          const { item } = await updateWorkItem(id, values);
          return item;
        }}
        onDelete={async (id) => {
          await deleteWorkItem(id);
        }}
        onReorder={async (ids) => {
          await reorderWorkItems(ids);
        }}
      />
    </div>
  );
}
