import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider text-primary">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--accent-red)" }}
          />
          {eyebrow}
        </span>
      )}

      <h2
        className={cn(
          "relative font-heading font-semibold tracking-tight text-foreground",
          "text-[26px] leading-tight min-[580px]:text-[34px] lg:text-[40px]",
          "pb-3.5",
          "after:absolute after:bottom-0 after:h-[3px] after:w-9 after:rounded-full after:bg-primary after:content-['']",
          centered ? "after:left-1/2 after:-translate-x-1/2" : "after:left-0"
        )}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-primary">{highlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p
          className={cn(
            "text-[14px] font-light leading-relaxed text-muted-foreground min-[580px]:text-[15px]",
            centered ? "max-w-2xl" : "max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
