import React from 'react';
import { LifelineState, LifelineType } from '../types/game';
import { PhoneCall, Users, RefreshCw, Sparkles } from 'lucide-react';

interface LifelinesBarProps {
  lifelines: LifelineState;
  disabled: boolean;
  onUseLifeline: (type: LifelineType) => void;
}

export const LifelinesBar: React.FC<LifelinesBarProps> = ({ lifelines, disabled, onUseLifeline }) => {
  const items: {
    type: LifelineType;
    label: string;
    subLabel: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      type: 'fifty_fifty',
      label: '50:50',
      subLabel: 'Loại 2 đáp án sai',
      icon: <Sparkles className="w-5 h-5" />,
      color: 'from-amber-500 to-yellow-600',
    },
    {
      type: 'swap_question',
      label: 'ĐỔI CÂU HỎI',
      subLabel: 'Câu mới cùng cấp',
      icon: <RefreshCw className="w-5 h-5" />,
      color: 'from-cyan-500 to-blue-600',
    },
    {
      type: 'call_friend',
      label: 'GỌI NGƯỜI THÂN',
      subLabel: 'Tư vấn chuyên gia',
      icon: <PhoneCall className="w-5 h-5" />,
      color: 'from-emerald-500 to-teal-600',
    },
    {
      type: 'ask_audience',
      label: 'Ý KIẾN KHÁN GIẢ',
      subLabel: 'Khảo sát phòng thu',
      icon: <Users className="w-5 h-5" />,
      color: 'from-indigo-500 to-purple-600',
    },
  ];

  return (
    <div className="w-full flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
      {items.map((item) => {
        const isAvailable = lifelines[item.type];
        const isButtonDisabled = disabled || !isAvailable;

        return (
          <button
            key={item.type}
            onClick={() => isAvailable && !disabled && onUseLifeline(item.type)}
            disabled={isButtonDisabled}
            className={`group relative flex items-center gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border text-left transition-all duration-300 ${
              isAvailable && !disabled
                ? 'bg-slate-900/90 border-cyan-700/50 hover:border-amber-400 hover:bg-slate-800/90 hover:scale-[1.03] shadow-lg shadow-cyan-950/40 cursor-pointer'
                : 'bg-slate-950/50 border-slate-800/40 opacity-40 cursor-not-allowed'
            }`}
            title={
              isAvailable
                ? `${item.label} - ${item.subLabel}`
                : `${item.label} - Đã sử dụng trong lượt này`
            }
          >
            {/* Lifeline Icon Badge */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg text-white shadow-inner transition ${
                isAvailable
                  ? `bg-gradient-to-br ${item.color} group-hover:rotate-6`
                  : 'bg-slate-800 text-slate-500'
              }`}
            >
              {item.icon}
            </div>

            {/* Lifeline Details */}
            <div className="flex flex-col">
              <span
                className={`font-display font-black text-xs sm:text-sm tracking-wide transition ${
                  isAvailable ? 'text-slate-100 group-hover:text-amber-300' : 'text-slate-600 line-through'
                }`}
              >
                {item.label}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:block">
                {isAvailable ? item.subLabel : 'Đã sử dụng'}
              </span>
            </div>

            {/* Red diagonal strike line if used */}
            {!isAvailable && (
              <div className="absolute inset-x-2 top-1/2 h-0.5 bg-red-500/70 -rotate-12 rounded pointer-events-none" />
            )}
          </button>
        );
      })}
    </div>
  );
};
