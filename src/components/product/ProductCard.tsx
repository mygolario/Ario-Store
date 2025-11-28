"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/ui/toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useToast();
  const isInStock =
    typeof product.inStock === "boolean"
      ? product.inStock
      : product.inStock > 0;

  const handleAddToCart = () => {
    addItem(product.id, 1);
    addToast({
      title: "به سبد خرید اضافه شد",
      description: product.name,
      variant: "success",
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
      {/* Image Container */}
      <Link href={`/product/${product.slug}`} className="relative aspect-square">
        <Image
          src={product.mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badges */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {product.isBestSeller && (
            <Badge variant="default" className="text-xs">
              پرفروش
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="secondary" className="text-xs">
              ویژه
            </Badge>
          )}
        </div>
        {!isInStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              ناموجود
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="mt-1 text-sm font-semibold line-clamp-2 hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Link href={`/product/${product.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              مشاهده جزئیات
            </Button>
          </Link>
          <Button
            size="sm"
            className="flex-1"
            disabled={!isInStock}
            onClick={handleAddToCart}
          >
            افزودن به سبد
          </Button>
        </div>
      </div>
    </div>
  );
}

