"use client";

import { useEscapeKey } from "@/hooks/useEscapeKey";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "確認",
  cancelLabel = "取消",
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEscapeKey(onCancel, open && !isLoading);

  if (!open) return null;

  return (
    <div
      data-dialog-overlay
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 p-4"
      onClick={isLoading ? undefined : onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="w-full max-w-sm animate-dialog-in rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 id="dialog-title" className="mb-2 text-lg font-bold">
          {title}
        </h3>
        <div className="mb-6 text-sm text-neutral-600">{description}</div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="rounded border border-neutral-300 px-4 py-2 text-sm hover:bg-neutral-100 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark disabled:opacity-60"
          >
            {isLoading ? "處理中..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
