"use client";

import { useState, useMemo } from "react";
import { Metadata } from "next";
import { Filter } from "lucide-react";
import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import {
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

export default function ProductsPage() {
  const allProducts = getAllProducts();
  const allCategories = getAllCategories();
  const priceRange = getPriceRange(allProducts);

  const [filters, setFilters] = useState<ProductFilters>({});
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Apply filters and sorting
  const filteredAndSortedProducts = useMemo(() => {
    let result = filterProducts(allProducts, filters);
    result = sortProducts(result, sortBy);
    return result;
  }, [allProducts, filters, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">همه محصولات</h1>
        <p className="text-muted-foreground">
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
