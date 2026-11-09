/**
 * Complete "AI LÀ TRIỆU PHÚ" Procedural Audio & Music Engine
 * Modeled after Keith & Matthew Strachan's iconic gameshow soundtrack.
 * Synthesizes full authentic background music loops and sound effects
 * directly via Web Audio API without requiring external MP3 assets.
 */

class MillionaireAudioEngine {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Active Music Loop tracking
  private currentMusicType: 'none' | 'intro' | 'tier1' | 'tier2' | 'tier3' | 'phone' | 'audience' = 'none';
  private musicLoopInterval: NodeJS.Timeout | null = null;
  private activeMusicOscillators: OscillatorNode[] = [];
  private activeMusicGains: GainNode[] = [];
  private tensionHoldGain: GainNode | null = null;
  private tensionHoldOscs: OscillatorNode[] = [];

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(this.musicEnabled ? 0.35 : 0.0, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.soundEnabled ? 0.55 : 0.0, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (this.ctx && this.sfxGain) {
      this.sfxGain.gain.setValueAtTime(enabled ? 0.55 : 0.0, this.ctx.currentTime);
    }
  }

  public getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.linearRampToValueAtTime(enabled ? 0.35 : 0.0, this.ctx.currentTime + 0.3);
    }
    if (!enabled) {
      this.stopAllMusic();
    }
  }

  public getMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  // Compatibility alias for existing code
  public setMuted(muted: boolean) {
    this.setSoundEnabled(!muted);
    this.setMusicEnabled(!muted);
  }

  public getMuted(): boolean {
    return !this.soundEnabled && !this.musicEnabled;
  }

  // ==========================================
  // CORE AUDIO SYNTHESIS UTILITIES
  // ==========================================

  private playTone(
    freq: number,
    type: OscillatorType,
    startTime: number,
    duration: number,
    startVol: number,
    endVol: number = 0.0001,
    targetGain?: AudioNode,
    filterFreq?: number
  ): OscillatorNode | null {
    if (!this.ctx) return null;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(startVol, startTime);
      gain.gain.exponentialRampToValueAtTime(Math.max(0.00001, endVol), startTime + duration);

      const dest = targetGain || this.sfxGain || this.masterGain || this.ctx.destination;

      if (filterFreq) {
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(filterFreq, startTime);
        osc.connect(filter);
        filter.connect(gain);
      } else {
        osc.connect(gain);
      }

      gain.connect(dest);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
      return osc;
    } catch {
      return null;
    }
  }

  /**
   * Synthesizes an authentic deep gameshow heartbeat kick
   */
  private playHeartbeatKick(time: number, isHeavy: boolean = false, targetGain?: AudioNode) {
    if (!this.ctx) return;
    const dest = targetGain || this.musicGain || this.ctx.destination;
    
    // Sub bass drop (80Hz -> 30Hz)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const startFreq = isHeavy ? 95 : 75;
    const endFreq = isHeavy ? 30 : 38;
    osc.frequency.setValueAtTime(startFreq, time);
    osc.frequency.exponentialRampToValueAtTime(endFreq, time + (isHeavy ? 0.28 : 0.2));

    const vol = isHeavy ? 0.45 : 0.3;
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + (isHeavy ? 0.32 : 0.22));

    osc.connect(gain);
    gain.connect(dest);
    osc.start(time);
    osc.stop(time + 0.35);

    // Muffled chest thump noise
    if (isHeavy) {
      const noiseOsc = this.ctx.createOscillator();
      const noiseGain = this.ctx.createGain();
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseOsc.type = 'triangle';
      noiseOsc.frequency.setValueAtTime(55, time);
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(140, time);

      noiseGain.gain.setValueAtTime(0.2, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      noiseOsc.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(dest);
      noiseOsc.start(time);
      noiseOsc.stop(time + 0.2);
    }
  }

  // ==========================================
  // NHẠC NỀN "AI LÀ TRIỆU PHÚ" (BACKGROUND MUSIC)
  // ==========================================

  public stopAllMusic() {
    if (this.musicLoopInterval) {
      clearInterval(this.musicLoopInterval);
      this.musicLoopInterval = null;
    }
    this.activeMusicOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {}
    });
    this.activeMusicOscillators = [];
    this.activeMusicGains.forEach(g => {
      try {
        g.disconnect();
      } catch {}
    });
    this.activeMusicGains = [];
    this.currentMusicType = 'none';

    this.stopLockSuspense();
  }

  /**
   * 1. NHẠC MỞ ĐẦU / THEME CHÍNH (Intro & Studio Theme)
   * Iconic dramatic Keith Strachan gameshow fanfare in E minor
   */
  public playIntroTheme() {
    this.initCtx();
    if (!this.ctx || !this.musicEnabled) return;
    this.stopAllMusic();
    this.currentMusicType = 'intro';

    const t = this.ctx.currentTime + 0.05;
    const dest = this.musicGain || this.ctx.destination;

    // Dramatic Timpani Roll on Low E
    for (let i = 0; i < 8; i++) {
      const stepT = t + i * 0.12;
      const sub = this.ctx.createOscillator();
      const sGain = this.ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(82.41, stepT);
      sub.frequency.exponentialRampToValueAtTime(41.2, stepT + 0.25);
      const vol = 0.08 + (i * 0.04);
      sGain.gain.setValueAtTime(vol, stepT);
      sGain.gain.exponentialRampToValueAtTime(0.001, stepT + 0.28);
      sub.connect(sGain);
      sGain.connect(dest);
      sub.start(stepT);
      sub.stop(stepT + 0.3);
      this.activeMusicOscillators.push(sub);
    }

    // Heavy Downbeat Hit at t + 1.0s (Em)
    const hitTime = t + 1.0;
    this.playHeartbeatKick(hitTime, true, dest);

    // E Minor Main Chord Stabs (Em -> Cmaj7 -> D -> B7 -> Em)
    const chords = [
      { time: hitTime, notes: [164.81, 196.0, 246.94, 329.63], dur: 1.2 }, // Em (E3, G3, B3, E4)
      { time: hitTime + 1.3, notes: [130.81, 164.81, 196.0, 261.63], dur: 0.9 }, // C
      { time: hitTime + 2.3, notes: [146.83, 185.0, 220.0, 293.66], dur: 0.9 }, // D
      { time: hitTime + 3.3, notes: [123.47, 155.56, 185.0, 246.94, 311.13], dur: 1.1 }, // B7
      { time: hitTime + 4.5, notes: [164.81, 196.0, 246.94, 329.63, 392.0, 493.88], dur: 2.2 }, // Em resolution
    ];

    chords.forEach(ch => {
      ch.notes.forEach(f => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, ch.time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, ch.time);
        filter.frequency.exponentialRampToValueAtTime(1400, ch.time + 0.15);
        filter.frequency.exponentialRampToValueAtTime(600, ch.time + ch.dur);

        gain.gain.setValueAtTime(0.001, ch.time);
        gain.gain.linearRampToValueAtTime(0.09, ch.time + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ch.time + ch.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        osc.start(ch.time);
        osc.stop(ch.time + ch.dur + 0.1);
        this.activeMusicOscillators.push(osc);
      });
    });

    // Famous Ascending Gameshow Brass Hook (B4 -> E5 -> G5 -> F#5 -> D#5 -> E5)
    const melody = [
      { time: hitTime + 0.2, note: 493.88, dur: 0.4 }, // B4
      { time: hitTime + 0.7, note: 659.25, dur: 0.5 }, // E5
      { time: hitTime + 1.4, note: 783.99, dur: 0.7 }, // G5
      { time: hitTime + 2.4, note: 739.99, dur: 0.7 }, // F#5
      { time: hitTime + 3.4, note: 622.25, dur: 0.9 }, // D#5
      { time: hitTime + 4.5, note: 659.25, dur: 2.2 }, // E5
    ];

    melody.forEach(m => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(m.note, m.time);
      gain.gain.setValueAtTime(0.001, m.time);
      gain.gain.linearRampToValueAtTime(0.18, m.time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, m.time + m.dur);
      osc.connect(gain);
      gain.connect(dest);
      osc.start(m.time);
      osc.stop(m.time + m.dur + 0.1);
      this.activeMusicOscillators.push(osc);
    });
  }

  /**
   * 2. NHẠC HỒI HỘP THEO CẤP ĐỘ CÂU HỎI (Tiers 1, 2, 3)
   * Automatically switches music loops matching "Ai Là Triệu Phú":
   * - Level 1-5: Tier 1 Light Rhythmic Clock Pulse (110 BPM)
   * - Level 6-10: Tier 2 Medium Tension Heartbeat Drone (84 BPM)
   * - Level 11-15: Tier 3 Extreme Suspense Hot-seat (72 BPM with claustrophobic heartbeat)
   */
  public startQuestionMusic(level: number) {
    this.initCtx();
    if (!this.ctx || !this.musicEnabled) return;

    let targetTier: 'tier1' | 'tier2' | 'tier3';
    if (level <= 5) {
      targetTier = 'tier1';
    } else if (level <= 10) {
      targetTier = 'tier2';
    } else {
      targetTier = 'tier3';
    }

    // If already playing the same tier, keep playing smoothly
    if (this.currentMusicType === targetTier) return;

    this.stopAllMusic();
    this.currentMusicType = targetTier;

    if (targetTier === 'tier1') {
      this.startTier1Loop();
    } else if (targetTier === 'tier2') {
      this.startTier2Loop();
    } else {
      this.startTier3Loop();
    }
  }

  /**
   * TIER 1 LOOP (Level 1-5):
   * Confident, energetic rhythmic clock groove with light pulsing synth bass & soft kick
   */
  private startTier1Loop() {
    if (!this.ctx) return;
    const dest = this.musicGain || this.ctx.destination;

    const loopLengthSeconds = 4.0; // 2 bars at 120 BPM
    const bassNotes = [82.41, 82.41, 98.0, 110.0, 123.47, 110.0, 98.0, 82.41]; // E-G-A-B groove

    const runBar = () => {
      if (!this.ctx || this.currentMusicType !== 'tier1') return;
      const t = this.ctx.currentTime + 0.05;

      // Pulse bassline
      bassNotes.forEach((f, idx) => {
        const stepT = t + idx * 0.5;
        this.playTone(f, 'sawtooth', stepT, 0.28, 0.06, 0.001, dest, 280);
      });

      // Warm ambient pad in E minor
      const padFreqs = [164.81, 196.0, 246.94]; // Em triad
      padFreqs.forEach(pf => {
        this.playTone(pf, 'sine', t, 3.8, 0.035, 0.01, dest);
      });

      // Soft rhythmic heartbeat kick on beats 1 and 3
      this.playHeartbeatKick(t, false, dest);
      this.playHeartbeatKick(t + 1.0, false, dest);
      this.playHeartbeatKick(t + 2.0, false, dest);
      this.playHeartbeatKick(t + 3.0, false, dest);
    };

    runBar();
    this.musicLoopInterval = setInterval(runBar, loopLengthSeconds * 1000 - 50);
  }

  /**
   * TIER 2 LOOP (Level 6-10):
   * The iconic "Ai Là Triệu Phú" questions 6-10 heartbeat clock music:
   * Low resonant heartbeat kick + deep string/brass drone + shifting minor tension chords
   */
  private startTier2Loop() {
    if (!this.ctx) return;
    const dest = this.musicGain || this.ctx.destination;

    const loopLengthSeconds = 6.0;

    // Cycling chord progressions: Em9 -> Am/E -> Cmaj7 -> B7sus4
    const progression = [
      [164.81, 196.0, 246.94, 293.66], // Em9
      [146.83, 174.61, 220.0, 261.63], // Dm7
      [130.81, 164.81, 196.0, 246.94], // Cmaj7
      [123.47, 164.81, 185.0, 246.94], // B7sus4
    ];

    let stepIndex = 0;

    const runStep = () => {
      if (!this.ctx || this.currentMusicType !== 'tier2') return;
      const t = this.ctx.currentTime + 0.05;

      // Heavy iconic gameshow heartbeat on beat 1 and beat 3
      this.playHeartbeatKick(t, true, dest);
      this.playHeartbeatKick(t + 0.8, false, dest);
      this.playHeartbeatKick(t + 2.0, true, dest);
      this.playHeartbeatKick(t + 2.8, false, dest);
      this.playHeartbeatKick(t + 4.0, true, dest);
      this.playHeartbeatKick(t + 4.8, false, dest);

      // Deep Sub Bass Drone (E1 / 41.2 Hz)
      this.playTone(41.2, 'sine', t, 5.8, 0.12, 0.05, dest);

      // Suspense chord pad with slow filter swell
      const currentChord = progression[stepIndex % progression.length];
      stepIndex++;

      currentChord.forEach(f => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(220, t);
        filter.frequency.linearRampToValueAtTime(450, t + 2.5);
        filter.frequency.linearRampToValueAtTime(180, t + 5.8);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.045, t + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 5.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        osc.start(t);
        osc.stop(t + 6.0);
        this.activeMusicOscillators.push(osc);
      });
    };

    runStep();
    this.musicLoopInterval = setInterval(runStep, loopLengthSeconds * 1000 - 50);
  }

  /**
   * TIER 3 LOOP (Level 11-15):
   * The Ultimate Millionaire Hot-seat Suspense.
   * Claustrophobic double-heartbeat (lub-DUB... lub-DUB...), sub-bass oscillation,
   * high eerie crystal tension pad, dark dissonant intervals.
   */
  private startTier3Loop() {
    if (!this.ctx) return;
    const dest = this.musicGain || this.ctx.destination;

    const loopLengthSeconds = 5.0;

    const runStep = () => {
      if (!this.ctx || this.currentMusicType !== 'tier3') return;
      const t = this.ctx.currentTime + 0.05;

      // Claustrophobic double-heartbeat pulses ("lub-DUB... lub-DUB...")
      const heartbeats = [0, 0.32, 1.6, 1.92, 3.2, 3.52];
      heartbeats.forEach((offset, idx) => {
        const isSecond = idx % 2 === 1;
        this.playHeartbeatKick(t + offset, isSecond, dest);
      });

      // Ultra low Sub-Bass rumble (36.7 Hz / D1)
      this.playTone(36.7, 'sine', t, 4.9, 0.16, 0.08, dest);

      // High eerie crystal tension drone (E6 + F6 dissonant semitone shimmers)
      this.playTone(1318.51, 'triangle', t, 4.8, 0.02, 0.008, dest);
      this.playTone(1396.91, 'sine', t + 1.2, 3.5, 0.015, 0.005, dest);

      // Dark brass drone swell
      const brassNotes = [110.0, 146.83, 174.61]; // A-D-F suspense cluster
      brassNotes.forEach(bn => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(bn, t);
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, t);
        filter.frequency.linearRampToValueAtTime(320, t + 2.2);
        filter.frequency.linearRampToValueAtTime(120, t + 4.9);

        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.04, t + 1.5);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 4.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(dest);
        osc.start(t);
        osc.stop(t + 5.0);
        this.activeMusicOscillators.push(osc);
      });
    };

    runStep();
    this.musicLoopInterval = setInterval(runStep, loopLengthSeconds * 1000 - 50);
  }

  // ==========================================
  // NHẠC CHỐT ĐÁP ÁN (FINAL ANSWER LOCK SUSPENSE)
  // ==========================================

  /**
   * Dramatic strike and holding suspense bed when player confirms final answer
   */
  public playLockAnswer() {
    this.initCtx();
    if (!this.ctx) return;

    this.stopAllMusic();
    const t = this.ctx.currentTime;
    const dest = this.masterGain || this.ctx.destination;

    // Low dramatic impact
    this.playHeartbeatKick(t, true, dest);

    // Dramatic orchestral chime & chord strike
    const chord = [220.0, 277.18, 329.63, 440.0]; // A major / C# tension
    chord.forEach(f => {
      this.playTone(f, 'sawtooth', t, 1.2, 0.12, 0.001, dest, 700);
    });

    // Sustained suspense drone held until answer is revealed
    try {
      this.tensionHoldGain = this.ctx.createGain();
      this.tensionHoldGain.gain.setValueAtTime(0.001, t + 0.3);
      this.tensionHoldGain.gain.linearRampToValueAtTime(0.07, t + 0.8);

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(110.0, t); // A2
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(164.81, t); // E3

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, t);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(this.tensionHoldGain);
      this.tensionHoldGain.connect(dest);

      osc1.start(t);
      osc2.start(t);
      this.tensionHoldOscs = [osc1, osc2];
    } catch {}
  }

  private stopLockSuspense() {
    if (!this.tensionHoldGain || !this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      this.tensionHoldGain.gain.linearRampToValueAtTime(0.001, t + 0.2);
      setTimeout(() => {
        this.tensionHoldOscs.forEach(o => {
          try {
            o.stop();
            o.disconnect();
          } catch {}
        });
        this.tensionHoldOscs = [];
        this.tensionHoldGain = null;
      }, 250);
    } catch {
      this.tensionHoldGain = null;
    }
  }

  // ==========================================
  // NHẠC TRẢ LỜI ĐÚNG / SAI (RESULT STINGERS)
  // ==========================================

  /**
   * Correct Answer fanfare with level-specific grandeur
   */
  public playCorrectAnswer(level: number = 1) {
    this.initCtx();
    if (!this.ctx) return;
    this.stopAllMusic();

    const t = this.ctx.currentTime + 0.05;
    const dest = this.sfxGain || this.masterGain || this.ctx.destination;

    if (level === 5) {
      // MILESTONE 1 (Level 5 - Nhận Kẹo): Triumphant Keith Strachan Milestone Fanfare
      this.playMilestoneFanfare(t, 'kẹo');
    } else if (level === 10) {
      // MILESTONE 2 (Level 10 - Nhận Kẹo To): Grand Milestone 2 Fanfare
      this.playMilestoneFanfare(t, 'kẹo_to');
    } else if (level === 15) {
      // MILESTONE 3 (Level 15 - Quán Quân Cẩm Nang): Ultimate Champion Grand Fanfare
      this.playVictory();
    } else {
      // Normal correct answer stinger
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Major triad)
      notes.forEach((freq, idx) => {
        this.playTone(freq, 'triangle', t + idx * 0.08, 0.45, 0.22, 0.001, dest);
      });

      // Warm bass support
      this.playTone(130.81, 'sine', t + 0.2, 0.8, 0.2, 0.001, dest);
    }
  }

  /**
   * Authentic Milestone Triumphant Fanfare for Levels 5 and 10
   */
  private playMilestoneFanfare(startTime: number, type: 'kẹo' | 'kẹo_to') {
    if (!this.ctx) return;
    const dest = this.sfxGain || this.masterGain || this.ctx.destination;

    // Timpani roll
    this.playHeartbeatKick(startTime, true, dest);
    this.playHeartbeatKick(startTime + 0.35, true, dest);

    // Majestic brass fanfare melody: G4 -> C5 -> E5 -> G5 -> C6!
    const melody = [
      { t: startTime + 0.0, f: 392.0, d: 0.18 },
      { t: startTime + 0.2, f: 523.25, d: 0.18 },
      { t: startTime + 0.4, f: 659.25, d: 0.22 },
      { t: startTime + 0.65, f: 783.99, d: 0.35 },
      { t: startTime + 1.05, f: 1046.5, d: 1.6 },
    ];

    melody.forEach(m => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(m.f, m.t);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(type === 'kẹo_to' ? 1800 : 1400, m.t);

      gain.gain.setValueAtTime(0.001, m.t);
      gain.gain.linearRampToValueAtTime(0.24, m.t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, m.t + m.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);
      osc.start(m.t);
      osc.stop(m.t + m.d + 0.1);
    });

    // Rich chord backing on C Major
    const chordTime = startTime + 1.05;
    const chordNotes = [261.63, 329.63, 392.0, 523.25];
    chordNotes.forEach(cn => {
      this.playTone(cn, 'triangle', chordTime, 1.8, 0.15, 0.001, dest);
    });
  }

  /**
   * Wrong Answer dramatic descent stinger ("Ai Là Triệu Phú" classic loss sound)
   */
  public playWrongAnswer() {
    this.initCtx();
    if (!this.ctx) return;
    this.stopAllMusic();

    const t = this.ctx.currentTime + 0.05;
    const dest = this.sfxGain || this.masterGain || this.ctx.destination;

    // Heavy dissonant tritone brass stab
    const dissonantNotes = [220.0, 207.65, 196.0, 185.0]; // Descending chromatic doom
    dissonantNotes.forEach((freq, idx) => {
      this.playTone(freq, 'sawtooth', t + idx * 0.14, 0.6, 0.28, 0.001, dest, 420);
    });

    // Sub bass drop
    this.playHeartbeatKick(t + 0.1, true, dest);
  }

  /**
   * Sound for timer tick (60s countdown)
   */
  public playTick(isUrgent: boolean = false) {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isUrgent ? 'sawtooth' : 'sine';
    const freq = isUrgent ? 920 : 620;
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.45, t + 0.04);

    gain.gain.setValueAtTime(isUrgent ? 0.22 : 0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (isUrgent ? 0.06 : 0.035));

    osc.connect(gain);
    gain.connect(this.sfxGain || this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.07);
  }

  /**
   * Sound when selecting an answer option
   */
  public playSelectAnswer() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, t);
    osc.frequency.exponentialRampToValueAtTime(880, t + 0.1);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGain || this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.13);
  }

  // ==========================================
  // NHẠC CÁC QUYỀN TRỢ GIÚP (LIFELINES)
  // ==========================================

  /**
   * 50/50 dual zap sound
   */
  public play5050() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const dest = this.sfxGain || this.ctx.destination;

    // Dual electronic whoosh removal
    [0, 0.18].forEach(delay => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      const filter = this.ctx!.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, t + delay);
      osc.frequency.exponentialRampToValueAtTime(200, t + delay + 0.22);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, t + delay);

      gain.gain.setValueAtTime(0.2, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);
      osc.start(t + delay);
      osc.stop(t + delay + 0.26);
    });
  }

  /**
   * Lifeline generic activation
   */
  public playLifeline() {
    this.play5050();
  }

  /**
   * Phone-a-Friend 30s countdown ticking suspense bed
   */
  public startPhoneMusic() {
    this.initCtx();
    if (!this.ctx || !this.musicEnabled) return;
    this.stopAllMusic();
    this.currentMusicType = 'phone';

    const dest = this.musicGain || this.ctx.destination;

    const runPhoneTick = () => {
      if (!this.ctx || this.currentMusicType !== 'phone') return;
      const t = this.ctx.currentTime;
      // Staccato high string tick
      this.playTone(880, 'triangle', t, 0.08, 0.08, 0.001, dest);
      this.playTone(440, 'sine', t + 0.25, 0.06, 0.06, 0.001, dest);
      this.playTone(880, 'triangle', t + 0.5, 0.08, 0.08, 0.001, dest);
      this.playTone(440, 'sine', t + 0.75, 0.06, 0.06, 0.001, dest);
    };

    runPhoneTick();
    this.musicLoopInterval = setInterval(runPhoneTick, 1000);
  }

  /**
   * Ask the Audience rapid ascending voting arpeggio sequence
   */
  public startAudienceMusic() {
    this.initCtx();
    if (!this.ctx || !this.musicEnabled) return;
    this.stopAllMusic();
    this.currentMusicType = 'audience';

    const dest = this.musicGain || this.ctx.destination;
    const arpNotes = [440, 554.37, 659.25, 880, 1108.73, 1318.51]; // A major rising arp

    let noteIdx = 0;
    const runArp = () => {
      if (!this.ctx || this.currentMusicType !== 'audience') return;
      const t = this.ctx.currentTime;
      const freq = arpNotes[noteIdx % arpNotes.length];
      noteIdx++;
      this.playTone(freq, 'sine', t, 0.08, 0.07, 0.001, dest);
    };

    this.musicLoopInterval = setInterval(runArp, 120);
  }

  /**
   * Victory grand anthem for beating level 15
   */
  public playVictory() {
    this.initCtx();
    if (!this.ctx) return;
    this.stopAllMusic();

    const t = this.ctx.currentTime + 0.05;
    const dest = this.sfxGain || this.masterGain || this.ctx.destination;

    const chords = [
      [523.25, 659.25, 783.99], // C
      [587.33, 739.99, 880.0],  // D
      [659.25, 830.61, 987.77], // E
      [783.99, 987.77, 1174.66], // G
      [1046.5, 1318.51, 1567.98, 2093.0] // C-octave
    ];

    chords.forEach((chord, step) => {
      const stepTime = t + step * 0.28;
      this.playHeartbeatKick(stepTime, true, dest);
      chord.forEach(freq => {
        this.playTone(freq, 'triangle', stepTime, step === chords.length - 1 ? 2.5 : 0.45, 0.18, 0.001, dest);
      });
    });
  }

  public playMilestone() {
    this.playMilestoneFanfare(this.ctx ? this.ctx.currentTime : 0, 'kẹo_to');
  }

  // Compatibility stubs
  public startTension(isHighLevel: boolean = false) {
    this.startQuestionMusic(isHighLevel ? 11 : 6);
  }

  public stopTension() {
    this.stopAllMusic();
  }
}

export const soundEffects = new MillionaireAudioEngine();
