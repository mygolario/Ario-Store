import { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  priorityCount?: number; // Number of products to load with priority
}

export function ProductGrid({ products, priorityCount = 0 }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg text-muted-foreground">
          محصولی یافت نشد
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          لطفاً فیلترها را تغییر دهید
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}

