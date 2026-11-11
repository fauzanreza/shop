"use client";

import { useCallback, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useDebounce } from "@/hooks/useDebounce";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import type { Product } from "@/types";
import { SearchBox } from "./SearchBox";
import { ProductCard } from "./ProductCard";

export function ProductSection() {
  const { products, isLoading, error, reload } = useProducts();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 250);

  const addItem = useCartStore((s) => s.addItem);
  const showToast = useToastStore((s) => s.show);

  const filtered = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;
  }, [products, debouncedQuery]);

  const handleAdd = useCallback(
    (product: Product) => {
      addItem(product);
      showToast(`已將「${product.name}」加入購物車`);
    },
    [addItem, showToast],
  );

  return (
    <section>
      <SearchBox value={query} onChange={setQuery} />

      {isLoading && <p className="py-5 text-center text-neutral-400">載入中...</p>}

      {error && (
        <div className="py-5 text-center">
          <p className="mb-3 text-brand">{error}</p>
          <button onClick={reload} className="rounded border px-4 py-2 text-sm hover:bg-neutral-100">
            重試
          </button>
        </div>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <p className="py-10 text-center text-neutral-400">找不到符合「{debouncedQuery}」的商品</p>
      )}

      <div className="mb-8 grid grid-cols-2 gap-2.5 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={handleAdd} />
        ))}
      </div>
    </section>
  );
}
