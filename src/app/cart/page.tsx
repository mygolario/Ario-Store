"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getProduct = useCartStore((state) => state.getProduct);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const subtotal = getSubtotal();
  const shippingCost = 0; // Will be calculated in checkout
  const grandTotal = subtotal + shippingCost;

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-2">سبد خرید شما خالی است</h1>
          <p className="text-muted-foreground mb-6">
            محصولات را به سبد خرید اضافه کنید
          </p>
          <Link href="/products">
            <Button size="lg">مشاهده محصولات</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">سبد خرید</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;

            return (
              <div
                key={item.productId}
                className="flex gap-4 p-4 border rounded-lg bg-card"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden border"
                >
                  <Image
                    src={product.mainImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </Link>

                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link href={`/product/${product.slug}`}>
                        <h3 className="text-lg font-semibold hover:text-primary mb-1">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {product.brand}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">تعداد:</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-left">
                      <p className="text-sm text-muted-foreground">
                        قیمت واحد: {formatPrice(product.price)}
                      </p>
                      <p className="text-lg font-bold">
                        {formatPrice(product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-lg p-6 bg-card space-y-4">
            <h2 className="text-xl font-bold mb-4">خلاصه سفارش</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">جمع کل:</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">هزینه ارسال:</span>
                <span className="font-semibold">
                  {shippingCost === 0
                    ? "در مرحله بعد محاسبه می‌شود"
                    : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>مجموع کل:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6"
              size="lg"
              onClick={() => router.push("/checkout")}
            >
              ادامه و ثبت سفارش
            </Button>

            <Link href="/products" className="block">
              <Button variant="outline" className="w-full">
                ادامه خرید
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
