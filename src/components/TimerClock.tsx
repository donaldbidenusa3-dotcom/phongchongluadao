import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerClockProps {
  timeLeft: number;
  totalTime: number;
}

export const TimerClock: React.FC<TimerClockProps> = ({ timeLeft, totalTime }) => {
  const isUrgent = timeLeft <= 15;
  const isCritical = timeLeft <= 5;
  const fraction = totalTime > 0 ? timeLeft / totalTime : 0;
  
  // Circumference for r=32: 2 * pi * 32 ~= 201.06
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - fraction * circumference;

  let strokeColor = '#06b6d4'; // cyan-500
  let textColor = 'text-cyan-300';
  let ringBg = 'bg-slate-900/80 border-cyan-500/30';

  if (isCritical) {
    strokeColor = '#ef4444'; // red-500
    textColor = 'text-red-400';
    ringBg = 'bg-red-950/60 border-red-500/80 animate-urgent-pulse';
  } else if (isUrgent) {
    strokeColor = '#f59e0b'; // amber-500
    textColor = 'text-amber-300';
    ringBg = 'bg-amber-950/40 border-amber-500/50';
  }

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Glow Circle */}
      <div className={`relative flex items-center justify-center w-20 h-20 rounded-full border-2 p-1 transition-all ${ringBg}`}>
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 76 76">
          {/* Background track */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            stroke="#1e293b"
            strokeWidth="5"
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx="38"
            cy="38"
            r={radius}
            stroke={strokeColor}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-linear"
          />
        </svg>

        {/* Digital Seconds Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-mono-stage text-2xl font-black tabular-nums tracking-tighter ${textColor}`}>
            {timeLeft}
          </span>
          <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase -mt-1">
            GIÂY
          </span>
        </div>
      </div>

      {/* Floating Urgency Tag */}
      {isUrgent && (
        <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1 animate-bounce">
          <AlertTriangle className="w-2.5 h-2.5" />
          <span>Sắp hết giờ!</span>
        </div>
      )}
    </div>
  );
};
