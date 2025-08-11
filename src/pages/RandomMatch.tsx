// src/pages/RandomMatch.tsx
import { useState } from "react"
import { Button } from "../components/ui/button"
import { Skeleton } from "../components/ui/skeleton"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../components/ui/dialog"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export default function RandomMatch() {
  const [loading, setLoading] = useState(false)
  const [showMatchDialog, setShowMatchDialog] = useState(false)
  const navigate = useNavigate()

  const handleMatch = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setShowMatchDialog(true)
    }, 2500)
  }

  const handleJoinRoom = () => {
    setShowMatchDialog(false)
    navigate("/chat")
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl w-full text-center space-y-6 backdrop-blur-md bg-white/5 rounded-2xl p-10 border border-white/10 shadow-xl"
        >
          <h1 className="text-4xl font-light tracking-wide">
            Random <span className="font-semibold">Matching</span>
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Instantly connect with a stranger and start chatting anonymously.
          </p>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center gap-6">
                  <Skeleton className="h-16 w-16 rounded-full bg-white/10" />
                  <span className="text-gray-400 text-sm animate-pulse">Matching...</span>
                  <Skeleton className="h-16 w-16 rounded-full bg-white/10" />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Skeleton className="h-4 w-24 rounded bg-white/10" />
                  <Skeleton className="h-4 w-24 rounded bg-white/10" />
                </div>

                <p className="text-sm text-gray-400 animate-pulse">
                  Looking for a partner to connect...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="buttons"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white/10 hover:bg-white/20 text-white"
                    onClick={handleMatch}
                  >
                    🔄 Start Matching
                  </Button>

                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                    onClick={() => alert("🎭 Joining as Guest...")}
                  >
                    🎭 Join as Guest
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="text-sm text-gray-400 underline hover:text-white transition"
                  onClick={() => navigate("/")}
                >
                  🔙 Back to Home
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
        <DialogContent className="bg-black text-white border-white/10">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              🎯 You’ve Been Matched!
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-400 text-sm">
            Someone is ready to chat. Click below to join the room.
          </p>
          <DialogFooter>
            <Button
              onClick={handleJoinRoom}
              className="w-full bg-white/10 hover:bg-white/20"
            >
              🚀 Join Chat Room
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
