import React from 'react';
import { HelpCircle, X, ShieldAlert, Award, Clock, Sparkles, Phone, Users, RefreshCw } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
  onStart: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose, onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-cyan-500/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-cyan-300">
                LUẬT CHƠI & HƯỚNG DẪN GAMESHOW
              </h2>
              <p className="text-xs text-slate-400">
                AI LÀ ĐÀO LỬA – Nhận diện lừa đảo, bảo vệ chính mình
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

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs sm:text-sm">
          {/* Section 1: Cấu trúc */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Cấu trúc 15 Cấp độ thử thách</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Mỗi lượt chơi gồm <strong>15 câu hỏi</strong> trắc nghiệm với 4 phương án A, B, C, D. Độ khó tăng dần từ nhận diện cơ bản đến tình huống thao túng tâm lý và pháp luật số chuyên sâu:
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <strong className="text-cyan-400 block">Câu 1 – 5:</strong> Kiến thức nhận diện cơ bản & bảo mật OTP.
              </li>
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <strong className="text-amber-400 block">Câu 6 – 10:</strong> Bẫy Deepfake AI, tình cảm & việc làm online.
              </li>
              <li className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <strong className="text-yellow-300 block">Câu 11 – 15:</strong> Tình huống khống chế, pháp luật & phản ứng sự cố.
              </li>
            </ul>
          </div>

          {/* Section 2: 3 Mốc thưởng */}
          <div className="p-4 rounded-2xl bg-blue-950/40 border border-cyan-500/30 space-y-2">
            <h3 className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>3 Mốc phần thưởng danh dự</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 text-center">
                <span className="text-2xl block mb-1">🍬</span>
                <span className="font-bold text-cyan-300 text-xs block">VƯỢT CÂU 5</span>
                <span className="text-[11px] text-slate-300">Thưởng 1 Kẹo An Toàn</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 text-center">
                <span className="text-2xl block mb-1">🍭</span>
                <span className="font-bold text-amber-300 text-xs block">VƯỢT CÂU 10</span>
                <span className="text-[11px] text-slate-300">Thưởng 1 Kẹo To (3 kẹo)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-yellow-400 text-center shadow-lg shadow-amber-500/20">
                <span className="text-2xl block mb-1">🏆📚</span>
                <span className="font-black text-amber-300 text-xs block">VƯỢT CÂU 15</span>
                <span className="text-[11px] text-slate-200">Mở khóa Cẩm nang PDF</span>
              </div>
            </div>
          </div>

          {/* Section 3: 4 Quyền trợ giúp */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
            <h3 className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Bốn quyền trợ giúp đắc lực (Dùng 1 lần/lượt)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">50 / 50:</strong>
                  <p className="text-slate-400">Máy tính tự động loại bỏ ngẫu nhiên 2 phương án sai, giữ lại 1 đúng và 1 sai.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Đổi câu hỏi:</strong>
                  <p className="text-slate-400">Đổi sang một câu hỏi khác cùng độ khó và đặt lại đồng hồ 60 giây.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Gọi người thân:</strong>
                  <p className="text-slate-400">Mô phỏng cuộc gọi thoại 30 giây đến chuyên gia an ninh mạng hoặc người thân.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <Users className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-100">Ý kiến khán giả:</strong>
                  <p className="text-slate-400">Khảo sát ý kiến khán phòng trường quay hiển thị dạng biểu đồ tỷ lệ %.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Cam kết an toàn */}
          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/40 text-amber-200 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="text-amber-300 block">CAM KẾT AN TOÀN TUYỆT ĐỐI CHO NGƯỜI CHƠI:</strong>
              <p className="leading-relaxed">
                Trò chơi hoàn toàn miễn phí mang tính chất giáo dục cộng đồng. Hệ thống <strong>KHÔNG BAO GIỜ</strong> yêu cầu người chơi cung cấp mã OTP, mật khẩu, số tài khoản ngân hàng hoặc căn cước công dân thật.
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
          >
            Đã hiểu
          </button>
          <button
            onClick={() => {
              onClose();
              onStart();
            }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-105 transition"
          >
            BẮT ĐẦU CHƠI NGAY
          </button>
        </div>
      </div>
    </div>
  );
};
