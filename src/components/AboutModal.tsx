import React from 'react';
import { ShieldCheck, X, ExternalLink, BookCheck, Sparkles, Scale, HeartHandshake } from 'lucide-react';
import { OFFICIAL_SOURCES } from '../data/sources';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-amber-400/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 font-black shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-amber-300">
                GIỚI THIỆU DỰ ÁN AI LÀ ĐÀO LỬA
              </h2>
              <p className="text-xs text-slate-400">
                Nhận diện lừa đảo – Bảo vệ chính mình – An toàn số cho mọi người
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs sm:text-sm">
          {/* Slogan Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950/40 border border-amber-400/30 text-center space-y-1.5">
            <span className="font-mono-stage text-[11px] font-bold text-cyan-400 tracking-widest uppercase">
              THÔNG ĐIỆP CHỦ ĐẠO
            </span>
            <h3 className="font-display font-black text-lg sm:text-xl text-yellow-300">
              "Một câu trả lời đúng – Một bước tránh xa lừa đảo"
            </h3>
            <p className="text-xs text-slate-300 max-w-lg mx-auto">
              Trò chơi giáo dục tương tác lấy cảm hứng từ cấu trúc gameshow truyền hình trí tuệ, được thiết kế chuyên biệt để phổ biến kiến thức an toàn thông tin cho người dân Việt Nam.
            </p>
          </div>

          {/* Core Objectives */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h4 className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>4 Mục tiêu cốt lõi của trò chơi</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <strong className="text-slate-100 flex items-center gap-1.5">
                  <span className="text-amber-400">01.</span> Nhận diện thủ đoạn tinh vi
                </strong>
                <p className="text-slate-400">Phát hiện bẫy lừa đảo: Deepfake AI, mạo danh Công an, việc nhẹ lương cao, sàn tiền số ảo.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <strong className="text-slate-100 flex items-center gap-1.5">
                  <span className="text-cyan-400">02.</span> Nâng cao ý thức pháp luật
                </strong>
                <p className="text-slate-400">Nắm vững quy định Luật An ninh mạng, Luật Bảo vệ người tiêu dùng và Luật Bảo vệ dữ liệu cá nhân.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <strong className="text-slate-100 flex items-center gap-1.5">
                  <span className="text-emerald-400">03.</span> Kỹ năng bảo vệ tài sản
                </strong>
                <p className="text-slate-400">Nguyên tắc bảo vệ mã OTP, mật khẩu 2FA, sinh trắc học và quản lý tài khoản ngân hàng an toàn.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1">
                <strong className="text-slate-100 flex items-center gap-1.5">
                  <span className="text-yellow-300">04.</span> Phản ứng chuẩn mực khi gặp sự cố
                </strong>
                <p className="text-slate-400">Biết cách bảo lưu bằng chứng điện tử, liên hệ ngân hàng khóa khẩn cấp và nộp đơn trình báo cơ quan điều tra.</p>
              </div>
            </div>
          </div>

          {/* Sources and Verification */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <span>Nguồn tài liệu đối chiếu & Căn cứ kiểm chứng</span>
            </h4>
            <p className="text-xs text-slate-300">
              Toàn bộ 150 câu hỏi và cẩm nang đều được biên soạn chặt chẽ dựa trên các nguồn văn bản pháp quy và tài liệu hướng dẫn nghiệp vụ chính thức:
            </p>
            <div className="space-y-1.5 text-xs">
              {Object.values(OFFICIAL_SOURCES).map((src) => (
                <div key={src.code} className="p-2 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-bold text-cyan-300">[{src.code}] </span>
                    <span className="text-slate-300">{src.title}</span>
                  </div>
                  {src.url && (
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 shrink-0 p-1"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Phiên bản 2026 • Sản phẩm vì cộng đồng</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
