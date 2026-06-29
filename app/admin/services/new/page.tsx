"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { createService } from "@/lib/actions/admin";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

const processStepSchema = z.object({
  step: z.number(),
  title: z.string(),
  description: z.string(),
});

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  icon: z.string().default(""),
  heroImage: z.string().default(""),
  summary: z.string().default(""),
  description: z.string().default(""),
  benefits: z.array(z.object({ value: z.string() })).default([]),
  process: z.array(processStepSchema).default([]),
  deliverables: z.array(z.object({ value: z.string() })).default([]),
  duration: z.string().default(""),
  investment: z.string().default(""),
  faqs: z.array(faqSchema).default([]),
  ctaLabel: z.string().default("Get Started"),
  ctaUrl: z.string().default("/contact"),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().default(0),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewServicePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      published: true,
      featured: false,
      order: 0,
      benefits: [],
      deliverables: [],
      process: [],
      faqs: [],
    },
  });

  const benefitsArray = useFieldArray({ control, name: "benefits" });
  const deliverablesArray = useFieldArray({ control, name: "deliverables" });
  const processArray = useFieldArray({ control, name: "process" });
  const faqsArray = useFieldArray({ control, name: "faqs" });

  const titleValue = watch("title");

  const handleTitleBlur = () => {
    if (titleValue) setValue("slug", slugify(titleValue));
  };

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        await createService({
          ...data,
          benefits: data.benefits.map((b) => b.value),
          deliverables: data.deliverables.map((d) => d.value),
          process: data.process.map((p, i) => ({ ...p, step: i + 1 })),
        });
        toast.success("Service created!");
        router.push("/admin/services");
      } catch (err) {
        toast.error("Failed to create service.");
        console.error(err);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="flex-1 text-xl font-semibold">New Service</h1>
        <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
          <Save className="mr-2 h-4 w-4" />
          {isPending ? "Saving…" : "Save Service"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          {/* Core fields */}
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-1.5">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  onBlur={handleTitleBlur}
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  {...register("slug")}
                  className="font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="icon">Icon (name/emoji)</Label>
                <Input id="icon" placeholder="briefcase" {...register("icon")} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" rows={2} {...register("summary")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="heroImage">Hero Image URL</Label>
              <Input id="heroImage" placeholder="https://..." {...register("heroImage")} />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label>Description (Rich Text)</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} minHeight={280} />
              )}
            />
          </div>

          {/* Benefits */}
          <div className="bg-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Benefits</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => benefitsArray.append({ value: "" })}
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add
              </Button>
            </div>
            {benefitsArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder={`Benefit ${index + 1}`}
                  {...register(`benefits.${index}.value`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-red-500 hover:text-red-600"
                  onClick={() => benefitsArray.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {benefitsArray.fields.length === 0 && (
              <p className="text-xs text-muted-foreground">No benefits added.</p>
            )}
          </div>

          {/* Process Steps */}
          <div className="bg-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Process Steps</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  processArray.append({
                    step: processArray.fields.length + 1,
                    title: "",
                    description: "",
                  })
                }
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Step
              </Button>
            </div>
            {processArray.fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Step {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-red-500"
                    onClick={() => processArray.remove(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Input
                  placeholder="Step title"
                  {...register(`process.${index}.title`)}
                />
                <Textarea
                  placeholder="Step description"
                  rows={2}
                  {...register(`process.${index}.description`)}
                />
              </div>
            ))}
          </div>

          {/* Deliverables */}
          <div className="bg-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Deliverables</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => deliverablesArray.append({ value: "" })}
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add
              </Button>
            </div>
            {deliverablesArray.fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <Input
                  placeholder={`Deliverable ${index + 1}`}
                  {...register(`deliverables.${index}.value`)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-red-500 hover:text-red-600"
                  onClick={() => deliverablesArray.remove(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="bg-card rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">FAQs</h2>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => faqsArray.append({ question: "", answer: "" })}
              >
                <Plus className="mr-1 h-3.5 w-3.5" /> Add FAQ
              </Button>
            </div>
            {faqsArray.fields.map((field, index) => (
              <div key={field.id} className="rounded-xl border border-border p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground">
                    FAQ {index + 1}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-red-500"
                    onClick={() => faqsArray.remove(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <Input
                  placeholder="Question"
                  {...register(`faqs.${index}.question`)}
                />
                <Textarea
                  placeholder="Answer"
                  rows={2}
                  {...register(`faqs.${index}.answer`)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">Settings</h2>
            <div className="flex items-center justify-between">
              <Label htmlFor="published" className="cursor-pointer">Published</Label>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch id="published" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch id="featured" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                {...register("order", { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">Pricing & Timeline</h2>
            <div className="space-y-1.5">
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" placeholder="e.g. 4-6 weeks" {...register("duration")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="investment">Investment</Label>
              <Input id="investment" placeholder="e.g. Starting at $5,000" {...register("investment")} />
            </div>
          </div>

          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">CTA</h2>
            <div className="space-y-1.5">
              <Label htmlFor="ctaLabel">Button Label</Label>
              <Input id="ctaLabel" {...register("ctaLabel")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ctaUrl">Button URL</Label>
              <Input id="ctaUrl" {...register("ctaUrl")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
