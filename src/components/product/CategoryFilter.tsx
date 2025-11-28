"use client";

import { Category } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: string[];
  onCategoryChange: (categoryId: string, checked: boolean) => void;
}

export function CategoryFilter({
  categories,
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">دسته‌بندی</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={(checked) =>
                onCategoryChange(category.id, checked as boolean)
              }
            />
            <Label
              htmlFor={`category-${category.id}`}
              className="text-sm font-normal cursor-pointer"
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

