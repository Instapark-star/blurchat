import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function RandomMatch() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 bg-animated">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="glass text-white">
          <CardHeader>
            <CardTitle>🎯 Random Match</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">
              Connect with random users instantly — coming soon!
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
