import { createWalletClient, createPublicClient, http, parseGwei } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { defineChain } from 'viem';
import * as fs from 'fs';
import * as path from 'path';
import 'dotenv/config';

// Define Somnia Testnet chain
const somniaTestnet = defineChain({
  id: 50311,
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

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const rpcUrl = process.env.SOMNIA_TESTNET_RPC || 'https://dream-rpc.somnia.network';

  if (!privateKey) {
    throw new Error('PRIVATE_KEY not found in .env file');
  }

  // Create account from private key
  const account = privateKeyToAccount(privateKey as `0x${string}`);

  console.log('Deploying NeonArena with account:', account.address);

  // Create clients
  const publicClient = createPublicClient({
    chain: somniaTestnet,
    transport: http(rpcUrl),
  });

  const walletClient = createWalletClient({
    account,
    chain: somniaTestnet,
    transport: http(rpcUrl),
  });

  // Get account balance
  const balance = await publicClient.getBalance({ address: account.address });
  console.log('Account balance:', balance.toString(), 'wei');
  console.log('Account balance:', (Number(balance) / 1e18).toFixed(4), 'STT');

  if (balance === 0n) {
    throw new Error('Account has no balance. Please get testnet tokens from https://faucet.somnia.network');
  }

  // Read compiled contract
  const artifactPath = path.join(process.cwd(), 'artifacts/contracts/NeonArena.sol/NeonArena.json');

  if (!fs.existsSync(artifactPath)) {
    throw new Error('Contract not compiled. Run: npm run compile');
  }

  const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
  const bytecode = artifact.bytecode as `0x${string}`;
  const abi = artifact.abi;

  console.log('\nDeploying contract...');

  try {
    // Deploy contract with legacy transaction type
    const hash = await walletClient.deployContract({
      abi,
      bytecode,
      args: [],
      gas: 15000000n, // Set explicit gas limit
      gasPrice: parseGwei('0.000000007'), // Very low gas price for testnet
      type: 'legacy', // Use legacy transaction type
    });

    console.log('Transaction hash:', hash);
    console.log('Waiting for confirmation...');

    // Wait for transaction receipt
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      timeout: 120_000, // 2 minute timeout
    });

    if (!receipt.contractAddress) {
      throw new Error('Contract deployment failed: no contract address in receipt');
    }

    console.log('\n✅ NeonArena deployed successfully!');
    console.log('Contract address:', receipt.contractAddress);
    console.log('Transaction hash:', receipt.transactionHash);
    console.log('Block number:', receipt.blockNumber.toString());
    console.log('Gas used:', receipt.gasUsed.toString());
    console.log('\n📋 Add this to your .env file:');
    console.log(`VITE_NEON_ARENA_CONTRACT_ADDRESS=${receipt.contractAddress}`);
    console.log('\nExplorer:', `https://somnia.network/tx/${hash}`);
  } catch (error: any) {
    if (error.message?.includes('insufficient funds')) {
      throw new Error('Insufficient funds for gas. Please get more testnet tokens.');
    }
    throw error;
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('\n❌ Deployment failed:');
    console.error(error.message || error);
    if (error.cause) {
      console.error('\nCause:', error.cause);
    }
    if (error.details) {
      console.error('\nDetails:', error.details);
    }
    process.exit(1);
  });
