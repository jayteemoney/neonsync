import { useEffect, useState } from 'react';
import { useReadContracts } from 'wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';
import { useSomniaStream } from '../hooks/useSomniaStream';
import type { LeaderboardEntry } from '../types';
import { logger } from '../utils/logger';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

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

  useEffect(() => {
    const unsubscribe = onPlayerAction((event) => {
      logger.log('🎮 [Leaderboard] Real-time score update detected!', {
        player: event.player,
        newPoints: event.value.toString(),
      });

      refetch();
    });

    return unsubscribe;
  }, [onPlayerAction, refetch]);

  // Fallback polling only if WebSocket is disconnected
  useEffect(() => {
    if (isConnected) return;

    const interval = setInterval(() => {
      logger.log('⚠️ [Leaderboard] Using fallback polling (WebSocket disconnected)');
      refetch();
    }, 30000); // 30 seconds fallback polling

    return () => clearInterval(interval);
  }, [isConnected, refetch]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-4 sm:p-6 shadow-lg shadow-cyan-400/30 h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-cyan-400 tracking-wider">LEADERBOARD</h2>
        <div className="flex items-center gap-3">
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
            <span className="text-xs text-gray-400 font-mono">
              {isConnected ? 'LIVE' : streamError ? 'ERROR' : 'CONNECTING'}
            </span>
          </div>
        </div>
      </div>

      {isConnected && (
        <div className="mb-4 px-3 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-cyan-400">
            <span className="font-bold">⚡ SOMNIA DATA STREAMS</span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-gray-400">{eventsReceived} events received</span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-gray-400">Zero latency updates</span>
          </div>
        </div>
      )}

      {streamError && (
        <div className="mb-4 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-400">
          <strong>WebSocket Error:</strong> {streamError}
          <br />
          <span className="text-gray-400">Falling back to periodic polling...</span>
        </div>
      )}

      <div className="space-y-2 sm:space-y-3">
        {!players ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm">Loading leaderboard...</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="text-5xl sm:text-6xl animate-float">🏆</div>
            <p className="text-gray-500 text-center text-sm sm:text-base">No players yet. Be the first!</p>
          </div>
        ) : (
          leaderboard.slice(0, 10).map((entry, index) => (
            <div
              key={entry.address}
              className="flex items-center justify-between p-2 sm:p-3 bg-black/40 rounded border border-cyan-400/30 hover:border-magenta-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20 group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <span
                  className={`text-xl sm:text-2xl font-bold w-6 sm:w-8 shrink-0 transition-transform group-hover:scale-110 ${
                    entry.rank === 1
                      ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                      : entry.rank === 2
                      ? 'text-gray-300 drop-shadow-[0_0_8px_rgba(209,213,219,0.5)]'
                      : entry.rank === 3
                      ? 'text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.5)]'
                      : 'text-cyan-400'
                  }`}
                >
                  {entry.rank === 1 ? '👑' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}
                </span>
                <span className="text-gray-300 font-mono text-xs sm:text-sm truncate">
                  {entry.address.slice(0, 6)}...{entry.address.slice(-4)}
                </span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-magenta-500 shrink-0 transition-all group-hover:scale-110 group-hover:text-cyan-400">
                {entry.score}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>
    </div>
  );
}
