"use client";

import { AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";

interface ErrorModalProps {
  message: string;
}

export const ErrorModal = ({ message }: ErrorModalProps) => {
  const [isOpen, setIsOpen] = useState(Boolean(message));

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!message || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/45 p-4">
      <section
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-message"
        aria-modal="true"
        className="max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-rose-100 bg-white p-5 shadow-2xl sm:p-6"
        role="alertdialog"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600">
            <AlertCircle aria-hidden="true" size={22} />
          </div>
          <div className="min-w-0 flex-1">
            <h2
              className="text-lg font-semibold text-neutral-900"
              id="error-modal-title"
            >
              Something went wrong
            </h2>
            <p
              className="mt-2 break-words text-sm leading-6 text-neutral-600"
              id="error-modal-message"
            >
              {message}
            </p>
          </div>
          <button
            aria-label="Close error message"
            className="-mr-2 -mt-2 rounded-lg p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <X aria-hidden="true" size={18} />
          </button>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            autoFocus
            className="rounded-xl bg-[#2D6A4F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#23533E] focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 focus:ring-offset-2"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            OK
          </button>
        </div>
      </section>
    </div>
  );
};
