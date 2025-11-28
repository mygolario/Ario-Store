"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { searchProductsByText, sortProducts, SortOption } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { SortSelect } from "@/components/product/SortSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const results = searchProductsByText(query);
    return sortProducts(results, sortBy);
  }, [query, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">جستجو</h1>
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="جستجوی محصولات..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pr-10"
            />
          </div>
          <Button type="submit">جستجو</Button>
        </form>
      </div>

      {/* Results */}
      {query ? (
        <>
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {searchResults.length > 0
                ? `${searchResults.length} نتیجه برای "${query}"`
                : `نتیجه‌ای برای "${query}" یافت نشد`}
            </p>
            {searchResults.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">مرتب‌سازی:</span>
                <SortSelect value={sortBy} onValueChange={setSortBy} />
              </div>
            )}
          </div>

          {searchResults.length > 0 ? (
            <ProductGrid products={searchResults} />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold mb-2">
                نتیجه‌ای یافت نشد
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                لطفاً کلمه کلیدی دیگری را امتحان کنید
              </p>
              <Button variant="outline" onClick={() => router.push("/products")}>
                مشاهده همه محصولات
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-semibold mb-2">جستجو را شروع کنید</p>
          <p className="text-sm text-muted-foreground">
            نام محصول، برند یا ویژگی مورد نظر را وارد کنید
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

