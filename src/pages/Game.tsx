import { useState } from 'react';
import { useAccount } from 'wagmi';
import { GameCanvas } from '../components/GameCanvas';
import { Leaderboard } from '../components/Leaderboard';
import { useNeonArena } from '../hooks/useNeonArena';

export function Game() {
  const { isConnected, address } = useAccount();
  const { recordAction, playerScore, txState } = useNeonArena();
  const [localScore, setLocalScore] = useState(0);

  const handleScore = async (points: number) => {
    console.log('🎮 Score action triggered:', { points, isConnected, address });
    setLocalScore((prev) => prev + points);

    if (isConnected) {
      console.log('📤 Calling recordAction...');
      try {
        await recordAction('SCORE', points);
        console.log('✅ recordAction called successfully');
      } catch (error) {
        console.error('❌ Error in recordAction:', error);
      }
    } else {
      console.warn('⚠️ Wallet not connected, skipping on-chain recording');
    }
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-12">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {!isConnected ? (
          <div className="flex items-center justify-center min-h-[500px] sm:min-h-[600px]">
            <div className="text-center space-y-6 sm:space-y-8 px-4">
              <div className="text-6xl sm:text-7xl lg:text-8xl mb-6">🎮</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 text-lg sm:text-xl lg:text-2xl max-w-xl mx-auto">
                Start playing and sync your score on-chain!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <div className="xl:col-span-2 space-y-6 sm:space-y-8">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-cyan-400 p-6 sm:p-8 lg:p-10 shadow-lg shadow-cyan-400/30">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400">ARENA</h2>
                  <div className="flex gap-6 sm:gap-8 text-sm sm:text-base">
                    <div>
                      <span className="text-gray-400">Local: </span>
                      <span className="text-cyan-400 font-bold">{localScore}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">On-Chain: </span>
                      <span className="text-magenta-500 font-bold">{playerScore}</span>
                    </div>
                  </div>
                </div>
                <GameCanvas onScore={handleScore} />

                {txState.status !== 'idle' && (
                  <div className="mt-6 sm:mt-8 text-center">
                    {txState.status === 'preparing' && (
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-400/20 rounded-lg border border-cyan-400">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400 text-xs sm:text-sm">Preparing transaction...</span>
                      </div>
                    )}
                    {txState.status === 'pending' && (
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-400/20 rounded-lg border border-cyan-400">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400 text-xs sm:text-sm">Awaiting wallet approval...</span>
                      </div>
                    )}
                    {txState.status === 'confirming' && (
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-cyan-400/20 rounded-lg border border-cyan-400">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400 text-xs sm:text-sm">Recording on-chain...</span>
                      </div>
                    )}
                    {txState.status === 'success' && (
                      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-400/20 rounded-lg border border-green-400">
                        <span className="text-xl sm:text-2xl">✅</span>
                        <span className="text-green-400 text-xs sm:text-sm">Score recorded on-chain!</span>
                      </div>
                    )}
                    {txState.status === 'error' && (
                      <div className="inline-flex flex-col items-center gap-2 px-3 sm:px-4 py-2 bg-red-500/20 rounded-lg border border-red-500">
                        <div className="flex items-center gap-2">
                          <span className="text-xl sm:text-2xl">⚠️</span>
                          <span className="text-red-400 text-xs sm:text-sm">Transaction failed</span>
                        </div>
                        {txState.error && (
                          <span className="text-xs text-red-300 wrap-break-word max-w-full">{txState.error}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl border-2 border-magenta-500/50 p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-magenta-500 mb-4 sm:mb-6">Controls</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm sm:text-base">
                  <div className="flex flex-col sm:block">
                    <span className="text-gray-400">Arrow Keys:</span>
                    <span className="text-white sm:ml-2">Move</span>
                  </div>
                  <div className="flex flex-col sm:block">
                    <span className="text-gray-400">SPACE:</span>
                    <span className="text-white sm:ml-2">Score +100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:col-span-1">
              <Leaderboard />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
