import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "./MobileNav";

const navItems = [
  { name: "صفحه اصلی", href: "/" },
  { name: "محصولات", href: "/products" },
  { name: "دسته‌بندی‌ها", href: "/categories" },
  { name: "بلاگ", href: "/blog" },
  { name: "درباره ما", href: "/about" },
  { name: "تماس با ما", href: "/contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu & Logo */}
        <div className="flex items-center gap-4">
          <MobileNav />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight">Ario Store</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
            <span className="sr-only">جستجو</span>
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                0
              </span>
              <span className="sr-only">سبد خرید</span>
            </Button>
          </Link>
          <Link href="/account">
             <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">حساب کاربری</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
