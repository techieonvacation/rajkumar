export function SectionSkeleton() {
  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <div className="h-10 w-56 animate-pulse rounded-xl bg-muted" />
      <div className="h-64 animate-pulse rounded-2xl bg-muted" />
      <div className="h-80 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
