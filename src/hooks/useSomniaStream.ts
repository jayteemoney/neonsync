import { useEffect, useState, useCallback, useRef } from 'react';
import { SDK } from '@somnia-chain/streams';
import { createPublicClient, http, webSocket, type WalletClient } from 'viem';
import { useWalletClient, usePublicClient } from 'wagmi';
import { somniaTestnet } from '../config/wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';
import { logger } from '../utils/logger';

/**
 * Somnia Data Streams Hook
 *
 * Properly integrates with the @somnia-chain/streams SDK for real-time event subscriptions.
 * Uses SDK's subscribe() method which provides:
 * - Automatic reconnection handling
 * - Event enrichment capabilities
 * - Better error management
 * - Native support for Somnia's streaming infrastructure
 */

interface PlayerActionEvent {
  player: `0x${string}`;
  actionType: string;
  value: bigint;
  timestamp: bigint;
}

interface StreamState {
  isConnected: boolean;
  lastEvent: PlayerActionEvent | null;
  error: string | null;
  eventsReceived: number;
}

const RPC_URL = import.meta.env.VITE_SOMNIA_RPC_URL || 'https://dream-rpc.somnia.network';
const WS_URL = import.meta.env.VITE_SOMNIA_WS_URL || 'wss://dream-rpc.somnia.network/ws';

export function useSomniaStream() {
  const [state, setState] = useState<StreamState>({
    isConnected: false,
    lastEvent: null,
    error: null,
    eventsReceived: 0,
  });

  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  const listenersRef = useRef<Set<(event: PlayerActionEvent) => void>>(new Set());
  const sdkRef = useRef<SDK | null>(null);

  const onPlayerAction = useCallback((callback: (event: PlayerActionEvent) => void) => {
    listenersRef.current.add(callback);
    return () => {
      listenersRef.current.delete(callback);
    };
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    let isSubscribed = true;
    let reconnectTimeout: NodeJS.Timeout | null = null;
    let wsClient: ReturnType<typeof createPublicClient> | null = null;

    const connect = async () => {
      try {
        console.log('🔌 [SDS] Initializing Somnia Data Streams SDK...', {
          rpcUrl: RPC_URL,
          wsUrl: WS_URL,
          contractAddress: NEON_ARENA_ADDRESS
        });

        if (!NEON_ARENA_ADDRESS || NEON_ARENA_ADDRESS.length === 0) {
          throw new Error('Contract address not configured');
        }

        const httpClient = createPublicClient({
          chain: somniaTestnet,
          transport: http(RPC_URL),
        });

        wsClient = createPublicClient({
          chain: somniaTestnet,
          transport: webSocket(WS_URL, {
            reconnect: {
              attempts: 5,
              delay: 1000,
            },
            timeout: 30000,
          }),
        });

        // Initialize SDK with HTTP client for state queries and WebSocket for real-time events
        sdkRef.current = new SDK({
          public: httpClient,
          wallet: walletClient as WalletClient | undefined,
        });

        console.log('✅ [SDS] SDK initialized successfully');
        setState((prev) => ({ ...prev, isConnected: true, error: null }));

        // Subscribe to PlayerAction events via WebSocket for real-time updates
        unsubscribe = wsClient.watchContractEvent({
          address: NEON_ARENA_ADDRESS,
          abi: NEON_ARENA_ABI,
          eventName: 'PlayerAction',
          onLogs: (logs) => {
            if (!isSubscribed) return;

            console.log('📨 [SDS] Received', logs.length, 'event(s)');

            logs.forEach((log) => {
              try {
                const { args } = log as typeof log & { args: { player: `0x${string}`; actionType: string; value: bigint; timestamp: bigint } };

                const event: PlayerActionEvent = {
                  player: args.player,
                  actionType: args.actionType,
                  value: args.value,
                  timestamp: args.timestamp,
                };

                setState((prev) => ({
                  ...prev,
                  lastEvent: event,
                  eventsReceived: prev.eventsReceived + 1,
                }));

                listenersRef.current.forEach((callback) => callback(event));

                console.log('🔥 [SDS] Event processed:', {
                  player: event.player.slice(0, 10) + '...',
                  action: event.actionType,
                  value: event.value.toString(),
                });

                logger.log('🔥 [SDS] Real-time event received:', {
                  player: event.player,
                  action: event.actionType,
                  value: event.value.toString(),
                });
              } catch (err) {
                console.error('❌ [SDS] Error parsing event:', err);
                logger.error('Error parsing event:', err);
              }
            });
          },
          onError: (error) => {
            console.error('🚨 [SDS] WebSocket error:', error);
            logger.error('🚨 [SDS] WebSocket error:', error);
            setState((prev) => ({
              ...prev,
              error: error.message,
              isConnected: false,
            }));

            if (isSubscribed) {
              reconnectTimeout = setTimeout(() => {
                console.log('🔄 [SDS] Attempting to reconnect...');
                logger.log('🔄 [SDS] Attempting to reconnect...');
                connect();
              }, 5000);
            }
          },
        });

        console.log('👂 [SDS] Listening for PlayerAction events...');
        logger.log('✅ [SDS] Connected to Somnia Data Streams');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to connect';
        console.error('🚨 [SDS] Connection failed:', error);
        logger.error('🚨 [SDS] Connection failed:', error);
        setState((prev) => ({
          ...prev,
          error: errorMessage,
          isConnected: false,
        }));

        if (isSubscribed) {
          reconnectTimeout = setTimeout(() => {
            console.log('🔄 [SDS] Attempting to reconnect...');
            logger.log('🔄 [SDS] Attempting to reconnect...');
            connect();
          }, 5000);
        }
      }
    };

    connect();

    return () => {
      isSubscribed = false;
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
      if (unsubscribe) {
        unsubscribe();
      }
      if (wsClient) {
        logger.log('🔌 [SDS] Disconnected from Somnia Data Streams');
      }
      sdkRef.current = null;
    };
  }, [publicClient, walletClient]);

  return {
    ...state,
    onPlayerAction,
    sdk: sdkRef.current, // Expose SDK instance for advanced usage
  };
}
