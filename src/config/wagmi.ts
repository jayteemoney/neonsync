import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { injectedWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { defineChain } from 'viem';

export const somniaTestnet = defineChain({
  id: 50312, // Updated to match actual RPC chain ID (was 50311)
  name: 'Somnia Testnet',
  nativeCurrency: { name: 'Somnia', symbol: 'STT', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://dream-rpc.somnia.network'] },
  },
  blockExplorers: {
    default: { name: 'Somnia Explorer', url: 'https://somnia.network' },
  },
  testnet: true,
});

/**
 * Wagmi Configuration with RainbowKit
 *
 * Uses only injected wallet connectors to avoid WalletConnect relay
 * WebSocket connection issues. This configuration supports MetaMask,
 * Coinbase Wallet, and any other browser extension wallets via the
 * standard injected provider (window.ethereum).
 *
 * WalletConnect relay has been completely removed to improve reliability
 * and eliminate unnecessary network requests.
 */
const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [injectedWallet],
    },
  ],
  {
    appName: 'NEONSYNC',
    projectId: 'neonsync-somnia-dapp',
  }
);

export const config = createConfig({
  connectors,
  chains: [somniaTestnet],
  transports: {
    [somniaTestnet.id]: http('https://dream-rpc.somnia.network'),
  },
  ssr: false,
});
