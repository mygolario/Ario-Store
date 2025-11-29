import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllProducts } from "@/data/products";
import { getAllCategories } from "@/data/categories";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Shield, HeadphonesIcon, Speaker, Watch, Smartphone } from "lucide-react";
import { FadeInOptimized } from "@/components/ui/FadeInOptimized";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Ario Store | فروشگاه اینترنتی گجت و اکسسوری دیجیتال",
  description:
    "فروشگاه اینترنتی آریو - عرضه کننده بهترین گجت‌ها و اکسسوری‌های دیجیتال با کیفیت بالا و قیمت مناسب. هدفون، اسپیکر، ساعت هوشمند و لوازم جانبی دیجیتال.",
  openGraph: {
    title: "Ario Store | فروشگاه اینترنتی گجت و اکسسوری دیجیتال",
    description:
      "فروشگاه اینترنتی آریو - عرضه کننده بهترین گجت‌ها و اکسسوری‌های دیجیتال",
    type: "website",
  },
};

export default function Home() {
  const featuredProducts = getAllProducts()
    .filter((p) => p.isFeatured)
    .slice(0, 4);
  const categories = getAllCategories();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden container mx-auto px-4 py-20 md:py-32 text-center bg-white">
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-warmbrown/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 -z-10 h-[300px] w-[300px] rounded-full bg-mustard/5 blur-3xl" />
        <FadeInOptimized>
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-[#0D0D0D]">
              به فروشگاه آریو خوش آمدید
            </h1>
            <div className="h-1 w-24 bg-mustard mx-auto rounded-full" />
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
              تجربه خریدی متفاوت با بهترین کیفیت و قیمت. گجت‌ها و اکسسوری‌های
              دیجیتال برتر را از ما بخواهید.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="w-full sm:w-auto">
                  مشاهده محصولات
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  درباره ما
                </Button>
              </Link>
            </div>
          </div>
        </FadeInOptimized>
      </section>

      {/* Advantages Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <FadeInOptimized delay={0.2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Truck className="h-6 w-6 text-mustard" />
                    <CardTitle>ارسال سریع</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    ارسال سریع و امن به سراسر کشور در کوتاه‌ترین زمان ممکن
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="h-6 w-6 text-mustard" />
                    <CardTitle>ضمانت اصالت کالا</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    تمامی محصولات با ضمانت اصالت و گارانتی معتبر عرضه می‌شوند
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <HeadphonesIcon className="h-6 w-6 text-mustard" />
                    <CardTitle>پشتیبانی واقعی</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    تیم پشتیبانی ما همواره آماده پاسخگویی به سوالات شماست
                  </p>
                </CardContent>
              </Card>
            </div>
          </FadeInOptimized>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="container mx-auto px-4 py-20">
          <FadeInOptimized delay={0.3}>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2 text-warmbrown">محصولات ویژه</h2>
              <p className="text-muted-foreground">
                بهترین و پرفروش‌ترین محصولات ما
              </p>
            </div>
            <ProductGrid products={featuredProducts} priorityCount={4} />
            <div className="text-center mt-8">
              <Link href="/products">
                <Button variant="outline" size="lg">
                  مشاهده همه محصولات
                </Button>
              </Link>
            </div>
          </FadeInOptimized>
        </section>
      )}

      {/* Categories Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <FadeInOptimized delay={0.4}>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">دسته‌بندی‌ها</h2>
              <p className="text-muted-foreground">
                محصولات را بر اساس دسته‌بندی مشاهده کنید
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => {
                const Icon = 
                  category.slug === 'headphones' ? HeadphonesIcon :
                  category.slug === 'speakers' ? Speaker :
                  category.slug === 'smartwatch' ? Watch :
                  Smartphone;
                
                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group"
                  >
                    <Card className="h-full border border-divider rounded-xl hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="mx-auto mb-4 p-3 rounded-full border-2 border-mustard/20 bg-mustard/5 w-fit group-hover:border-mustard transition-colors">
                          <Icon className="h-8 w-8 text-mustard" />
                        </div>
                        <CardTitle className="text-center group-hover:text-mustard transition-colors">
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {category.description && (
                          <p className="text-sm text-muted-foreground text-center">
                            {category.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </FadeInOptimized>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <FadeInOptimized delay={0.5}>
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold mb-2">نظرات مشتریان</h2>
            <p className="text-muted-foreground">
              تجربه خرید مشتریان راضی ما
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "علی احمدی",
                rating: 5,
                comment:
                  "خرید بسیار رضایت‌بخشی بود. محصول با کیفیت و ارسال سریع. حتماً دوباره خرید می‌کنم.",
              },
              {
                name: "مریم رضایی",
                rating: 5,
                comment:
                  "خدمات عالی و پشتیبانی خوب. محصولات اصیل و با کیفیت هستند. پیشنهاد می‌کنم.",
              },
              {
                name: "حسین کریمی",
                rating: 5,
                comment:
                  "بهترین تجربه خرید آنلاین که داشتم. قیمت مناسب و کیفیت عالی. ممنون از تیم آریو.",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur border border-divider transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-mustard">
                        ★
                      </span>
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeInOptimized>
      </section>
    </div>
  );
}
