"use client";

import { useToastStore } from "@/store/toastStore";
import type { ToastType } from "@/types";

const STYLES: Record<ToastType, string> = {
  success: "bg-success",
  error: "bg-brand",
  info: "bg-neutral-700",
};

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-4 left-4 right-4 z-[3000] flex flex-col items-end gap-2 sm:left-auto"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          onClick={() => dismiss(t.id)}
          className={`pointer-events-auto max-w-sm animate-toast-in cursor-pointer rounded-md px-4 py-3 text-sm text-white shadow-lg ${STYLES[t.type]}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
