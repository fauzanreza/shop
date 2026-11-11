"use client";

import { useCartStore } from "@/store/cartStore";
import { useCartTotals } from "@/hooks/useCartTotals";

export function Header() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const { totalQuantity } = useCartTotals();

  return (
    <header className="mb-8 flex items-center justify-between gap-4 bg-ink p-5 text-white">
      <h1 className="text-2xl font-bold">精品商店</h1>
      <button
        data-cart-toggle
        onClick={toggleCart}
        aria-label={`購物車，共 ${totalQuantity} 件商品`}
        className="relative cursor-pointer rounded-md bg-brand px-3 py-2.5 hover:bg-brand-dark"
      >
        🛒 購物車
        <span className="absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-brand">
          {totalQuantity}
        </span>
      </button>
    </header>
  );
}
