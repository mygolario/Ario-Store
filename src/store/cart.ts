import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { getAllProducts } from "@/data/products";

export interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getItem: (productId: string) => CartItem | undefined;
  getProduct: (productId: string) => Product | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addItem: (productId: string, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.productId === productId
          );

          if (existingItem) {
            // Update quantity if item already exists
            return {
              cartItems: state.cartItems.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Add new item
            return {
              cartItems: [
                ...state.cartItems,
                { productId, quantity, selectedVariant: undefined },
              ],
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => item.productId !== productId
          ),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getTotalItems: () => {
        return get().cartItems.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const products = getAllProducts();
        return get().cartItems.reduce((total, item) => {
          const product = products.find((p) => p.id === item.productId);
          if (product) {
            return total + product.price * item.quantity;
          }
          return total;
        }, 0);
      },

      getItem: (productId: string) => {
        return get().cartItems.find((item) => item.productId === productId);
      },

      getProduct: (productId: string) => {
        const products = getAllProducts();
        return products.find((p) => p.id === productId);
      },
    }),
    {
      name: "ario-cart-storage",
    }
  )
);

