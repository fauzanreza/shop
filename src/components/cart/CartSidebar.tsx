"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/store/toastStore";
import { useCartTotals } from "@/hooks/useCartTotals";
import { submitCheckout } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import type { CartItem } from "@/types";
import { CartItemRow } from "./CartItemRow";

type DialogState = { type: "remove"; item: CartItem } | { type: "checkout" } | null;

export function CartSidebar() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const closeCart = useCartStore((s) => s.closeCart);
  const showToast = useToastStore((s) => s.show);
  const { totalQuantity, totalPrice } = useCartTotals();

  const [dialog, setDialog] = useState<DialogState>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Close when clicking outside the sidebar (ignores the header toggle and dialogs).
  useEffect(() => {
    if (!isOpen) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.isConnected) return; // element was removed by React during this click
      if (target.closest("[data-cart-sidebar], [data-cart-toggle], [role=dialog], [role=status]")) return;
      if (target.closest("[data-dialog-overlay]")) return;
      closeCart();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [isOpen, closeCart]);

  const confirmRemove = () => {
    if (dialog?.type !== "remove") return;
    removeItem(dialog.item.product.id);
    showToast(`已移除「${dialog.item.product.name}」`, "info");
    setDialog(null);
  };

  const confirmCheckout = async () => {
    setIsCheckingOut(true);
    try {
      await submitCheckout();
      clear();
      closeCart();
      showToast("結帳成功！感謝您的購買。");
    } catch {
      showToast("結帳失敗，請稍後再試。", "error");
    } finally {
      setIsCheckingOut(false);
      setDialog(null);
    }
  };

  return (
    <>
      <aside
        data-cart-sidebar
        aria-hidden={!isOpen}
        className={`fixed right-0 top-0 z-[1000] flex h-screen w-full max-w-[400px] flex-col bg-white p-5 shadow-[-2px_0_10px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-5 flex items-center justify-between border-b border-neutral-300 pb-4">
          <h2 className="text-xl font-bold">購物車 ({totalQuantity})</h2>
          <button onClick={closeCart} aria-label="關閉購物車" className="cursor-pointer text-2xl text-neutral-400 hover:text-ink">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <p className="mt-12 text-center text-neutral-400">購物車是空的</p>
          ) : (
            <ul>
              {items.map((item) => (
                <CartItemRow
                  key={item.product.id}
                  item={item}
                  onQuantityChange={setQuantity}
                  onRemove={(it) => setDialog({ type: "remove", item: it })}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="border-t-2 border-neutral-300 pt-5">
          <p className="text-center text-2xl font-bold">總計: {formatPrice(totalPrice)}</p>
          <button
            onClick={() => setDialog({ type: "checkout" })}
            disabled={items.length === 0}
            className="mt-4 w-full cursor-pointer rounded bg-brand py-3.5 text-base font-bold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            結帳
          </button>
        </div>
      </aside>

      <ConfirmDialog
        open={dialog?.type === "remove"}
        title="移除商品"
        description={
          dialog?.type === "remove" ? <>確定要從購物車移除「{dialog.item.product.name}」嗎？</> : null
        }
        confirmLabel="移除"
        onConfirm={confirmRemove}
        onCancel={() => setDialog(null)}
      />

      <ConfirmDialog
        open={dialog?.type === "checkout"}
        title="確認結帳"
        description={
          <>
            共 <b>{totalQuantity}</b> 件商品，總金額 <b>{formatPrice(totalPrice)}</b>。確定要結帳嗎？
          </>
        }
        confirmLabel="確認結帳"
        isLoading={isCheckingOut}
        onConfirm={confirmCheckout}
        onCancel={() => setDialog(null)}
      />
    </>
  );
}
