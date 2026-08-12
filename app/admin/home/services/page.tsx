"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Briefcase } from "lucide-react";
import {
  createServiceCard,
  deleteServiceCard,
  getHomeServicesSectionAdmin,
  reorderServiceCards,
  updateHomeServicesSection,
  updateServiceCard,
} from "@/lib/actions/sections/services";
import {
  homeServicesSectionSchema,
  type HomeServicesSectionFormValues,
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
import type { ServicesSectionData } from "@/lib/home/section-types";

export default function HomeServicesSectionAdminPage() {
  const [data, setData] = useState<ServicesSectionData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<HomeServicesSectionFormValues>({
    resolver: zodResolver(homeServicesSectionSchema),
  });

  useEffect(() => {
    getHomeServicesSectionAdmin().then((result) => {
      const { section } = result;
      reset({
        tagline: section.tagline,
        title: section.title,
        titleImage: section.titleImage,
        circleText: section.circleText,
        circleRadius: section.circleRadius,
        circleUrl: section.circleUrl,
        circleIcon: section.circleIcon,
        published: section.published,
      });
      setData(result);
    });
  }, [reset]);

  const onSubmit = (values: HomeServicesSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateHomeServicesSection(values);
        reset(values);
        toast.success("Services section saved");
      } catch {
        toast.error("Failed to save the Services section");
      }
    });
  };

  if (!data) return <SectionSkeleton />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionHeader
          icon={Briefcase}
          title="Our Services"
          description="Service rows with hover imagery and the rotating badge"
          previewHash="#services"
          isPending={isPending}
          isDirty={isDirty}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Heading"
            description="Tagline, animated title and the small inline image inside it"
          >
            <div className="space-y-1.5">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                {...register("tagline")}
                placeholder="Our Services"
              />
            </div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <RichTitleField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  supportsImage
                  error={errors.title?.message}
                />
              )}
            />
            <Controller
              name="titleImage"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Inline title image"
                  hint="Rendered wherever {image} appears in the title"
                  folder="home/services"
                  aspect="120 / 40"
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
              <Input
                id="circleText"
                {...register("circleText")}
                placeholder=" View All Project • View All Services •"
              />
              <p className="text-xs text-muted-foreground">
                Characters are distributed evenly around the circle — keep the
                leading space for even spacing.
              </p>
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
                  placeholder="/services"
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
                  folder="home/services"
                  aspect="1 / 1"
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
              description="When off, the entire Services section is hidden on the homepage"
            />
          )}
        />
      </form>

      <ItemManager
        title="Service"
        description="Each row reveals its image on hover; features are laid out two per line"
        addLabel="Add service"
        emptyText="No services yet — add the first row."
        items={data.cards}
        blank={{ title: "", url: "/services", image: "", features: [] }}
        fields={[
          {
            name: "title",
            label: "Title",
            type: "textarea",
            rows: 2,
            required: true,
            hint: "Press Enter for a line break.",
          },
          { name: "url", label: "Link", type: "text", half: true },
          {
            name: "features",
            label: "Features",
            type: "list",
            rows: 6,
            hint: "One per line — rendered two per row.",
          },
          {
            name: "image",
            label: "Hover image",
            type: "image",
            folder: "home/services",
            aspect: "250 / 320",
          },
        ]}
        getTitle={(item) => item.title.split("\n").join(" ")}
        getMeta={(item) => `${item.features.length} features · ${item.url}`}
        getImage={(item) => item.image}
        onCreate={async (values) => {
          const { card } = await createServiceCard(
            values as Parameters<typeof createServiceCard>[0],
          );
          return card;
        }}
        onUpdate={async (id, values) => {
          const { card } = await updateServiceCard(id, values);
          return card;
        }}
        onDelete={async (id) => {
          await deleteServiceCard(id);
        }}
        onReorder={async (ids) => {
          await reorderServiceCards(ids);
        }}
      />
    </div>
  );
}
