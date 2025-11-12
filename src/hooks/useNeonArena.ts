import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';

export function useNeonArena() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const { data: playerScore } = useReadContract({
    address: NEON_ARENA_ADDRESS,
    abi: NEON_ARENA_ABI,
    functionName: 'getPlayerScore',
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const { data: allPlayers } = useReadContract({
    address: NEON_ARENA_ADDRESS,
    abi: NEON_ARENA_ABI,
    functionName: 'getAllPlayers',
  });

  const recordAction = async (actionType: string, value: number) => {
    if (!address) return;

    writeContract({
      address: NEON_ARENA_ADDRESS,
      abi: NEON_ARENA_ABI,
      functionName: 'recordAction',
      args: [actionType, BigInt(value)],
    });
  };

  return {
    playerScore: playerScore ? Number(playerScore) : 0,
    allPlayers: allPlayers || [],
    recordAction,
    isPending: isPending || isConfirming,
    isSuccess,
  };
}
