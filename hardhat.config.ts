import { HardhatUserConfig } from "hardhat/config";
import "dotenv/config";

/**
 * Hardhat Configuration for NEONSYNC
 * Configured for Somnia Testnet deployment
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: false,
    },
  },
  networks: {
    // Somnia Testnet Configuration
    somniaTestnet: {
      type: "http",
      url: process.env.SOMNIA_TESTNET_RPC || "https://dream-rpc.somnia.network",
      chainId: 50312, // Somnia Testnet Chain ID (updated from 50311)
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    // Hardhat local network for testing
    hardhat: {
      type: "edr-simulated",
      chainId: 31337,
    },
    // Localhost for local development
    localhost: {
      type: "http",
      url: "http://127.0.0.1:8545",
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
