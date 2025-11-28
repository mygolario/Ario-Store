import { Metadata } from "next";
import { getAllProducts } from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const products = getAllProducts();
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "محصول یافت نشد | Ario Store",
      description: "محصول مورد نظر یافت نشد",
    };
  }

  return {
    title: `${product.name} | Ario Store`,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.mainImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: [product.mainImage],
    },
  };
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

