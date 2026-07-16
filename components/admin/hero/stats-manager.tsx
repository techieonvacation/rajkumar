"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createStat,
  updateStat,
  deleteStat,
  reorderStats,
  getStats,
} from "@/lib/actions/home";
import { getStatIcon, STAT_ICON_OPTIONS } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
} from "lucide-react";

type Stat = Awaited<ReturnType<typeof getStats>>[number];

interface Draft {
  id?: string;
  label: string;
  value: string;
  suffix: string;
  icon: string;
  published: boolean;
}

const EMPTY: Draft = {
  label: "",
  value: "",
  suffix: "+",
  icon: "award",
  published: true,
};

export function StatsManager({ initial }: { initial: Stat[] }) {
  const [stats, setStats] = useState<Stat[]>(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Stat | null>(null);
  const [isPending, startTransition] = useTransition();

  const openNew = () => setDraft({ ...EMPTY });
  const openEdit = (s: Stat) =>
    setDraft({
      id: s.id,
      label: s.label,
      value: s.value,
      suffix: s.suffix,
      icon: s.icon || "award",
      published: s.published,
    });

  const save = () => {
    if (!draft) return;
    if (!draft.label.trim() || !draft.value.trim()) {
      toast.error("Value and label are required");
      return;
    }
    startTransition(async () => {
      try {
        if (draft.id) {
          const { stat } = await updateStat(draft.id, {
            label: draft.label,
            value: draft.value,
            suffix: draft.suffix,
            icon: draft.icon,
            published: draft.published,
          });
          setStats((prev) => prev.map((s) => (s.id === stat.id ? stat : s)));
          toast.success("Stat updated");
        } else {
          const { stat } = await createStat({
            label: draft.label,
            value: draft.value,
            suffix: draft.suffix,
            icon: draft.icon,
            published: draft.published,
            order: stats.length,
          });
          setStats((prev) => [...prev, stat]);
          toast.success("Stat added");
        }
        setDraft(null);
      } catch {
        toast.error("Failed to save stat");
      }
    });
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    startTransition(async () => {
      try {
        await deleteStat(deleteTarget.id);
        setStats((prev) => prev.filter((s) => s.id !== deleteTarget.id));
        toast.success("Stat deleted");
        setDeleteTarget(null);
      } catch {
        toast.error("Failed to delete stat");
      }
    });
  };

  const move = (index: number, dir: -1 | 1) => {
    const next = [...stats];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setStats(next);
    startTransition(async () => {
      try {
        await reorderStats(next.map((s) => s.id));
      } catch {
        toast.error("Failed to reorder");
      }
    });
  };

  const togglePublish = (s: Stat) => {
    const optimistic = !s.published;
    setStats((prev) =>
      prev.map((x) => (x.id === s.id ? { ...x, published: optimistic } : x))
    );
    startTransition(async () => {
      try {
        await updateStat(s.id, { published: optimistic });
      } catch {
        toast.error("Failed to update");
        setStats((prev) =>
          prev.map((x) => (x.id === s.id ? { ...x, published: s.published } : x))
        );
      }
    });
  };

  return (
    <div className="bg-card rounded-2xl p-5 min-[580px]:p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="font-heading text-base font-semibold text-foreground">
            Stats
          </h2>
          <p className="text-xs text-muted-foreground">
            Counters shown beneath the hero
          </p>
        </div>
        <Button type="button" size="sm" onClick={openNew}>
          <Plus className="mr-1.5 h-4 w-4" />
          Add stat
        </Button>
      </div>

      {stats.length === 0 ? (
        <p className="rounded-xl bg-background px-4 py-8 text-center text-sm text-muted-foreground">
          No stats yet. Add your first counter.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {stats.map((s, i) => {
            const Icon = getStatIcon(s.icon);
            return (
              <li
                key={s.id}
                className="flex items-center gap-3 rounded-xl bg-background p-3"
              >
                <div className="flex flex-col text-muted-foreground/40">
                  <GripVertical className="h-4 w-4" />
                </div>
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-sm font-semibold text-foreground tabular-nums">
                    {s.value}
                    <span style={{ color: "var(--accent-red)" }}>{s.suffix}</span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {s.label}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={i === 0 || isPending}
                    onClick={() => move(i, -1)}
                    aria-label="Move up"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={i === stats.length - 1 || isPending}
                    onClick={() => move(i, 1)}
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Switch
                    checked={s.published}
                    onCheckedChange={() => togglePublish(s)}
                    aria-label="Published"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => openEdit(s)}
                    aria-label="Edit"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    onClick={() => setDeleteTarget(s)}
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

      <Dialog open={!!draft} onOpenChange={(o) => !o && setDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{draft?.id ? "Edit stat" : "Add stat"}</DialogTitle>
          </DialogHeader>
          {draft && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="stat-value">Value *</Label>
                  <Input
                    id="stat-value"
                    value={draft.value}
                    onChange={(e) =>
                      setDraft({ ...draft, value: e.target.value })
                    }
                    placeholder="200"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="stat-suffix">Suffix</Label>
                  <Input
                    id="stat-suffix"
                    value={draft.suffix}
                    onChange={(e) =>
                      setDraft({ ...draft, suffix: e.target.value })
                    }
                    placeholder="+"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="stat-label">Label *</Label>
                <Input
                  id="stat-label"
                  value={draft.label}
                  onChange={(e) =>
                    setDraft({ ...draft, label: e.target.value })
                  }
                  placeholder="Clients Advised"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Icon</Label>
                <Select
                  value={draft.icon}
                  onValueChange={(v) => setDraft({ ...draft, icon: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STAT_ICON_OPTIONS.map((name) => {
                      const Icon = getStatIcon(name);
                      return (
                        <SelectItem key={name} value={name}>
                          <span className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {name}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-background px-4 py-3">
                <Label htmlFor="stat-published" className="cursor-pointer">
                  Published
                </Label>
                <Switch
                  id="stat-published"
                  checked={draft.published}
                  onCheckedChange={(v) => setDraft({ ...draft, published: v })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDraft(null)}>
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
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete stat</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &ldquo;{deleteTarget?.label}&rdquo;? This cannot be undone.
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
    </div>
  );
}
