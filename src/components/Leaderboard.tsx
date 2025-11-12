import { useEffect, useState } from 'react';
import { useReadContracts } from 'wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';
import type { LeaderboardEntry } from '../types';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

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
  }, [players, scoresData]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg border-2 border-cyan-400 p-6 shadow-lg shadow-cyan-400/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-cyan-400 tracking-wider">LEADERBOARD</h2>
        <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>

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
    </div>
  );
}
