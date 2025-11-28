import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Skeleton className="h-10 w-32 mb-6" />

        <div className="mb-8">
          <div className="flex gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-20" />
            ))}
          </div>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-5 w-48" />
        </div>

        <article className="space-y-4 mb-12">
          {[...Array(10)].map((_, i) => (
            <Skeleton
              key={i}
              className={`h-4 w-full ${i % 3 === 0 ? "w-3/4" : ""}`}
            />
          ))}
        </article>

        <div className="border-t pt-8">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4 space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

