import React from 'react';
import { OptionKey } from '../types/game';
import { HelpCircle, CheckCircle2, ArrowLeft } from 'lucide-react';

interface ConfirmModalProps {
  optionKey: OptionKey;
  optionText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  optionKey,
  optionText,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400 p-6 shadow-2xl shadow-amber-500/30 text-center">
        {/* Glow halo */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 bg-amber-400/20 blur-2xl rounded-full pointer-events-none" />

        <div className="flex items-center justify-center w-14 h-14 mx-auto rounded-full bg-amber-400/10 border border-amber-400/40 text-amber-300 mb-4">
          <HelpCircle className="w-8 h-8 animate-pulse" />
        </div>

        <h3 className="font-display font-black text-xl text-amber-300 mb-2">
          XÁC NHẬN ĐÁP ÁN CUỐI CÙNG?
        </h3>

        <p className="text-sm text-slate-300 mb-4 leading-relaxed">
          Bạn có chắc chắn muốn chọn phương án dưới đây là câu trả lời chính thức của mình không?
        </p>

        {/* Selected Option preview */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-amber-500/50 text-left mb-6 shadow-inner">
          <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-mono-stage font-black text-sm">
            {optionKey}
          </span>
          <span className="text-sm font-semibold text-slate-100 leading-snug">
            {optionText}
          </span>
        </div>

        {/* Decision Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onCancel}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white font-bold text-sm transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Suy nghĩ thêm</span>
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/40 transition hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>CHỐT ĐÁP ÁN NÀY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
