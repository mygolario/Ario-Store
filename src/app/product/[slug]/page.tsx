"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ShoppingCart, Star, Check } from "lucide-react";
import { findProductBySlug, formatPrice, getRelatedProducts } from "@/lib/products";
import { getCategoryBySlug } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductGrid } from "@/components/product/ProductGrid";
import { useCartStore } from "@/store/cart";
import { useToast } from "@/components/ui/toast";

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const addItem = useCartStore((state) => state.addItem);
  const { addToast } = useToast();
  const [slug, setSlug] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return <div className="container mx-auto px-4 py-8">در حال بارگذاری...</div>;
  }

  const product = findProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const isInStock =
    typeof product.inStock === "boolean" ? product.inStock : product.inStock > 0;
  const stockText = isInStock
    ? typeof product.inStock === "number"
      ? `${product.inStock} عدد موجود`
      : "موجود در انبار"
    : "ناموجود";

  // Get category for display (simplified - in real app would have proper mapping)
  const categoryId = Array.isArray(product.categoryId)
    ? product.categoryId[0]
    : product.categoryId;
  const categorySlugMap: Record<string, string> = {
    "1": "headphones",
    "2": "speakers",
    "3": "smartwatch",
    "4": "accessories",
  };
  const category = getCategoryBySlug(categorySlugMap[categoryId] || "headphones");

  const relatedProducts = getRelatedProducts(product, 4);
  const allImages = [product.mainImage, ...product.gallery];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={allImages[selectedImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - تصویر ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand & Name */}
          <div>
            <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            {product.rating && (
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating!)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="text-sm text-muted-foreground mr-2">
                  ({product.rating})
                </span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="flex gap-2">
            {product.isBestSeller && (
              <Badge variant="default">پرفروش</Badge>
            )}
            {product.isFeatured && (
              <Badge variant="secondary">ویژه</Badge>
            )}
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              {product.oldPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.oldPrice)}
                </span>
              )}
              <span className="text-3xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>
            {product.oldPrice && (
              <p className="text-sm text-green-600">
                {Math.round(
                  ((product.oldPrice - product.price) / product.oldPrice) * 100
                )}{" "}
                درصد تخفیف
              </p>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <span
              className={`text-sm font-medium ${
                isInStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {stockText}
            </span>
          </div>

          {/* Key Points */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">ویژگی‌های کلیدی:</h3>
            <ul className="space-y-1 text-sm">
              {product.tags.slice(0, 4).map((tag, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1"
              disabled={!isInStock}
              onClick={() => {
                addItem(product.id, 1);
                addToast({
                  title: "به سبد خرید اضافه شد",
                  description: product.name,
                  variant: "success",
                });
              }}
            >
              <ShoppingCart className="h-5 w-5 ml-2" />
              افزودن به سبد خرید
            </Button>
          </div>

          {/* Short Description */}
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              {product.shortDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("description")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "description"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              توضیحات
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "specs"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              مشخصات فنی
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`py-4 px-2 border-b-2 transition-colors ${
                activeTab === "reviews"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              نظرات کاربران
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {activeTab === "description" && (
            <div className="prose prose-sm max-w-none">
              <p className="whitespace-pre-line text-muted-foreground">
                {product.fullDescription}
              </p>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="space-y-4">
              <table className="w-full border-collapse">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-3 pr-4 font-semibold text-sm w-1/3">
                        {key}
                      </td>
                      <td className="py-3 text-sm text-muted-foreground">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {/* Dummy Reviews */}
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold">علی احمدی</span>
                  <span className="text-xs text-muted-foreground">
                    2 هفته پیش
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  محصول عالی و با کیفیت. راضی هستم از خریدم.
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(4)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <Star className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-semibold">مریم رضایی</span>
                  <span className="text-xs text-muted-foreground">
                    1 ماه پیش
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  کیفیت خوبی داره ولی قیمت کمی بالاست.
                </p>
              </div>
              <p className="text-sm text-muted-foreground text-center py-4">
                در حال حاضر سیستم نظرات در حال توسعه است.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">محصولات مرتبط</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
}
