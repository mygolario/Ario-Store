import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">حساب کاربری</h1>
      <div className="flex gap-4">
        <Link href="/account/orders">
          <Button variant="outline">سفارش‌های من</Button>
        </Link>
        <Link href="/account/settings">
          <Button variant="outline">تنظیمات</Button>
        </Link>
      </div>
    </div>
  );
}
