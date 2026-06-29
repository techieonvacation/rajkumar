"use client";

import { useEffect, useState, useTransition } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getContacts, updateContactStatus, deleteContact } from "@/lib/actions/admin";
import { MoreHorizontal, Eye, CheckCheck, Reply, Archive, Trash2 } from "lucide-react";

type Contact = Awaited<ReturnType<typeof getContacts>>[number];

const STATUS_BADGE: Record<
  string,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  new: { label: "New", variant: "default" },
  read: { label: "Read", variant: "secondary" },
  replied: { label: "Replied", variant: "outline" },
  archived: { label: "Archived", variant: "secondary" },
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getContacts().then((data) => {
      setContacts(data);
      setLoading(false);
    });
  }, []);

  const handleStatusUpdate = (
    id: string,
    status: "new" | "read" | "replied" | "archived"
  ) => {
    startTransition(async () => {
      try {
        await updateContactStatus(id, status);
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c))
        );
        if (selectedContact?.id === id) {
          setSelectedContact((prev) => (prev ? { ...prev, status } : prev));
        }
        toast.success(`Marked as ${status}`);
      } catch {
        toast.error("Failed to update status");
      }
    });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteContact(id);
        setContacts((prev) => prev.filter((c) => c.id !== id));
        if (selectedContact?.id === id) setSelectedContact(null);
        toast.success("Contact deleted");
      } catch {
        toast.error("Failed to delete contact");
      }
    });
  };

  const filteredContacts =
    statusFilter === "all"
      ? contacts
      : contacts.filter((c) => c.status === statusFilter);

  const columns: ColumnDef<Contact>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-sm">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.company || "—"}</span>
      ),
    },
    {
      accessorKey: "service",
      header: "Service",
      cell: ({ row }) => (
        <span className="text-sm">{row.original.service || "—"}</span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground">
          {formatDate(row.original.createdAt, {
            month: "short",
            day: "numeric",
          })}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const s = STATUS_BADGE[row.original.status] ?? STATUS_BADGE.new;
        return <Badge variant={s.variant}>{s.label}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => {
              setSelectedContact(row.original);
              if (row.original.status === "new") {
                handleStatusUpdate(row.original.id, "read");
              }
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(row.original.id, "read")}
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Mark as Read
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate(row.original.id, "replied")}
              >
                <Reply className="mr-2 h-4 w-4" />
                Mark as Replied
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  handleStatusUpdate(row.original.id, "archived")
                }
              >
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500 focus:text-red-500"
                onClick={() => handleDelete(row.original.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Contact Messages</h1>
        <p className="text-sm text-muted-foreground">
          {contacts.filter((c) => c.status === "new").length} new messages
        </p>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {["all", "new", "read", "replied", "archived"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
              statusFilter === s
                ? "bg-[oklch(0.35_0.18_264)] text-white"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s !== "all" && (
              <span className="ml-1.5 opacity-60">
                ({contacts.filter((c) => c.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-2xl p-4">
        <DataTable
          columns={columns}
          data={filteredContacts}
          searchKey="name"
          searchPlaceholder="Search contacts…"
        />
      </div>

      {/* Message viewer dialog */}
      <Dialog
        open={!!selectedContact}
        onOpenChange={(open) => !open && setSelectedContact(null)}
      >
        <DialogContent className="max-w-xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle>Message from {selectedContact.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="font-medium">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.company && (
                    <div>
                      <p className="text-xs text-muted-foreground">Company</p>
                      <p className="font-medium">{selectedContact.company}</p>
                    </div>
                  )}
                  {selectedContact.country && (
                    <div>
                      <p className="text-xs text-muted-foreground">Country</p>
                      <p className="font-medium">{selectedContact.country}</p>
                    </div>
                  )}
                  {selectedContact.service && (
                    <div>
                      <p className="text-xs text-muted-foreground">Service</p>
                      <p className="font-medium">{selectedContact.service}</p>
                    </div>
                  )}
                  {selectedContact.budget && (
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="font-medium">{selectedContact.budget}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Message</p>
                  <div className="rounded-xl bg-muted/50 p-4 text-sm whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedContact.createdAt)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleStatusUpdate(selectedContact.id, "replied")
                      }
                      disabled={isPending}
                    >
                      <Reply className="mr-1.5 h-3.5 w-3.5" />
                      Mark Replied
                    </Button>
                    <Button
                      size="sm"
                      asChild
                    >
                      <a href={`mailto:${selectedContact.email}`}>
                        Reply via Email
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
