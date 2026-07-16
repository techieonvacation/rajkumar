"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { createUploadSignature, uploadFromUrl } from "@/lib/actions/upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  UploadCloud,
  Link2,
  X,
  ImageIcon,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  subfolder?: string;
  label?: string;
  hint?: string;
  aspect?: string;
  className?: string;
}

const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPTED = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif", "image/svg+xml"];

export function ImageUpload({
  value,
  onChange,
  subfolder,
  label = "Image",
  hint,
  aspect = "16 / 10",
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  const uploadFile = useCallback(
    async (file: File) => {
      if (!ACCEPTED.includes(file.type)) {
        toast.error("Unsupported file type.");
        return;
      }
      if (file.size > MAX_BYTES) {
        toast.error("Image must be under 8MB.");
        return;
      }

      setUploading(true);
      setProgress(0);

      try {
        const sig = await createUploadSignature(subfolder);
        const form = new FormData();
        form.append("file", file);
        form.append("api_key", sig.apiKey);
        form.append("timestamp", String(sig.timestamp));
        form.append("folder", sig.folder);
        form.append("signature", sig.signature);

        const url = await new Promise<string>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open(
            "POST",
            `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`
          );
          xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          };
          xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
              resolve(JSON.parse(xhr.responseText).secure_url);
            } else {
              reject(new Error("Upload failed"));
            }
          };
          xhr.onerror = () => reject(new Error("Network error during upload"));
          xhr.send(form);
        });

        onChange(url);
        toast.success("Image uploaded");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Failed to upload image"
        );
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [onChange, subfolder]
  );

  const handleImport = async () => {
    if (!urlValue.trim()) return;
    setImporting(true);
    try {
      const result = await uploadFromUrl(urlValue, subfolder);
      onChange(result.url);
      setUrlValue("");
      toast.success("Image added");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to import image");
    } finally {
      setImporting(false);
    }
  };

  const busy = uploading || importing;

  return (
    <div className={cn("space-y-2.5", className)}>
      {label && (
        <p className="text-sm font-medium text-foreground">{label}</p>
      )}

      {value ? (
        <div className="group relative overflow-hidden rounded-2xl bg-muted" style={{ aspectRatio: aspect }}>
          <Image
            src={value}
            alt={label}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 420px"
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
              Replace
            </Button>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => onChange("")}
              disabled={busy}
            >
              <X className="mr-1.5 h-3.5 w-3.5" />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">
              <UploadCloud className="mr-1.5 h-3.5 w-3.5" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="url">
              <Link2 className="mr-1.5 h-3.5 w-3.5" />
              From URL
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-2.5">
            <div
              role="button"
              tabIndex={0}
              onClick={() => !busy && inputRef.current?.click()}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !busy) {
                  e.preventDefault();
                  inputRef.current?.click();
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files?.[0];
                if (file) uploadFile(file);
              }}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-2xl bg-muted px-6 py-10 text-center outline-none transition-all focus:ring-2 focus:ring-primary/25",
                dragActive && "ring-2 ring-primary/40",
                busy ? "cursor-wait" : "cursor-pointer hover:bg-muted/70"
              )}
              style={{ aspectRatio: aspect }}
            >
              {uploading ? (
                <div className="w-full max-w-[220px] space-y-3">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin text-primary" />
                  <Progress value={progress} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">{progress}%</p>
                </div>
              ) : (
                <>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <ImageIcon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    Drop an image or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, WebP or SVG — up to 8MB
                  </p>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="url" className="mt-2.5 space-y-2.5">
            <div className="flex gap-2">
              <Input
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleImport();
                  }
                }}
                placeholder="https://example.com/image.jpg"
                disabled={importing}
              />
              <Button
                type="button"
                onClick={handleImport}
                disabled={importing || !urlValue.trim()}
              >
                {importing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Add"
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Pasted images are imported into your Cloudinary library.
            </p>
          </TabsContent>
        </Tabs>
      )}

      {hint && !value && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(",")}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadFile(file);
          e.target.value = "";
        }}
      />
    </div>
  );
}
