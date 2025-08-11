// src/components/ui/use-toast.tsx
import React, { createContext, useContext, useState, useCallback } from "react";

type ToastEntry = { id: string; node: React.ReactNode; duration?: number };

const ToastContext = createContext<{ toast: (node: React.ReactNode, opts?: { duration?: number }) => void } | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const toast = useCallback((node: React.ReactNode, opts?: { duration?: number }) => {
    const id = `t-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const entry: ToastEntry = { id, node, duration: opts?.duration ?? 3000 };
    setToasts((s) => [...s, entry]);
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, entry.duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div aria-live="polite" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-black/80 text-white px-3 py-2 rounded shadow-md max-w-xs">
            {t.node}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
