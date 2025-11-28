"use client";

import { Category } from "@/types";
import { CategoryFilter } from "./CategoryFilter";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProductFilters as FilterType } from "@/lib/products";
import { getAllBrands } from "@/lib/products";
import { useEffect, useState } from "react";

interface ProductFiltersProps {
  categories: Category[];
  filters: FilterType;
  onFiltersChange: (filters: FilterType) => void;
  priceRange: { min: number; max: number };
}

export function ProductFilters({
  categories,
  filters,
  onFiltersChange,
  priceRange,
}: ProductFiltersProps) {
  const [brands] = useState<string[]>(getAllBrands());
  const [minPriceInput, setMinPriceInput] = useState<string>("");
  const [maxPriceInput, setMaxPriceInput] = useState<string>("");

  useEffect(() => {
    setMinPriceInput(filters.minPrice?.toString() || "");
    setMaxPriceInput(filters.maxPrice?.toString() || "");
  }, [filters.minPrice, filters.maxPrice]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter((id) => id !== categoryId);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = filters.brands || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter((b) => b !== brand);
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? undefined : Number(value);
    if (type === "min") {
      setMinPriceInput(value);
      onFiltersChange({
        ...filters,
        minPrice: numValue,
      });
    } else {
      setMaxPriceInput(value);
      onFiltersChange({
        ...filters,
        maxPrice: numValue,
      });
    }
  };

  const handleStockChange = (checked: boolean) => {
    onFiltersChange({ ...filters, inStockOnly: checked });
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selectedCategories={filters.categories || []}
        onCategoryChange={handleCategoryChange}
      />

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">محدوده قیمت</h3>
        <div className="space-y-2">
          <div>
            <Label htmlFor="min-price" className="text-xs text-muted-foreground">
              حداقل (تومان)
            </Label>
            <Input
              id="min-price"
              type="number"
              placeholder={priceRange.min.toString()}
              value={minPriceInput}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-xs text-muted-foreground">
              حداکثر (تومان)
            </Label>
            <Input
              id="max-price"
              type="number"
              placeholder={priceRange.max.toString()}
              value={maxPriceInput}
              onChange={(e) => handlePriceChange("max", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">برند</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={filters.brands?.includes(brand) || false}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand, checked as boolean)
                }
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm font-normal cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="in-stock-only"
            checked={filters.inStockOnly || false}
            onCheckedChange={handleStockChange}
          />
          <Label
            htmlFor="in-stock-only"
            className="text-sm font-normal cursor-pointer"
          >
            فقط کالاهای موجود
          </Label>
        </div>
      </div>
    </div>
  );
}

