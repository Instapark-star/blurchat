// src/pages/WatchRoom.tsx
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useToast } from "../components/ui/use-toast"

export default function WatchRoom() {
  const [roomCode, setRoomCode] = useState("")
  const { toast } = useToast()

  const handleJoin = () => {
    if (!roomCode.trim()) {
      toast({
        title: "❌ Invalid Room Code",
        description: "Please enter a valid room code to continue.",
        duration: 3000,
      })
      return
    }

    // TODO: Replace with actual navigation + socket join logic
    toast({
      title: "Joining Room",
      description: `Connecting to room: ${roomCode}`,
      duration: 3000,
    })
  }

  const handleCopyInvite = () => {
    const link = `${window.location.origin}/watch/${roomCode || "ABCD1234"}`
    navigator.clipboard.writeText(link)
    toast({
      title: "📋 Invite Link Copied",
      description: "Share this link with friends to watch together.",
      duration: 3000,
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4 py-8">
      <div className="w-full max-w-3xl space-y-8 backdrop-blur-md bg-white/5 rounded-2xl p-6 md:p-10 border border-white/10 shadow-xl">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-light text-center tracking-wide">
          🎬 <span className="font-semibold">Watch Together</span>
        </h1>

        {/* Video Player */}
        <div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10 shadow-inner">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
            title="Watch Together"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Room Controls */}
        <div className="flex flex-col gap-4">
          <Button
            className="bg-white/10 hover:bg-white/20 text-white w-full"
            onClick={() => {
              const newCode = Math.random().toString(36).substring(2, 8).toUpperCase()
              setRoomCode(newCode)
              toast({
                title: "✅ Room Created",
                description: `Your room code is ${newCode}`,
                duration: 3000,
              })
            }}
          >
            ➕ Create New Room
          </Button>

          {/* Join Room */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              placeholder="Enter Room Code"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 flex-1"
            />
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 w-full md:w-auto"
              onClick={handleJoin}
            >
              🔗 Join Room
            </Button>
          </div>

          {/* Invite Link */}
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              readOnly
              value={`${window.location.origin}/watch/${roomCode || "ABCD1234"}`}
              className="bg-white/5 border-white/10 text-white text-sm flex-1"
            />
            <Button
              variant="secondary"
              className="bg-white/10 hover:bg-white/20 text-white w-full md:w-auto"
              onClick={handleCopyInvite}
            >
              📋 Copy Invite
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center pt-4">
          <Button
            variant="ghost"
            className="text-sm text-gray-400 underline hover:text-white transition"
            onClick={() => window.history.back()}
          >
            🔙 Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
