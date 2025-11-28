"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import Image from "next/image";

interface CheckoutFormData {
  // Step 1: Customer Info
  fullName: string;
  phone: string;
  email: string;

  // Step 2: Address & Shipping
  city: string;
  address: string;
  postalCode: string;
  shippingMethod: string;
}

const shippingMethods = [
  {
    id: "normal",
    name: "ارسال عادی",
    description: "۳–۵ روز کاری",
    cost: 50000,
  },
  {
    id: "express",
    name: "ارسال سریع",
    description: "۱–۲ روز کاری",
    cost: 100000,
  },
];

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const getProduct = useCartStore((state) => state.getProduct);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    postalCode: "",
    shippingMethod: "normal",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

  const subtotal = getSubtotal();
  const selectedShipping = shippingMethods.find(
    (m) => m.id === formData.shippingMethod
  ) || shippingMethods[0];
  const shippingCost = selectedShipping.cost;
  const grandTotal = subtotal + shippingCost;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      addToast({
        title: "سبد خرید خالی است",
        description: "لطفاً ابتدا محصولی به سبد خرید اضافه کنید",
        variant: "error",
      });
      router.push("/cart");
    }
  }, [cartItems.length, router, addToast]);

  const validateStep1 = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "نام و نام خانوادگی الزامی است";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "شماره موبایل الزامی است";
    } else if (!/^09\d{9}$/.test(formData.phone)) {
      newErrors.phone = "شماره موبایل معتبر نیست (مثال: 09123456789)";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "ایمیل معتبر نیست";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.city.trim()) {
      newErrors.city = "شهر الزامی است";
    }

    if (!formData.address.trim()) {
      newErrors.address = "آدرس کامل الزامی است";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "کد پستی الزامی است";
    } else if (!/^\d{10}$/.test(formData.postalCode)) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
    }

    if (!formData.shippingMethod) {
      newErrors.shippingMethod = "لطفاً روش ارسال را انتخاب کنید";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Generate fake order ID
    const orderId = `ARIO-2025-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;

    // Clear cart
    clearCart();

    // Store order data in sessionStorage for success page
    const orderData = {
      orderId,
      formData,
      cartItems: cartItems.map((item) => ({
        ...item,
        product: getProduct(item.productId),
      })),
      subtotal,
      shippingCost,
      grandTotal,
    };
    sessionStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Redirect to success page
    router.push("/checkout/success");
  };

  const updateField = (field: keyof CheckoutFormData, value: string) => {
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

  if (cartItems.length === 0) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">تکمیل خرید</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    currentStep >= step
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted text-muted-foreground"
                  }`}
                >
                  {currentStep > step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{step}</span>
                  )}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep >= step ? "font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {step === 1 && "اطلاعات مشتری"}
                  {step === 2 && "آدرس و ارسال"}
                  {step === 3 && "مرور و تایید"}
                </span>
              </div>
              {step < 3 && (
                <div
                  className={`h-0.5 flex-1 mx-2 ${
                    currentStep > step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Customer Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">اطلاعات مشتری</h2>

              <div className="space-y-4">
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
                  <Label htmlFor="email">ایمیل (اختیاری)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    placeholder="example@email.com"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address & Shipping */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">آدرس و ارسال</h2>

              <div className="space-y-4">
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

                <div>
                  <Label htmlFor="address">
                    آدرس کامل <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && (
                    <p className="text-sm text-destructive mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="postalCode">
                    کد پستی <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => updateField("postalCode", e.target.value)}
                    placeholder="1234567890"
                    className={errors.postalCode ? "border-destructive" : ""}
                  />
                  {errors.postalCode && (
                    <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>
                  )}
                </div>

                <div>
                  <Label>
                    روش ارسال <span className="text-destructive">*</span>
                  </Label>
                  <div className="space-y-2 mt-2">
                    {shippingMethods.map((method) => (
                      <label
                        key={method.id}
                        className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          formData.shippingMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-muted hover:border-primary/50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={(e) => updateField("shippingMethod", e.target.value)}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <div className="font-semibold">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {method.description}
                          </div>
                        </div>
                        <div className="font-semibold">{formatPrice(method.cost)}</div>
                      </label>
                    ))}
                  </div>
                  {errors.shippingMethod && (
                    <p className="text-sm text-destructive mt-1">{errors.shippingMethod}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4">مرور و تایید سفارش</h2>

              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="font-semibold">محصولات:</h3>
                {cartItems.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 border rounded-lg"
                    >
                      <div className="relative w-20 h-20 shrink-0 rounded-md overflow-hidden border">
                        <Image
                          src={product.mainImage}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          تعداد: {item.quantity} × {formatPrice(product.price)}
                        </p>
                      </div>
                      <div className="font-semibold">
                        {formatPrice(product.price * item.quantity)}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer Info */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold">اطلاعات مشتری:</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-muted-foreground">نام:</span> {formData.fullName}
                  </p>
                  <p>
                    <span className="text-muted-foreground">موبایل:</span> {formData.phone}
                  </p>
                  {formData.email && (
                    <p>
                      <span className="text-muted-foreground">ایمیل:</span> {formData.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold">آدرس ارسال:</h3>
                <div className="text-sm space-y-1">
                  <p>{formData.address}</p>
                  <p>
                    {formData.city}، کد پستی: {formData.postalCode}
                  </p>
                  <p>
                    روش ارسال:{" "}
                    {shippingMethods.find((m) => m.id === formData.shippingMethod)?.name}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handleBack}>
                <ArrowRight className="h-4 w-4 ml-2" />
                بازگشت
              </Button>
            )}
            <div className="mr-auto" />
            {currentStep < 3 ? (
              <Button onClick={handleNext}>
                ادامه
                <ArrowLeft className="h-4 w-4 mr-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} size="lg">
                ثبت نهایی سفارش
              </Button>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
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
                <span className="font-semibold">{formatPrice(shippingCost)}</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>مجموع کل:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
