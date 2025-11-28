import { Product, Category } from "@/types";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategoryId,
  searchProducts,
} from "@/data/products";
import { getCategoryBySlug } from "@/data/categories";

/**
 * Format price in tomans to Persian string with تومان
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
}

/**
 * Get product by slug
 */
export function findProductBySlug(slug: string): Product | undefined {
  return getProductBySlug(slug);
}

/**
 * Get products by category slug
 */
export function getProductsByCategorySlug(
  categorySlug: string
): Product[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];
  return getProductsByCategoryId(category.id);
}

/**
 * Search products by text query
 * Searches in name, brand, tags, and shortDescription
 */
export function searchProductsByText(query: string): Product[] {
  if (!query.trim()) return getAllProducts();
  return searchProducts(query);
}

/**
 * Get all unique brands from products
 */
export function getAllBrands(): string[] {
  const brands = new Set<string>();
  getAllProducts().forEach((product) => {
    brands.add(product.brand);
  });
  return Array.from(brands).sort();
}

/**
 * Get price range from products
 */
export function getPriceRange(products: Product[]): {
  min: number;
  max: number;
} {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Sort products by various criteria
 */
export type SortOption =
  | "newest"
  | "bestseller"
  | "cheapest"
  | "expensive"
  | "featured";

export function sortProducts(
  products: Product[],
  sortBy: SortOption
): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case "newest":
      // For now, just return as-is (in real app, would sort by date)
      return sorted;
    case "bestseller":
      return sorted.sort((a, b) => {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return 0;
      });
    case "cheapest":
      return sorted.sort((a, b) => a.price - b.price);
    case "expensive":
      return sorted.sort((a, b) => b.price - a.price);
    case "featured":
      return sorted.sort((a, b) => {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return 0;
      });
    default:
      return sorted;
  }
}

/**
 * Filter products by various criteria
 */
export interface ProductFilters {
  categories?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  let filtered = [...products];

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((product) => {
      if (Array.isArray(product.categoryId)) {
        return product.categoryId.some((catId) =>
          filters.categories!.includes(catId)
        );
      }
      return filters.categories!.includes(product.categoryId);
    });
  }

  // Brand filter
  if (filters.brands && filters.brands.length > 0) {
    filtered = filtered.filter((product) =>
      filters.brands!.includes(product.brand)
    );
  }

  // Price range filter
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter((product) => product.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter((product) => product.price <= filters.maxPrice!);
  }

  // Stock filter
  if (filters.inStockOnly) {
    filtered = filtered.filter((product) => {
      if (typeof product.inStock === "boolean") {
        return product.inStock;
      }
      return product.inStock > 0;
    });
  }

  return filtered;
}

/**
 * Get related products (same category, excluding current product)
 */
export function getRelatedProducts(
  product: Product,
  limit: number = 4
): Product[] {
  const categoryIds = Array.isArray(product.categoryId)
    ? product.categoryId
    : [product.categoryId];

  const related = getAllProducts()
    .filter(
      (p) =>
        p.id !== product.id &&
        (Array.isArray(p.categoryId)
          ? p.categoryId.some((id) => categoryIds.includes(id))
          : categoryIds.includes(p.categoryId))
    )
    .slice(0, limit);

  return related;
}

