"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  createNavChild,
  createNavItem,
  deleteNavChild,
  deleteNavItem,
  reorderNavChildren,
  reorderNavItems,
  updateNavChild,
  updateNavItem,
} from "@/lib/actions/navigation";
import type { NavItemRow } from "@/lib/navigation-types";
import type { NavItem } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
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
import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ItemDraft = {
  id?: string;
  label: string;
  href: string;
  published: boolean;
};

type ChildDraft = {
  id?: string;
  navItemId: string;
  label: string;
  href: string;
  description: string;
  published: boolean;
};

const emptyItem: ItemDraft = { label: "", href: "", published: true };

export function NavItemsManager({
  initial,
  onChange,
}: {
  initial: NavItemRow[];
  onChange?: (items: NavItemRow[]) => void;
}) {
  const [items, setItems] = useState(initial);
  const [itemDraft, setItemDraft] = useState<ItemDraft | null>(null);
  const [childDraft, setChildDraft] = useState<ChildDraft | null>(null);
  const [deleteItemTarget, setDeleteItemTarget] = useState<NavItemRow | null>(null);
  const [deleteChildTarget, setDeleteChildTarget] = useState<{
    item: NavItemRow;
    child: NavItem;
  } | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sync = (next: NavItemRow[]) => {
    setItems(next);
    onChange?.(next);
  };

  const moveItem = (index: number, dir: -1 | 1) => {
    const next = [...items];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    sync(next);
    startTransition(async () => {
      try {
        await reorderNavItems(next.map((i) => i.id));
      } catch {
        toast.error("Failed to reorder");
        sync(items);
      }
    });
  };

  const toggleItemPublish = (item: NavItemRow) => {
    const published = !item.published;
    sync(items.map((i) => (i.id === item.id ? { ...i, published } : i)));
    startTransition(async () => {
      try {
        await updateNavItem(item.id, { published });
      } catch {
        toast.error("Failed to update");
        sync(items);
      }
    });
  };

  const saveItem = () => {
    if (!itemDraft?.label.trim() || !itemDraft.href.trim()) {
      toast.error("Label and URL are required");
      return;
    }
    startTransition(async () => {
      try {
        if (itemDraft.id) {
          const { item } = await updateNavItem(itemDraft.id, {
            label: itemDraft.label.trim(),
            href: itemDraft.href.trim(),
            published: itemDraft.published,
          });
          sync(items.map((i) => (i.id === item.id ? { ...i, ...item } : i)));
          toast.success("Link updated");
        } else {
          const { item } = await createNavItem({
            label: itemDraft.label.trim(),
            href: itemDraft.href.trim(),
            published: itemDraft.published,
          });
          sync([...items, { ...item, children: [] }]);
          toast.success("Link added");
        }
        setItemDraft(null);
      } catch {
        toast.error("Failed to save link");
      }
    });
  };

  const confirmDeleteItem = () => {
    if (!deleteItemTarget) return;
    startTransition(async () => {
      try {
        await deleteNavItem(deleteItemTarget.id);
        sync(items.filter((i) => i.id !== deleteItemTarget.id));
        toast.success("Link removed");
        setDeleteItemTarget(null);
      } catch {
        toast.error("Failed to delete");
      }
    });
  };

  const moveChild = (item: NavItemRow, index: number, dir: -1 | 1) => {
    const children = [...item.children].sort((a, b) => a.order - b.order);
    const target = index + dir;
    if (target < 0 || target >= children.length) return;
    [children[index], children[target]] = [children[target], children[index]];
    const nextItems = items.map((i) =>
      i.id === item.id ? { ...i, children } : i
    );
    sync(nextItems);
    startTransition(async () => {
      try {
        await reorderNavChildren(item.id, children.map((c) => c.id));
      } catch {
        toast.error("Failed to reorder submenu");
        sync(items);
      }
    });
  };

  const saveChild = () => {
    if (!childDraft?.label.trim() || !childDraft.href.trim()) {
      toast.error("Label and URL are required");
      return;
    }
    startTransition(async () => {
      try {
        if (childDraft.id) {
          const { item: child } = await updateNavChild(childDraft.id, {
            label: childDraft.label.trim(),
            href: childDraft.href.trim(),
            description: childDraft.description.trim(),
            published: childDraft.published,
          });
          sync(
            items.map((i) =>
              i.id === childDraft.navItemId
                ? {
                    ...i,
                    children: i.children.map((c) => (c.id === child.id ? child : c)),
                  }
                : i
            )
          );
          toast.success("Submenu link updated");
        } else {
          const { item: child } = await createNavChild(childDraft.navItemId, {
            label: childDraft.label.trim(),
            href: childDraft.href.trim(),
            description: childDraft.description.trim(),
            published: childDraft.published,
          });
          sync(
            items.map((i) =>
              i.id === childDraft.navItemId
                ? { ...i, children: [...i.children, child] }
                : i
            )
          );
          toast.success("Submenu link added");
        }
        setChildDraft(null);
      } catch {
        toast.error("Failed to save submenu link");
      }
    });
  };

  const confirmDeleteChild = () => {
    if (!deleteChildTarget) return;
    const { item, child } = deleteChildTarget;
    startTransition(async () => {
      try {
        await deleteNavChild(child.id);
        sync(
          items.map((i) =>
            i.id === item.id
              ? { ...i, children: i.children.filter((c) => c.id !== child.id) }
              : i
          )
        );
        toast.success("Submenu link removed");
        setDeleteChildTarget(null);
      } catch {
        toast.error("Failed to delete");
      }
    });
  };

  return (
    <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-sm min-[580px]:p-6">
      <div className="mb-5 flex flex-col gap-3 min-[580px]:flex-row min-[580px]:items-center min-[580px]:justify-between">
        <div>
          <h2 className="font-heading text-base font-semibold text-foreground">
            Menu links
          </h2>
          <p className="text-xs text-muted-foreground">
            Top-level items and optional dropdown children (desktop + mobile)
          </p>
        </div>
        <Button type="button" size="sm" onClick={() => setItemDraft({ ...emptyItem })}>
          <Plus className="mr-1.5 h-4 w-4" />
          Add link
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border/80 bg-background px-4 py-8 text-center text-sm text-muted-foreground">
          No menu links yet. Add a link or import the default menu from the banner above.
        </p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item, index) => {
            const sortedChildren = [...item.children].sort((a, b) => a.order - b.order);
            const isExpanded = expandedId === item.id;

            return (
              <li
                key={item.id}
                className="overflow-hidden rounded-xl border border-border/60 bg-background"
              >
                <div className="flex items-center gap-2 p-3">
                  <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId(isExpanded ? null : item.id)
                    }
                    className={cn(
                      "flex min-w-0 flex-1 items-center gap-2 text-left",
                      sortedChildren.length === 0 && "pointer-events-none"
                    )}
                    disabled={sortedChildren.length === 0}
                  >
                    {sortedChildren.length > 0 && (
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90"
                        )}
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{item.href}</p>
                    </div>
                  </button>
                  <Switch
                    checked={item.published}
                    onCheckedChange={() => toggleItemPublish(item)}
                    aria-label={`Publish ${item.label}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={index === 0 || isPending}
                    onClick={() => moveItem(index, -1)}
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
                    onClick={() => moveItem(index, 1)}
                    aria-label="Move down"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() =>
                      setItemDraft({
                        id: item.id,
                        label: item.label,
                        href: item.href,
                        published: item.published,
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
                    className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                    onClick={() => setDeleteItemTarget(item)}
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                <div className="flex items-center justify-between border-t border-border/50 bg-card/50 px-3 py-2">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Submenu ({sortedChildren.length})
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="h-7 border-border text-xs"
                    onClick={() =>
                      setChildDraft({
                        navItemId: item.id,
                        label: "",
                        href: "",
                        description: "",
                        published: true,
                      })
                    }
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add child
                  </Button>
                </div>

                {isExpanded && sortedChildren.length > 0 && (
                  <ul className="space-y-1 border-t border-border/50 p-2">
                    {sortedChildren.map((child, childIndex) => (
                      <li
                        key={child.id}
                        className="flex items-center gap-2 rounded-lg bg-background px-2 py-2"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-foreground">{child.label}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {child.href}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          disabled={childIndex === 0 || isPending}
                          onClick={() => moveChild(item, childIndex, -1)}
                          aria-label="Move submenu up"
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          disabled={childIndex === sortedChildren.length - 1 || isPending}
                          onClick={() => moveChild(item, childIndex, 1)}
                          aria-label="Move submenu down"
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() =>
                            setChildDraft({
                              id: child.id,
                              navItemId: item.id,
                              label: child.label,
                              href: child.href,
                              description: child.description,
                              published: child.published,
                            })
                          }
                          aria-label="Edit submenu"
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 text-destructive hover:bg-destructive/10"
                          onClick={() => setDeleteChildTarget({ item, child })}
                          aria-label="Delete submenu"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Dialog open={!!itemDraft} onOpenChange={(open) => !open && setItemDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{itemDraft?.id ? "Edit menu link" : "Add menu link"}</DialogTitle>
          </DialogHeader>
          {itemDraft && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nav-item-label">Label</Label>
                <Input
                  id="nav-item-label"
                  value={itemDraft.label}
                  onChange={(e) => setItemDraft({ ...itemDraft, label: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nav-item-href">URL path</Label>
                <Input
                  id="nav-item-href"
                  value={itemDraft.href}
                  onChange={(e) => setItemDraft({ ...itemDraft, href: e.target.value })}
                  placeholder="/about"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
                <Label htmlFor="nav-item-published">Published</Label>
                <Switch
                  id="nav-item-published"
                  checked={itemDraft.published}
                  onCheckedChange={(v) => setItemDraft({ ...itemDraft, published: v })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setItemDraft(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveItem} disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!childDraft} onOpenChange={(open) => !open && setChildDraft(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {childDraft?.id ? "Edit submenu link" : "Add submenu link"}
            </DialogTitle>
          </DialogHeader>
          {childDraft && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="nav-child-label">Label</Label>
                <Input
                  id="nav-child-label"
                  value={childDraft.label}
                  onChange={(e) =>
                    setChildDraft({ ...childDraft, label: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nav-child-href">URL path</Label>
                <Input
                  id="nav-child-href"
                  value={childDraft.href}
                  onChange={(e) =>
                    setChildDraft({ ...childDraft, href: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nav-child-desc">Description (desktop dropdown)</Label>
                <Textarea
                  id="nav-child-desc"
                  rows={2}
                  value={childDraft.description}
                  onChange={(e) =>
                    setChildDraft({ ...childDraft, description: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/30 px-4 py-3">
                <Label htmlFor="nav-child-published">Published</Label>
                <Switch
                  id="nav-child-published"
                  checked={childDraft.published}
                  onCheckedChange={(v) => setChildDraft({ ...childDraft, published: v })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setChildDraft(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveChild} disabled={isPending}>
              {isPending ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteItemTarget} onOpenChange={(o) => !o && setDeleteItemTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete menu link</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &ldquo;{deleteItemTarget?.label}&rdquo; and all submenu items?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteItem}
              className="bg-destructive text-primary-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={!!deleteChildTarget}
        onOpenChange={(o) => !o && setDeleteChildTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete submenu link</AlertDialogTitle>
            <AlertDialogDescription>
              Delete &ldquo;{deleteChildTarget?.child.label}&rdquo;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteChild}
              className="bg-destructive text-primary-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
