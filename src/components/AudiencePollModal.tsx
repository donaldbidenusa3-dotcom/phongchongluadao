import React, { useState, useEffect } from 'react';
import { Question, OptionKey } from '../types/game';
import { Users, Info, BarChart2, CheckCircle } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';

interface AudiencePollModalProps {
  question: Question;
  onClose: () => void;
}

export const AudiencePollModal: React.FC<AudiencePollModalProps> = ({ question, onClose }) => {
  const [votes, setVotes] = useState<Record<OptionKey, number>>({ A: 0, B: 0, C: 0, D: 0 });
  const [isCalculated, setIsCalculated] = useState<boolean>(false);

  useEffect(() => {
    soundEffects.startAudienceMusic();

    // Generate simulated distribution where sum is strictly 100%
    const correct = question.correctAnswer;
    const optionKeys: OptionKey[] = ['A', 'B', 'C', 'D'];
    const otherKeys = optionKeys.filter(k => k !== correct);

    // Correct gets 55% - 75%
    const correctPercent = Math.floor(Math.random() * 21) + 55;
    const remaining = 100 - correctPercent;

    // Distribute remaining among the other 3
    const p1 = Math.floor(Math.random() * (remaining - 4)) + 2;
    const p2 = Math.floor(Math.random() * (remaining - p1 - 2)) + 1;
    const p3 = remaining - p1 - p2;

    const result: Record<OptionKey, number> = {
      [correct]: correctPercent,
      [otherKeys[0]]: p1,
      [otherKeys[1]]: p2,
      [otherKeys[2]]: p3,
    } as Record<OptionKey, number>;

    const timer = setTimeout(() => {
      setVotes(result);
      setIsCalculated(true);
      soundEffects.stopAllMusic();
    }, 1800);

    return () => {
      clearTimeout(timer);
      soundEffects.stopAllMusic();
      soundEffects.startQuestionMusic(question.level);
    };
  }, [question]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950 border-2 border-indigo-500/60 p-5 sm:p-6 shadow-2xl shadow-indigo-500/20 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
              <Users className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <h3 className="font-display font-black text-base text-indigo-300">
                Ý KIẾN KHÁN GIẢ PHÒNG THU
              </h3>
              <p className="text-[11px] text-slate-400">
                100 khán giả trường quay tham gia bình chọn điện tử
              </p>
            </div>
          </div>
        </div>

        {/* Bar Chart Visualization */}
        <div className="py-4">
          <div className="flex items-end justify-around gap-4 h-52 px-4 py-4 rounded-xl bg-slate-950/80 border border-slate-800">
            {(['A', 'B', 'C', 'D'] as OptionKey[]).map((key) => {
              const pct = votes[key] || 0;
              const isHighest = isCalculated && pct === Math.max(...Object.values(votes));

              return (
                <div key={key} className="flex-1 flex flex-col items-center justify-end h-full group">
                  {/* Percentage label */}
                  <span
                    className={`font-mono-stage font-black text-xs sm:text-sm mb-1.5 transition-all duration-700 ${
                      isHighest ? 'text-amber-300 scale-110' : 'text-slate-400'
                    }`}
                  >
                    {isCalculated ? `${pct}%` : '...'}
                  </span>

                  {/* Vertical Bar */}
                  <div className="w-full max-w-[42px] bg-slate-800/80 rounded-t-lg overflow-hidden flex flex-col justify-end p-0.5 h-36">
                    <div
                      className={`w-full rounded-t transition-all duration-1000 ease-out ${
                        isHighest
                          ? 'bg-gradient-to-t from-amber-600 via-yellow-400 to-amber-300 shadow-lg shadow-amber-500/50'
                          : 'bg-gradient-to-t from-indigo-700 to-cyan-500 opacity-70'
                      }`}
                      style={{ height: isCalculated ? `${pct}%` : '8%' }}
                    />
                  </div>

                  {/* Option Badge */}
                  <div
                    className={`mt-2 flex items-center justify-center w-8 h-8 rounded-lg border font-mono-stage font-black text-sm transition-all ${
                      isHighest
                        ? 'bg-amber-400 border-amber-200 text-slate-950 shadow-md scale-105'
                        : 'bg-slate-900 border-slate-700 text-slate-300'
                    }`}
                  >
                    {key}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Warning as strictly instructed in section IV */}
        <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 text-[11px] leading-relaxed mb-5">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <span>
            <strong>Lưu ý:</strong> Đây là kết quả bình chọn <em>giả lập mô phỏng</em> dựa trên thuật toán phòng chống lừa đảo, không phải dữ liệu khảo sát từ khán giả ngoài đời thực.
          </span>
        </div>

        {/* Action Close */}
        <button
          onClick={onClose}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm shadow-lg shadow-indigo-600/30 transition cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          <span>TIẾP TỤC SUY NGHĨ VÀ TRẢ LỜI</span>
        </button>
      </div>
    </div>
  );
};
