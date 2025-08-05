// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Footer from "./components/shared/Footer"
import { Toaster } from "@/components/ui/toaster"

import Home from "./pages/Home"
import ChatRoom from "./pages/ChatRoom"
import WatchRoom from "./pages/WatchRoom"
import RandomMatch from "./pages/RandomMatch"
import Games from "./pages/Games" // if created

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-black text-white">
        <Navbar />
        <Toaster /> {/* 👈 Required for toast notifications */}
        <main className="pt-20 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatRoom />} />
            <Route path="/watch" element={<WatchRoom />} />
            <Route path="/random" element={<RandomMatch />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
