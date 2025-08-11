// src/components/ui/scroll-area.tsx
import React from "react";

export const ScrollArea: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
  return (
    <div className={["overflow-y-auto", className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </div>
  );
};
