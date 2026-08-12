"use client";

import { RichTitle } from "@/components/home/template/rich-text";
import { ImageUpload } from "@/components/admin/image-upload";
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
import { TEMPLATE_ICONS } from "@/lib/home/section-options";
import { cn } from "@/lib/utils";
import { LayoutTemplate } from "lucide-react";

export function TitlePreview({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border/80 bg-background px-4 py-3 font-heading text-base font-semibold leading-snug text-foreground [&_span]:text-primary",
        className,
      )}
    >
      <RichTitle
        text={text || "Section title"}
        image={
          <span className="mx-1 inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 align-middle text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            image
          </span>
        }
      />
    </div>
  );
}

interface RichTitleFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  supportsImage?: boolean;
  error?: string;
}

export function RichTitleField({
  value,
  onChange,
  label = "Section title",
  supportsImage = false,
  error,
}: RichTitleFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="section-title">{label} *</Label>
      <Textarea
        id="section-title"
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="font-mono text-xs leading-relaxed"
      />
      <p className="text-xs leading-relaxed text-muted-foreground">
        Wrap words in{" "}
        <code className="rounded bg-muted px-1 py-0.5">[square brackets]</code>{" "}
        to colour them with the accent, and press Enter for a line break
        {supportsImage && (
          <>
            . Insert{" "}
            <code className="rounded bg-muted px-1 py-0.5">{"{image}"}</code> to
            place the inline title image
          </>
        )}
        .
      </p>
      <TitlePreview text={value} />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

interface ImageFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  hint?: string;
  folder: string;
  aspect?: string;
}

export function ImageField({
  value,
  onChange,
  label,
  hint,
  folder,
  aspect,
}: ImageFieldProps) {
  return (
    <div className="space-y-2">
      <ImageUpload
        value={value}
        onChange={onChange}
        label={label}
        hint={hint}
        subfolder={folder}
        aspect={aspect}
      />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="/template/… or https://…"
        className="font-mono text-xs"
      />
    </div>
  );
}

interface IconSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function IconSelect({ value, onChange, label }: IconSelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <Label>{label}</Label>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select an icon" />
        </SelectTrigger>
        <SelectContent>
          {TEMPLATE_ICONS.map((icon) => (
            <SelectItem key={icon} value={icon}>
              <span className="flex items-center gap-2.5">
                <span className={cn(icon, "text-base text-primary")} />
                {icon.replace("tg-icon-", "")}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

interface PublishToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  description: string;
}

export function PublishToggle({
  checked,
  onChange,
  description,
}: PublishToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-border/80 bg-card px-5 py-4 shadow-sm">
      <div className="flex items-center gap-3">
        <LayoutTemplate className="h-5 w-5 shrink-0 text-muted-foreground" />
        <div>
          <Label htmlFor="section-published" className="text-foreground">
            Published
          </Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch
        id="section-published"
        checked={checked}
        onCheckedChange={onChange}
      />
    </div>
  );
}
