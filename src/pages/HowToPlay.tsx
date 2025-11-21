import { Link } from 'react-router-dom';

export function HowToPlay() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Page Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500">
            HOW TO PLAY
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know to start your journey in NEONSYNC
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Getting Started */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Getting Started</h2>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Install MetaMask</h3>
                  <p className="text-gray-400 mb-3">
                    You'll need a Web3 wallet to play. We recommend MetaMask, a free browser extension.
                  </p>
                  <a
                    href="https://metamask.io/download/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/20 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all text-sm"
                  >
                    Download MetaMask ↗
                  </a>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Add Somnia Testnet</h3>
                  <p className="text-gray-400 mb-3">
                    NEONSYNC runs on Somnia Testnet. Our app will automatically prompt you to add the network when you connect your wallet.
                  </p>
                  <div className="bg-black/40 rounded-lg p-4 border border-cyan-400/30 text-sm font-mono space-y-1">
                    <div><span className="text-gray-400">Network:</span> <span className="text-cyan-400">Somnia Testnet</span></div>
                    <div><span className="text-gray-400">Chain ID:</span> <span className="text-cyan-400">50312</span></div>
                    <div><span className="text-gray-400">RPC URL:</span> <span className="text-cyan-400">https://dream-rpc.somnia.network</span></div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Get Test Tokens</h3>
                  <p className="text-gray-400 mb-3">
                    You'll need Somnia testnet tokens (STT) to play. Visit the Somnia faucet to get free test tokens.
                  </p>
                  <a
                    href="https://testnet-faucet.somnia.network"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-magenta-500/20 border border-magenta-500 rounded-lg text-magenta-500 hover:bg-magenta-500 hover:text-black transition-all text-sm"
                  >
                    Get Test Tokens ↗
                  </a>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 bg-linear-to-br from-cyan-400 to-magenta-500 rounded-full flex items-center justify-center text-black font-bold text-lg">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Connect & Play</h3>
                  <p className="text-gray-400 mb-3">
                    Click "Connect Wallet" in the header, select your wallet, and start playing!
                  </p>
                  <Link
                    to="/game"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-400 to-magenta-500 text-black font-bold rounded-lg hover:scale-105 transition-all text-sm"
                  >
                    Play Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-magenta-500 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-magenta-500 mb-6">Game Controls</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-black/40 rounded-lg p-6 border border-cyan-400/30">
                <div className="text-4xl mb-3">⬆️⬇️⬅️➡️</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Arrow Keys</h3>
                <p className="text-gray-400">Move your character around the arena in all four directions.</p>
              </div>
              <div className="bg-black/40 rounded-lg p-6 border border-magenta-500/30">
                <div className="text-4xl mb-3">⌨️</div>
                <h3 className="text-xl font-bold text-magenta-500 mb-2">SPACE Bar</h3>
                <p className="text-gray-400">Score +100 points and record the action on-chain. Requires wallet approval.</p>
              </div>
            </div>
          </div>

          {/* How Scoring Works */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">How Scoring Works</h2>
            <div className="space-y-4">
              <div className="bg-black/40 rounded-lg p-4 border border-cyan-400/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Local Score</h3>
                <p className="text-gray-400">
                  Updates instantly when you press SPACE. This is tracked in your browser and shows your session progress.
                </p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-magenta-500/30">
                <h3 className="text-lg font-bold text-magenta-500 mb-2">On-Chain Score</h3>
                <p className="text-gray-400">
                  When you press SPACE, a blockchain transaction is created. After you approve it in your wallet, the score is permanently recorded on Somnia blockchain. This is your official, verified score.
                </p>
              </div>
              <div className="bg-black/40 rounded-lg p-4 border border-cyan-400/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">Leaderboard Ranking</h3>
                <p className="text-gray-400">
                  Your on-chain score determines your position on the global leaderboard. Rankings update in real-time (~200ms) via WebSocket when any player scores.
                </p>
              </div>
            </div>
          </div>

          {/* Understanding the Technology */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-magenta-500 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-magenta-500 mb-6">The Technology</h2>
            <div className="space-y-4 text-gray-400">
              <p>
                <span className="text-cyan-400 font-semibold">Somnia Data Streams SDK:</span> This is what makes NEONSYNC special. Instead of waiting 3-5 seconds for blockchain updates, we use WebSocket streaming to push events to all connected players in ~100-200ms.
              </p>
              <p>
                <span className="text-magenta-500 font-semibold">Smart Contract:</span> All game logic runs on a smart contract deployed to Somnia blockchain. Your scores can't be faked or altered - they're cryptographically verified.
              </p>
              <p>
                <span className="text-cyan-400 font-semibold">Phaser 3 Engine:</span> The game itself runs at 60 FPS using the Phaser 3 game engine, providing smooth, responsive gameplay.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-6 sm:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Why do I need to approve transactions?</h3>
                <p className="text-gray-400">
                  Each on-chain action requires a blockchain transaction. Your wallet asks for approval to ensure you're in control of what gets recorded on-chain.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Do I pay gas fees?</h3>
                <p className="text-gray-400">
                  Yes, but since this is a testnet, you're using free test tokens. Each action costs a small amount of gas (~45,000 gas units).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Why is my local score different from on-chain score?</h3>
                <p className="text-gray-400">
                  Local score updates instantly but isn't verified. On-chain score requires blockchain confirmation (1-2 seconds). If a transaction fails, local score won't match on-chain.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Can I play on mobile?</h3>
                <p className="text-gray-400">
                  Yes! NEONSYNC is fully responsive. You'll need a mobile Web3 wallet like MetaMask Mobile or Trust Wallet.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Where can I view my transaction history?</h3>
                <p className="text-gray-400">
                  Visit the Somnia Testnet Explorer and search for your wallet address to see all your on-chain actions.
                </p>
              </div>
            </div>
          </div>

          {/* Ready to Play */}
          <div className="text-center py-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-magenta-500 mb-6">
              Ready to Play?
            </h2>
            <Link
              to="/game"
              className="inline-block px-8 py-4 bg-linear-to-r from-cyan-400 to-magenta-500 text-black font-bold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-400/50 text-lg"
            >
              ENTER THE ARENA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
