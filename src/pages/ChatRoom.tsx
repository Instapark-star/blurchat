import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function ChatRoom() {
  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      setMessages([...messages, text]);
      setText("");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 bg-animated">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass text-white w-full">
          <CardHeader>
            <CardTitle>💬 BlurChat Room</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-64 overflow-y-auto bg-white/5 p-3 rounded-md">
              {messages.length === 0 ? (
                <p className="text-gray-400">No messages yet...</p>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className="mb-2">
                    {msg}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
              <Button onClick={sendMessage} className="bg-white/10 hover:bg-white/20">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
