import { Metadata } from "next";

export const metadata: Metadata = {
  title: "محصولات | Ario Store",
  description:
    "مشاهده و خرید انواع گجت‌ها و اکسسوری‌های دیجیتال: هدفون، اسپیکر، ساعت هوشمند و لوازم جانبی با بهترین قیمت و کیفیت.",
  openGraph: {
    title: "محصولات | Ario Store",
    description: "مشاهده و خرید انواع گجت‌ها و اکسسوری‌های دیجیتال",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

