export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number; // in tomans
  oldPrice?: number;
  categoryId: string | string[]; // support single or multiple categories
  brand: string;
  inStock: boolean | number; // boolean or stock count
  tags: string[];
  mainImage: string;
  gallery: string[];
  specs: Record<string, string>; // key-value pairs for technical specs
  rating?: number; // 0-5
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

