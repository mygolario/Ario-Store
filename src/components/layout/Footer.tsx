import Link from "next/link";
import { Instagram, Twitter } from "lucide-react"; // Using Twitter as placeholder for generic social or just text

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Ario Store</h3>
            <p className="text-sm text-muted-foreground">
              فروشگاه اینترنتی آریو، ارائه‌دهنده بهترین محصولات با کیفیت تضمین شده.
              تجربه خریدی آسان و مطمئن.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-foreground">محصولات</Link></li>
              <li><Link href="/blog" className="hover:text-foreground">بلاگ</Link></li>
              <li><Link href="/about" className="hover:text-foreground">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-foreground">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">خدمات مشتریان</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-foreground">سؤالات متداول</Link></li>
              <li><Link href="/shipping-and-returns" className="hover:text-foreground">ارسال و مرجوعی</Link></li>
              <li><Link href="/terms" className="hover:text-foreground">قوانین و مقررات</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-foreground">حریم خصوصی</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">شبکه‌های اجتماعی</h3>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">اینستاگرام</span>
              </Link>
              {/* Placeholder for Whatsapp or other */}
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <span className="text-sm font-medium">واتساپ</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ario Store. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
