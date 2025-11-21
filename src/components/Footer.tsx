import { Link } from 'react-router-dom';
import { NEON_ARENA_ADDRESS } from '../config/contracts';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-cyan-400/30 bg-gray-900/80 backdrop-blur-sm mt-auto shadow-[0_-4px_6px_-1px_rgba(0,240,255,0.1)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-lg flex items-center justify-center">
                  <span className="text-xl sm:text-2xl font-bold text-black">N</span>
                </div>
                <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-lg blur-md opacity-50 -z-10"></div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">
                NEONSYNC
              </h3>
            </div>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Real-time multiplayer gaming on the blockchain. Powered by Somnia Data Streams.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://github.com/jayteemoney/neonsync"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-cyan-400/20 hover:bg-cyan-400 text-cyan-400 hover:text-black rounded-lg flex items-center justify-center transition-all"
                title="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-cyan-400/20 hover:bg-cyan-400 text-cyan-400 hover:text-black rounded-lg flex items-center justify-center transition-all"
                title="Twitter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cyan-400 font-bold mb-5 sm:mb-6 text-base sm:text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/game" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Play Game
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/how-to-play" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  How to Play
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-magenta-500 font-bold mb-5 sm:mb-6 text-base sm:text-lg">Resources</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="https://docs.somnia.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-magenta-500 transition-colors"
                >
                  Somnia Docs
                </a>
              </li>
              <li>
                <a
                  href="https://testnet-faucet.somnia.network"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-magenta-500 transition-colors"
                >
                  Get Test Tokens
                </a>
              </li>
              <li>
                <a
                  href={`https://testnet-explorer.somnia.network/address/${NEON_ARENA_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-magenta-500 transition-colors"
                >
                  View Contract
                </a>
              </li>
              <li>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-magenta-500 transition-colors"
                >
                  Get MetaMask
                </a>
              </li>
            </ul>
          </div>

          {/* Network Info */}
          <div>
            <h4 className="text-cyan-400 font-bold mb-5 sm:mb-6 text-base sm:text-lg">Network Info</h4>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div className="bg-black/40 rounded-lg p-3 border border-cyan-400/30">
                <div className="text-gray-400 text-xs mb-1">Network</div>
                <div className="text-cyan-400 font-semibold">Somnia Testnet</div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-magenta-500/30">
                <div className="text-gray-400 text-xs mb-1">Chain ID</div>
                <div className="text-magenta-500 font-semibold">50312</div>
              </div>
              <div className="bg-black/40 rounded-lg p-3 border border-cyan-400/30">
                <div className="text-gray-400 text-xs mb-1">Status</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="text-green-400 font-semibold">Live</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 sm:mt-12 lg:mt-16 pt-8 sm:pt-10 border-t border-cyan-400/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-sm sm:text-base text-gray-400">
            <div>
              &copy; {currentYear} NEONSYNC. Built with ⚡ on Somnia.
            </div>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <span className="text-cyan-400 font-semibold">Somnia Data Streams</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
