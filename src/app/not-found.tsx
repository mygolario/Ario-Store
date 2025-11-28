import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold">404</h1>
          <h2 className="text-3xl font-semibold">صفحه مورد نظر یافت نشد</h2>
          <p className="text-muted-foreground max-w-md">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/">
            <Button size="lg">
              <Home className="h-4 w-4 ml-2" />
              بازگشت به صفحه اصلی
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" size="lg">
              <Search className="h-4 w-4 ml-2" />
              مشاهده محصولات
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

