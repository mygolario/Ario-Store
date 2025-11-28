import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">محصول یافت نشد</h1>
          <p className="text-muted-foreground">
            محصول مورد نظر شما وجود ندارد یا حذف شده است.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/products">
            <Button>مشاهده همه محصولات</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

