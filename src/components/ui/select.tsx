// src/components/ui/select.tsx
import React, { createContext, useContext, useState } from "react";
import { cn } from "@/lib/utils";

type SelectContextType = {
  value: string;
  setValue: (v: string) => void;
};

const SelectContext = createContext<SelectContextType | undefined>(undefined);

export const Select: React.FC<{ value?: string; onValueChange?: (v: string) => void; children?: React.ReactNode; className?: string }> = ({ value: controlledValue, onValueChange, children, className }) => {
  const [value, setValue] = useState(controlledValue ?? "");
  const setAndNotify = (v: string) => {
    setValue(v);
    onValueChange?.(v);
  };
  return <SelectContext.Provider value={{ value, setValue: setAndNotify }}>{children}</SelectContext.Provider>;
};

export const SelectTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className, ...rest }) => {
  const ctx = useContext(SelectContext)!;
  return (
    <button type="button" className={cn("inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5", className)} {...rest}>
      {children}
      <span className="ml-2 text-xs opacity-70">{ctx.value || "Everyone (Public)"}</span>
    </button>
  );
};

export const SelectContent: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={cn("mt-1 bg-white/5 border border-white/10 rounded-md p-1 shadow-lg", className)}>{children}</div>;
};

export const SelectItem: React.FC<{ value: string; children?: React.ReactNode }> = ({ value, children }) => {
  const ctx = useContext(SelectContext)!;
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => ctx.setValue(value)}
      onKeyDown={(e) => e.key === "Enter" && ctx.setValue(value)}
      className="px-2 py-1 rounded hover:bg-white/10 cursor-pointer text-sm"
    >
      {children ?? value}
    </div>
  );
};

export const SelectValue: React.FC<{ placeholder?: string }> = ({ placeholder }) => {
  const ctx = useContext(SelectContext)!;
  return <>{ctx.value || placeholder}</>;
};
