import { Question, GameSettings, PlayerProfile, GameHistoryRecord } from '../types/game';
import { BALANCED_QUESTION_BANK } from '../data/questionBank';

const STORAGE_KEYS = {
  QUESTIONS: 'ai_la_dao_lua_questions_v3',
  SETTINGS: 'ai_la_dao_lua_settings_v2',
  PROFILE: 'ai_la_dao_lua_profile_v1',
  HISTORY: 'ai_la_dao_lua_history_v1',
};

export const DEFAULT_SETTINGS: GameSettings = {
  timerDuration: 60,
  soundEnabled: true,
  musicEnabled: true, // "Ai Là Triệu Phú" background music enabled by default
  mcVoiceEnabled: false, // Voice disabled per user instruction
  autoReadQuestion: false,
};

export const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Chiến Binh An Toàn Số',
  playedGames: 0,
  highestLevel: 0,
  totalCandies: 0,
  unlockedHandbook: false,
};

export const StorageService = {
  // --- QUESTIONS ---
  getQuestions(): Question[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.QUESTIONS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    // Initialize with balanced 150 questions (distributed across A, B, C, D)
    StorageService.saveQuestions(BALANCED_QUESTION_BANK);
    return BALANCED_QUESTION_BANK;
  },

  saveQuestions(questions: Question[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.QUESTIONS, JSON.stringify(questions));
    } catch (e) {
      console.error('Failed to save questions to localStorage', e);
    }
  },

  addQuestion(newQ: Omit<Question, 'id'>): Question {
    const questions = StorageService.getQuestions();
    const id = `CUSTOM_L${String(newQ.level).padStart(2, '0')}_${Date.now()}`;
    const question: Question = { ...newQ, id, isCustom: true };
    questions.push(question);
    StorageService.saveQuestions(questions);
    return question;
  },

  updateQuestion(updated: Question): void {
    const questions = StorageService.getQuestions();
    const index = questions.findIndex(q => q.id === updated.id);
    if (index !== -1) {
      questions[index] = updated;
      StorageService.saveQuestions(questions);
    }
  },

  deleteQuestion(id: string): void {
    const questions = StorageService.getQuestions().filter(q => q.id !== id);
    StorageService.saveQuestions(questions);
  },

  resetQuestionsToDefault(): Question[] {
    StorageService.saveQuestions(BALANCED_QUESTION_BANK);
    return BALANCED_QUESTION_BANK;
  },

  // --- SETTINGS ---
  getSettings(): GameSettings {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_SETTINGS;
  },

  saveSettings(settings: GameSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings', e);
    }
  },

  // --- PLAYER PROFILE ---
  getProfile(): PlayerProfile {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
      }
    } catch {}
    return DEFAULT_PROFILE;
  },

  saveProfile(profile: PlayerProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  },

  updateProfileAfterGame(levelReached: number, candiesWon: number, won: boolean): PlayerProfile {
    const profile = StorageService.getProfile();
    profile.playedGames += 1;
    if (levelReached > profile.highestLevel) {
      profile.highestLevel = levelReached;
    }
    profile.totalCandies += candiesWon;
    if (won || levelReached >= 15) {
      profile.unlockedHandbook = true;
    }
    StorageService.saveProfile(profile);
    return profile;
  },

  // --- LEADERBOARD & HISTORY ---
  getHistory(): GameHistoryRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}
    return [];
  },

  recordGame(record: Omit<GameHistoryRecord, 'id' | 'date'>): GameHistoryRecord {
    const history = StorageService.getHistory();
    const fullRecord: GameHistoryRecord = {
      ...record,
      id: `GAME_${Date.now()}`,
      date: new Date().toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }),
    };
    history.unshift(fullRecord);
    // Keep top 50 recent games
    const trimmed = history.slice(0, 50);
    try {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(trimmed));
    } catch {}
    return fullRecord;
  }
};
