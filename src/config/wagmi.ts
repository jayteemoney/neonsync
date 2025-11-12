import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';

export const somniaTestnet = defineChain({
  id: 50311,
  name: 'Somnia Testnet',
  nativeCurrency: { name: 'Somnia', symbol: 'SMN', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.somnia.network'] },
  },
  blockExplorers: {
    default: { name: 'Somnia Explorer', url: 'https://testnet-explorer.somnia.network' },
  },
  testnet: true,
});

export const config = getDefaultConfig({
  appName: 'NEONSYNC',
  projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'YOUR_PROJECT_ID',
  chains: [somniaTestnet],
  ssr: false,
});
