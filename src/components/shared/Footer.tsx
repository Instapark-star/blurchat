import * as React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/10 bg-black/60 text-white backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Copyright */}
        <p className="text-sm text-gray-400 select-none">
          © {year} blurchat — All rights reserved.
        </p>

        {/* Footer Navigation */}
        <nav className="flex gap-6 text-sm" aria-label="Footer navigation">
          <a
            href="/games"
            className="hover:text-white transition-colors text-gray-400"
          >
            🎮 Games
          </a>
          <a
            href="https://github.com/instapark-star/blurchat"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors text-gray-400"
          >
            💻 GitHub
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors text-gray-400"
          >
            📖 About
          </a>
        </nav>
      </div>
    </footer>
  );
}
