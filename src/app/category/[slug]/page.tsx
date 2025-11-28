"use client";

import { useState, useMemo, useEffect } from "react";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";
import {
  getProductsByCategorySlug,
  filterProducts,
  sortProducts,
  getPriceRange,
  ProductFilters,
  SortOption,
} from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductFilters as FiltersComponent } from "@/components/product/ProductFilters";
import { SortSelect } from "@/components/product/SortSelect";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getAllCategories } from "@/data/categories";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [slug, setSlug] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Resolve params
  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) {
    return <div className="container mx-auto px-4 py-8">در حال بارگذاری...</div>;
  }

  const category = getCategoryBySlug(slug);
  if (!category) {
    router.push("/products");
    return null;
  }

  const categoryProducts = getProductsByCategorySlug(slug);
  const allCategories = getAllCategories();
  const priceRange = getPriceRange(categoryProducts);

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = filterProducts(categoryProducts, filters);
    result = sortProducts(result, sortBy);
    return result;
  }, [categoryProducts, filters, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        {category.description && (
          <p className="text-muted-foreground mb-4">{category.description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {filteredAndSortedProducts.length} محصول یافت شد
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FiltersComponent
              categories={allCategories}
              filters={filters}
              onFiltersChange={setFilters}
              priceRange={priceRange}
            />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            {/* Mobile Filter Button */}
            <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="lg:hidden">
                  <Filter className="h-4 w-4 ml-2" />
                  فیلترها
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>فیلترها</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FiltersComponent
                    categories={allCategories}
                    filters={filters}
                    onFiltersChange={setFilters}
                    priceRange={priceRange}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
              <SortSelect value={sortBy} onValueChange={setSortBy} />
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={filteredAndSortedProducts} />
        </div>
      </div>
    </div>
  );
}
