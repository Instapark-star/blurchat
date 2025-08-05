// src/components/shared/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/60 text-white backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} blurchat — All rights reserved.
        </p>
        <div className="flex gap-6 text-sm">
          <a
            href="/games"
            className="hover:text-white transition text-gray-400"
          >
            🎮 Games
          </a>
          <a
            href="https://github.com/instapark-star/blurchat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition text-gray-400"
          >
            💻 GitHub
          </a>
          <a
            href="#"
            className="hover:text-white transition text-gray-400"
          >
            📖 About
          </a>
        </div>
      </div>
    </footer>
  )
}
