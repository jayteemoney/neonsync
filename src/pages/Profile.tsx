import { useAccount, useReadContracts } from 'wagmi';
import { Link } from 'react-router-dom';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';

export function Profile() {
  const { isConnected, address } = useAccount();

  const { data: playerStats } = useReadContracts({
    contracts: isConnected && address ? [
      {
        address: NEON_ARENA_ADDRESS,
        abi: NEON_ARENA_ABI,
        functionName: 'getPlayerScore',
        args: [address],
      },
      {
        address: NEON_ARENA_ADDRESS,
        abi: NEON_ARENA_ABI,
        functionName: 'getPlayerStats',
        args: [address],
      },
    ] : [],
  });

  const playerScore = playerStats?.[0]?.result ? Number(playerStats[0].result) : 0;
  const stats = playerStats?.[1]?.result as [bigint, bigint, boolean] | undefined;
  const actionCount = stats ? Number(stats[1]) : 0;
  const isRegistered = stats ? stats[2] : false;

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center space-y-6 sm:space-y-8 px-4">
          <div className="text-6xl sm:text-7xl lg:text-8xl mb-6">👤</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">
            Connect Your Wallet
          </h2>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl max-w-xl mx-auto leading-relaxed">
            Connect your wallet to view your profile and gaming statistics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-10 sm:mb-14 lg:mb-20 space-y-4 sm:space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">
            PLAYER PROFILE
          </h1>
          <p className="text-gray-400 text-base sm:text-lg lg:text-xl">
            Your on-chain gaming statistics
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
          {/* Wallet Info */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-cyan-400 p-6 sm:p-8 lg:p-10 shadow-lg shadow-cyan-400/30">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6 sm:mb-8">Wallet Address</h2>
            <div className="bg-black/40 rounded-xl p-4 sm:p-6 border border-cyan-400/30">
              <p className="text-gray-300 font-mono text-sm sm:text-base break-all">{address}</p>
            </div>
            {isRegistered && (
              <div className="mt-6 inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-green-400/20 rounded-lg border border-green-400">
                <span className="text-xl sm:text-2xl">✅</span>
                <span className="text-green-400 font-semibold text-sm sm:text-base">Registered Player</span>
              </div>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* Total Score */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-cyan-400 p-6 sm:p-8 text-center hover:shadow-lg hover:shadow-cyan-400/30 transition-all">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🏆</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2 sm:mb-3">{playerScore}</div>
              <div className="text-gray-400 text-sm sm:text-base">Total Score</div>
            </div>

            {/* Total Actions */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-magenta-500 p-6 sm:p-8 text-center hover:shadow-lg hover:shadow-magenta-500/30 transition-all">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">⚡</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-magenta-500 mb-2 sm:mb-3">{actionCount}</div>
              <div className="text-gray-400 text-sm sm:text-base">Total Actions</div>
            </div>

            {/* Average Score */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-cyan-400 p-6 sm:p-8 text-center hover:shadow-lg hover:shadow-cyan-400/30 transition-all">
              <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">📊</div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-cyan-400 mb-2 sm:mb-3">
                {actionCount > 0 ? Math.round(playerScore / actionCount) : 0}
              </div>
              <div className="text-gray-400 text-sm sm:text-base">Avg per Action</div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-magenta-500 p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-magenta-500 mb-6 sm:mb-8 lg:mb-10">Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {/* First Action */}
              <div className={`p-4 rounded-lg border-2 ${actionCount > 0 ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-700 bg-gray-900/40 opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{actionCount > 0 ? '🎮' : '🔒'}</div>
                  <div>
                    <div className="font-bold text-cyan-400">First Steps</div>
                    <div className="text-sm text-gray-400">Record your first action</div>
                  </div>
                </div>
              </div>

              {/* 100+ Score */}
              <div className={`p-4 rounded-lg border-2 ${playerScore >= 100 ? 'border-magenta-500 bg-magenta-500/10' : 'border-gray-700 bg-gray-900/40 opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{playerScore >= 100 ? '⭐' : '🔒'}</div>
                  <div>
                    <div className="font-bold text-magenta-500">Centurion</div>
                    <div className="text-sm text-gray-400">Reach 100 points</div>
                  </div>
                </div>
              </div>

              {/* 500+ Score */}
              <div className={`p-4 rounded-lg border-2 ${playerScore >= 500 ? 'border-cyan-400 bg-cyan-400/10' : 'border-gray-700 bg-gray-900/40 opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{playerScore >= 500 ? '💎' : '🔒'}</div>
                  <div>
                    <div className="font-bold text-cyan-400">Elite Player</div>
                    <div className="text-sm text-gray-400">Reach 500 points</div>
                  </div>
                </div>
              </div>

              {/* 10+ Actions */}
              <div className={`p-4 rounded-lg border-2 ${actionCount >= 10 ? 'border-magenta-500 bg-magenta-500/10' : 'border-gray-700 bg-gray-900/40 opacity-50'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{actionCount >= 10 ? '🔥' : '🔒'}</div>
                  <div>
                    <div className="font-bold text-magenta-500">Active Player</div>
                    <div className="text-sm text-gray-400">Complete 10 actions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center pt-4">
            <Link
              to="/game"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-linear-to-r from-cyan-400 to-magenta-500 text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 text-center text-base sm:text-lg"
            >
              PLAY NOW
            </Link>
            <Link
              to="/leaderboard"
              className="px-8 sm:px-10 py-4 sm:py-5 bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-400 text-cyan-400 font-bold rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300 text-center text-base sm:text-lg"
            >
              VIEW LEADERBOARD
            </Link>
          </div>

          {/* Contract Info */}
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-cyan-400/30">
            <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-4 sm:mb-6">Blockchain Info</h3>
            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="text-gray-400">Network:</span>
                <span className="text-white">Somnia Testnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Chain ID:</span>
                <span className="text-white">50312</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Contract:</span>
                <a
                  href={`https://testnet-explorer.somnia.network/address/${NEON_ARENA_ADDRESS}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-magenta-500 transition-colors font-mono text-xs"
                >
                  {NEON_ARENA_ADDRESS.slice(0, 6)}...{NEON_ARENA_ADDRESS.slice(-4)} ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
