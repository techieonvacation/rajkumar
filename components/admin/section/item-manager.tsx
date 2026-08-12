"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageField, IconSelect } from "@/components/admin/section/fields";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  Copy,
  ImageIcon,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

export type ItemFieldType =
  | "text"
  | "textarea"
  | "number"
  | "image"
  | "icon"
  | "list"
  | "select";

export interface ItemField {
  name: string;
  label: string;
  type: ItemFieldType;
  placeholder?: string;
  hint?: string;
  rows?: number;
  required?: boolean;
  options?: readonly string[];
  min?: number;
  max?: number;
  step?: number;
  folder?: string;
  aspect?: string;
  half?: boolean;
}

export interface ManagedItem {
  id: string;
  order: number;
  published: boolean;
}

type Draft = Record<string, unknown> & { id?: string };

interface ItemManagerProps<T extends ManagedItem> {
  title: string;
  description: string;
  addLabel: string;
  emptyText: string;
  items: T[];
  fields: ItemField[];
  blank: Record<string, unknown>;
  getTitle: (item: T) => string;
  getMeta?: (item: T) => string;
  getImage?: (item: T) => string;
  getIcon?: (item: T) => string;
  onCreate: (values: Record<string, unknown>) => Promise<T>;
  onUpdate: (id: string, values: Record<string, unknown>) => Promise<T>;
  onDelete: (id: string) => Promise<void>;
  onReorder: (ids: string[]) => Promise<void>;
}

function toDraft(item: Record<string, unknown>, fields: ItemField[]): Draft {
  const draft: Draft = {};
  for (const field of fields) {
    const value = item[field.name];
    draft[field.name] =
      field.type === "list"
        ? [...((value as string[]) ?? [])]
        : (value ?? (field.type === "number" ? 0 : ""));
  }
  return draft;
}

function toPayload(draft: Draft, fields: ItemField[]) {
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = draft[field.name];
    if (field.type === "list") {
      payload[field.name] = ((value as string[]) ?? [])
        .map((entry) => entry.trim())
        .filter(Boolean);
    } else if (field.type === "number") {
      payload[field.name] = Number(value) || 0;
    } else {
      payload[field.name] = String(value ?? "");
    }
  }
  return payload;
}

export function ItemManager<T extends ManagedItem>({
  title,
  description,
  addLabel,
  emptyText,
  items: initialItems,
  fields,
  blank,
  getTitle,
  getMeta,
  getImage,
  getIcon,
  onCreate,
  onUpdate,
  onDelete,
  onReorder,
}: ItemManagerProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [isPending, startTransition] = useTransition();

  const setField = (name: string, value: unknown) =>
    setDraft((current) => (current ? { ...current, [name]: value } : current));

  const save = () => {
    if (!draft) return;

    const missing = fields.find(
      (field) =>
        field.required && !String(draft[field.name] ?? "").trim().length,
    );
    if (missing) {
      toast.error(`${missing.label} is required`);
      return;
    }

    const payload = toPayload(draft, fields);

    startTransition(async () => {
      try {
        if (draft.id) {
          const updated = await onUpdate(draft.id, payload);
          setItems((current) =>
            current.map((item) => (item.id === updated.id ? updated : item)),
          );
          toast.success("Item updated");
        } else {
          const created = await onCreate({
            ...payload,
            order: items.length,
            published: true,
          });
          setItems((current) => [...current, created]);
          toast.success("Item added");
        }
        setDraft(null);
      } catch {
        toast.error("Failed to save item");
      }
    });
  };

  const duplicate = (item: T) => {
    const payload = toPayload(
      toDraft(item as unknown as Record<string, unknown>, fields),
      fields,
    );
    startTransition(async () => {
      try {
        const created = await onCreate({
          ...payload,
          order: items.length,
          published: item.published,
        });
        setItems((current) => [...current, created]);
        toast.success("Item duplicated");
      } catch {
        toast.error("Failed to duplicate item");
      }
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      try {
        await onDelete(target.id);
        setItems((current) => current.filter((item) => item.id !== target.id));
        setDeleteTarget(null);
        toast.success("Item deleted");
      } catch {
        toast.error("Failed to delete item");
      }
    });
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    setItems(next);
    startTransition(async () => {
      try {
        await onReorder(next.map((item) => item.id));
      } catch {
        toast.error("Failed to reorder");
        setItems(items);
      }
    });
  };

  const togglePublished = (item: T) => {
    const published = !item.published;
    setItems((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, published } : entry,
      ),
    );
    startTransition(async () => {
      try {
        await onUpdate(item.id, { published });
      } catch {
        toast.error("Failed to update");
        setItems((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? { ...entry, published: item.published }
              : entry,
          ),
        );
      }
    });
  };

  return (
    <section className="rounded-2xl border border-border/80 bg-card shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-5 py-4 min-[580px]:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-sm font-semibold text-foreground">
              {title}
            </h2>
            <Badge variant="secondary" className="tabular-nums">
              {items.length}
            </Badge>
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
        <Button
          type="button"
          size="sm"
          onClick={() => setDraft(toDraft(blank, fields))}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          {addLabel}
        </Button>
      </header>

      <div className="p-5 min-[580px]:p-6">
        {items.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border/80 bg-background px-4 py-8 text-center text-sm text-muted-foreground">
            {emptyText}
          </p>
        ) : (
          <ul className="space-y-2.5">
            {items.map((item, index) => {
              const image = getImage?.(item);
              const icon = getIcon?.(item);
              return (
                <li
                  key={item.id}
                  className={cn(
                    "flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-background p-3",
                    !item.published && "opacity-60",
                  )}
                >
                  {image !== undefined && (
                    <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {image ? (
                        <Image
                          src={image}
                          alt=""
                          fill
                          unoptimized
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-muted-foreground/50">
                          <ImageIcon className="h-4 w-4" />
                        </span>
                      )}
                    </div>
                  )}
                  {icon !== undefined && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <span className={cn(icon, "text-lg")} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {getTitle(item) || "Untitled"}
                    </p>
                    {getMeta && (
                      <p className="truncate text-xs text-muted-foreground">
                        {getMeta(item)}
                      </p>
                    )}
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={index === 0 || isPending}
                      onClick={() => move(index, -1)}
                      aria-label="Move up"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={index === items.length - 1 || isPending}
                      onClick={() => move(index, 1)}
                      aria-label="Move down"
                    >
                      <ArrowDown className="h-3.5 w-3.5" />
                    </Button>
                    <Switch
                      checked={item.published}
                      onCheckedChange={() => togglePublished(item)}
                      aria-label="Published"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() =>
                        setDraft({
                          ...toDraft(
                            item as unknown as Record<string, unknown>,
                            fields,
                          ),
                          id: item.id,
                        })
                      }
                      aria-label="Edit"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      disabled={isPending}
                      onClick={() => duplicate(item)}
                      aria-label="Duplicate"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setDeleteTarget(item)}
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Dialog open={!!draft} onOpenChange={(open) => !open && setDraft(null)}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{draft?.id ? `Edit ${title}` : addLabel}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {draft && (
            <div className="grid gap-4 min-[520px]:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.name}
                  className={cn(
                    "space-y-1.5",
                    !field.half && "min-[520px]:col-span-2",
                  )}
                >
                  {field.type === "image" ? (
                    <ImageField
                      value={String(draft[field.name] ?? "")}
                      onChange={(value) => setField(field.name, value)}
                      label={field.label}
                      hint={field.hint}
                      folder={field.folder ?? "home"}
                      aspect={field.aspect}
                    />
                  ) : field.type === "icon" ? (
                    <IconSelect
                      value={String(draft[field.name] ?? "")}
                      onChange={(value) => setField(field.name, value)}
                      label={field.label}
                    />
                  ) : (
                    <>
                      <Label htmlFor={`item-${field.name}`}>
                        {field.label}
                        {field.required && " *"}
                      </Label>
                      {field.type === "textarea" || field.type === "list" ? (
                        <Textarea
                          id={`item-${field.name}`}
                          rows={field.rows ?? 3}
                          placeholder={field.placeholder}
                          value={
                            field.type === "list"
                              ? ((draft[field.name] as string[]) ?? []).join(
                                  "\n",
                                )
                              : String(draft[field.name] ?? "")
                          }
                          onChange={(event) =>
                            setField(
                              field.name,
                              field.type === "list"
                                ? event.target.value.split("\n")
                                : event.target.value,
                            )
                          }
                        />
                      ) : field.type === "select" ? (
                        <Select
                          value={String(draft[field.name] ?? "")}
                          onValueChange={(value) => setField(field.name, value)}
                        >
                          <SelectTrigger id={`item-${field.name}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(field.options ?? []).map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={`item-${field.name}`}
                          type={field.type === "number" ? "number" : "text"}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          placeholder={field.placeholder}
                          value={String(draft[field.name] ?? "")}
                          onChange={(event) =>
                            setField(
                              field.name,
                              field.type === "number"
                                ? Number(event.target.value)
                                : event.target.value,
                            )
                          }
                        />
                      )}
                      {field.hint && (
                        <p className="text-xs text-muted-foreground">
                          {field.hint}
                        </p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDraft(null)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={save} disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete item</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &ldquo;{deleteTarget ? getTitle(deleteTarget) : ""}&rdquo;?
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
