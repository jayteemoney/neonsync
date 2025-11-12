# NEONSYNC

> **On-chain actions. Off-chain speed.**

Real-time multiplayer gaming HUD powered by Somnia Data Streams. Experience instant score synchronization across wallets with zero polling—pure WebSocket push architecture.

[![Somnia Testnet](https://img.shields.io/badge/Somnia-Testnet-00f0ff)](https://testnet-explorer.somnia.network)
[![License: MIT](https://img.shields.io/badge/License-MIT-magenta.svg)](LICENSE)

## 🎮 Overview

NEONSYNC is a production-ready MVP demonstrating the power of **Somnia Data Streams (SDS)** for real-time blockchain gaming. Players connect their wallets, play a cyberpunk-themed arena game, and watch their scores sync instantly on-chain and across all connected clients.

### Key Features

- ⚡ **Zero-Latency Sync**: Real-time score updates via Somnia Data Streams WebSocket
- 🎨 **Cyberpunk Aesthetic**: Neon-lit UI with Orbitron typography and particle effects
- 🔗 **Wallet-First**: RainbowKit integration with Somnia Testnet
- 🎯 **2D Arena Game**: Phaser.js powered gameplay with smooth controls
- 📊 **Live Leaderboard**: Auto-refreshing rankings from on-chain data
- 🏗️ **Production Ready**: TypeScript, Viem, Wagmi, Hardhat toolchain

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend UI   │  Vite + React + TypeScript + Tailwind
│  (Phaser Game)  │
└────────┬────────┘
         │
         ├──────────► Wagmi/Viem ──────► NeonArena.sol (Somnia Testnet)
         │                                       │
         │                                       │ emits PlayerAction events
         │                                       ▼
         └──────────► Somnia Data Streams ◄─────┘
                      (WebSocket Subscribe)
                              │
                              ▼
                    ┌──────────────────┐
                    │  Leaderboard     │
                    │  (Real-time UI)  │
                    └──────────────────┘
```

### Flow

1. **Player Action**: User presses SPACE in Phaser game
2. **Smart Contract**: `recordAction("SCORE", 100)` called on NeonArena.sol
3. **Event Emission**: `PlayerAction` event emitted on Somnia Testnet
4. **SDS Stream**: Event pushed to all subscribers via WebSocket
5. **UI Update**: Leaderboard instantly reflects new scores

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask or compatible Web3 wallet
- Somnia Testnet RPC access

### Installation

```bash
# Clone repository
git clone https://github.com/jayteemoney/neonsync.git
cd neonsync

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your keys (see Configuration section)
```

### Configuration

Edit `.env` file:

```env
# Wallet private key for deployment
PRIVATE_KEY=your_private_key_here

# WalletConnect project ID (get from https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Contract address (fill after deployment)
VITE_NEON_ARENA_CONTRACT_ADDRESS=

# Somnia Data Streams endpoint
VITE_SDS_ENDPOINT=wss://streams.somnia.network
VITE_SDS_API_KEY=your_sds_api_key
```

### Deploy Smart Contract

```bash
# Compile contract
npm run compile

# Deploy to Somnia Testnet
npm run deploy:somnia

# Copy the deployed address to .env
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` and connect your wallet to Somnia Testnet.

## 📁 Project Structure

```
neonsync/
├── contracts/
│   └── NeonArena.sol          # Core smart contract
├── scripts/
│   └── deploy.ts              # Deployment script
├── src/
│   ├── components/
│   │   ├── GameCanvas.tsx     # Phaser game wrapper
│   │   ├── Header.tsx         # Branding + wallet connect
│   │   └── Leaderboard.tsx    # Real-time rankings
│   ├── config/
│   │   ├── contracts.ts       # ABI and addresses
│   │   └── wagmi.ts           # Somnia chain config
│   ├── game/
│   │   └── NeonArenaGame.ts   # Phaser scene logic
│   ├── hooks/
│   │   └── useNeonArena.ts    # Contract interaction hook
│   ├── types/
│   │   └── index.ts           # TypeScript definitions
│   ├── App.tsx                # Main application
│   ├── main.tsx               # Entry point with providers
│   └── index.css              # Global styles + branding
├── hardhat.config.ts          # Hardhat configuration
├── vite.config.ts             # Vite configuration
└── package.json
```

## 🎮 Gameplay

### Controls

- **Arrow Keys**: Move player around the arena
- **SPACE**: Score +100 points (triggers on-chain transaction)

### Scoring

- **Local Score**: Instant feedback, no gas costs
- **On-Chain Score**: Verified, permanent, globally synced
- **Leaderboard**: Aggregates all on-chain scores in real-time

## 🔧 Technology Stack

### Frontend

- **Vite**: Fast dev server and build tool
- **React 19**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first styling
- **Phaser 3**: Game engine
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum library
- **RainbowKit**: Wallet connection UI

### Blockchain

- **Solidity 0.8.24**: Smart contract language
- **Hardhat**: Development environment
- **Somnia Testnet**: Layer-1 blockchain (Chain ID: 50311)
- **Somnia Data Streams**: Real-time event streaming

## 📊 Smart Contract API

### Events

```solidity
event PlayerAction(
    address indexed player,
    string actionType,
    uint256 value,
    uint256 timestamp
);
```

### Functions

```solidity
// Record a single action
function recordAction(string calldata actionType, uint256 value) external;

// Batch record multiple actions
function batchRecordActions(string[] calldata actionTypes, uint256[] calldata values) external;

// View functions
function getPlayerScore(address player) external view returns (uint256);
function getAllPlayers() external view returns (address[] memory);
function getPlayerStats(address player) external view returns (uint256, uint256, bool);
```

## 🎨 Branding

### Color Palette

- **Primary**: `#00f0ff` (Cyan Neon)
- **Accent**: `#ff00ff` (Magenta)
- **Background**: `#0a0a1a` (Deep Dark Blue)

### Typography

- **Font**: Orbitron (Google Fonts)
- **Fallback**: Monospace

## 🔐 Security

- Environment variables for sensitive keys
- `.env` excluded from version control
- No private keys in client-side code
- Smart contract access controls (owner-only functions)

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment Variables on Vercel

Add these to your Vercel project settings:

- `VITE_WALLETCONNECT_PROJECT_ID`
- `VITE_NEON_ARENA_CONTRACT_ADDRESS`
- `VITE_SDS_ENDPOINT`
- `VITE_SDS_API_KEY`

## 🧪 Testing

```bash
# Run smart contract tests
npx hardhat test

# Run linter
npm run lint
```

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is a hackathon MVP. Contributions welcome for:

- Additional game mechanics
- Enhanced SDS integration
- Multi-chain support
- Performance optimizations

## 🔗 Links

- [Somnia Documentation](https://docs.somnia.network)
- [Somnia Data Streams SDK](https://github.com/somnia-chain/streams)
- [Somnia Testnet Explorer](https://testnet-explorer.somnia.network)
- [RainbowKit Docs](https://rainbowkit.com)
- [Phaser 3 Docs](https://photonstorm.github.io/phaser3-docs)

## 👥 Team

Built for the Somnia Data Streams Hackathon.

---

**NEONSYNC** - Real-time on-chain gaming, powered by Somnia.
