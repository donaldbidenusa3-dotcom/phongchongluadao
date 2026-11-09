import React from 'react';
import { Volume2, VolumeX, Music, LogOut, ShieldAlert, Award } from 'lucide-react';

interface StageHeaderProps {
  playerName: string;
  currentLevel: number;
  candies: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  onToggleSound: () => void;
  onToggleMusic: () => void;
  onExit: () => void;
  onOpenLadderDrawer?: () => void;
}

export const StageHeader: React.FC<StageHeaderProps> = ({
  playerName,
  currentLevel,
  candies,
  soundEnabled,
  musicEnabled,
  onToggleSound,
  onToggleMusic,
  onExit,
  onOpenLadderDrawer,
}) => {
  return (
    <header className="relative z-30 w-full border-b border-cyan-900/50 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Logo and Slogan */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-700 to-amber-500 shadow-lg shadow-blue-500/20 border border-amber-400/30">
            <ShieldAlert className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg md:text-xl tracking-wider bg-gradient-to-r from-amber-300 via-yellow-200 to-cyan-300 bg-clip-text text-transparent">
                AI LÀ ĐÀO LỬA
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-blue-500/10 text-cyan-400 border border-cyan-500/30">
                Gameshow 2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Một câu trả lời đúng – Một bước tránh xa lừa đảo
            </p>
          </div>
        </div>

        {/* Player Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Player Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-semibold text-slate-100 max-w-[100px] truncate">{playerName}</span>
            <span className="text-slate-500">|</span>
            <span className="flex items-center gap-1 text-amber-400 font-bold" title="Kẹo thưởng tích lũy">
              <span>🍬</span>
              <span>{candies}</span>
            </span>
          </div>

          {/* Mobile Ladder Button */}
          {onOpenLadderDrawer && (
            <button
              onClick={onOpenLadderDrawer}
              className="lg:hidden flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-950/70 border border-cyan-600/40 text-cyan-300 text-xs font-semibold hover:bg-blue-900/70 transition"
              title="Xem thang tiền thưởng"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Câu {currentLevel}/15</span>
            </button>
          )}

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition ${
              soundEnabled
                ? 'bg-slate-900/90 text-cyan-400 border-cyan-500/40 hover:bg-cyan-950/50'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Ai Là Triệu Phú Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition ${
              musicEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 hover:bg-amber-500/30 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900/50 text-slate-500 border-slate-800 hover:text-slate-300'
            }`}
            title={musicEnabled ? 'Tắt nhạc Ai Là Triệu Phú' : 'Bật nhạc Ai Là Triệu Phú'}
            aria-label="Toggle Ai Là Triệu Phú Music"
          >
            <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'animate-bounce text-amber-300' : ''}`} />
            <span className="hidden sm:inline">{musicEnabled ? 'Nhạc: BẬT' : 'Nhạc: TẮT'}</span>
          </button>

          {/* Exit Game */}
          <button
            onClick={onExit}
            className="p-2 rounded-lg border border-red-500/30 bg-red-950/30 text-red-300 hover:bg-red-900/50 hover:text-red-200 transition"
            title="Dừng lượt chơi / Thoát ra ngoài"
            aria-label="Exit Game"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
