"use client";

import { useState } from "react";
import { getUser, updateUser, User } from "@/data/user";
import { useToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AccountSettingsPage() {
  const initialUser = getUser();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<User>(initialUser);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Partial<Record<keyof User, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "نام و نام خانوادگی الزامی است";
    }

    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست (مثال: 09123456789)";
    }

    if (!formData.city.trim()) {
      newErrors.city = "شهر الزامی است";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Update user (in real app, this would call an API)
    updateUser(formData);

    // Show success toast
    addToast({
      title: "اطلاعات با موفقیت به‌روزرسانی شد",
      description: "تغییرات شما ذخیره شد",
      variant: "success",
    });

    // Clear errors
    setErrors({});
  };

  const updateField = (field: keyof User, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">تنظیمات حساب کاربری</h1>
        <p className="text-muted-foreground">
          اطلاعات شخصی و تنظیمات حساب خود را ویرایش کنید
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>اطلاعات شخصی</CardTitle>
          <CardDescription>
            اطلاعات تماس و آدرس خود را به‌روزرسانی کنید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="fullName">
                نام و نام خانوادگی <span className="text-destructive">*</span>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => updateField("fullName", e.target.value)}
                className={errors.fullName ? "border-destructive" : ""}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email">
                ایمیل <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone">
                شماره موبایل <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="09123456789"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <Label htmlFor="city">
                شهر <span className="text-destructive">*</span>
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateField("city", e.target.value)}
                className={errors.city ? "border-destructive" : ""}
              />
              {errors.city && (
                <p className="text-sm text-destructive mt-1">{errors.city}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button type="submit" size="lg">
                ذخیره تغییرات
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => {
                  setFormData(initialUser);
                  setErrors({});
                }}
              >
                بازنشانی
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
