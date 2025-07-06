import { Skeleton } from "@/components/ui/skeleton";

export default function InsuranceCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 shadow-sm border dark:border-zinc-800 space-y-3">
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-9 w-45" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}
