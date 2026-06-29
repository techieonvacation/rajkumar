"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { createBlogPost } from "@/lib/actions/admin";
import { RichTextEditor } from "@/components/admin/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Send } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().default(""),
  content: z.string().default(""),
  coverImage: z.string().default(""),
  category: z.string().default("Insights"),
  tags: z.string().default(""), // comma-separated input
  seoTitle: z.string().default(""),
  seoDesc: z.string().default(""),
  ogImage: z.string().default(""),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const CATEGORIES = [
  "Insights",
  "Market Entry",
  "Trade",
  "Strategy",
  "China Business",
  "India Business",
  "Case Studies",
  "News",
  "Language",
];

export default function NewBlogPostPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [publishMode, setPublishMode] = useState(false);

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
      published: false,
      featured: false,
      category: "Insights",
    },
  });

  const titleValue = watch("title");

  const handleTitleBlur = () => {
    if (titleValue) {
      setValue("slug", slugify(titleValue));
    }
  };

  const onSubmit = (publish: boolean) => (data: FormValues) => {
    startTransition(async () => {
      try {
        const tags = data.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        await createBlogPost({
          ...data,
          tags,
          published: publish || data.published,
        });
        toast.success(publish ? "Post published!" : "Draft saved!");
        router.push("/admin/blog");
      } catch (err) {
        toast.error("Failed to save post. Please try again.");
        console.error(err);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">New Blog Post</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={isPending}
            onClick={() => {
              setPublishMode(false);
              handleSubmit(onSubmit(false))();
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              setPublishMode(true);
              handleSubmit(onSubmit(true))();
            }}
          >
            <Send className="mr-2 h-4 w-4" />
            {isPending && publishMode ? "Publishing…" : "Publish"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Enter post title…"
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
                placeholder="auto-generated-from-title"
                {...register("slug")}
                className="font-mono text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                placeholder="Brief description for previews and SEO…"
                rows={3}
                {...register("excerpt")}
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <Label>Content *</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Write your blog post content here…"
                  minHeight={400}
                />
              )}
            />
          </div>

          {/* SEO */}
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">SEO Settings</h2>
            <div className="space-y-1.5">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input
                id="seoTitle"
                placeholder="Leave blank to use post title"
                {...register("seoTitle")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seoDesc">SEO Description</Label>
              <Textarea
                id="seoDesc"
                placeholder="Meta description for search engines…"
                rows={2}
                {...register("seoDesc")}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input
                id="ogImage"
                placeholder="https://..."
                {...register("ogImage")}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish settings */}
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">Settings</h2>
            <div className="flex items-center justify-between">
              <Label htmlFor="published" className="cursor-pointer">
                Published
              </Label>
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
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">
                Featured
              </Label>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          {/* Category */}
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">Classification</h2>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="china, trade, consulting"
                {...register("tags")}
              />
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-card rounded-2xl p-5 space-y-3">
            <h2 className="text-sm font-semibold">Cover Image</h2>
            <div className="space-y-1.5">
              <Label htmlFor="coverImage">Image URL</Label>
              <Input
                id="coverImage"
                placeholder="https://..."
                {...register("coverImage")}
              />
            </div>
            {watch("coverImage") && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={watch("coverImage")}
                alt="Cover preview"
                className="w-full h-32 object-cover rounded-lg"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
