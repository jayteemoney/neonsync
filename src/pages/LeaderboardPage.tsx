import { Leaderboard } from '../components/Leaderboard';

export function LeaderboardPage() {
  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20 space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">
            GLOBAL LEADERBOARD
          </h1>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-4">
            Real-time rankings powered by Somnia Data Streams. Watch scores update instantly as players compete worldwide.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14 max-w-5xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30 text-center">
            <div className="text-4xl mb-3 sm:mb-4">⚡</div>
            <div className="text-cyan-400 font-bold text-2xl sm:text-3xl mb-2">~200ms</div>
            <div className="text-gray-400 text-sm sm:text-base">Update Speed</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-magenta-500/30 text-center">
            <div className="text-4xl mb-3 sm:mb-4">🔗</div>
            <div className="text-magenta-500 font-bold text-2xl sm:text-3xl mb-2">100%</div>
            <div className="text-gray-400 text-sm sm:text-base">On-Chain Verified</div>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30 text-center">
            <div className="text-4xl mb-3 sm:mb-4">🌐</div>
            <div className="text-cyan-400 font-bold text-2xl sm:text-3xl mb-2">LIVE</div>
            <div className="text-gray-400 text-sm sm:text-base">WebSocket Sync</div>
          </div>
        </div>

        {/* Main Leaderboard */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14">
          <Leaderboard />
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 lg:p-10 border border-cyan-400/30">
            <h3 className="text-xl sm:text-2xl font-bold text-cyan-400 mb-6 sm:mb-8">How Rankings Work</h3>
            <div className="space-y-4 sm:space-y-6 text-gray-400 text-sm sm:text-base leading-relaxed">
              <p>
                <span className="text-cyan-400 font-semibold">Real-Time Updates:</span> Rankings update automatically via WebSocket when any player scores points. No manual refresh needed.
              </p>
              <p>
                <span className="text-magenta-500 font-semibold">Blockchain Verified:</span> All scores are recorded on Somnia blockchain and can be verified through the smart contract.
              </p>
              <p>
                <span className="text-cyan-400 font-semibold">Fair Play:</span> Smart contract logic ensures all scores are legitimate and cannot be manipulated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
