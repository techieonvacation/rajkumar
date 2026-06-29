"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { getBlogPost, updateBlogPost } from "@/lib/actions/admin";
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
  tags: z.string().default(""),
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

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [isPending, startTransition] = useTransition();
  const [publishMode, setPublishMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      published: false,
      featured: false,
      category: "Insights",
    },
  });

  useEffect(() => {
    getBlogPost(id).then((post) => {
      if (!post) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        tags: post.tags.join(", "),
        seoTitle: post.seoTitle,
        seoDesc: post.seoDesc,
        ogImage: post.ogImage,
        published: post.published,
        featured: post.featured,
      });
      setLoading(false);
    });
  }, [id, reset]);

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
        await updateBlogPost(id, {
          ...data,
          tags,
          published: publish || data.published,
        });
        toast.success(publish ? "Post published!" : "Changes saved!");
        router.push("/admin/blog");
      } catch (err) {
        toast.error("Failed to save changes.");
        console.error(err);
      }
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg font-semibold">Post not found</p>
        <p className="text-muted-foreground text-sm mt-1">
          This blog post may have been deleted.
        </p>
        <Button asChild className="mt-4">
          <Link href="/admin/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold">Edit Blog Post</h1>
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
            Save
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
          <div className="bg-card rounded-2xl p-5 space-y-4">
            <div className="space-y-1.5">
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
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" rows={3} {...register("excerpt")} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Content</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  minHeight={400}
                />
              )}
            />
          </div>

          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">SEO Settings</h2>
            <div className="space-y-1.5">
              <Label htmlFor="seoTitle">SEO Title</Label>
              <Input id="seoTitle" {...register("seoTitle")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seoDesc">SEO Description</Label>
              <Textarea id="seoDesc" rows={2} {...register("seoDesc")} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ogImage">OG Image URL</Label>
              <Input id="ogImage" placeholder="https://..." {...register("ogImage")} />
            </div>
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
                  <Switch
                    id="published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="featured" className="cursor-pointer">Featured</Label>
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

          <div className="bg-card rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold">Classification</h2>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" {...register("tags")} />
            </div>
          </div>

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
