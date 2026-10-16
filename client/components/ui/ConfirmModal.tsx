"use client";

import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  isBusy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmModal = ({
  title,
  message,
  confirmLabel,
  isBusy = false,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isBusy) onCancel();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBusy, onCancel]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isBusy) onCancel();
      }}
    >
      <section
        aria-describedby="confirm-modal-message"
        aria-labelledby="confirm-modal-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-6 shadow-2xl"
        role="alertdialog"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <AlertTriangle aria-hidden="true" size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <h2
              className="text-lg font-semibold text-neutral-900"
              id="confirm-modal-title"
            >
              {title}
            </h2>
            <p
              className="mt-2 break-words text-sm leading-6 text-neutral-600"
              id="confirm-modal-message"
            >
              {message}
            </p>
          </div>
          <button
            aria-label="Close confirmation"
            className="-mr-2 -mt-2 rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isBusy}
            onClick={onCancel}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-xl border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isBusy}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            autoFocus
            className="rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-600/30 focus:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
            disabled={isBusy}
            onClick={onConfirm}
            type="button"
          >
            {isBusy ? "Deleting..." : confirmLabel}
          </button>
        </div>
      </section>
    </div>
  );
};
