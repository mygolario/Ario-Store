import { Metadata } from "next";

export const metadata: Metadata = {
  title: "جستجو | Ario Store",
  description: "جستجوی محصولات در فروشگاه اینترنتی آریو",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

