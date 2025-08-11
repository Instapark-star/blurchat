// src/App.tsx
import React from "react";
import ChatRoom from "@/pages/ChatRoom";
import { ToastProvider } from "@/components/ui/use-toast";

export default function App() {
  return (
    <ToastProvider>
      <ChatRoom />
    </ToastProvider>
  );
}
