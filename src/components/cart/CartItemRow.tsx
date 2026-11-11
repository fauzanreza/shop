"use client";

import { useEffect, useState } from "react";
import { MAX_QUANTITY } from "@/store/cartStore";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (item: CartItem) => void;
}

export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const { product, quantity } = item;
  // Local draft so the user can freely type multi-digit quantities.
  const [draft, setDraft] = useState(String(quantity));

  useEffect(() => setDraft(String(quantity)), [quantity]);

  const commit = () => {
    const n = parseInt(draft, 10);
    if (Number.isNaN(n) || n < 1) {
      setDraft(String(quantity)); // invalid: revert (use the remove button to delete)
      return;
    }
    onQuantityChange(product.id, n);
    setDraft(String(Math.min(n, MAX_QUANTITY)));
  };

  const decrease = () => (quantity <= 1 ? onRemove(item) : onQuantityChange(product.id, quantity - 1));

  const btn = "flex h-7 w-7 cursor-pointer items-center justify-center rounded bg-neutral-100 hover:bg-neutral-200 disabled:opacity-40";

  return (
    <li className="flex items-center border-b border-neutral-200 py-4">
      <div className="mr-4 flex h-14 w-14 shrink-0 items-center justify-center rounded bg-neutral-200 text-xs text-neutral-400">
        圖片
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 truncate text-sm">{product.name}</p>
        <p className="font-bold text-brand">{formatPrice(product.price)}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <button className={btn} onClick={decrease} aria-label="減少數量">
            −
          </button>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_QUANTITY}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            aria-label={`${product.name} 數量`}
            className="h-7 w-14 rounded border border-neutral-300 text-center text-sm font-bold [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button
            className={btn}
            onClick={() => onQuantityChange(product.id, quantity + 1)}
            disabled={quantity >= MAX_QUANTITY}
            aria-label="增加數量"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item)}
        aria-label={`移除 ${product.name}`}
        className="ml-2 cursor-pointer p-1 text-neutral-400 hover:text-brand"
      >
        🗑
      </button>
    </li>
  );
}
