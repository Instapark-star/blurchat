import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import * as clsx from "clsx";

export default function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/chat", label: "Join Chat" },
    { to: "/watch", label: "Watch Together" },
    { to: "/random", label: "Random Match" },
    { to: "/games", label: "Games" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white text-xl font-semibold tracking-wide hover:opacity-80 transition-opacity"
        >
          blurchat
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={clsx(
                "text-white hover:text-gray-300 transition-colors",
                location.pathname === to && "font-bold underline"
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-black text-white">
              <nav className="mt-10 space-y-4 flex flex-col">
                {links.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={clsx(
                      "block text-lg hover:text-gray-300",
                      location.pathname === to && "font-bold underline"
                    )}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
