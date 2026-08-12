"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import {
  createWhyChooseSkill,
  deleteWhyChooseSkill,
  getWhyChooseSectionAdmin,
  reorderWhyChooseSkills,
  updateWhyChooseSection,
  updateWhyChooseSkill,
} from "@/lib/actions/sections/why-choose";
import {
  whyChooseSectionSchema,
  type WhyChooseSectionFormValues,
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
import { Textarea } from "@/components/ui/textarea";
import type { WhyChooseSectionData } from "@/lib/home/section-types";

export default function WhyChooseSectionAdminPage() {
  const [data, setData] = useState<WhyChooseSectionData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<WhyChooseSectionFormValues>({
    resolver: zodResolver(whyChooseSectionSchema),
  });

  useEffect(() => {
    getWhyChooseSectionAdmin().then((result) => {
      const { section } = result;
      reset({
        tagline: section.tagline,
        title: section.title,
        text: section.text,
        ctaLabel: section.ctaLabel,
        ctaUrl: section.ctaUrl,
        clientImage: section.clientImage,
        clientName: section.clientName,
        clientRole: section.clientRole,
        image: section.image,
        imageAlt: section.imageAlt,
        shape1: section.shape1,
        shape2: section.shape2,
        shape3: section.shape3,
        published: section.published,
      });
      setData(result);
    });
  }, [reset]);

  const onSubmit = (values: WhyChooseSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateWhyChooseSection(values);
        reset(values);
        toast.success("Why Choose Us section saved");
      } catch {
        toast.error("Failed to save the Why Choose Us section");
      }
    });
  };

  if (!data) return <SectionSkeleton />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionHeader
          icon={ShieldCheck}
          title="Why Chooses Us"
          description="Skill bars, signature block and the showcase image"
          isPending={isPending}
          isDirty={isDirty}
        />

        <AdminPanel
          title="Heading & copy"
          description="Tagline, animated title and the supporting paragraph"
        >
          <div className="space-y-1.5">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              {...register("tagline")}
              placeholder="Why Chooses Us"
            />
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
            <Textarea id="text" rows={3} {...register("text")} />
          </div>
        </AdminPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Call to action & signature"
            description="Button plus the person credited beneath it"
          >
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="ctaLabel">Button label</Label>
                <Input id="ctaLabel" {...register("ctaLabel")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ctaUrl">Button link</Label>
                <Input id="ctaUrl" {...register("ctaUrl")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clientName">Name</Label>
                <Input id="clientName" {...register("clientName")} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="clientRole">Role</Label>
                <Input id="clientRole" {...register("clientRole")} />
              </div>
            </div>
            <Controller
              name="clientImage"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Portrait"
                  folder="home/why-choose"
                  aspect="1 / 1"
                />
              )}
            />
          </AdminPanel>

          <AdminPanel
            title="Showcase image"
            description="Main artwork that slides in from the right"
          >
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Main image"
                  folder="home/why-choose"
                  aspect="1 / 1"
                />
              )}
            />
            <div className="space-y-1.5">
              <Label htmlFor="imageAlt">Alt text</Label>
              <Input id="imageAlt" {...register("imageAlt")} />
            </div>
          </AdminPanel>
        </div>

        <AdminPanel
          title="Decorative shapes"
          description="Floating artwork layered around the section"
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <Controller
              name="shape1"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Bouncing badge"
                  folder="home/why-choose"
                  aspect="1 / 1"
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
                  label="Floating shape"
                  folder="home/why-choose"
                  aspect="142 / 46"
                />
              )}
            />
            <Controller
              name="shape3"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Background shape"
                  folder="home/why-choose"
                  aspect="1022 / 751"
                />
              )}
            />
          </div>
        </AdminPanel>

        <Controller
          name="published"
          control={control}
          render={({ field }) => (
            <PublishToggle
              checked={field.value ?? true}
              onChange={field.onChange}
              description="When off, the entire Why Choose Us section is hidden on the homepage"
            />
          )}
        />
      </form>

      <ItemManager
        title="Skill bar"
        description="Animated progress bars beneath the paragraph"
        addLabel="Add skill"
        emptyText="No skills yet — add the first progress bar."
        items={data.skills}
        blank={{ title: "", percent: 80 }}
        fields={[
          { name: "title", label: "Label", type: "text", required: true },
          {
            name: "percent",
            label: "Percentage",
            type: "number",
            min: 0,
            max: 100,
          },
        ]}
        getTitle={(item) => item.title}
        getMeta={(item) => `${item.percent}%`}
        onCreate={async (values) => {
          const { skill } = await createWhyChooseSkill(
            values as Parameters<typeof createWhyChooseSkill>[0],
          );
          return skill;
        }}
        onUpdate={async (id, values) => {
          const { skill } = await updateWhyChooseSkill(id, values);
          return skill;
        }}
        onDelete={async (id) => {
          await deleteWhyChooseSkill(id);
        }}
        onReorder={async (ids) => {
          await reorderWhyChooseSkills(ids);
        }}
      />
    </div>
  );
}
