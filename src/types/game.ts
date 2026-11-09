export type OptionKey = 'A' | 'B' | 'C' | 'D';

export interface Question {
  id: string; // e.g. L01Q01
  level: number; // 1 to 15
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: OptionKey;
  explanation: string;
  sourceCode: string; // e.g. MPS-2026, LAW-DATA
  isCustom?: boolean;
}

export interface LevelConfig {
  level: number;
  title: string;
  rewardName: string;
  isMilestone: boolean;
  rewardType: 'none' | 'candy' | 'big_candy' | 'handbook';
  candyCount: number;
}

export type LifelineType = 'fifty_fifty' | 'swap_question' | 'call_friend' | 'ask_audience';

export interface LifelineState {
  fifty_fifty: boolean; // true if available
  swap_question: boolean;
  call_friend: boolean;
  ask_audience: boolean;
}

export interface PlayerProfile {
  name: string;
  playedGames: number;
  highestLevel: number;
  totalCandies: number;
  unlockedHandbook: boolean;
}

export interface FriendContact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  adviceTemplate: string;
  reliability: number; // 0.6 to 0.95
}

export interface AudienceVoteResult {
  votes: Record<OptionKey, number>;
  recommendedOption: OptionKey;
}

export interface GameSettings {
  timerDuration: number; // default 60
  soundEnabled: boolean; // Sound effects (SFX)
  musicEnabled: boolean; // Ai Là Triệu Phú background music
  mcVoiceEnabled?: boolean;
  autoReadQuestion?: boolean;
}

export interface GameHistoryRecord {
  id: string;
  playerName: string;
  date: string;
  levelReached: number;
  reward: string;
  candies: number;
  won: boolean;
}

export interface HandbookChapter {
  id: number;
  title: string;
  icon: string;
  summary: string;
  content: string[];
  tips: string[];
  sources: string[];
}
