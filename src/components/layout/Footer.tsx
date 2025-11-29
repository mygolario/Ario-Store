import Link from "next/link";
import { Instagram, Twitter } from "lucide-react"; // Using Twitter as placeholder for generic social or just text

export function Footer() {
  return (
    <footer className="border-t border-divider bg-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-black">Ario Store</h3>
            <p className="text-sm text-muted-foreground">
              فروشگاه اینترنتی آریو، ارائه‌دهنده بهترین محصولات با کیفیت تضمین شده.
              تجربه خریدی آسان و مطمئن.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-black">دسترسی سریع</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-mustard transition-colors">محصولات</Link></li>
              <li><Link href="/blog" className="hover:text-mustard transition-colors">بلاگ</Link></li>
              <li><Link href="/about" className="hover:text-mustard transition-colors">درباره ما</Link></li>
              <li><Link href="/contact" className="hover:text-mustard transition-colors">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-black">خدمات مشتریان</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-mustard transition-colors">سؤالات متداول</Link></li>
              <li><Link href="/shipping-and-returns" className="hover:text-mustard transition-colors">ارسال و مرجوعی</Link></li>
              <li><Link href="/terms" className="hover:text-mustard transition-colors">قوانین و مقررات</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-mustard transition-colors">حریم خصوصی</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-black">شبکه‌های اجتماعی</h3>
            <div className="flex space-x-4 space-x-reverse">
              <Link href="#" className="text-muted-foreground hover:text-mustard transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">اینستاگرام</span>
              </Link>
              {/* Placeholder for Whatsapp or other */}
              <Link href="#" className="text-muted-foreground hover:text-mustard transition-colors">
                <span className="text-sm font-medium">واتساپ</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-divider pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Ario Store. تمامی حقوق محفوظ است.</p>
        </div>
      </div>
    </footer>
  );
}
