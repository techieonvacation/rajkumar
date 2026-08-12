"use client";

import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { BarChart3 } from "lucide-react";
import {
  createCounterItem,
  deleteCounterItem,
  getCounterSectionAdmin,
  reorderCounterItems,
  updateCounterItem,
  updateCounterSection,
} from "@/lib/actions/sections/counter";
import {
  counterSectionSchema,
  type CounterSectionFormValues,
} from "@/lib/validators/sections";
import { REVEAL_ANIMATIONS } from "@/lib/home/section-options";
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
import type { CounterSectionData } from "@/lib/home/section-types";

export default function CounterSectionAdminPage() {
  const [data, setData] = useState<CounterSectionData | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<CounterSectionFormValues>({
    resolver: zodResolver(counterSectionSchema),
  });

  useEffect(() => {
    getCounterSectionAdmin().then((result) => {
      const { section } = result;
      reset({
        tagline: section.tagline,
        title: section.title,
        align: section.align === "left" ? "left" : "center",
        bgShape: section.bgShape,
        published: section.published,
      });
      setData(result);
    });
  }, [reset]);

  const onSubmit = (values: CounterSectionFormValues) => {
    startTransition(async () => {
      try {
        await updateCounterSection(values);
        reset(values);
        toast.success("Numbers section saved");
      } catch {
        toast.error("Failed to save the Numbers section");
      }
    });
  };

  if (!data) return <SectionSkeleton />;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <SectionHeader
          icon={BarChart3}
          title="The Numbers Speak"
          description="Animated counters and the heading above them"
          isPending={isPending}
          isDirty={isDirty}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <AdminPanel
            title="Heading"
            description="Eyebrow tagline, animated title and alignment"
          >
            <div className="space-y-1.5">
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                {...register("tagline")}
                placeholder="The Numbers Speak"
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
            title="Background"
            description="Floating shape behind the counter band"
          >
            <Controller
              name="bgShape"
              control={control}
              render={({ field }) => (
                <ImageField
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  label="Background shape"
                  folder="home/counter"
                  aspect="16 / 9"
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
              description="When off, the entire counter section is hidden on the homepage"
            />
          )}
        />
      </form>

      <ItemManager
        title="Counter"
        description="Each tile counts up when it scrolls into view"
        addLabel="Add counter"
        emptyText="No counters yet — add the first metric."
        items={data.items}
        blank={{
          icon: "tg-icon-trophy",
          value: 100,
          duration: 2,
          suffix: "+",
          label: "",
          animation: "fade-in-left",
          delay: "100ms",
        }}
        fields={[
          { name: "icon", label: "Icon", type: "icon" },
          { name: "label", label: "Label", type: "text", required: true },
          { name: "value", label: "Value", type: "number", half: true },
          { name: "suffix", label: "Suffix", type: "text", half: true },
          {
            name: "duration",
            label: "Count duration (s)",
            type: "number",
            step: 0.1,
            half: true,
          },
          {
            name: "delay",
            label: "Reveal delay",
            type: "text",
            placeholder: "100ms",
            half: true,
          },
          {
            name: "animation",
            label: "Reveal animation",
            type: "select",
            options: REVEAL_ANIMATIONS,
          },
        ]}
        getTitle={(item) => `${item.value}${item.suffix} ${item.label}`}
        getMeta={(item) => `${item.animation} · ${item.delay}`}
        getIcon={(item) => item.icon}
        onCreate={async (values) => {
          const { item } = await createCounterItem(
            values as Parameters<typeof createCounterItem>[0],
          );
          return item;
        }}
        onUpdate={async (id, values) => {
          const { item } = await updateCounterItem(id, values);
          return item;
        }}
        onDelete={async (id) => {
          await deleteCounterItem(id);
        }}
        onReorder={async (ids) => {
          await reorderCounterItems(ids);
        }}
      />
    </div>
  );
}
