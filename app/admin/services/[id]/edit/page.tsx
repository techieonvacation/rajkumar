"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { getService, updateService } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import {
  ServiceItemForm,
  type ServiceItemFormValues,
} from "@/components/admin/services/service-item-form";
import { ArrowLeft } from "lucide-react";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initial, setInitial] = useState<ServiceItemFormValues | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getService(params.id).then((service) => {
      if (!service) {
        toast.error("Service not found");
        router.push("/admin/services");
        return;
      }
      setInitial({
        title: service.title,
        slug: service.slug,
        summary: service.summary,
        order: service.order,
        published: service.published,
      });
      setLoading(false);
    });
  }, [params.id, router]);

  const onSubmit = (data: ServiceItemFormValues) => {
    startTransition(async () => {
      try {
        await updateService(params.id, data);
        toast.success("Service updated");
        router.push("/admin/services");
      } catch {
        toast.error("Failed to update service");
      }
    });
  };

  if (loading || !initial) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-muted" />
        <div className="h-72 animate-pulse rounded-2xl bg-muted" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="font-heading text-xl font-semibold">Edit service</h1>
      </div>

      <ServiceItemForm
        defaultValues={initial}
        onSubmit={onSubmit}
        isPending={isPending}
        submitLabel="Save changes"
      />
    </div>
  );
}
