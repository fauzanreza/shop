import { useMemo } from "react";
import { useCartStore } from "@/store/cartStore";

/** Derived cart values: total quantity of all units and total price. */
export function useCartTotals() {
  const items = useCartStore((s) => s.items);

  return useMemo(
    () => ({
      totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    [items],
  );
}
