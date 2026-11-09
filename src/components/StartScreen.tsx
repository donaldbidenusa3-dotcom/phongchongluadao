import React, { useState } from 'react';
import {
  Play,
  HelpCircle,
  BookOpen,
  BookMarked,
  Info,
  Settings,
  Trophy,
  ShieldCheck,
  User,
  Sparkles,
  Award,
  Music,
  Volume2
} from 'lucide-react';
import { PlayerProfile } from '../types/game';

interface StartScreenProps {
  profile: PlayerProfile;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  onPlayTheme: () => void;
  onStartGame: (name: string) => void;
  onOpenRules: () => void;
  onOpenKnowledge: () => void;
  onOpenHandbook: () => void;
  onOpenAbout: () => void;
  onOpenManager: () => void;
  onOpenLeaderboard: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  profile,
  musicEnabled,
  onToggleMusic,
  onPlayTheme,
  onStartGame,
  onOpenRules,
  onOpenKnowledge,
  onOpenHandbook,
  onOpenAbout,
  onOpenManager,
  onOpenLeaderboard,
}) => {
  const [playerName, setPlayerName] = useState<string>(profile.name || 'Chiến Binh Số');
  const [showNameModal, setShowNameModal] = useState<boolean>(false);

  const handleStartClick = () => {
    setShowNameModal(true);
  };

  const handleConfirmStart = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = playerName.trim() || 'Người Chơi';
    onStartGame(cleanName);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 md:py-10 overflow-hidden bg-slate-950 text-slate-100">
      {/* GAMESHOW STAGE LIGHTING BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central Stage Spotlight Cones */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-blue-600/25 via-cyan-500/10 to-transparent blur-3xl rounded-full" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-600/20 blur-3xl rounded-full" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-amber-500/15 blur-3xl rounded-full" />

        {/* Stage Grid & Ring Lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* TOP HEADER CONTROLS */}
      <header className="relative z-10 w-full max-w-5xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Phiên bản Gameshow Số 2026</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Ai Là Triệu Phú Music Toggle */}
          <button
            onClick={onToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
              musicEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 hover:bg-amber-500/30 shadow-sm shadow-amber-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title={musicEnabled ? 'Tắt nhạc nền Ai Là Triệu Phú' : 'Bật nhạc nền Ai Là Triệu Phú'}
          >
            <Music className={`w-3.5 h-3.5 ${musicEnabled ? 'animate-bounce text-amber-300' : ''}`} />
            <span>{musicEnabled ? 'Nhạc: BẬT' : 'Nhạc: TẮT'}</span>
          </button>

          <button
            onClick={onOpenLeaderboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400 text-xs font-semibold text-amber-300 hover:bg-slate-800 transition cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Bảng vàng</span>
          </button>

          <button
            onClick={onOpenManager}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-cyan-300 transition cursor-pointer"
            title="Quản lý câu hỏi & Cài đặt"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* CENTER HERO SECTION: LOGO & SLOGAN & CTA */}
      <main className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center my-auto py-8">
        {/* Animated Stage Emblem */}
        <div className="relative mb-4 sm:mb-6">
          <div className="relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-700 via-indigo-900 to-amber-500 p-1 shadow-2xl shadow-blue-500/30 border-2 border-amber-400/60 animate-pulse-glow">
            <div className="w-full h-full rounded-[20px] bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
              <ShieldCheck className="w-12 h-12 text-amber-300 animate-bounce" />
              <span className="text-[10px] font-mono-stage font-bold text-cyan-400 tracking-widest mt-1">
                2026
              </span>
            </div>
          </div>
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-amber-300 animate-spin" />
        </div>

        {/* Gameshow Title Lockup */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-wider uppercase mb-3">
          <span className="bg-gradient-to-b from-white via-amber-200 to-amber-400 bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(245,158,11,0.6)]">
            AI LÀ ĐÀO LỬA
          </span>
        </h1>

        {/* Subtitle & Official Slogan */}
        <div className="space-y-1.5 mb-8 max-w-xl">
          <p className="font-display font-black text-sm sm:text-base text-cyan-400 uppercase tracking-widest">
            Nhận diện lừa đảo – Bảo vệ chính mình
          </p>
          <p className="text-xs sm:text-sm text-slate-300 italic font-medium">
            "Một câu trả lời đúng – Một bước tránh xa lừa đảo"
          </p>
        </div>

        {/* Play Intro Theme Music Button */}
        <button
          onClick={onPlayTheme}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-950/70 border border-cyan-500/40 hover:border-amber-400/60 text-xs font-bold text-cyan-300 hover:text-amber-300 transition shadow-lg mb-6 group cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>Nghe nhạc hiệu mở đầu "Ai Là Triệu Phú" 🎵</span>
        </button>

        {/* PRIMARY CTA: BẮT ĐẦU CHƠI */}
        <div className="w-full max-w-xs space-y-3 mb-8">
          <button
            onClick={handleStartClick}
            className="group relative w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-display font-black text-lg sm:text-xl tracking-wider uppercase shadow-2xl shadow-amber-500/40 hover:scale-[1.03] active:scale-[0.98] transition cursor-pointer"
          >
            <Play className="w-6 h-6 fill-slate-950 transition-transform group-hover:translate-x-0.5" />
            <span>BẮT ĐẦU CHƠI</span>
          </button>

          <p className="text-[11px] text-slate-500">
            15 Cấp độ • 60 giây mỗi câu • 4 Quyền trợ giúp
          </p>
        </div>

        {/* SECONDARY NAVIGATION BUTTONS */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl">
          <button
            onClick={onOpenRules}
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 text-xs font-bold text-slate-300 hover:text-cyan-300 hover:bg-slate-850 transition"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>HƯỚNG DẪN</span>
          </button>

          <button
            onClick={onOpenKnowledge}
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 text-xs font-bold text-slate-300 hover:text-cyan-300 hover:bg-slate-850 transition"
          >
            <BookMarked className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>KHO KIẾN THỨC</span>
          </button>

          <button
            onClick={onOpenHandbook}
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400 text-xs font-bold text-slate-300 hover:text-amber-300 hover:bg-slate-850 transition"
          >
            <BookOpen className="w-4 h-4 text-amber-400 shrink-0" />
            <span>CẨM NANG PDF</span>
          </button>

          <button
            onClick={onOpenAbout}
            className="flex items-center justify-center gap-1.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400 text-xs font-bold text-slate-300 hover:text-cyan-300 hover:bg-slate-850 transition"
          >
            <Info className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>GIỚI THIỆU</span>
          </button>
        </div>
      </main>

      {/* FOOTER & TRUST COMMITMENT BADGE */}
      <footer className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center gap-2 pt-4 border-t border-slate-900 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-semibold bg-amber-950/30 px-3 py-1 rounded-full border border-amber-500/30">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          <span>Cam kết bảo mật: Không thu thập OTP, mật khẩu, CCCD hay tài khoản thật</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Dữ liệu đối chiếu từ Bộ Công an (mps.gov.vn) & Cổng thông tin Chính phủ (vanban.chinhphu.vn)
        </p>
      </footer>

      {/* PLAYER NAME MODAL BEFORE ENTERING STAGE */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-cyan-400 p-6 sm:p-8 text-center shadow-2xl shadow-cyan-500/30">
            <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 mb-4">
              <User className="w-7 h-7" />
            </div>

            <h3 className="font-display font-black text-xl text-slate-100 mb-1">
              CHÀO MỪNG BẠN ĐẾN VỚI SÂN KHẤU
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Vui lòng nhập tên hoặc biệt danh để MC xướng tên và ghi nhận bảng vàng
            </p>

            <form onSubmit={handleConfirmStart} className="space-y-4">
              <input
                type="text"
                autoFocus
                maxLength={30}
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Nhập tên người chơi của bạn..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border-2 border-slate-700 text-slate-100 text-center font-bold text-base focus:outline-none focus:border-amber-400 transition"
              />

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNameModal(false)}
                  className="w-1/3 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Quay lại
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/40 hover:scale-[1.02] transition"
                >
                  VÀO TRƯỜNG QUAY
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
