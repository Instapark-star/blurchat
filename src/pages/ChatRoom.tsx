// src/pages/ChatRoom.tsx
import { useEffect, useState, useMemo, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { socket } from "@/lib/socket"
import { motion, AnimatePresence } from "framer-motion"
import clsx from "clsx"

function getRandomColor() {
  const colors = [
    "bg-red-500/30", "bg-green-500/30", "bg-blue-500/30",
    "bg-yellow-500/30", "bg-purple-500/30", "bg-pink-500/30",
    "bg-orange-500/30", "bg-teal-500/30"
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

function getRandomName() {
  const emojis = ["🦊", "🐼", "🐸", "🐙", "🦄", "🐧", "🐶", "🐱"]
  return emojis[Math.floor(Math.random() * emojis.length)]
}

interface Message {
  text: string
  sender: string
  color: string
}

export default function ChatRoom() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])

  const bottomRef = useRef<HTMLDivElement>(null)

  const userId = useMemo(() => Math.random().toString(36).substring(2, 8), [])
  const userColor = useMemo(() => getRandomColor(), [])
  const userLabel = useMemo(() => getRandomName(), [])

  useEffect(() => {
    socket.connect()

    socket.on("chat:message", (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!message.trim()) return

    const msg: Message = {
      text: message,
      sender: userLabel,
      color: userColor,
    }

    socket.emit("chat:message", msg)
    setMessage("")
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center gap-4 mt-10">
            <div className="grid grid-cols-4 gap-4">
              {["🦊", "🐼", "🐸", "🐙", "🦄", "🐧", "🐶", "🐱"].map((emoji, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl bg-white/10 animate-pulse"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm">Waiting for someone to send a message...</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25 }}
                className="flex items-start gap-3 max-w-lg"
              >
                <div
                  className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    msg.color
                  )}
                >
                  {msg.sender}
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-xl text-sm">
                  {msg.text}
                </div>
              </motion.div>
            ))}
            <div ref={bottomRef} />
          </AnimatePresence>
        )}
      </div>

      <div className="border-t border-white/10 p-4 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="bg-white/5 border-white/10 text-white"
        />
        <Button
          onClick={handleSend}
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          ➤
        </Button>
      </div>
    </div>
  )
}
