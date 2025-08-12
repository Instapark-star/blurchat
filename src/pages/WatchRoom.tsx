import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function WatchRoom() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 bg-animated">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="glass text-white">
          <CardHeader>
            <CardTitle>📺 Watch Room</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Watch videos together in real-time — coming soon!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
