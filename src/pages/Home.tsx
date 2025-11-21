import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Home() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-magenta-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center space-y-10 sm:space-y-12 lg:space-y-16">
            {/* Main Headline */}
            <div className="space-y-6 sm:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-magenta-400 to-cyan-400 animate-gradient-x leading-tight">
                REAL-TIME GAMING
              </h1>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                On the <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">Blockchain</span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
                Experience <span className="text-cyan-400 font-semibold">zero-latency</span> multiplayer gaming with instant on-chain synchronization. No more waiting. Just pure, competitive gameplay.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto py-4">
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-3">~200ms</div>
                <div className="text-sm sm:text-base text-gray-400">Update Latency</div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-magenta-500/30 hover:border-magenta-500 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-500/30">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-magenta-500 mb-3">100%</div>
                <div className="text-sm sm:text-base text-gray-400">On-Chain Verified</div>
              </div>
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-3">∞</div>
                <div className="text-sm sm:text-base text-gray-400">Scalability</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4">
              {isConnected ? (
                <Link
                  to="/game"
                  className="w-full sm:w-auto px-8 py-4 bg-linear-to-r from-cyan-400 to-magenta-500 text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 text-base sm:text-lg text-center"
                >
                  ENTER ARENA
                </Link>
              ) : (
                <div className="scale-110 sm:scale-125">
                  <ConnectButton />
                </div>
              )}
              <Link
                to="/how-to-play"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 font-bold rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 text-base sm:text-lg text-center"
              >
                HOW TO PLAY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-900/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400 mb-12 sm:mb-16 lg:mb-20">
            WHY NEONSYNC?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {/* Feature 1 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border-2 border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">⚡</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">Instant Synchronization</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Powered by Somnia Data Streams SDK. Experience real-time updates with ~100-200ms latency instead of 3-5 seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border-2 border-magenta-500/30 hover:border-magenta-500 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-500/30 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">🔗</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-magenta-500 mb-3 sm:mb-4">Blockchain Verified</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                All scores and actions are recorded immutably on Somnia blockchain. Transparent, verifiable, and trustless.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border-2 border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">🏆</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">Global Leaderboard</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Compete with players worldwide. Live rankings update in real-time as players score points.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border-2 border-magenta-500/30 hover:border-magenta-500 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-500/30 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">🎮</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-magenta-500 mb-3 sm:mb-4">Smooth Gameplay</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                60 FPS Phaser 3 game engine with responsive controls. Cyberpunk aesthetics with neon visuals.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border-2 border-cyan-400/30 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/30 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">🔐</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-3 sm:mb-4">Secure & Trustless</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Smart contract-based game logic. Your wallet, your assets. Complete ownership and control.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border-2 border-magenta-500/30 hover:border-magenta-500 transition-all duration-300 hover:shadow-lg hover:shadow-magenta-500/30 group">
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform">📱</div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-magenta-500 mb-3 sm:mb-4">Responsive Design</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Play on any device. Mobile-first design with touch-friendly controls and adaptive layouts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-magenta-500 mb-12 sm:mb-16 lg:mb-20">
            HOW IT WORKS
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Step 1 */}
            <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start group">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg sm:text-xl lg:text-2xl group-hover:scale-110 transition-transform">
                1
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-2 sm:mb-3">Connect Your Wallet</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Use MetaMask or any Web3 wallet to connect to Somnia Testnet. Get test tokens from the faucet if needed.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start group">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg sm:text-xl lg:text-2xl group-hover:scale-110 transition-transform">
                2
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-magenta-500 mb-2 sm:mb-3">Play the Game</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Use arrow keys to move and SPACE to score points. Each action is recorded on-chain with instant feedback.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start group">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg sm:text-xl lg:text-2xl group-hover:scale-110 transition-transform">
                3
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-cyan-400 mb-2 sm:mb-3">Watch Real-Time Sync</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  See your score appear on the global leaderboard in under 200ms. All players see updates instantly via WebSocket.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 sm:gap-6 lg:gap-8 items-start group">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg sm:text-xl lg:text-2xl group-hover:scale-110 transition-transform">
                4
              </div>
              <div className="flex-1 pt-1">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-magenta-500 mb-2 sm:mb-3">Compete & Climb</h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                  Compete with players worldwide. Your achievements are permanently recorded on the blockchain.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12 lg:mt-16">
            <Link
              to="/game"
              className="inline-block px-8 sm:px-10 lg:px-12 py-4 sm:py-5 bg-linear-to-r from-cyan-400 to-magenta-500 text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-magenta-500/50 text-base sm:text-lg lg:text-xl"
            >
              START PLAYING NOW
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-gray-900/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-cyan-400 mb-12 sm:mb-16">
            POWERED BY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30 text-center hover:border-cyan-400 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚡</div>
              <div className="text-cyan-400 font-bold text-sm sm:text-base mb-1">Somnia</div>
              <div className="text-xs text-gray-500">Blockchain</div>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-magenta-500/30 text-center hover:border-magenta-500 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📡</div>
              <div className="text-magenta-500 font-bold text-sm sm:text-base mb-1">Data Streams</div>
              <div className="text-xs text-gray-500">Real-time SDK</div>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30 text-center hover:border-cyan-400 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚛️</div>
              <div className="text-cyan-400 font-bold text-sm sm:text-base mb-1">React 19</div>
              <div className="text-xs text-gray-500">Frontend</div>
            </div>
            <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-magenta-500/30 text-center hover:border-magenta-500 transition-all">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎮</div>
              <div className="text-magenta-500 font-bold text-sm sm:text-base mb-1">Phaser 3</div>
              <div className="text-xs text-gray-500">Game Engine</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
