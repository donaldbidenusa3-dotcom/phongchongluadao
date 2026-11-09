import React, { useState } from 'react';
import { HANDBOOK_CHAPTERS, HANDBOOK_METADATA } from '../data/handbook';
import { OFFICIAL_SOURCES } from '../data/sources';
import { exportHandbookToPDF } from '../services/pdfExport';
import {
  BookOpen,
  Download,
  X,
  Search,
  CheckCircle,
  AlertTriangle,
  Shield,
  FileText,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface HandbookModalProps {
  playerName: string;
  onClose: () => void;
}

export const HandbookModal: React.FC<HandbookModalProps> = ({ playerName, onClose }) => {
  const [activeChapterId, setActiveChapterId] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const activeChapter = HANDBOOK_CHAPTERS.find(c => c.id === activeChapterId) || HANDBOOK_CHAPTERS[0];

  const handleDownloadPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      exportHandbookToPDF(playerName);
      setIsExporting(false);
    }, 400);
  };

  const filteredChapters = HANDBOOK_CHAPTERS.filter(c => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      c.title.toLowerCase().includes(term) ||
      c.summary.toLowerCase().includes(term) ||
      c.content.some(item => item.toLowerCase().includes(term))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl h-[92vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 font-black shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-amber-300">
                {HANDBOOK_METADATA.title}
              </h2>
              <p className="text-xs text-slate-400 hidden sm:block">
                {HANDBOOK_METADATA.subtitle} • {HANDBOOK_METADATA.edition}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPDF}
              disabled={isExporting}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition"
              title="Tải cuốn cẩm nang về máy dạng tệp PDF"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Đang tạo PDF...' : 'Tải về PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm quy tắc phòng tránh, thủ đoạn, từ khóa lừa đảo..."
              className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs text-slate-400 hidden md:inline">
            12 Chương nghiệp vụ • Cập nhật 2026
          </span>
        </div>

        {/* Main Content Area (Sidebar + Chapter Reader) */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Chapter Selector Sidebar */}
          <div className="w-full md:w-72 bg-slate-900/50 border-r border-slate-800 overflow-y-auto p-2 space-y-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.id === activeChapter.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterId(ch.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all text-xs ${
                    isSelected
                      ? 'bg-blue-900/60 border border-cyan-400 text-cyan-200 font-bold shadow-md'
                      : 'hover:bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-5 font-mono-stage font-bold ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}>
                      {String(ch.id).padStart(2, '0')}
                    </span>
                    <span className="truncate">{ch.title}</span>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Chapter Reader View */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-gradient-to-b from-slate-950 to-blue-950/20">
            {/* Chapter Header */}
            <div className="pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono-stage text-cyan-400 font-bold mb-1">
                <span>CHƯƠNG {activeChapter.id} / 12</span>
              </div>
              <h3 className="font-display font-black text-lg sm:text-2xl text-amber-300">
                {activeChapter.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 italic bg-blue-950/40 p-3 rounded-xl border border-cyan-500/20">
                "{activeChapter.summary}"
              </p>
            </div>

            {/* Chapter Content Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Nội dung hướng dẫn & Kỹ năng then chốt:</span>
              </h4>

              <div className="space-y-2.5">
                {activeChapter.content.map((paragraph, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-slate-700 transition text-xs sm:text-sm leading-relaxed text-slate-200"
                  >
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                    <span className="flex-1">{paragraph}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Safety Tips Box */}
            {activeChapter.tips && activeChapter.tips.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-100 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Lời khuyên chuyên gia & Lưu ý đặc biệt:</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-amber-200/90 pl-5 list-disc">
                  {activeChapter.tips.map((t, idx) => (
                    <li key={idx} className="leading-relaxed">{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Official References */}
            {activeChapter.sources && activeChapter.sources.length > 0 && (
              <div className="pt-3 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Căn cứ tham chiếu:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeChapter.sources.map((srcCode) => {
                    const src = OFFICIAL_SOURCES[srcCode];
                    return (
                      <div
                        key={srcCode}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300"
                      >
                        <Shield className="w-3.5 h-3.5 text-cyan-400" />
                        <span>[{srcCode}] {src ? src.authority : ''}</span>
                        {src?.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 ml-1"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-2.5 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Tài liệu giáo dục nhận diện lừa đảo trực tuyến • Kiểm tra ngày 08/03/2026</span>
          <span className="hidden sm:inline">Phối hợp dữ liệu: Bộ Công an & Cổng thông tin Chính phủ</span>
        </div>
      </div>
    </div>
  );
};
