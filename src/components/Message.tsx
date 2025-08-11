// src/components/Message.tsx
import React from "react";
import { MessageType } from "@/types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  message: MessageType;
  currentUser: string;
}

export default function Message({ message, currentUser }: Props) {
  const isMe = message.sender === currentUser;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className={cn("flex gap-3 items-start max-w-[70%]", isMe ? "ml-auto" : "mr-auto")}
      role="article"
      aria-label={`${message.sender} message`}
    >
      <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold select-none", message.color ?? "bg-white/10")}>
        {message.sender}
      </div>
      <div className={cn("px-3 py-2 rounded-lg text-sm break-words", isMe ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100")}>
        <div className="font-semibold text-xs mb-1">{isMe ? "You" : message.sender}</div>
        <div>{message.text}</div>
        {message.timestamp && <time className="block text-xs text-gray-300 mt-1">{new Date(message.timestamp).toLocaleTimeString()}</time>}
      </div>
    </motion.div>
  );
}
