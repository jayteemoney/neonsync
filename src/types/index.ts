export interface PlayerAction {
  player: string;
  actionType: string;
  value: number;
  timestamp: number;
}

export interface PlayerStats {
  address: string;
  score: number;
  actionCount: number;
  isRegistered: boolean;
}

export interface LeaderboardEntry {
  address: string;
  score: number;
  rank: number;
}

export interface GameState {
  isPlaying: boolean;
  score: number;
  lastAction?: PlayerAction;
}
