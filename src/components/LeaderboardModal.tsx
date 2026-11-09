import React from 'react';
import { GameHistoryRecord, PlayerProfile } from '../types/game';
import { Trophy, Award, Calendar, X, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

interface LeaderboardModalProps {
  history: GameHistoryRecord[];
  profile: PlayerProfile;
  onClearHistory: () => void;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  history,
  profile,
  onClearHistory,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-amber-400/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 font-black shadow-md">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-amber-300">
                BẢNG VÀNG THÀNH TÍCH
              </h2>
              <p className="text-xs text-slate-400">
                Lịch sử chinh phục 15 cấp độ phòng chống lừa đảo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 bg-slate-900/60 border-b border-slate-800 text-center">
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Số lượt chơi</span>
            <span className="font-mono-stage text-lg font-black text-cyan-300">{profile.playedGames}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Cấp cao nhất</span>
            <span className="font-mono-stage text-lg font-black text-amber-300">{profile.highestLevel} / 15</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Tổng kẹo tích lũy</span>
            <span className="font-mono-stage text-lg font-black text-yellow-400 flex items-center justify-center gap-1">
              <span>🍬</span> {profile.totalCandies}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Cẩm nang 2026</span>
            <span className="text-xs font-bold text-emerald-400 mt-1 block">
              {profile.unlockedHandbook ? 'Đã mở khóa 🏆' : 'Chưa đạt'}
            </span>
          </div>
        </div>

        {/* Matches History List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2 bg-gradient-to-b from-slate-950 to-blue-950/20">
          {history.length === 0 ? (
            <div className="py-12 text-center text-slate-500 space-y-2">
              <Award className="w-10 h-10 mx-auto text-slate-600" />
              <p className="text-sm">Chưa có lượt chơi nào được ghi nhận. Hãy bắt đầu chinh phục ngay!</p>
            </div>
          ) : (
            history.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-lg font-mono-stage font-bold text-xs ${
                      rec.won
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {rec.won ? '🏆' : `C${rec.levelReached}`}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-100 flex items-center gap-2">
                      <span>{rec.playerName}</span>
                      {rec.won && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase">
                          Quán quân
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{rec.date}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono-stage font-bold text-amber-300 block">
                    {rec.reward}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Đạt câu {rec.levelReached} / 15 • {rec.candies} 🍬
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          {history.length > 0 ? (
            <button
              onClick={() => {
                if (confirm('Bạn có chắc muốn xóa sạch toàn bộ lịch sử thành tích trên thiết bị?')) {
                  onClearHistory();
                }
              }}
              className="flex items-center gap-1 text-red-400 hover:text-red-300"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa lịch sử</span>
            </button>
          ) : (
            <span />
          )}
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
