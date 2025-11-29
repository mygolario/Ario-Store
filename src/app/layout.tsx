import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Ario Store | فروشگاه اینترنتی گجت و اکسسوری دیجیتال",
    template: "%s | Ario Store",
  },
  description:
    "فروشگاه اینترنتی آریو - عرضه کننده بهترین گجت‌ها و اکسسوری‌های دیجیتال با کیفیت بالا و قیمت مناسب. این یک پروژه دمو برای نمایش قابلیت‌های یک فروشگاه اینترنتی است.",
  keywords: [
    "فروشگاه اینترنتی",
    "گجت",
    "اکسسوری دیجیتال",
    "هدفون",
    "اسپیکر",
    "ساعت هوشمند",
  ],
  authors: [{ name: "Ario Store" }],
  creator: "Ario Store",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "Ario Store",
    title: "Ario Store | فروشگاه اینترنتی گجت و اکسسوری دیجیتال",
    description:
      "فروشگاه اینترنتی آریو - عرضه کننده بهترین گجت‌ها و اکسسوری‌های دیجیتال",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ario Store | فروشگاه اینترنتی گجت و اکسسوری دیجیتال",
    description:
      "فروشگاه اینترنتی آریو - عرضه کننده بهترین گجت‌ها و اکسسوری‌های دیجیتال",
  },
  other: {
    "x-dns-prefetch-control": "on",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`${vazirmatn.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <ToastProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
