"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Package, Truck, Home } from "lucide-react";
import { getOrderById } from "@/data/orders";
import { getAllProducts } from "@/data/products";
import { formatPersianDateTime } from "@/lib/date";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function getStatusColor(status: string): "default" | "secondary" | "destructive" {
  switch (status) {
    case "تحویل شده":
      return "default";
    case "ارسال شده":
      return "secondary";
    case "در حال پردازش":
      return "secondary";
    case "لغو شده":
      return "destructive";
    default:
      return "secondary";
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "تحویل شده":
      return <CheckCircle className="h-5 w-5" />;
    case "ارسال شده":
      return <Truck className="h-5 w-5" />;
    case "در حال پردازش":
      return <Package className="h-5 w-5" />;
    default:
      return <Package className="h-5 w-5" />;
  }
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);
  const products = getAllProducts();

  useEffect(() => {
    params.then((p) => setOrderId(p.id));
  }, [params]);

  if (!orderId) {
    return <div className="container mx-auto px-4 py-8">در حال بارگذاری...</div>;
  }

  const order = getOrderById(orderId);

  if (!order) {
    router.push("/account/orders");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/account/orders">
          <Button variant="ghost" className="mb-4">
            <ArrowRight className="h-4 w-4 ml-2" />
            بازگشت به لیست سفارش‌ها
          </Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">جزئیات سفارش</h1>
            <p className="text-muted-foreground">شماره سفارش: {order.id}</p>
          </div>
          <Badge variant={getStatusColor(order.status)} className="text-lg px-4 py-2">
            <span className="ml-2">{getStatusIcon(order.status)}</span>
            {order.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>وضعیت سفارش</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { status: "در حال پردازش", active: true },
                  { status: "ارسال شده", active: order.status !== "در حال پردازش" },
                  {
                    status: "تحویل شده",
                    active: order.status === "تحویل شده",
                  },
                ].map((step, index) => (
                  <div
                    key={step.status}
                    className={`flex items-center gap-3 ${
                      step.active ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.active ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">{step.status}</p>
                      {step.active && step.status === order.status && (
                        <p className="text-sm text-muted-foreground">
                          {formatPersianDateTime(order.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>محصولات سفارش</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => {
                  const product = products.find((p) => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <Link
                        href={`/product/${product.slug}`}
                        className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden border"
                      >
                        <Image
                          src={product.mainImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/product/${product.slug}`}>
                          <h4 className="font-semibold hover:text-primary">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {product.brand}
                        </p>
                        <div className="mt-2 flex items-center gap-4 text-sm">
                          <span>تعداد: {item.quantity}</span>
                          <span>قیمت واحد: {formatPrice(item.unitPrice)}</span>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>خلاصه سفارش</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">جمع کل:</span>
                  <span className="font-semibold">
                    {formatPrice(
                      order.items.reduce(
                        (sum, item) => sum + item.unitPrice * item.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">هزینه ارسال:</span>
                  <span className="font-semibold">
                    {formatPrice(0)} {/* Shipping cost would be calculated */}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>مجموع کل:</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-2">روش ارسال:</p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingMethod}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    آدرس ارسال:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.shippingAddress.city}، کد پستی:{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

