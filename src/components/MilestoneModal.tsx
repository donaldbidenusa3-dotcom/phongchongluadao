import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, Award, BookOpen } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface MilestoneModalProps {
  level: number;
  candiesWon: number;
  onContinue: () => void;
  onOpenHandbook?: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  level,
  candiesWon,
  onContinue,
  onOpenHandbook,
}) => {
  useEffect(() => {
    soundEffects.playMilestone();

    // Trigger colorful confetti celebration
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#38bdf8', '#10b981', '#ec4899'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#38bdf8', '#10b981', '#ec4899'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, [level]);

  let icon = '🍬';
  let title = 'VƯỢT QUA MỐC SỐ 5!';
  let rewardTitle = 'NHẬN THƯỞNG 1 KẸO AN TOÀN';
  let description = 'Chúc mừng bạn đã hoàn thành phần kiến thức cơ bản về nhận diện dấu hiệu lừa đảo!';

  if (level === 10) {
    icon = '🍭';
    title = 'CHINH PHỤC MỐC SỐ 10!';
    rewardTitle = 'NHẬN THƯỞNG KẸO TO (3 KẸO)';
    description = 'Tuyệt vời! Bạn đã vượt qua các tình huống phức tạp về AI, giả giọng và bảo vệ dữ liệu cá nhân!';
  } else if (level === 15) {
    icon = '🏆📚';
    title = 'QUÁN QUÂN AI LÀ ĐÀO LỬA!';
    rewardTitle = 'MỞ KHÓA CẨM NANG PHÒNG CHỐNG LỪA ĐẢO 2026';
    description = 'Bạn đã xuất sắc vượt qua toàn bộ 15 câu hỏi và trở thành Cao thủ phòng chống lừa đảo trên không gian mạng!';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 border-2 border-amber-400 p-6 sm:p-8 text-center shadow-2xl shadow-amber-500/30">
        {/* Glow backdrop */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/25 blur-3xl rounded-full pointer-events-none" />

        {/* Milestone Icon */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center text-5xl mb-4 rounded-3xl bg-amber-400/10 border-2 border-amber-400/40 shadow-inner">
          <span className="animate-bounce">{icon}</span>
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" />
        </div>

        <h3 className="font-display font-black text-2xl text-amber-300 tracking-wide mb-1">
          {title}
        </h3>

        <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/40 text-xs font-black uppercase tracking-wider mb-4">
          {rewardTitle}
        </div>

        <p className="text-sm text-slate-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Candy count balance */}
        <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 mb-6">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Kẹo thưởng tích lũy trong túi:</span>
          <span className="font-bold text-amber-300 text-sm">{candiesWon} 🍬</span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5">
          {level === 15 && onOpenHandbook && (
            <button
              onClick={onOpenHandbook}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/40 hover:scale-[1.02] transition"
            >
              <BookOpen className="w-4 h-4" />
              <span>ĐỌC VÀ TẢI CẨM NANG NGAY (PDF)</span>
            </button>
          )}

          <button
            onClick={onContinue}
            className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition ${
              level === 15
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-lg shadow-cyan-600/30'
            }`}
          >
            <span>{level === 15 ? 'Xem tổng kết vinh danh' : 'Tiếp tục câu tiếp theo'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
