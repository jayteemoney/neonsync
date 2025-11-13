#!/bin/bash
set -e

# Read environment variables more robustly
SOMNIA_TESTNET_RPC=$(grep "^SOMNIA_TESTNET_RPC" .env | sed 's/^SOMNIA_TESTNET_RPC[[:space:]]*=[[:space:]]*//g' | tr -d '"' | tr -d "'")
PRIVATE_KEY=$(grep "^PRIVATE_KEY" .env | sed 's/^PRIVATE_KEY[[:space:]]*=[[:space:]]*//g' | tr -d '"' | tr -d "'")

# Extract bytecode
BYTECODE=$(cat artifacts/contracts/NeonArena.sol/NeonArena.json | jq -r '.bytecode')

echo "Deploying NeonArena contract..."
echo "RPC: $SOMNIA_TESTNET_RPC"
echo ""

# Deploy using cast
echo "Sending deployment transaction..."
RESULT=$(cast send --rpc-url "$SOMNIA_TESTNET_RPC" \
  --private-key "$PRIVATE_KEY" \
  --create "$BYTECODE" \
  --json)

# Extract contract address
CONTRACT_ADDRESS=$(echo $RESULT | jq -r '.contractAddress')

echo ""
echo "✅ NeonArena deployed successfully!"
echo "Contract Address: $CONTRACT_ADDRESS"
echo ""
echo "📋 Add this to your .env file:"
echo "VITE_NEON_ARENA_CONTRACT_ADDRESS=$CONTRACT_ADDRESS"
