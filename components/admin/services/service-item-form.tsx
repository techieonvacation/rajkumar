"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { slugify } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const serviceItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  summary: z.string().min(1, "Summary is required"),
  order: z.number().int().default(0),
  published: z.boolean().default(true),
});

export type ServiceItemFormValues = z.infer<typeof serviceItemSchema>;

interface ServiceItemFormProps {
  defaultValues?: Partial<ServiceItemFormValues>;
  onSubmit: (data: ServiceItemFormValues) => void;
  isPending?: boolean;
  submitLabel?: string;
}

export function ServiceItemForm({
  defaultValues,
  onSubmit,
  isPending = false,
  submitLabel = "Save service",
}: ServiceItemFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ServiceItemFormValues>({
    resolver: zodResolver(serviceItemSchema),
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      order: 0,
      published: true,
      ...defaultValues,
    },
  });

  const titleValue = watch("title");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4 rounded-2xl border border-border/70 bg-card p-5">
        <div className="space-y-1.5">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register("title")}
            onBlur={() => {
              if (titleValue && !watch("slug")) {
                setValue("slug", slugify(titleValue));
              }
            }}
            className={errors.title ? "border-destructive" : ""}
          />
          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-4 min-[580px]:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              className="font-mono text-sm"
            />
            {errors.slug && (
              <p className="text-xs text-destructive">{errors.slug.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="order">Display order</Label>
            <Input
              id="order"
              type="number"
              {...register("order", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="summary">Row description *</Label>
          <Textarea
            id="summary"
            rows={3}
            {...register("summary")}
            placeholder="Shown in the services section list on the homepage"
          />
          {errors.summary && (
            <p className="text-xs text-destructive">{errors.summary.message}</p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-border/70 bg-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="published" className="cursor-pointer">
              Published
            </Label>
            <p className="text-xs text-muted-foreground">
              Show this service in the homepage section
            </p>
          </div>
          <Controller
            name="published"
            control={control}
            render={({ field }) => (
              <Switch
                id="published"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving…" : submitLabel}
      </Button>
    </form>
  );
}
