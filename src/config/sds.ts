import { SDK } from '@somnia-chain/streams';
import { createPublicClient, http } from 'viem';
import { somniaTestnet } from './wagmi';

/**
 * Somnia Data Streams Configuration
 *
 * This creates a read-only SDK instance for subscribing to blockchain events
 * No private key needed for event subscriptions
 */

const rpcUrl = import.meta.env.VITE_SOMNIA_RPC_URL || 'https://dream-rpc.somnia.network';

// Create public client for reading blockchain data
const publicClient = createPublicClient({
  chain: somniaTestnet,
  transport: http(rpcUrl),
});

// Initialize SDS SDK with public client only (no wallet needed for subscriptions)
export const sdsSDK = new SDK({
  public: publicClient,
});

// Export for direct use if needed
export { publicClient };
