// src/pages/Home.tsx
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="text-center max-w-xl w-full space-y-6 backdrop-blur-md bg-white/5 rounded-2xl p-6 sm:p-8 md:p-10 border border-white/10 shadow-xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide">
          Welcome to <span className="font-semibold">blurchat</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
          Random chatrooms. Watch movies together. Code, react, play — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <Button
            variant="default"
            className="bg-white/10 hover:bg-white/20 text-white w-full sm:w-auto"
            onClick={() => navigate("/chat")}
          >
            🎤 Join Chat Room
          </Button>

          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
            onClick={() => navigate("/watch")}
          >
            🎬 Watch Together
          </Button>
        </div>

        <Button
          variant="ghost"
          className="text-sm text-gray-400 underline hover:text-white transition"
          onClick={() => navigate("/games")}
        >
          🎮 Explore Games
        </Button>
      </div>
    </div>
  )
}
