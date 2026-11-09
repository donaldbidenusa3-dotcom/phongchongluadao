/**
 * Virtual TV Host (MC) Speech Service
 * Provides speech synthesis in Vietnamese with natural gameshow phrasing.
 */

type SpeechCallback = (speaking: boolean, text: string) => void;

class McSpeechService {
  private isEnabled: boolean = true;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<SpeechCallback> = new Set();
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private isSpeakingState: boolean = false;
  private currentText: string = '';

  constructor() {
    this.initVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        this.initVoices();
      };
    }
  }

  private initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize Vietnamese voices (vi-VN)
    const viVoice = voices.find(v => v.lang.toLowerCase().includes('vi') || v.lang.toLowerCase().includes('vn'));
    if (viVoice) {
      this.selectedVoice = viVoice;
    }
  }

  public subscribe(cb: SpeechCallback): () => void {
    this.listeners.add(cb);
    cb(this.isSpeakingState, this.currentText);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify(speaking: boolean, text: string) {
    this.isSpeakingState = speaking;
    this.currentText = text;
    this.listeners.forEach(cb => cb(speaking, text));
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public stop() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.notify(false, '');
    }
  }

  public speak(text: string, onEnd?: () => void) {
    // Spoken voice is disabled per user request ("bỏ giọng nói").
    // We only update dialogue text for screen subtitles/captions without speaking aloud.
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notify(false, text);
    onEnd?.();
  }

  // Gameshow specific dialogue triggers
  public speakIntro(playerName: string) {
    const text = `Chào mừng quý vị và người chơi ${playerName} đến với AI LÀ ĐÀO LỬA! Hãy cùng nhau nhận diện lừa đảo và bảo vệ chính mình!`;
    this.speak(text);
  }

  public speakQuestion(level: number, question: string, options?: { A: string; B: string; C: string; D: string }) {
    let text = `Câu hỏi số ${level}: ${question}.`;
    if (options) {
      text += ` Phương án A: ${options.A}. Phương án B: ${options.B}. Phương án C: ${options.C}. Phương án D: ${options.D}.`;
    }
    this.speak(text);
  }

  public speakHesitation() {
    const phrases = [
      "Đây quả thực là một câu hỏi không hề đơn giản. Bạn có muốn sử dụng quyền trợ giúp không?",
      "Cẩn trọng là chìa khóa. Hãy suy nghĩ thật kỹ trước khi đưa ra quyết định.",
      "Bạn vẫn còn thời gian và các quyền trợ giúp đắc lực. Hãy cân nhắc nhé!"
    ];
    const picked = phrases[Math.floor(Math.random() * phrases.length)];
    this.speak(picked);
  }

  public speakCorrect(level: number) {
    if (level === 5) {
      this.speak("Chính xác! Chúc mừng bạn đã vượt qua mốc số 5 và nhận được phần thưởng Kẹo ngọt ngào!");
    } else if (level === 10) {
      this.speak("Xuất sắc! Bạn đã vượt qua mốc số 10 và nhận được phần thưởng Kẹo To đầy vinh quang!");
    } else if (level === 15) {
      this.speak("Tuyệt đỉnh! Xin chúc mừng bạn đã chinh phục toàn bộ 15 câu hỏi và trở thành cao thủ phòng chống lừa đảo!");
    } else {
      const phrases = [
        "Chính xác! Xin chúc mừng bạn!",
        "Một câu trả lời hoàn toàn chính xác!",
        "Đúng rồi! Bạn đã bước thêm một bước tránh xa cạm bẫy lừa đảo."
      ];
      const picked = phrases[Math.floor(Math.random() * phrases.length)];
      this.speak(picked);
    }
  }

  public speakWrong(correctAnswerKey: string) {
    const text = `Rất tiếc! Đáp án chính xác phải là ${correctAnswerKey}. Nhưng đừng lo, chúng ta vừa có thêm một bài học quý giá để bảo vệ bản thân trước những chiêu trò lừa đảo.`;
    this.speak(text);
  }

  public speakTimeOut() {
    const text = "Đã hết 60 giây suy nghĩ! Rất tiếc thời gian đã hết, lượt chơi tạm thời dừng lại tại đây.";
    this.speak(text);
  }

  public speakLifeline(type: string) {
    switch (type) {
      case 'fifty_fifty':
        this.speak("Quyền trợ giúp năm mươi năm mươi đã được kích hoạt. Hai phương án sai đã bị loại bỏ!");
        break;
      case 'swap_question':
        this.speak("Đổi câu hỏi thành công! Đây là một câu hỏi mới cùng cấp độ, đồng hồ đã quay lại 60 giây.");
        break;
      case 'call_friend':
        this.speak("Đang kết nối cuộc gọi tới người thân. Hãy lắng nghe lời khuyên tư vấn!");
        break;
      case 'ask_audience':
        this.speak("Mời toàn thể khán phòng đưa ra bình chọn cho bốn phương án A, B, C, D!");
        break;
    }
  }
}

export const mcSpeech = new McSpeechService();
