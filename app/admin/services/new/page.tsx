"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { createService } from "@/lib/actions/admin";
import { Button } from "@/components/ui/button";
import {
  ServiceItemForm,
  type ServiceItemFormValues,
} from "@/components/admin/services/service-item-form";
import { ArrowLeft } from "lucide-react";

export default function NewServicePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: ServiceItemFormValues) => {
    startTransition(async () => {
      try {
        await createService({
          title: data.title,
          slug: data.slug,
          summary: data.summary,
          order: data.order,
          published: data.published,
        });
        toast.success("Service created");
        router.push("/admin/services");
      } catch {
        toast.error("Failed to create service");
      }
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/services">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="font-heading text-xl font-semibold">Add service</h1>
      </div>

      <ServiceItemForm onSubmit={onSubmit} isPending={isPending} submitLabel="Create service" />
    </div>
  );
}
