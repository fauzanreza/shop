import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "@/lib/api";
import type { Product } from "@/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      setProducts(await fetchProducts());
    } catch {
      setError("載入商品失敗，請稍後再試。");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { products, isLoading, error, reload: load };
}
