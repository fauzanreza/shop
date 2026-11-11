"use client";

import { memo } from "react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

function ProductCardBase({ product, onAdd }: ProductCardProps) {
  return (
    <article className="flex flex-col rounded-lg border border-neutral-300 bg-white p-4 shadow transition-transform hover:-translate-y-0.5">
      <div className="mb-2.5 flex h-48 items-center justify-center rounded bg-neutral-200 text-neutral-400">
        圖片
      </div>
      <h2 className="mb-2 text-lg font-bold">{product.name}</h2>
      <p className="mb-4 text-xl font-bold text-brand">{formatPrice(product.price)}</p>
      <button
        onClick={() => onAdd(product)}
        className="mt-auto w-full cursor-pointer rounded bg-success px-4 py-2.5 text-sm text-white hover:bg-success-dark"
      >
        加入購物車
      </button>
    </article>
  );
}

export const ProductCard = memo(ProductCardBase);
