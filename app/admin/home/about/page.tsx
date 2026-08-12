"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Users } from "lucide-react";
import {
  createAboutClient,
  createAboutPoint,
  deleteAboutClient,
  deleteAboutPoint,
  getAboutSectionAdmin,
  reorderAboutClients,
  reorderAboutPoints,
  updateAboutClient,
  updateAboutPoint,
  updateAboutSection,
} from "@/lib/actions/sections/about";
import {
  aboutSectionSchema,
  type AboutSectionFormValues,
} from "@/lib/validators/sections";
import { AdminPanel } from "@/components/admin/section/admin-panel";
import { SectionHeader } from "@/components/admin/section/section-header";
import {
  IconSelect,
  ImageField,
  PublishToggle,
  RichTitleField,
} from "@/components/admin/section/fields";
import { ItemManager } from "@/components/admin/section/item-manager";
import { SectionSkeleton } from "@/components/admin/section/section-skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AboutSectionData } from "@/lib/home/section-types";

export default function AboutSectionAdminPage() {
  const [data, setData] = useState<AboutSectionData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<AboutSectionFormValues>({
    resolver: zodResolver(aboutSectionSchema),
  });

  useEffect(() => {
    getAboutSectionAdmin().then((result) => {
      const { section } = result;
      reset({
        tagline: section.tagline,
        title: section.title,
        text: section.text,
        image1: section.image1,
        image1Alt: section.image1Alt,
        image2: section.image2,
        image2Alt: section.image2Alt,
        shapeImage: section.shapeImage,
        clientsUrl: section.clientsUrl,
        clientsCount: section.clientsCount,
        clientsCountSuffix: section.clientsCountSuffix,
        clientsCountDuration: section.clientsCountDuration,
        clientsLabel: section.clientsLabel,
        pointsPerColumn: section.pointsPerColumn,
        pointIcon: section.pointIcon,
        experienceCount: section.experienceCount,
        experienceDuration: section.experienceDuration,
        experienceSuffix: section.experienceSuffix,
        experienceLabel: section.experienceLabel,
        callIcon: section.callIcon,
        callLabel: section.callLabel,
        callNumber: section.callNumber,
        callUrl: section.callUrl,
        ctaLabel: section.ctaLabel,
        ctaUrl: section.ctaUrl,
        published: section.published,
      });
      setData(result);
    });
  }, [reset]);

  const onSubmit = (values: AboutSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateAboutSection(values);
        reset(values);
        toast.success("About section saved");
      } catch {
        toast.error("Failed to save the About section");
      }
    });
  };

  if (!data) return <SectionSkeleton />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionHeader
          icon={Users}
          title="About Us"
          description="Imagery, headline, highlight points and the contact strip"
          previewHash="#about"
          isPending={isPending}
          isDirty={isDirty}
        />

        <AdminPanel
          title="Heading & copy"
          description="Eyebrow tagline, animated title and the paragraph beneath it"
        >
          <div className="space-y-1.5">
            <Label htmlFor="tagline">Tagline</Label>
            <Input id="tagline" {...register("tagline")} placeholder="About Us" />
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
          <div className="space-y-1.5">
            <Label htmlFor="text">Paragraph</Label>
            <Textarea id="text" rows={4} {...register("text")} />
          </div>
        </AdminPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Imagery"
            description="Main photo, overlapping photo and the decorative shape"
          >
            <Controller
              name="image1"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Main image"
                  folder="home/about"
                  aspect="495 / 474"
                />
              )}
            />
            <div className="space-y-1.5">
              <Label htmlFor="image1Alt">Main image alt text</Label>
              <Input id="image1Alt" {...register("image1Alt")} />
            </div>
            <Controller
              name="image2"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Overlapping image"
                  folder="home/about"
                  aspect="336 / 344"
                />
              )}
            />
            <div className="space-y-1.5">
              <Label htmlFor="image2Alt">Overlapping image alt text</Label>
              <Input id="image2Alt" {...register("image2Alt")} />
            </div>
            <Controller
              name="shapeImage"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Background shape"
                  folder="home/about"
                  aspect="560 / 583"
                />
              )}
            />
          </AdminPanel>

          <div className="space-y-6">
            <AdminPanel
              title="Client strip"
              description="Avatar row, counter and the label beside it"
            >
              <div className="grid gap-4 min-[580px]:grid-cols-3">
                <div className="space-y-1.5">
                  <Label htmlFor="clientsCount">Counter</Label>
                  <Input
                    id="clientsCount"
                    type="number"
                    {...register("clientsCount", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="clientsCountSuffix">Suffix</Label>
                  <Input
                    id="clientsCountSuffix"
                    {...register("clientsCountSuffix")}
                    placeholder="K"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="clientsCountDuration">Count duration</Label>
                  <Input
                    id="clientsCountDuration"
                    type="number"
                    step="0.1"
                    {...register("clientsCountDuration", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clientsLabel">Label</Label>
                <Input
                  id="clientsLabel"
                  {...register("clientsLabel")}
                  placeholder="Satisfied Client"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clientsUrl">&ldquo;View all&rdquo; link</Label>
                <Input
                  id="clientsUrl"
                  {...register("clientsUrl")}
                  placeholder="/about"
                />
              </div>
            </AdminPanel>

            <AdminPanel
              title="Points layout"
              description="How the checklist splits into two columns"
            >
              <div className="grid gap-4 min-[580px]:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="pointsPerColumn">Points in first column</Label>
                  <Input
                    id="pointsPerColumn"
                    type="number"
                    min={1}
                    {...register("pointsPerColumn", { valueAsNumber: true })}
                  />
                </div>
                <Controller
                  name="pointIcon"
                  control={control}
                  render={({ field }) => (
                    <IconSelect
                      value={field.value ?? ""}
                      onChange={field.onChange}
                      label="Bullet icon"
                    />
                  )}
                />
              </div>
            </AdminPanel>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Experience badge"
            description="The years-of-experience counter block"
          >
            <div className="grid gap-4 min-[580px]:grid-cols-3">
              <div className="space-y-1.5">
                <Label htmlFor="experienceCount">Years</Label>
                <Input
                  id="experienceCount"
                  type="number"
                  {...register("experienceCount", { valueAsNumber: true })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="experienceSuffix">Suffix</Label>
                <Input
                  id="experienceSuffix"
                  {...register("experienceSuffix")}
                  placeholder="+"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="experienceDuration">Count duration</Label>
                <Input
                  id="experienceDuration"
                  type="number"
                  step="0.1"
                  {...register("experienceDuration", { valueAsNumber: true })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="experienceLabel">Label</Label>
              <Textarea
                id="experienceLabel"
                rows={2}
                {...register("experienceLabel")}
              />
              <p className="text-xs text-muted-foreground">
                Press Enter for a line break.
              </p>
            </div>
          </AdminPanel>

          <AdminPanel
            title="Contact & call to action"
            description="Enquiry phone block and the button below it"
          >
            <Controller
              name="callIcon"
              control={control}
              render={({ field }) => (
                <IconSelect
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Contact icon"
                />
              )}
            />
            <div className="space-y-1.5">
              <Label htmlFor="callLabel">Caption</Label>
              <Input
                id="callLabel"
                {...register("callLabel")}
                placeholder="call us for inquiry"
              />
            </div>
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="callNumber">Phone number</Label>
                <Input id="callNumber" {...register("callNumber")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="callUrl">Phone link</Label>
                <Input
                  id="callUrl"
                  {...register("callUrl")}
                  placeholder="tel:00123456767"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaLabel">Button label</Label>
                <Input id="ctaLabel" {...register("ctaLabel")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaUrl">Button link</Label>
                <Input id="ctaUrl" {...register("ctaUrl")} />
              </div>
            </div>
          </AdminPanel>
        </div>

        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <PublishToggle
              checked={field.value ?? true}
              onChange={field.onChange}
              description="When off, the entire About section is hidden on the homepage"
            />
          )}
        />
      </form>

      <ItemManager
        title="Highlight point"
        description="Ticked checklist items shown beside the copy"
        addLabel="Add point"
        emptyText="No points yet — add the first checklist item."
        items={data.points}
        blank={{ text: "" }}
        fields={[
          {
            name: "text",
            label: "Point",
            type: "textarea",
            rows: 3,
            required: true,
            hint: "Press Enter for a line break.",
          },
        ]}
        getTitle={(item) => item.text.split("\n").join(" ")}
        onCreate={async (values) => {
          const { point } = await createAboutPoint(
            values as Parameters<typeof createAboutPoint>[0],
          );
          return point;
        }}
        onUpdate={async (id, values) => {
          const { point } = await updateAboutPoint(id, values);
          return point;
        }}
        onDelete={async (id) => {
          await deleteAboutPoint(id);
        }}
        onReorder={async (ids) => {
          await reorderAboutPoints(ids);
        }}
      />

      <ItemManager
        title="Client avatar"
        description="Small round avatars above the satisfied-client counter"
        addLabel="Add avatar"
        emptyText="No avatars yet — add the first client photo."
        items={data.clients}
        blank={{ image: "", alt: "" }}
        fields={[
          {
            name: "image",
            label: "Avatar",
            type: "image",
            folder: "home/about",
            aspect: "1 / 1",
            required: true,
          },
          { name: "alt", label: "Alt text", type: "text" },
        ]}
        getTitle={(item) => item.alt || "Client avatar"}
        getImage={(item) => item.image}
        onCreate={async (values) => {
          const { client } = await createAboutClient(
            values as Parameters<typeof createAboutClient>[0],
          );
          return client;
        }}
        onUpdate={async (id, values) => {
          const { client } = await updateAboutClient(id, values);
          return client;
        }}
        onDelete={async (id) => {
          await deleteAboutClient(id);
        }}
        onReorder={async (ids) => {
          await reorderAboutClients(ids);
        }}
      />
    </div>
  );
}
