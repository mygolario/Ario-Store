"use client";

import Link from "next/link";
import { getAllOrders } from "@/data/orders";
import { formatPersianDate } from "@/lib/date";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

export default function OrdersPage() {
  const orders = getAllOrders();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">سفارش‌های من</h1>
        <p className="text-muted-foreground">
          لیست تمام سفارش‌های ثبت شده شما
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            هنوز سفارشی ثبت نشده است
          </p>
          <Link href="/products">
            <Button>مشاهده محصولات</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-6 bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold">{order.id}</h3>
                    <Badge variant={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>تاریخ: {formatPersianDate(order.createdAt)}</span>
                    <span>روش ارسال: {order.shippingMethod}</span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2">
                  <div className="text-lg font-bold">
                    {formatPrice(order.totalAmount)}
                  </div>
                  <Link href={`/account/orders/${order.id}`}>
                    <Button variant="outline" size="sm">
                      مشاهده جزئیات
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
