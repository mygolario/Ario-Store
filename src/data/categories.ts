import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    slug: "headphones",
    name: "هدفون و هدست",
    description: "انواع هدفون و هدست با کیفیت بالا برای موسیقی و گیمینگ",
  },
  {
    id: "2",
    slug: "speakers",
    name: "اسپیکر",
    description: "اسپیکرهای بی‌سیم و سیمی با صدای قدرتمند",
  },
  {
    id: "3",
    slug: "smartwatch",
    name: "ساعت هوشمند",
    description: "ساعت‌های هوشمند با قابلیت‌های پیشرفته",
  },
  {
    id: "4",
    slug: "accessories",
    name: "اکسسوری دیجیتال",
    description: "لوازم جانبی و اکسسوری‌های دیجیتال",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getAllCategories(): Category[] {
  return categories;
}

