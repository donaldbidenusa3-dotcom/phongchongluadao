import React from 'react';
import { LEVEL_CONFIGS } from '../data/questionBank';
import { Check, BookOpen, Gift, Award, Sparkles, ChevronRight } from 'lucide-react';

interface PrizeLadderProps {
  currentLevel: number;
  className?: string;
  onClose?: () => void;
}

export const PrizeLadder: React.FC<PrizeLadderProps> = ({ currentLevel, className = '', onClose }) => {
  // Descending: 15 down to 1
  const sortedLevels = [...LEVEL_CONFIGS].reverse();

  return (
    <div className={`flex flex-col bg-gradient-to-b from-[#060c1d] via-[#030611] to-[#060c1d] border-2 border-cyan-800/80 rounded-2xl p-3 sm:p-3.5 shadow-2xl backdrop-blur-md ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-cyan-900/60">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="font-display font-black text-xs uppercase tracking-widest text-amber-300">
            THANG ĐIỂM GAMESHOW
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-xs font-bold px-2 py-0.5 rounded bg-slate-800"
          >
            Đóng
          </button>
        )}
      </div>

      {/* 15 Levels list */}
      <div className="flex-1 flex flex-col justify-between gap-1 overflow-y-auto pr-0.5">
        {sortedLevels.map((lvl) => {
          const isCurrent = lvl.level === currentLevel;
          const isPassed = lvl.level < currentLevel;
          const isMilestone = lvl.isMilestone;

          let rowStyle = 'bg-slate-900/40 border-slate-800/60 text-slate-400';
          let numStyle = 'text-amber-400 font-bold';
          let titleStyle = 'text-slate-300';

          if (isCurrent) {
            // Active current question: Iconic Glowing Orange Highlight
            rowStyle = 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 border-white text-slate-950 font-black shadow-lg shadow-amber-500/50 scale-[1.02]';
            numStyle = 'text-slate-950 font-black text-sm';
            titleStyle = 'text-slate-950 font-black';
          } else if (isPassed) {
            rowStyle = 'bg-emerald-950/20 border-emerald-900/30 text-emerald-400/60';
            numStyle = 'text-emerald-500/80 font-bold';
            titleStyle = 'text-slate-500 line-through decoration-emerald-500/40';
          } else if (isMilestone) {
            // Milestone unreached: Bold White text on deep blue/gold border
            rowStyle = 'bg-blue-950/70 border-amber-400/60 text-white font-extrabold shadow-sm';
            numStyle = 'text-amber-300 font-black';
            titleStyle = 'text-white font-bold';
          }

          return (
            <div
              key={lvl.level}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg border transition-all duration-200 text-xs ${rowStyle}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Active arrow pointer or level number */}
                {isCurrent ? (
                  <span className="font-black text-slate-950 animate-bounce">►</span>
                ) : (
                  <span className={`w-5 text-right font-mono-stage text-[11px] ${numStyle}`}>
                    {lvl.level}
                  </span>
                )}

                {/* Status icon */}
                {isPassed ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : isMilestone ? (
                  lvl.level === 15 ? (
                    <BookOpen className="w-3.5 h-3.5 text-amber-300 shrink-0 animate-pulse" />
                  ) : (
                    <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  )
                ) : (
                  <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-slate-950' : 'bg-cyan-600'} shrink-0`} />
                )}

                {/* Level Title */}
                <span className={`truncate text-[11px] ${titleStyle}`}>
                  {lvl.title}
                </span>
              </div>

              {/* Milestone Tag */}
              <div className="ml-1.5 shrink-0">
                {lvl.level === 15 && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${
                    isCurrent ? 'bg-slate-950 text-amber-300 border-slate-950' : 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                  }`}>
                    Cẩm Nang 🏆
                  </span>
                )}
                {lvl.level === 10 && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-black border ${
                    isCurrent ? 'bg-slate-950 text-amber-300 border-slate-950' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  }`}>
                    Kẹo To 🍭
                  </span>
                )}
                {lvl.level === 5 && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-black border ${
                    isCurrent ? 'bg-slate-950 text-cyan-300 border-slate-950' : 'bg-blue-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    Kẹo 🍬
                  </span>
                )}
                {!lvl.isMilestone && (
                  <span className={`text-[10px] font-mono-stage ${isCurrent ? 'text-slate-950 font-bold' : 'text-slate-500'}`}>
                    {lvl.rewardName.split(' ')[0]}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Safe Milestones Footer */}
      <div className="pt-2 mt-2 border-t border-cyan-950 text-[10px] text-slate-400 text-center">
        Mốc bảo toàn: <span className="text-cyan-300 font-bold">5</span> (Kẹo) • <span className="text-amber-400 font-bold">10</span> (Kẹo To) • <span className="text-yellow-300 font-black">15</span> (Cẩm nang)
      </div>
    </div>
  );
};
