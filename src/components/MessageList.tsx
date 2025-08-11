// src/components/MessageList.tsx
import React from "react";
import Message from "./Message";
import PrivateMessage from "./PrivateMessage";
import { MessageType } from "@/types";

interface Props {
  messages: MessageType[];
  currentUser: string;
}

export default function MessageList({ messages, currentUser }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      {messages.map((m) => (m.privateTo ? <PrivateMessage key={m.id} message={m} currentUser={currentUser} /> : <Message key={m.id} message={m} currentUser={currentUser} />))}
    </div>
  );
}
