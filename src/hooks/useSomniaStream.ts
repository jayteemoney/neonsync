import { useEffect, useState, useCallback } from 'react';
import { createPublicClient, webSocket, type Log } from 'viem';
import { somniaTestnet } from '../config/wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';

/**
 * Somnia Data Streams Hook
 *
 * Uses WebSocket connection to listen for real-time PlayerAction events
 * This is the core feature demonstrating "Off-chain speed" via SDS
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

const WS_URL = 'wss://dream-rpc.somnia.network/ws';

export function useSomniaStream() {
  const [state, setState] = useState<StreamState>({
    isConnected: false,
    lastEvent: null,
    error: null,
    eventsReceived: 0,
  });

  const [listeners, setListeners] = useState<Set<(event: PlayerActionEvent) => void>>(new Set());

  // Register event listener
  const onPlayerAction = useCallback((callback: (event: PlayerActionEvent) => void) => {
    setListeners((prev) => new Set(prev).add(callback));

    // Return cleanup function
    return () => {
      setListeners((prev) => {
        const next = new Set(prev);
        next.delete(callback);
        return next;
      });
    };
  }, []);

  useEffect(() => {
    let client: ReturnType<typeof createPublicClient> | null = null;
    let unwatch: (() => void) | null = null;
    let isSubscribed = true;

    const connect = async () => {
      try {
        // Create WebSocket client for real-time event streaming
        client = createPublicClient({
          chain: somniaTestnet,
          transport: webSocket(WS_URL, {
            reconnect: true,
            retryCount: 5,
            retryDelay: 1000,
          }),
        });

        setState((prev) => ({ ...prev, isConnected: true, error: null }));

        // Subscribe to PlayerAction events in real-time
        unwatch = client.watchContractEvent({
          address: NEON_ARENA_ADDRESS,
          abi: NEON_ARENA_ABI,
          eventName: 'PlayerAction',
          onLogs: (logs) => {
            if (!isSubscribed) return;

            logs.forEach((log: Log) => {
              try {
                // Parse event data
                const { args } = log as any;
                const event: PlayerActionEvent = {
                  player: args.player,
                  actionType: args.actionType,
                  value: args.value,
                  timestamp: args.timestamp,
                };

                // Update state
                setState((prev) => ({
                  ...prev,
                  lastEvent: event,
                  eventsReceived: prev.eventsReceived + 1,
                }));

                // Notify all listeners
                listeners.forEach((callback) => callback(event));

                console.log('🔥 [SDS] Real-time event received:', {
                  player: event.player,
                  action: event.actionType,
                  value: event.value.toString(),
                });
              } catch (err) {
                console.error('Error parsing event:', err);
              }
            });
          },
          onError: (error) => {
            console.error('🚨 [SDS] WebSocket error:', error);
            setState((prev) => ({
              ...prev,
              error: error.message,
              isConnected: false,
            }));
          },
        });

        console.log('✅ [SDS] Connected to Somnia Data Streams');
      } catch (error: any) {
        console.error('🚨 [SDS] Connection failed:', error);
        setState((prev) => ({
          ...prev,
          error: error.message || 'Failed to connect',
          isConnected: false,
        }));
      }
    };

    connect();

    // Cleanup on unmount
    return () => {
      isSubscribed = false;
      if (unwatch) {
        unwatch();
      }
      if (client) {
        // WebSocket client cleanup happens automatically
        console.log('🔌 [SDS] Disconnected from Somnia Data Streams');
      }
    };
  }, [listeners]);

  return {
    ...state,
    onPlayerAction,
  };
}
