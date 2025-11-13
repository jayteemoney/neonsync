import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { NEON_ARENA_ADDRESS, NEON_ARENA_ABI } from '../config/contracts';
import { useState, useEffect } from 'react';

interface TransactionState {
  status: 'idle' | 'preparing' | 'pending' | 'confirming' | 'success' | 'error';
  error: string | null;
  hash: `0x${string}` | null;
}

export function useNeonArena() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess, error: receiptError } = useWaitForTransactionReceipt({ hash });

  const [txState, setTxState] = useState<TransactionState>({
    status: 'idle',
    error: null,
    hash: null,
  });

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

  // Update transaction state based on wagmi hooks
  useEffect(() => {
    if (writeError || receiptError) {
      const error = writeError || receiptError;
      setTxState({
        status: 'error',
        error: error?.message || 'Transaction failed',
        hash: hash || null,
      });
      console.error('🚨 [Transaction Error]:', error);
    } else if (isSuccess) {
      setTxState({
        status: 'success',
        error: null,
        hash: hash || null,
      });
      console.log('✅ [Transaction Success]:', hash);
    } else if (isConfirming) {
      setTxState({
        status: 'confirming',
        error: null,
        hash: hash || null,
      });
      console.log('⏳ [Transaction Confirming]:', hash);
    } else if (isPending) {
      setTxState({
        status: 'pending',
        error: null,
        hash: null,
      });
      console.log('📝 [Transaction Pending]...');
    } else if (txState.status !== 'idle') {
      // Reset after success
      const timer = setTimeout(() => {
        setTxState({ status: 'idle', error: null, hash: null });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPending, isConfirming, isSuccess, writeError, receiptError, hash]);

  const recordAction = async (actionType: string, value: number) => {
    if (!address) {
      console.error('🚨 No wallet connected');
      setTxState({
        status: 'error',
        error: 'Please connect your wallet first',
        hash: null,
      });
      return;
    }

    try {
      setTxState({ status: 'preparing', error: null, hash: null });

      writeContract({
        address: NEON_ARENA_ADDRESS,
        abi: NEON_ARENA_ABI,
        functionName: 'recordAction',
        args: [actionType, BigInt(value)],
      });
    } catch (error: any) {
      console.error('🚨 [recordAction Error]:', error);
      setTxState({
        status: 'error',
        error: error.message || 'Failed to submit transaction',
        hash: null,
      });
    }
  };

  return {
    playerScore: playerScore ? Number(playerScore) : 0,
    allPlayers: allPlayers || [],
    recordAction,
    isPending: isPending || isConfirming,
    isSuccess,
    txState,
  };
}
