"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MiniCartProps {
  children: React.ReactNode;
}

export function MiniCart({ children }: MiniCartProps) {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const getProduct = useCartStore((state) => state.getProduct);
  const getSubtotal = useCartStore((state) => state.getSubtotal);

  const subtotal = getSubtotal();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>سبد خرید</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-12 text-center">
              <p className="text-lg font-semibold mb-2">سبد خرید شما خالی است</p>
              <p className="text-sm text-muted-foreground mb-6">
                محصولات را به سبد خرید اضافه کنید
              </p>
              <Link href="/products">
                <Button>مشاهده محصولات</Button>
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6">
                {cartItems.map((item) => {
                  const product = getProduct(item.productId);
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

                      <div className="flex-1 flex flex-col gap-2">
                        <Link href={`/product/${product.slug}`}>
                          <h4 className="text-sm font-semibold line-clamp-2 hover:text-primary">
                            {product.name}
                          </h4>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(product.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-auto">
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
                          <span className="w-8 text-center text-sm font-medium">
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
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(item.productId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">جمع کل:</span>
                  <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      router.push("/checkout");
                    }}
                  >
                    تکمیل خرید
                  </Button>
                  <Link href="/cart" className="w-full">
                    <Button variant="outline" className="w-full">
                      مشاهده سبد خرید
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

