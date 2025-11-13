import { somniaTestnet } from '../config/wagmi';
import { logger } from '../utils/logger';

/**
 * AddNetworkButton Component
 *
 * Helps users add Somnia Testnet to their wallet
 */
export function AddNetworkButton() {
  const addNetwork = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${somniaTestnet.id.toString(16)}`,
            chainName: somniaTestnet.name,
            nativeCurrency: somniaTestnet.nativeCurrency,
            rpcUrls: somniaTestnet.rpcUrls.default.http,
            blockExplorerUrls: [somniaTestnet.blockExplorers.default.url],
          },
        ],
      });
    } catch (error: any) {
      logger.error('Failed to add network:', error);
      alert(`Failed to add network: ${error.message}`);
    }
  };

  return (
    <button
      onClick={addNetwork}
      className="px-4 py-2 bg-magenta-500 text-white font-bold rounded hover:bg-magenta-400 transition-colors text-sm"
    >
      Add Somnia Testnet to Wallet
    </button>
  );
}
