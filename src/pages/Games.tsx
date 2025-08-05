// src/pages/Games.tsx
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const games = [
  {
    emoji: "❌⭕",
    title: "Tic Tac Toe",
    description: "Play a classic 1v1 strategy game.",
    link: "#", // update later
  },
  {
    emoji: "⌨️⏱️",
    title: "Type Racer",
    description: "Test your typing speed and accuracy.",
    link: "#",
  },
  {
    emoji: "🧠🎯",
    title: "Emoji Match",
    description: "Match emojis and beat the timer.",
    link: "#",
  },
  {
    emoji: "🃏",
    title: "Card Flip",
    description: "A simple memory-based card game.",
    link: "#",
  },
]

export default function Games() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-black text-white px-4 py-24">
      <div className="max-w-5xl mx-auto space-y-10">
        <h1 className="text-4xl font-light text-center">
          🎮 <span className="font-semibold">Play a Game</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-md hover:bg-white/10 transition"
            >
              <div className="text-4xl mb-4">{game.emoji}</div>
              <h2 className="text-xl font-semibold">{game.title}</h2>
              <p className="text-sm text-gray-400 mb-4">{game.description}</p>
              <Button
                className="bg-white/10 hover:bg-white/20 text-white w-full"
                onClick={() => alert("Coming soon!")}
                disabled
              >
                🚧 Coming Soon
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-10">
          <Button
            variant="ghost"
            className="text-sm text-gray-400 underline hover:text-white transition"
            onClick={() => navigate("/")}
          >
            🔙 Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
