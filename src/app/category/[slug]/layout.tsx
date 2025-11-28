import { Metadata } from "next";
import { getAllCategories } from "@/data/categories";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: "دسته‌بندی یافت نشد | Ario Store",
      description: "دسته‌بندی مورد نظر یافت نشد",
    };
  }

  return {
    title: `${category.name} | Ario Store`,
    description: category.description || `محصولات دسته‌بندی ${category.name}`,
    openGraph: {
      title: category.name,
      description: category.description || `محصولات دسته‌بندی ${category.name}`,
      type: "website",
    },
  };
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

