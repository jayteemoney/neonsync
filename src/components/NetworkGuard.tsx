import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { somniaTestnet } from '../config/wagmi';
import { NEON_ARENA_ADDRESS } from '../config/contracts';
import { AddNetworkButton } from './AddNetworkButton';

/**
 * NetworkGuard Component
 *
 * Ensures users are on the correct network and contract is configured
 */
export function NetworkGuard({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Check if contract address is configured
  const isContractConfigured = NEON_ARENA_ADDRESS && NEON_ARENA_ADDRESS.length > 2;

  // Check if on correct network
  const isCorrectNetwork = chainId === somniaTestnet.id;

  // Show contract configuration error
  if (!isContractConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="max-w-md p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-red-500/50 shadow-lg shadow-red-500/20">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-3xl font-bold text-red-400">Configuration Error</h2>
            <p className="text-gray-400">
              Contract address is not configured. Please add the deployed contract address to your <code className="text-cyan-400">.env</code> file:
            </p>
            <div className="bg-black/40 p-4 rounded border border-cyan-400/30 text-left">
              <code className="text-xs text-cyan-400 break-all">
                VITE_NEON_ARENA_CONTRACT_ADDRESS=0x...
              </code>
            </div>
            <p className="text-sm text-gray-500">
              Then restart the development server
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show network mismatch warning if connected but on wrong network
  if (isConnected && !isCorrectNetwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="max-w-md p-8 bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-yellow-500/50 shadow-lg shadow-yellow-500/20">
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🔄</div>
            <h2 className="text-3xl font-bold text-yellow-400">Wrong Network</h2>
            <p className="text-gray-400">
              NEONSYNC requires <span className="text-cyan-400 font-bold">Somnia Testnet</span> to function.
            </p>
            <div className="bg-black/40 p-4 rounded border border-cyan-400/30">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-400">Network:</span>
                <span className="text-cyan-400">Somnia Testnet</span>
                <span className="text-gray-400">Chain ID:</span>
                <span className="text-cyan-400">{somniaTestnet.id}</span>
                <span className="text-gray-400">RPC:</span>
                <span className="text-cyan-400 text-xs break-all">
                  {somniaTestnet.rpcUrls.default.http[0]}
                </span>
              </div>
            </div>
            {switchChain && (
              <>
                <button
                  onClick={() => switchChain({ chainId: somniaTestnet.id })}
                  className="w-full px-6 py-3 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-colors"
                >
                  Switch to Somnia Testnet
                </button>
                <p className="text-xs text-gray-500">
                  Click to switch networks automatically
                </p>
              </>
            )}
            {!switchChain && (
              <div className="space-y-3">
                <p className="text-sm text-gray-500">
                  Please switch to Somnia Testnet manually in your wallet
                </p>
                <AddNetworkButton />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // All good, render children
  return <>{children}</>;
}
