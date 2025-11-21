import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/game', label: 'Game' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/profile', label: 'Profile' },
    { path: '/how-to-play', label: 'How to Play' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="border-b-2 border-cyan-400 bg-gray-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-cyan-400/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-4 min-w-0 shrink-0">
            <div className="relative animate-pulse-glow">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center transition-transform hover:scale-110">
                <span className="text-xl sm:text-2xl font-bold text-black">N</span>
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-lg blur-md opacity-50 -z-10"></div>
            </div>
            <div className="min-w-0 hidden sm:block">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-magenta-400 to-magenta-500 tracking-wider">
                NEONSYNC
              </h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm xl:text-base font-semibold transition-all duration-300 py-1 ${
                  isActive(link.path)
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <ConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-cyan-400 hover:bg-cyan-400/20 rounded-lg transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-6 pt-6 border-t border-cyan-400/30 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-5 py-3 rounded-xl transition-all duration-300 text-base ${
                  isActive(link.path)
                    ? 'bg-cyan-400/20 text-cyan-400 border-l-4 border-cyan-400'
                    : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
