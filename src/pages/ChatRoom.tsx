// src/pages/ChatRoom.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { socket } from "@/lib/socket";
import UserList from "@/components/UserList";
import MessageList from "@/components/MessageList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import type { MessageType, User } from "@/types";

function getRandomColor() {
  const colors = ["bg-red-500/30","bg-green-500/30","bg-blue-500/30","bg-yellow-500/30","bg-purple-500/30","bg-pink-500/30","bg-orange-500/30","bg-teal-500/30"];
  return colors[Math.floor(Math.random()*colors.length)];
}
function getRandomName() {
  const emojis = ["🦊","🐼","🐸","🐙","🦄","🐧","🐶","🐱"];
  return emojis[Math.floor(Math.random()*emojis.length)];
}

export default function ChatRoomPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [input, setInput] = useState("");
  const [recipient, setRecipient] = useState<string>("");
  const [clearOpen, setClearOpen] = useState(false);
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [newCount, setNewCount] = useState(0);

  const toast = useToast().toast;
  const listRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const userLabel = useMemo(() => getRandomName(), []);
  const userColor = useMemo(() => getRandomColor(), []);

  useEffect(() => {
    socket.connect();
    socket.emit("chat:join", { sender: userLabel, color: userColor });

    socket.on("chat:message", (msg: MessageType) => {
      setMessages((prev) => [...prev, msg]);
      if (isScrolledUp) setNewCount((c) => c + 1);
    });
    socket.on("chat:users", (list: User[]) => setUsers(list));
    socket.on("chat:userJoined", ({ sender }: { sender: string }) => {
      const sys: MessageType = { id: `sys-join-${Date.now()}`, text: `${sender} joined`, sender: "System", color: "bg-green-500/50", timestamp: Date.now() };
      setMessages((p) => [...p, sys]);
      toast(<span>{sender} joined the chat</span>);
    });
    socket.on("chat:userLeft", ({ sender }: { sender: string }) => {
      const sys: MessageType = { id: `sys-left-${Date.now()}`, text: `${sender} left`, sender: "System", color: "bg-red-500/50", timestamp: Date.now() };
      setMessages((p) => [...p, sys]);
      toast(<span>{sender} left the chat</span>);
    });

    return () => {
      socket.off("chat:message");
      socket.off("chat:users");
      socket.off("chat:userJoined");
      socket.off("chat:userLeft");
      socket.disconnect();
    };
  }, [userLabel, userColor, toast, isScrolledUp]);

  useEffect(() => {
    if (!isScrolledUp) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!isScrolledUp) setNewCount(0);
  }, [messages, isScrolledUp]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    const msg: MessageType = { id: `msg-${Date.now()}`, text, sender: userLabel, color: userColor, timestamp: Date.now(), privateTo: recipient || undefined };
    socket.emit("chat:message", msg);
    setMessages((p) => [...p, msg]);
    setInput("");
    socket.emit("chat:stopTyping", { sender: userLabel });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("chat:typing", { sender: userLabel });
  };

  const onScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 12;
    setIsScrolledUp(!atBottom);
    if (atBottom) setNewCount(0);
  };

  const clearChat = () => {
    setMessages([]);
    setClearOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      <UserList users={users} currentUser={userLabel} />
      <main className="flex-1 flex flex-col">
        <div ref={listRef} onScroll={onScroll} className="flex-1 overflow-y-auto p-4 space-y-3" role="log" aria-live="polite">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-10">
              <div className="grid grid-cols-4 gap-4 justify-center">
                {["🦊","🐼","🐸","🐙","🦄","🐧","🐶","🐱"].map((e,i)=> (<div key={i} className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 animate-pulse">{e}</div>))}
              </div>
              <p className="mt-4">Waiting for someone to send a message...</p>
            </div>
          ) : (
            <MessageList messages={messages} currentUser={userLabel} />
          )}
          <div ref={bottomRef} />
        </div>

        {isScrolledUp && newCount > 0 && (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-20">
            <Button onClick={() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); setIsScrolledUp(false); setNewCount(0);}}>
              {newCount} new message{newCount>1 ? "s" : ""}
            </Button>
          </div>
        )}

        <div className="border-t border-white/10 p-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <Input value={input} onChange={handleInputChange} placeholder={recipient ? `Message to ${recipient}...` : "Type your message..."} onKeyDown={(e)=>{ if(e.key==="Enter") handleSend();}} aria-label="Message input" className="flex-1" />
            <Button onClick={handleSend} aria-label="Send message">➤</Button>
          </div>

          <div className="flex items-center gap-2">
            <Select value={recipient} onValueChange={(v)=>setRecipient(v)}>
              <SelectTrigger>Recipient</SelectTrigger>
              <SelectContent>
                <SelectItem value="">Everyone (Public)</SelectItem>
                {users.filter(u=>u.name !== userLabel).map(u => <SelectItem key={u.name} value={u.name}>{u.name}</SelectItem>)}
              </SelectContent>
            </Select>

            <Dialog open={clearOpen} onOpenChange={setClearOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Clear Chat</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Clear Chat</DialogTitle>
                </DialogHeader>
                <DialogDescription>Are you sure you want to clear chat? This cannot be undone.</DialogDescription>
                <DialogFooter>
                  <Button onClick={() => setClearOpen(false)} variant="outline">Cancel</Button>
                  <Button variant="destructive" onClick={clearChat}>Clear</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </main>
    </div>
  );
}
