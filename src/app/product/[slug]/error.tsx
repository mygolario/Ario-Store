"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Product page error:", error);
    }
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">خطایی رخ داد</h2>
          <p className="text-muted-foreground">
            متأسفانه در بارگذاری محصول مشکلی پیش آمد.
          </p>
        </div>
        <div className="flex gap-4">
          <Button onClick={reset}>تلاش مجدد</Button>
          <Link href="/products">
            <Button variant="outline">مشاهده همه محصولات</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

