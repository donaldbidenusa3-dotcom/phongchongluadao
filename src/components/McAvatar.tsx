import React from 'react';
import { Volume2, Sparkles, MessageSquare, Mic } from 'lucide-react';

interface McAvatarProps {
  isSpeaking?: boolean;
  dialogueText: string;
}

export const McAvatar: React.FC<McAvatarProps> = ({
  isSpeaking = false,
  dialogueText,
}) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center gap-3 sm:gap-4 px-2">
      {/* MC Character TV Studio Box */}
      <div className="relative shrink-0 flex flex-col items-center">
        {/* Animated Avatar Circle with Studio Lighting */}
        <div
          className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 border-2 transition-all duration-300 ${
            isSpeaking
              ? 'border-amber-400 bg-gradient-to-tr from-amber-500 to-yellow-300 shadow-xl shadow-amber-500/50 scale-105'
              : 'border-cyan-600/60 bg-gradient-to-b from-slate-900 to-blue-950 shadow-lg'
          }`}
        >
          {/* Avatar Graphic */}
          <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-[#0c1836] via-[#060c1d] to-[#040813] flex flex-col items-center justify-end overflow-hidden relative">
            {/* Stage Studio Spotlight Flare */}
            <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-cyan-400/30 to-transparent pointer-events-none" />

            {/* Stylized Vector TV Gameshow Host */}
            <svg
              className="w-12 h-12 text-slate-100 transition-transform duration-200"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Suit shoulders */}
              <path
                d="M10 60 C12 44, 20 40, 32 40 C44 40, 52 44, 54 60 Z"
                fill="#1e293b"
                stroke="#38bdf8"
                strokeWidth="1.5"
              />
              {/* White shirt collar */}
              <polygon points="26,40 38,40 35,50 29,50" fill="#f8fafc" />
              {/* Red Gameshow Tie */}
              <polygon points="30,44 34,44 35,55 32,58 29,55" fill="#ef4444" />
              {/* Neck */}
              <rect x="28" y="32" width="8" height="10" rx="3" fill="#fed7aa" />
              {/* Head */}
              <ellipse cx="32" cy="24" rx="12" ry="14" fill="#ffedd5" />
              {/* Hair */}
              <path
                d="M20 22 C20 12, 44 10, 44 20 C42 16, 26 15, 20 22 Z"
                fill="#1e293b"
              />
              {/* Eyes */}
              <circle cx="28" cy="23" r="1.5" fill="#0f172a" />
              <circle cx="36" cy="23" r="1.5" fill="#0f172a" />
              {/* Smile or speaking mouth */}
              {isSpeaking ? (
                <ellipse cx="32" cy="30" rx="3" ry="2.2" fill="#991b1b" className="animate-ping" />
              ) : (
                <path
                  d="M29 29 Q32 32 35 29"
                  stroke="#9a3412"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
              {/* Mic Lapel Pin */}
              <circle cx="40" cy="46" r="2.5" fill="#f59e0b" />
            </svg>

            {/* Speaking audio wave indicator badge */}
            {isSpeaking && (
              <div className="absolute top-1 right-1 flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-2 bg-amber-400 rounded-full animate-bounce" />
                <span className="w-0.5 h-3 bg-yellow-300 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-0.5 h-1.5 bg-amber-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            )}
          </div>
        </div>

        {/* MC Name Badge */}
        <span className="mt-1 text-[10px] font-mono-stage font-black uppercase tracking-wider text-amber-300 flex items-center gap-0.5">
          <span>MC MINH TRÍ</span>
        </span>
      </div>

      {/* MC Speech Dialogue Bubble */}
      <div className="relative flex-1 bg-gradient-to-r from-[#0c1836]/95 via-[#081024]/95 to-[#0c1836]/95 border-2 border-cyan-700/60 rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-2xl backdrop-blur-md">
        {/* Triangle arrow pointer towards MC */}
        <div className="absolute -left-2.5 top-5 w-3 h-3 bg-[#0c1836] border-l-2 border-t-2 border-cyan-700/60 rotate-[-45deg]" />

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 mb-0.5">
              <Mic className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase tracking-wider">Lời dẫn người chủ trì:</span>
              {isSpeaking && (
                <span className="inline-flex items-center gap-1 text-[10px] text-amber-300 font-black animate-pulse">
                  <Sparkles className="w-2.5 h-2.5" /> Đang phát biểu...
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-semibold">
              "{dialogueText || 'Hãy tập trung lắng nghe và đưa ra quyết định sáng suốt nhất!'}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
