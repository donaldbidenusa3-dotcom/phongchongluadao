import React from 'react';
import { Question, OptionKey } from '../types/game';
import { TimerClock } from './TimerClock';
import { ShieldCheck, HelpCircle, Sparkles } from 'lucide-react';

interface QuestionStageProps {
  question: Question;
  timeLeft: number;
  totalTime: number;
  selectedOption: OptionKey | null;
  confirmedOption: OptionKey | null;
  revealedCorrectAnswer: OptionKey | null;
  eliminatedOptions: OptionKey[];
  onSelectOption: (optionKey: OptionKey) => void;
  disabled: boolean;
}

export const QuestionStage: React.FC<QuestionStageProps> = ({
  question,
  timeLeft,
  totalTime,
  selectedOption,
  confirmedOption,
  revealedCorrectAnswer,
  eliminatedOptions,
  onSelectOption,
  disabled,
}) => {
  const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Top Meta Bar: Level & Timer */}
      <div className="w-full flex items-center justify-between gap-4 mb-3 sm:mb-4 px-2">
        {/* Level Banner */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-2 border-cyan-500/60 shadow-lg shadow-cyan-950/50 text-cyan-300">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span className="font-display font-black text-sm tracking-widest uppercase">
              CÂU HỎI {question.level} / 15
            </span>
          </div>
          <span className="hidden sm:inline-block text-[11px] font-mono-stage font-bold px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-300">
            MÃ: {question.id}
          </span>
        </div>

        {/* 60s Countdown Timer */}
        <TimerClock timeLeft={timeLeft} totalTime={totalTime} />
      </div>

      {/* GAMESHOW CENTRAL QUESTION LOZENGE */}
      <div className="relative w-full my-1 sm:my-2">
        {/* Outer Laser Line Accent */}
        <div className="absolute inset-y-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent pointer-events-none" />

        {/* Question Frame */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl p-1 bg-gradient-to-r from-cyan-600 via-amber-400 to-blue-600 shadow-2xl shadow-blue-950/80">
          <div className="relative w-full rounded-[14px] sm:rounded-[22px] bg-gradient-to-b from-[#0a1226] via-[#040817] to-[#0a1226] p-5 sm:p-7 text-center border-2 border-cyan-400/30 backdrop-blur-md">
            {/* Glossy Reflection Highlight */}
            <div className="absolute top-0 inset-x-6 h-5 bg-gradient-to-b from-white/10 to-transparent rounded-t-[14px] pointer-events-none" />

            {/* Question Text */}
            <h2 className="relative z-10 text-base sm:text-xl md:text-2xl font-extrabold text-white leading-relaxed md:leading-normal tracking-wide drop-shadow-md">
              {question.question}
            </h2>
          </div>
        </div>
      </div>

      {/* Decorative Stage Connection Bar */}
      <div className="w-16 h-2 bg-gradient-to-b from-cyan-500/50 to-transparent my-1 rounded-full blur-[1px]" />

      {/* 4 ANSWER LOZENGES (2x2 Grid) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 px-1">
        {optionKeys.map((key) => {
          const text = question.options[key];
          const isEliminated = eliminatedOptions.includes(key);
          const isSelected = selectedOption === key;
          const isConfirmed = confirmedOption === key;
          const isCorrect = revealedCorrectAnswer === key;
          const isWrong = revealedCorrectAnswer !== null && isConfirmed && !isCorrect;

          // Default state: Classic gameshow midnight metallic bar
          let containerBorder = 'from-slate-700 via-cyan-800 to-slate-700 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-500';
          let innerBg = 'from-[#0b1429] via-[#050b18] to-[#0b1429] text-slate-100';
          let diamondStyle = 'bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 border-amber-200 shadow-md';
          let textStyle = 'text-slate-100 font-semibold';

          if (isEliminated) {
            containerBorder = 'from-slate-900 to-slate-900 opacity-20';
            innerBg = 'from-slate-950 to-slate-950 text-slate-600';
            diamondStyle = 'bg-slate-900 text-slate-600 border-slate-800';
            textStyle = 'text-slate-600 line-through';
          } else if (isCorrect) {
            // Radiant emerald green victory state
            containerBorder = 'from-emerald-400 via-green-300 to-emerald-400 shadow-xl shadow-emerald-500/50 animate-pulse';
            innerBg = 'from-[#06331a] via-[#021f0f] to-[#06331a] text-white';
            diamondStyle = 'bg-gradient-to-br from-emerald-300 to-green-500 text-slate-950 border-white shadow-lg shadow-emerald-400/50 scale-105';
            textStyle = 'text-emerald-100 font-black';
          } else if (isWrong) {
            // Dramatic crimson defeat state
            containerBorder = 'from-rose-500 via-red-600 to-rose-500 shadow-xl shadow-red-600/40';
            innerBg = 'from-[#33080e] via-[#1f0207] to-[#33080e] text-white';
            diamondStyle = 'bg-gradient-to-br from-rose-400 to-red-600 text-white border-red-300';
            textStyle = 'text-rose-100 font-bold line-through';
          } else if (isConfirmed) {
            // Locked final answer awaiting reveal (Gameshow Gold Flash)
            containerBorder = 'from-amber-400 via-yellow-200 to-amber-400 shadow-xl shadow-amber-500/60 animate-pulse';
            innerBg = 'from-[#422006] via-[#291102] to-[#422006] text-amber-100';
            diamondStyle = 'bg-gradient-to-br from-yellow-300 to-amber-500 text-slate-950 border-white scale-105';
            textStyle = 'text-amber-200 font-black';
          } else if (isSelected) {
            // Selected answer (player considering)
            containerBorder = 'from-amber-400 via-yellow-300 to-amber-400 shadow-lg shadow-amber-500/40 ring-2 ring-amber-400/60';
            innerBg = 'from-[#2e1904] via-[#1a0e02] to-[#2e1904] text-amber-100';
            diamondStyle = 'bg-gradient-to-br from-amber-300 to-yellow-400 text-slate-950 border-amber-100';
            textStyle = 'text-amber-200 font-bold';
          }

          return (
            <button
              key={key}
              onClick={() => !isEliminated && !disabled && onSelectOption(key)}
              disabled={isEliminated || disabled}
              className={`group relative rounded-xl sm:rounded-2xl p-[2px] bg-gradient-to-r ${containerBorder} text-left transition-all duration-200 shadow-md ${
                !isEliminated && !disabled ? 'cursor-pointer hover:scale-[1.015] active:scale-[0.99]' : ''
              }`}
            >
              <div className={`relative w-full h-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-[10px] sm:rounded-[14px] bg-gradient-to-r ${innerBg} backdrop-blur-md`}>
                {/* Metallic Option Diamond A/B/C/D */}
                <div
                  className={`shrink-0 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border-2 font-mono-stage text-sm sm:text-base font-black transition-all ${diamondStyle}`}
                >
                  {key}
                </div>

                {/* Answer Choice Text */}
                <span className={`flex-1 text-xs sm:text-sm md:text-base leading-relaxed tracking-wide transition-all ${textStyle}`}>
                  {text}
                </span>

                {/* Correct sparkle indicator */}
                {isCorrect && (
                  <Sparkles className="w-5 h-5 text-emerald-300 animate-spin shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Prompt Hint */}
      {!selectedOption && !confirmedOption && (
        <div className="flex items-center gap-2 text-xs text-slate-400 mt-4 bg-slate-900/60 px-4 py-1.5 rounded-full border border-slate-800">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Nhấn chọn 1 phương án để suy xét và bấm chốt đáp án cuối cùng</span>
        </div>
      )}
    </div>
  );
};
