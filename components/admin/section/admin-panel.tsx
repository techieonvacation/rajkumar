import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AdminPanelProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AdminPanel({
  title,
  description,
  actions,
  children,
  className,
}: AdminPanelProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-border/80 bg-card shadow-sm",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-3 border-b border-border/60 px-5 py-4 min-[580px]:px-6">
        <div className="min-w-0">
          <h2 className="font-heading text-sm font-semibold text-foreground">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions}
      </header>
      <div className="space-y-4 p-5 min-[580px]:p-6">{children}</div>
    </section>
  );
}
