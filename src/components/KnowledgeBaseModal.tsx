import React, { useState } from 'react';
import { Question, OptionKey } from '../types/game';
import { LEVEL_CONFIGS } from '../data/questionBank';
import { OFFICIAL_SOURCES } from '../data/sources';
import { BookMarked, Search, Filter, X, CheckCircle, ExternalLink, Eye, EyeOff } from 'lucide-react';

interface KnowledgeBaseModalProps {
  questions: Question[];
  onClose: () => void;
}

export const KnowledgeBaseModal: React.FC<KnowledgeBaseModalProps> = ({ questions, onClose }) => {
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredQuestions = questions.filter((q) => {
    if (selectedLevel !== 'all' && q.level !== selectedLevel) {
      return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(term);
      const matchExpl = q.explanation.toLowerCase().includes(term);
      const matchOpts = Object.values(q.options).some(o => o.toLowerCase().includes(term));
      const matchCode = q.sourceCode.toLowerCase().includes(term);
      return matchQ || matchExpl || matchOpts || matchCode;
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md">
              <BookMarked className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-cyan-300">
                KHO KIẾN THỨC PHÒNG CHỐNG LỪA ĐẢO
              </h2>
              <p className="text-xs text-slate-400">
                Ngân hàng 165 câu hỏi trắc nghiệm thực chiến • 15 Cấp độ chuyên sâu (Đã cập nhật mới)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls */}
        <div className="px-5 py-3 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tình huống, từ khóa lừa đảo, thủ đoạn..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Level Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-cyan-400 shrink-0" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="flex-1 sm:w-60 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="all">Tất cả 15 cấp độ ({questions.length} câu)</option>
              {LEVEL_CONFIGS.map((lvl) => (
                <option key={lvl.level} value={lvl.level}>
                  Cấp độ {lvl.level}: {lvl.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gradient-to-b from-slate-950 to-blue-950/20">
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>Hiển thị {filteredQuestions.length} câu hỏi phù hợp</span>
            <span className="text-cyan-400">Ấn "Xem đáp án" để kiểm tra kiến thức</span>
          </div>

          {filteredQuestions.map((q) => {
            const isRevealed = revealedIds.has(q.id);
            const source = OFFICIAL_SOURCES[q.sourceCode];

            return (
              <div
                key={q.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-600/50 transition-all space-y-3"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blue-950 border border-cyan-500/40 text-[11px] font-mono-stage font-bold text-cyan-300">
                      Cấp {q.level} • {q.id}
                    </span>
                    <span className="text-xs font-semibold text-amber-300">
                      {LEVEL_CONFIGS.find(l => l.level === q.level)?.title}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition shrink-0"
                  >
                    {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}</span>
                  </button>
                </div>

                {/* Question Body */}
                <h4 className="text-sm sm:text-base font-bold text-slate-100 leading-relaxed">
                  {q.question}
                </h4>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {(['A', 'B', 'C', 'D'] as OptionKey[]).map((key) => {
                    const isCorrect = q.correctAnswer === key;
                    const highlight = isRevealed && isCorrect;

                    return (
                      <div
                        key={key}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs leading-relaxed transition ${
                          highlight
                            ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200 font-semibold shadow-md'
                            : 'bg-slate-950/60 border-slate-800 text-slate-300'
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-5 h-5 rounded font-mono-stage font-bold text-[11px] shrink-0 ${
                            highlight
                              ? 'bg-emerald-400 text-slate-950'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {key}
                        </span>
                        <span className="flex-1">{q.options[key]}</span>
                        {highlight && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Drawer if Revealed */}
                {isRevealed && (
                  <div className="p-3.5 rounded-xl bg-blue-950/40 border border-cyan-500/30 space-y-2 animate-fade-in">
                    <p className="text-xs text-cyan-200 leading-relaxed">
                      <strong>Giải thích:</strong> {q.explanation}
                    </p>
                    {source && (
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                        <span>Căn cứ pháp lý: [{source.code}] {source.title}</span>
                        {source.url && (
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>Xem tài liệu gốc</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
