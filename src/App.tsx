import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Header } from './components/Header';
import { GameCanvas } from './components/GameCanvas';
import { Leaderboard } from './components/Leaderboard';
import { useNeonArena } from './hooks/useNeonArena';

export default function App() {
  const { isConnected } = useAccount();
  const { recordAction, playerScore, txState } = useNeonArena();
  const [localScore, setLocalScore] = useState(0);

  const handleScore = async (points: number) => {
    setLocalScore((prev) => prev + points);

    if (isConnected) {
      await recordAction('SCORE', points);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-6 py-8">
        {!isConnected ? (
          <div className="flex items-center justify-center min-h-[600px]">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🎮</div>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-magenta-500">
                Connect Your Wallet
              </h2>
              <p className="text-gray-400 text-lg">
                Start playing and sync your score on-chain!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-6 shadow-lg shadow-cyan-400/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-cyan-400">ARENA</h2>
                  <div className="flex gap-6 text-sm">
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

                {/* Transaction Status Feedback */}
                {txState.status !== 'idle' && (
                  <div className="mt-4 text-center">
                    {txState.status === 'preparing' && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 rounded-lg border border-cyan-400">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400">Preparing transaction...</span>
                      </div>
                    )}
                    {txState.status === 'pending' && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 rounded-lg border border-cyan-400">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400">Awaiting wallet approval...</span>
                      </div>
                    )}
                    {txState.status === 'confirming' && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 rounded-lg border border-cyan-400">
                        <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-cyan-400">Recording on-chain...</span>
                      </div>
                    )}
                    {txState.status === 'success' && (
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-400/20 rounded-lg border border-green-400">
                        <span className="text-2xl">✅</span>
                        <span className="text-green-400">Score recorded on-chain!</span>
                      </div>
                    )}
                    {txState.status === 'error' && (
                      <div className="inline-flex flex-col items-center gap-2 px-4 py-2 bg-red-500/20 rounded-lg border border-red-500">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">⚠️</span>
                          <span className="text-red-400">Transaction failed</span>
                        </div>
                        {txState.error && (
                          <span className="text-xs text-red-300">{txState.error}</span>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-magenta-500/50 p-6">
                <h3 className="text-xl font-bold text-magenta-500 mb-3">Controls</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Arrow Keys:</span>
                    <span className="text-white ml-2">Move</span>
                  </div>
                  <div>
                    <span className="text-gray-400">SPACE:</span>
                    <span className="text-white ml-2">Score +100</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Leaderboard />
            </div>
          </div>
        )}
      </main>

      <footer className="border-t-2 border-cyan-400/30 bg-gray-900/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          <p>Powered by Somnia Data Streams | Somnia Testnet</p>
        </div>
      </footer>
    </div>
  );
}
