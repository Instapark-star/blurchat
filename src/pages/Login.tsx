import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 bg-animated">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="glass text-white w-full">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🔑 Login to BlurChat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                placeholder="Username"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
              <Input
                type="password"
                placeholder="Password"
                className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                required
              />
              <Button
                type="submit"
                className="w-full bg-white/10 hover:bg-white/20 text-white"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-gray-400 hover:text-white"
                onClick={() => navigate("/register")}
              >
                Don't have an account? Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
