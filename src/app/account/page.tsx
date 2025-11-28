"use client";

import Link from "next/link";
import { Package, MapPin, Settings, ShoppingBag } from "lucide-react";
import { getUser } from "@/data/user";
import { getAllOrders } from "@/data/orders";
import { formatPersianDate } from "@/lib/date";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountPage() {
  const user = getUser();
  const orders = getAllOrders();
  const latestOrder = orders[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          خوش آمدید، {user.fullName}!
        </h1>
        <p className="text-muted-foreground">
          اینجا می‌توانید اطلاعات حساب کاربری و سفارش‌های خود را مدیریت کنید.
        </p>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">تعداد سفارش‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{orders.length}</div>
            <p className="text-sm text-muted-foreground mt-2">سفارش ثبت شده</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">آخرین سفارش</CardTitle>
          </CardHeader>
          <CardContent>
            {latestOrder ? (
              <>
                <div className="text-lg font-semibold">{latestOrder.id}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatPersianDate(latestOrder.createdAt)}
                </p>
                <p className="text-sm font-medium mt-2">
                  {formatPrice(latestOrder.totalAmount)}
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">هنوز سفارشی ثبت نشده است</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">شهر</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div className="text-lg font-semibold">{user.city}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>سفارش‌ها</CardTitle>
            <CardDescription>
              مشاهده و مدیریت سفارش‌های خود
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/account/orders">
              <Button className="w-full" variant="outline">
                <ShoppingBag className="h-4 w-4 ml-2" />
                مشاهده سفارش‌ها
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مدیریت پروفایل</CardTitle>
            <CardDescription>
              ویرایش اطلاعات شخصی و تنظیمات حساب
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/account/settings">
              <Button className="w-full" variant="outline">
                <Settings className="h-4 w-4 ml-2" />
                تنظیمات حساب
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
