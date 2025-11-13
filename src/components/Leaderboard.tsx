import { useEffect, useState } from 'react';
import { useReadContracts } from 'wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';
import { useSomniaStream } from '../hooks/useSomniaStream';
import type { LeaderboardEntry } from '../types';
import { logger } from '../utils/logger';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Connect to Somnia Data Streams for real-time updates
  const { isConnected, eventsReceived, error: streamError, onPlayerAction } = useSomniaStream();

  const { data, refetch } = useReadContracts({
    contracts: [
      {
        address: NEON_ARENA_ADDRESS,
        abi: NEON_ARENA_ABI,
        functionName: 'getAllPlayers',
      },
    ],
  });

  const players = data?.[0]?.result as `0x${string}`[] | undefined;

  const { data: scoresData } = useReadContracts({
    contracts: players?.map((player) => ({
      address: NEON_ARENA_ADDRESS,
      abi: NEON_ARENA_ABI,
      functionName: 'getPlayerScore',
      args: [player],
    })) || [],
  });

  // Update leaderboard when data changes
  useEffect(() => {
    if (!players || !scoresData) return;

    const entries: LeaderboardEntry[] = players
      .map((address, index) => ({
        address,
        score: Number(scoresData[index]?.result || 0),
        rank: 0,
      }))
      .sort((a, b) => b.score - a.score)
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    setLeaderboard(entries);
    setLastUpdate(new Date());
  }, [players, scoresData]);

  // Listen for real-time PlayerAction events via Somnia Data Streams
  useEffect(() => {
    const unsubscribe = onPlayerAction((event) => {
      logger.log('🎮 [Leaderboard] Real-time score update detected!', {
        player: event.player,
        newPoints: event.value.toString(),
      });

      // Refetch leaderboard data immediately when event is received
      refetch();
    });

    return unsubscribe;
  }, [onPlayerAction, refetch]);

  // Fallback polling (only if WebSocket disconnected) - removed aggressive 5s polling
  useEffect(() => {
    if (isConnected) return; // Don't poll if WebSocket is active

    const interval = setInterval(() => {
      logger.log('⚠️ [Leaderboard] Using fallback polling (WebSocket disconnected)');
      refetch();
    }, 30000); // 30 seconds fallback polling

    return () => clearInterval(interval);
  }, [isConnected, refetch]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-6 shadow-lg shadow-cyan-400/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-cyan-400 tracking-wider">LEADERBOARD</h2>
        <div className="flex items-center gap-3">
          {/* Connection Status Indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected
                  ? 'bg-green-400 animate-pulse'
                  : streamError
                  ? 'bg-red-400'
                  : 'bg-yellow-400 animate-pulse'
              }`}
              title={
                isConnected
                  ? `Live • ${eventsReceived} events`
                  : streamError
                  ? `Error: ${streamError}`
                  : 'Connecting...'
              }
            ></div>
            <span className="text-xs text-gray-400">
              {isConnected ? 'LIVE' : streamError ? 'ERROR' : 'CONNECTING'}
            </span>
          </div>
        </div>
      </div>

      {/* Stream Status Banner */}
      {isConnected && (
        <div className="mb-4 px-3 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs">
          <div className="flex items-center gap-2 text-cyan-400">
            <span className="font-bold">⚡ SOMNIA DATA STREAMS</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{eventsReceived} events received</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">Zero latency updates</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {streamError && (
        <div className="mb-4 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
          <strong>WebSocket Error:</strong> {streamError}
          <br />
          <span className="text-gray-400">Falling back to periodic polling...</span>
        </div>
      )}

      <div className="space-y-3">
        {leaderboard.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No players yet. Be the first!</p>
        ) : (
          leaderboard.slice(0, 10).map((entry) => (
            <div
              key={entry.address}
              className="flex items-center justify-between p-3 bg-black/40 rounded border border-cyan-400/30 hover:border-magenta-500/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`text-2xl font-bold w-8 ${
                    entry.rank === 1
                      ? 'text-yellow-400'
                      : entry.rank === 2
                      ? 'text-gray-300'
                      : entry.rank === 3
                      ? 'text-orange-400'
                      : 'text-cyan-400'
                  }`}
                >
                  {entry.rank}
                </span>
                <span className="text-gray-300 font-mono text-sm">
                  {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                </span>
              </div>
              <span className="text-xl font-bold text-magenta-500">{entry.score}</span>
            </div>
          ))
        )}
      </div>

      {/* Last Update Timestamp */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
}
