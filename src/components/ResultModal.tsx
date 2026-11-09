import React from 'react';
import { Question, OptionKey } from '../types/game';
import { OFFICIAL_SOURCES } from '../data/sources';
import { AlertCircle, CheckCircle, RotateCcw, Home, BookOpen, ExternalLink, Award } from 'lucide-react';

interface ResultModalProps {
  question: Question;
  selectedOption: OptionKey | null;
  isTimeOut: boolean;
  levelReached: number;
  candiesWon: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenHandbook: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  question,
  selectedOption,
  isTimeOut,
  levelReached,
  candiesWon,
  onPlayAgain,
  onGoHome,
  onOpenHandbook,
}) => {
  const correctKey = question.correctAnswer;
  const correctText = question.options[correctKey];
  const source = OFFICIAL_SOURCES[question.sourceCode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl my-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-red-950/40 border-2 border-red-500/60 p-5 sm:p-7 shadow-2xl shadow-red-900/40 text-slate-100">
        {/* Header Icon & Title */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-2xl bg-red-500/10 border-2 border-red-500/40 text-red-400 mb-3">
            <AlertCircle className="w-9 h-9" />
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-red-300">
            {isTimeOut ? 'HẾT THỜI GIAN 60 GIÂY!' : 'RẤT TIẾC, CHƯA CHÍNH XÁC!'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Lượt chơi tạm dừng ở câu hỏi số <strong>{question.level} / 15</strong>
          </p>
        </div>

        {/* Knowledge & Explanation Card */}
        <div className="space-y-3.5 mb-6">
          {/* Correct Answer Box */}
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-emerald-400 mb-1">
              <CheckCircle className="w-4 h-4" />
              <span>Đáp án chính xác: Phương án {correctKey}</span>
            </div>
            <p className="text-sm font-semibold text-emerald-100 leading-relaxed">
              {correctText}
            </p>
          </div>

          {/* Scam Technique Explanation */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 mb-1.5">
              Giải thích & Dấu hiệu lừa đảo trong tình huống:
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {question.explanation}
            </p>
          </div>

          {/* Official Reference & Legal Code */}
          {source && (
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-blue-950/50 border border-cyan-500/30 text-xs">
              <div>
                <span className="font-bold text-cyan-300 block">
                  Căn cứ kiểm chứng: [{source.code}] {source.title}
                </span>
                <span className="text-[11px] text-slate-400">
                  Cơ quan: {source.authority}
                </span>
              </div>
              {source.url && (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 font-semibold text-[11px] transition"
                >
                  <span>Nguồn</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          )}

          {/* Summary Stat */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
            <div>
              <span className="text-[11px] text-slate-400 block">Câu đã vượt qua</span>
              <span className="font-display font-black text-lg text-cyan-300">
                {levelReached - 1} / 15
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Phần thưởng đạt được</span>
              <span className="font-display font-black text-lg text-amber-400 flex items-center justify-center gap-1">
                <span>🍬</span>
                <span>{candiesWon} kẹo</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={onPlayAgain}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi lại từ đầu</span>
          </button>

          <button
            onClick={onOpenHandbook}
            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-900/80 hover:bg-blue-800 border border-cyan-500/40 text-cyan-200 font-bold text-sm transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Xem Cẩm nang</span>
          </button>

          <button
            onClick={onGoHome}
            className="w-full sm:w-auto p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition cursor-pointer"
            title="Về màn hình chính"
          >
            <Home className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
