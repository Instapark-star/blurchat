// src/components/ui/button.tsx
import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "destructive" | "outline" | "secondary";
  size?: "sm" | "md" | "lg";
};

export const Button: React.FC<ButtonProps> = ({ children, variant = "default", size = "md", className, ...rest }) => {
  const base = "inline-flex items-center justify-center rounded-md font-medium transition";
  const variants: Record<string, string> = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-200 bg-transparent",
    secondary: "bg-white/10 hover:bg-white/20",
  };
  const sizes: Record<string, string> = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-5 py-3",
  };
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
    </button>
  );
};
