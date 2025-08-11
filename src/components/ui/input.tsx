// src/components/ui/input.tsx
import React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...rest }, ref) => {
  return <input ref={ref} className={cn("rounded-md border border-white/10 bg-white/5 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500", className)} {...rest} />;
});
Input.displayName = "Input";
