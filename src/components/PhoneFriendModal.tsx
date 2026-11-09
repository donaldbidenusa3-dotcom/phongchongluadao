import React, { useState, useEffect } from 'react';
import { Question, OptionKey } from '../types/game';
import { Phone, PhoneOff, UserCheck, Shield, Clock, Volume2, Sparkles } from 'lucide-react';
import { soundEffects } from '../services/soundEffects';
import { mcSpeech } from '../services/mcSpeech';

interface PhoneFriendModalProps {
  question: Question;
  onClose: () => void;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatarEmoji: string;
  avatarBg: string;
  badge: string;
  reliability: number;
  generateAdvice: (q: Question) => string;
}

export const PhoneFriendModal: React.FC<PhoneFriendModalProps> = ({ question, onClose }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [callState, setCallState] = useState<'idle' | 'calling' | 'connected'>('idle');
  const [callTimer, setCallTimer] = useState<number>(30);
  const [adviceText, setAdviceText] = useState<string>('');

  const contacts: Contact[] = [
    {
      id: 'co_chinh',
      name: 'Cô Chính',
      role: 'Tổ trưởng Dân phố & Hàng xóm thông thái',
      avatarEmoji: '👵',
      avatarBg: 'from-amber-600 to-rose-700',
      badge: 'Cảnh giác số 1 khu phố',
      reliability: 0.95,
      generateAdvice: (q) => {
        const c = q.correctAnswer;
        return `Alo cháu hả! Mấy cái trò lừa đảo qua mạng này trên loa truyền thanh phường và nhóm Zalo dân phố cô phổ biến suốt ngày! Cô bảo thật, chớ có dại dột mà làm theo người lạ. Cháu cứ chọn phương án ${c} cho cô, chuẩn 100% không lệch đi đâu được!`;
      },
    },
    {
      id: 'donald_trump',
      name: 'Donald Trump',
      role: 'Tỷ phú & Cựu Tổng thống Mỹ',
      avatarEmoji: '👱‍♂️',
      avatarBg: 'from-red-600 to-blue-700',
      badge: 'Tỷ phú đàm phán cự phách',
      reliability: 0.92,
      generateAdvice: (q) => {
        const c = q.correctAnswer;
        return `Hello my friend! Believe me, nobody understands cybersecurity and huge scams better than Donald Trump, nobody! Those scammers are total fake news and bad actors! The only great and victorious answer here is option ${c}. It is going to be HUGE! Choose ${c} and make safety great again!`;
      },
    },
    {
      id: 'ronaldo',
      name: 'Cristiano Ronaldo (CR7)',
      role: 'Huyền thoại Bóng đá Thế giới',
      avatarEmoji: '⚽',
      avatarBg: 'from-emerald-600 to-teal-800',
      badge: 'Bản lĩnh & Quyết đoán',
      reliability: 0.90,
      generateAdvice: (q) => {
        const c = q.correctAnswer;
        return `Olá bạn tôi! Trên sân cỏ hay trên không gian mạng thì kỷ luật thép và sự tỉnh táo là số 1! Kẻ lừa đảo không có cửa ghi bàn vào lưới chúng ta. Hãy tung cú sút quyết định vào phương án ${c}! Quyết định cực kỳ chuẩn xác, SIUUU!`;
      },
    },
    {
      id: 'son_tung_mtp',
      name: 'Sơn Tùng M-TP',
      role: 'Nghệ sĩ V-Pop & Chủ tịch M-TP Ent',
      avatarEmoji: '🕶️',
      avatarBg: 'from-purple-600 to-indigo-800',
      badge: 'Thần tượng âm nhạc Sky',
      reliability: 0.94,
      generateAdvice: (q) => {
        const c = q.correctAnswer;
        return `Alo cả nhà ơi! Chúng Ta Của Hiện Tại phải thật tỉnh táo trước những chiêu trò tinh vi này nhé! Đừng để cảm xúc hay sự hối thúc đánh lừa mình. Tùng quan sát rất kỹ rồi, chắc chắn phương án ${c} là chìa khóa an toàn nhất. Cứ tự tin và vững tin chọn ${c} nhé!`;
      },
    },
  ];

  const handleStartCall = (contact: Contact) => {
    setSelectedContact(contact);
    setCallState('calling');
    soundEffects.playLifeline();

    // Ringing duration
    setTimeout(() => {
      setCallState('connected');
      soundEffects.startPhoneMusic();
      const text = contact.generateAdvice(question);
      setAdviceText(text);
      mcSpeech.speak(`${contact.name} tư vấn: ${text}`);
    }, 2000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'connected' && callTimer > 0) {
      interval = setInterval(() => {
        setCallTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            soundEffects.stopAllMusic();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [callState, callTimer]);

  const handleFinish = () => {
    soundEffects.stopAllMusic();
    soundEffects.startQuestionMusic(question.level);
    mcSpeech.stop();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-blue-950 border-2 border-emerald-500/70 p-5 sm:p-6 shadow-2xl shadow-emerald-500/20 text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Phone className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-emerald-300">
                GỌI ĐIỆN CHO NGƯỜI THÂN
              </h3>
              <p className="text-xs text-slate-400">
                Kết nối trực tiếp đường truyền thoại trường quay 30 giây
              </p>
            </div>
          </div>
          {callState === 'connected' && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 text-xs font-mono-stage font-bold animate-pulse">
              <Clock className="w-4 h-4" />
              <span>{callTimer}s</span>
            </div>
          )}
        </div>

        {/* State 1: Choose from the 4 contacts */}
        {callState === 'idle' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-300">
              Hãy chọn 1 trong 4 người thân nổi tiếng dưới đây để nhận sự trợ giúp quý báu:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleStartCall(c)}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-400 hover:bg-emerald-950/30 transition-all text-left group shadow-md"
                >
                  {/* Avatar Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.avatarBg} flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition`}>
                    {c.avatarEmoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-100 group-hover:text-emerald-300 truncate">
                        {c.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{c.role}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-400 font-semibold">
                      <Sparkles className="w-3 h-3 text-amber-400" />
                      <span>{c.badge}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* State 2: Calling animation */}
        {callState === 'calling' && selectedContact && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-400 text-5xl shadow-2xl">
              <span className="animate-bounce">{selectedContact.avatarEmoji}</span>
              <span className="absolute inset-0 rounded-3xl border-2 border-emerald-400/50 animate-ping" />
            </div>
            <div>
              <h4 className="font-display font-black text-xl text-slate-100">
                Đang gọi {selectedContact.name}...
              </h4>
              <p className="text-xs text-emerald-400 animate-pulse mt-1">
                Tín hiệu vệ tinh trường quay đang reo chuông...
              </p>
            </div>
          </div>
        )}

        {/* State 3: Connected & Receiving Advice */}
        {callState === 'connected' && selectedContact && (
          <div className="space-y-4">
            {/* Caller Info Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/50">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedContact.avatarBg} flex items-center justify-center text-2xl shadow-md`}>
                {selectedContact.avatarEmoji}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-emerald-300">{selectedContact.name}</h4>
                <p className="text-xs text-slate-300">{selectedContact.role}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                Đang trò chuyện
              </span>
            </div>

            {/* Advice Bubble */}
            <div className="relative p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-inner">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Lời khuyên từ {selectedContact.name}:</span>
              </span>
              <p className="text-sm text-slate-100 leading-relaxed font-medium italic">
                "{adviceText}"
              </p>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              * Lời khuyên có tính chất gợi ý tham khảo. Bạn vẫn là người đưa ra quyết định cuối cùng!
            </p>

            <button
              onClick={handleFinish}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-600/30 transition cursor-pointer"
            >
              <UserCheck className="w-4 h-4" />
              <span>CẢM ƠN VÀ QUAY LẠI TRẢ LỜI CÂU HỎI</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
