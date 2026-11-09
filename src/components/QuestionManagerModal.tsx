import React, { useState } from 'react';
import { Question, OptionKey, GameSettings } from '../types/game';
import { LEVEL_CONFIGS } from '../data/questionBank';
import { StorageService } from '../services/storage';
import { Settings, Plus, Trash2, Edit3, RotateCcw, X, Save, Clock, Volume2, Shield } from 'lucide-react';

interface QuestionManagerModalProps {
  questions: Question[];
  settings: GameSettings;
  onUpdateQuestions: (questions: Question[]) => void;
  onUpdateSettings: (settings: GameSettings) => void;
  onClose: () => void;
}

export const QuestionManagerModal: React.FC<QuestionManagerModalProps> = ({
  questions,
  settings,
  onUpdateQuestions,
  onUpdateSettings,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'questions' | 'add'>('settings');

  // Form state for adding/editing question
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formLevel, setFormLevel] = useState<number>(1);
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOptA, setFormOptA] = useState<string>('');
  const [formOptB, setFormOptB] = useState<string>('');
  const [formOptC, setFormOptC] = useState<string>('');
  const [formOptD, setFormOptD] = useState<string>('');
  const [formCorrect, setFormCorrect] = useState<OptionKey>('B');
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formSource, setFormSource] = useState<string>('MPS-2026');

  // Settings form
  const [tempTimer, setTempTimer] = useState<number>(settings.timerDuration);
  const [tempSound, setTempSound] = useState<boolean>(settings.soundEnabled);
  const [tempMusic, setTempMusic] = useState<boolean>(settings.musicEnabled ?? true);

  const handleSaveSettings = () => {
    const updated: GameSettings = {
      ...settings,
      timerDuration: tempTimer,
      soundEnabled: tempSound,
      musicEnabled: tempMusic,
      mcVoiceEnabled: false,
    };
    StorageService.saveSettings(updated);
    onUpdateSettings(updated);
    alert('Đã lưu cấu hình trò chơi thành công!');
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formOptA.trim() || !formOptB.trim() || !formOptC.trim() || !formOptD.trim()) {
      alert('Vui lòng điền đầy đủ câu hỏi và 4 phương án đáp án!');
      return;
    }

    if (editingId) {
      const updated: Question = {
        id: editingId,
        level: formLevel,
        question: formQuestion,
        options: {
          A: formOptA,
          B: formOptB,
          C: formOptC,
          D: formOptD,
        },
        correctAnswer: formCorrect,
        explanation: formExplanation || 'Quy tắc an toàn số phòng ngừa lừa đảo.',
        sourceCode: formSource,
        isCustom: true,
      };
      StorageService.updateQuestion(updated);
      onUpdateQuestions(StorageService.getQuestions());
      setEditingId(null);
      alert('Đã cập nhật câu hỏi thành công!');
    } else {
      StorageService.addQuestion({
        level: formLevel,
        question: formQuestion,
        options: {
          A: formOptA,
          B: formOptB,
          C: formOptC,
          D: formOptD,
        },
        correctAnswer: formCorrect,
        explanation: formExplanation || 'Quy tắc an toàn số phòng ngừa lừa đảo.',
        sourceCode: formSource,
      });
      onUpdateQuestions(StorageService.getQuestions());
      alert('Đã thêm câu hỏi mới vào ngân hàng!');
    }

    // Reset form
    setFormQuestion('');
    setFormOptA('');
    setFormOptB('');
    setFormOptC('');
    setFormOptD('');
    setFormExplanation('');
    setActiveTab('questions');
  };

  const handleStartEdit = (q: Question) => {
    setEditingId(q.id);
    setFormLevel(q.level);
    setFormQuestion(q.question);
    setFormOptA(q.options.A);
    setFormOptB(q.options.B);
    setFormOptC(q.options.C);
    setFormOptD(q.options.D);
    setFormCorrect(q.correctAnswer);
    setFormExplanation(q.explanation);
    setFormSource(q.sourceCode);
    setActiveTab('add');
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa câu hỏi này khỏi danh sách?')) {
      StorageService.deleteQuestion(id);
      onUpdateQuestions(StorageService.getQuestions());
    }
  };

  const handleResetToDefault = () => {
    if (confirm('Bạn có chắc muốn đặt lại ngân hàng về 150 câu hỏi gốc từ tài liệu chính thức?')) {
      const def = StorageService.resetQuestionsToDefault();
      onUpdateQuestions(def);
      alert('Đã khôi phục thành công 150 câu hỏi mặc định!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl h-[90vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-indigo-500/50 shadow-2xl overflow-hidden text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-base sm:text-lg text-indigo-300">
                QUẢN TRỊ NGÂN HÀNG CÂU HỎI & CẤU HÌNH
              </h2>
              <p className="text-xs text-slate-400">
                Tùy chỉnh thời gian, thêm sửa xóa câu hỏi, quản lý tham số trò chơi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 px-5 py-2.5 bg-slate-900/60 border-b border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Cấu hình thời gian & Âm thanh
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`px-3 py-1.5 rounded-xl font-bold transition ${
              activeTab === 'questions'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Danh sách câu hỏi ({questions.length})
          </button>
          <button
            onClick={() => {
              setEditingId(null);
              setActiveTab('add');
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl font-bold transition ${
              activeTab === 'add'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-amber-400 hover:bg-slate-800'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{editingId ? 'Đang sửa câu hỏi' : 'Thêm câu hỏi mới'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gradient-to-b from-slate-950 to-blue-950/20">
          {/* TAB 1: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-xl mx-auto space-y-6">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Thời gian suy nghĩ mỗi câu hỏi</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[30, 45, 60, 90].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => setTempTimer(sec)}
                      className={`p-3 rounded-xl border text-center transition ${
                        tempTimer === sec
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-black shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <span className="font-mono-stage text-lg block">{sec}</span>
                      <span className="text-[10px] text-slate-500">giây</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-slate-400">
                  Thời gian mặc định theo quy chuẩn gameshow là <strong>60 giây</strong>.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <span>Âm nhạc & Hiệu ứng âm thanh</span>
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-100 block">Nhạc nền "Ai Là Triệu Phú" (BGM)</span>
                      <span className="text-[11px] text-slate-400">Nhạc hiệu mở đầu, nhạc hồi hộp 3 cấp độ, tiếng tim đập, nhạc chốt đáp án</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={tempMusic}
                      onChange={(e) => setTempMusic(e.target.checked)}
                      className="w-4 h-4 accent-amber-400"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                    <div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-100 block">Âm thanh hiệu ứng trường quay (SFX)</span>
                      <span className="text-[11px] text-slate-400">Tiếng tick đồng hồ 60s, tiếng chọn đáp án, âm thanh các quyền trợ giúp</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={tempSound}
                      onChange={(e) => setTempSound(e.target.checked)}
                      className="w-4 h-4 accent-amber-400"
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefault}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-950/40 text-xs font-bold transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Khôi phục 150 câu mặc định</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu cấu hình</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: QUESTIONS LIST */}
          {activeTab === 'questions' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>Tổng số câu hỏi trong ngân hàng: <strong>{questions.length}</strong></span>
                <button
                  onClick={handleResetToDefault}
                  className="text-red-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Đặt lại mặc định</span>
                </button>
              </div>

              <div className="space-y-2">
                {questions.map((q) => (
                  <div
                    key={q.id}
                    className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3 hover:border-slate-700 transition"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-950 border border-cyan-500/40 font-mono-stage text-[10px] font-bold text-cyan-300">
                          Cấp {q.level} • {q.id}
                        </span>
                        {q.isCustom && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-bold">
                            Tự thêm
                          </span>
                        )}
                        <span className="text-[11px] text-emerald-400 font-bold">
                          Đáp án đúng: {q.correctAnswer}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium truncate">{q.question}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleStartEdit(q)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300"
                        title="Chỉnh sửa câu hỏi"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(q.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400"
                        title="Xóa câu hỏi"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ADD/EDIT QUESTION FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleSaveQuestion} className="max-w-2xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Cấp độ (1 - 15):
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  >
                    {LEVEL_CONFIGS.map((lvl) => (
                      <option key={lvl.level} value={lvl.level}>
                        Cấp {lvl.level}: {lvl.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Mã nguồn pháp luật / Bộ Công an:
                  </label>
                  <input
                    type="text"
                    value={formSource}
                    onChange={(e) => setFormSource(e.target.value)}
                    placeholder="VD: MPS-2026, LAW-DATA, MPS-VNEID..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Nội dung câu hỏi:
                </label>
                <textarea
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  rows={3}
                  required
                  placeholder="Nhập tình huống hoặc câu hỏi nhận diện lừa đảo..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Phương án A:</label>
                  <input
                    type="text"
                    value={formOptA}
                    onChange={(e) => setFormOptA(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Phương án B:</label>
                  <input
                    type="text"
                    value={formOptB}
                    onChange={(e) => setFormOptB(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Phương án C:</label>
                  <input
                    type="text"
                    value={formOptC}
                    onChange={(e) => setFormOptC(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">Phương án D:</label>
                  <input
                    type="text"
                    value={formOptD}
                    onChange={(e) => setFormOptD(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Đáp án chính xác:
                  </label>
                  <select
                    value={formCorrect}
                    onChange={(e) => setFormCorrect(e.target.value as OptionKey)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-300 font-bold"
                  >
                    <option value="A">Phương án A</option>
                    <option value="B">Phương án B</option>
                    <option value="C">Phương án C</option>
                    <option value="D">Phương án D</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Giải thích dấu hiệu lừa đảo & căn cứ xử lý:
                </label>
                <textarea
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  rows={2}
                  placeholder="Giải thích vì sao đáp án đúng và thủ đoạn lừa đảo tương ứng..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveTab('questions')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-md"
                >
                  {editingId ? 'Lưu thay đổi câu hỏi' : 'Lưu vào ngân hàng câu hỏi'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
