"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";

interface OrderData {
  orderId: string;
  formData: {
    fullName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
    postalCode: string;
    shippingMethod: string;
  };
  cartItems: Array<{
    productId: string;
    quantity: number;
    product?: {
      id: string;
      name: string;
      mainImage: string;
      price: number;
    };
  }>;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("lastOrder");
    if (stored) {
      setOrderData(JSON.parse(stored));
      // Clear the stored order after displaying
      sessionStorage.removeItem("lastOrder");
    } else {
      // If no order data, redirect to home
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-4">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">سفارش شما با موفقیت ثبت شد!</h1>
          <p className="text-muted-foreground mb-4">
            از خرید شما متشکریم. سفارش شما در حال پردازش است.
          </p>
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">شماره سفارش:</p>
            <p className="text-2xl font-bold">{orderData.orderId}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 mb-6 space-y-6">
          <h2 className="text-xl font-bold">خلاصه سفارش</h2>

          {/* Order Items */}
          <div className="space-y-4">
            {orderData.cartItems.map((item) => {
              if (!item.product) return null;

              return (
                <div key={item.productId} className="flex gap-4">
                  <div className="relative w-16 h-16 shrink-0 rounded-md overflow-hidden border">
                    <Image
                      src={item.product.mainImage}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{item.product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      تعداد: {item.quantity} × {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {formatPrice(item.product.price * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Totals */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">جمع کل:</span>
              <span>{formatPrice(orderData.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">هزینه ارسال:</span>
              <span>{formatPrice(orderData.shippingCost)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2">
              <span>مجموع کل:</span>
              <span>{formatPrice(orderData.grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">اطلاعات ارسال</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">نام:</span> {orderData.formData.fullName}
            </p>
            <p>
              <span className="text-muted-foreground">موبایل:</span> {orderData.formData.phone}
            </p>
            {orderData.formData.email && (
              <p>
                <span className="text-muted-foreground">ایمیل:</span> {orderData.formData.email}
              </p>
            )}
            <p>
              <span className="text-muted-foreground">آدرس:</span> {orderData.formData.address}
            </p>
            <p>
              <span className="text-muted-foreground">شهر:</span> {orderData.formData.city}، کد
              پستی: {orderData.formData.postalCode}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" variant="outline">
              <ShoppingBag className="h-5 w-5 ml-2" />
              ادامه خرید
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg">بازگشت به صفحه اصلی</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

