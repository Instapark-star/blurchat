// src/components/PrivateMessage.tsx
import React from "react";
import { MessageType } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  message: MessageType;
  currentUser: string;
}

export default function PrivateMessage({ message, currentUser }: Props) {
  const isMe = message.sender === currentUser;
  return (
    <motion.div
      initial={{ opacity: 0, x: isMe ? 40 : -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: isMe ? 40 : -40 }}
      transition={{ duration: 0.2 }}
      className={cn("max-w-[70%] p-3 rounded-lg", isMe ? "bg-indigo-600 text-white ml-auto" : "bg-purple-700 text-white mr-auto")}
      role="article"
      aria-label={`Private message from ${message.sender}`}
    >
      <div className="font-semibold text-sm mb-1">{isMe ? "You (private)" : `${message.sender} (private)`}</div>
      <div>{message.text}</div>
      {message.timestamp && <time className="block text-xs text-gray-200 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</time>}
    </motion.div>
  );
}
