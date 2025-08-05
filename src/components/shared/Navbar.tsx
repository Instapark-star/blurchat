// src/components/shared/Navbar.tsx
import { Link } from "react-router-dom"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-semibold tracking-wide">
          blurchat
        </Link>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>

          <SheetContent className="bg-black text-white">
            <div className="mt-10 space-y-4">
              <Link to="/" className="block text-lg hover:text-gray-300">
                Home
              </Link>
              <Link to="/chat" className="block text-lg hover:text-gray-300">
                Join Chat
              </Link>
              <Link to="/watch" className="block text-lg hover:text-gray-300">
                Watch Together
              </Link>
              <Link to="/random" className="block text-lg hover:text-gray-300">
                Random Match
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
