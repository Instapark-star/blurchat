import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Games() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 bg-animated">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="glass text-white">
          <CardHeader>
            <CardTitle>🎮 Games</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Multiplayer games will appear here in future versions!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
