import { create } from "zustand";
import type { CartItem, Product } from "@/types";

export const MAX_QUANTITY = 99;

const clamp = (n: number) => Math.min(MAX_QUANTITY, Math.max(0, Math.floor(n)));

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  /** Set an absolute quantity (supports any value, not just +/-1). 0 removes the item. */
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (!existing) return { items: [...state.items, { product, quantity: 1 }] };
      return {
        items: state.items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: clamp(i.quantity + 1) } : i,
        ),
      };
    }),

  removeItem: (productId) =>
    set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),

  setQuantity: (productId, quantity) =>
    set((state) => {
      const q = clamp(quantity);
      return {
        items:
          q === 0
            ? state.items.filter((i) => i.product.id !== productId)
            : state.items.map((i) => (i.product.id === productId ? { ...i, quantity: q } : i)),
      };
    }),

  clear: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
}));
