"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Workflow } from "lucide-react";
import {
  createProcessStep,
  deleteProcessStep,
  getProcessSectionAdmin,
  reorderProcessSteps,
  updateProcessSection,
  updateProcessStep,
} from "@/lib/actions/sections/process";
import {
  processSectionSchema,
  type ProcessSectionFormValues,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProcessSectionData } from "@/lib/home/section-types";

export default function ProcessSectionAdminPage() {
  const [data, setData] = useState<ProcessSectionData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProcessSectionFormValues>({
    resolver: zodResolver(processSectionSchema),
  });

  useEffect(() => {
    getProcessSectionAdmin().then((result) => {
      const { section } = result;
      reset({
        tagline: section.tagline,
        title: section.title,
        align: section.align === "left" ? "left" : "center",
        bgImage: section.bgImage,
        shape1: section.shape1,
        shape2: section.shape2,
        shapeStepIndex: section.shapeStepIndex,
        published: section.published,
      });
      setData(result);
    });
  }, [reset]);

  const onSubmit = (values: ProcessSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateProcessSection(values);
        reset(values);
        toast.success("Working Process section saved");
      } catch {
        toast.error("Failed to save the Working Process section");
      }
    });
  };

  if (!data) return <SectionSkeleton />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionHeader
          icon={Workflow}
          title="Working Process"
          description="Numbered steps over the full-width background"
          isPending={isPending}
          isDirty={isDirty}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Heading"
            description="Tagline, animated title and alignment"
          >
            <div className="space-y-1.5">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                {...register("tagline")}
                placeholder="Working Process"
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
              <Label>Alignment</Label>
              <Controller
                name="align"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="center">Centered</SelectItem>
                      <SelectItem value="left">Left aligned</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </AdminPanel>

          <AdminPanel
            title="Background & connectors"
            description="Full-width background plus the arrows drawn between steps"
          >
            <Controller
              name="bgImage"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Background image"
                  folder="home/process"
                  aspect="16 / 9"
                />
              )}
            />
            <div className="grid gap-4 min-[580px]:grid-cols-2">
              <Controller
                name="shape1"
                control={control}
                render={({ field }) => (
                  <ImageField
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    label="Left connector"
                    folder="home/process"
                    aspect="217 / 72"
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
                    label="Right connector"
                    folder="home/process"
                    aspect="216 / 71"
                  />
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="shapeStepIndex">Connector step position</Label>
              <Input
                id="shapeStepIndex"
                type="number"
                min={-1}
                {...register("shapeStepIndex", { valueAsNumber: true })}
              />
              <p className="text-xs text-muted-foreground">
                Zero-based index of the step the connectors attach to — use -1
                to hide them.
              </p>
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
              description="When off, the entire Working Process section is hidden on the homepage"
            />
          )}
        />
      </form>

      <ItemManager
        title="Process step"
        description="Steps are numbered automatically in the order listed here"
        addLabel="Add step"
        emptyText="No steps yet — add the first stage of your process."
        items={data.steps}
        blank={{ title: "", text: "" }}
        fields={[
          { name: "title", label: "Title", type: "text", required: true },
          {
            name: "text",
            label: "Description",
            type: "textarea",
            rows: 4,
            hint: "Press Enter for a line break.",
          },
        ]}
        getTitle={(item) => item.title}
        getMeta={(item) => item.text.split("\n").join(" ")}
        onCreate={async (values) => {
          const { step } = await createProcessStep(
            values as Parameters<typeof createProcessStep>[0],
          );
          return step;
        }}
        onUpdate={async (id, values) => {
          const { step } = await updateProcessStep(id, values);
          return step;
        }}
        onDelete={async (id) => {
          await deleteProcessStep(id);
        }}
        onReorder={async (ids) => {
          await reorderProcessSteps(ids);
        }}
      />
    </div>
  );
}
