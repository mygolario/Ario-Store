import { Metadata } from "next";

export const metadata: Metadata = {
  title: "بلاگ | Ario Store",
  description:
    "مقالات و راهنمای‌های خرید محصولات دیجیتال: هدفون، اسپیکر، ساعت هوشمند و اکسسوری‌های دیجیتال",
  openGraph: {
    title: "بلاگ | Ario Store",
    description: "مقالات و راهنمای‌های خرید محصولات دیجیتال",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

