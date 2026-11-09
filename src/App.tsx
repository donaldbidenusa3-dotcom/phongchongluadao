import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Question,
  OptionKey,
  LifelineState,
  LifelineType,
  GameSettings,
  PlayerProfile,
  GameHistoryRecord
} from './types/game';
import { LEVEL_CONFIGS, shuffleQuestionOptions } from './data/questionBank';
import { StorageService } from './services/storage';
import { soundEffects } from './services/soundEffects';
import { mcSpeech } from './services/mcSpeech';

import { StageHeader } from './components/StageHeader';
import { PrizeLadder } from './components/PrizeLadder';
import { LifelinesBar } from './components/LifelinesBar';
import { QuestionStage } from './components/QuestionStage';
import { McAvatar } from './components/McAvatar';
import { ConfirmModal } from './components/ConfirmModal';
import { PhoneFriendModal } from './components/PhoneFriendModal';
import { AudiencePollModal } from './components/AudiencePollModal';
import { MilestoneModal } from './components/MilestoneModal';
import { ResultModal } from './components/ResultModal';
import { StartScreen } from './components/StartScreen';
import { HandbookModal } from './components/HandbookModal';
import { KnowledgeBaseModal } from './components/KnowledgeBaseModal';
import { QuestionManagerModal } from './components/QuestionManagerModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { RulesModal } from './components/RulesModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  // Global settings & profile
  const [settings, setSettings] = useState<GameSettings>(() => StorageService.getSettings());
  const [profile, setProfile] = useState<PlayerProfile>(() => StorageService.getProfile());
  const [questionsBank, setQuestionsBank] = useState<Question[]>(() => StorageService.getQuestions());
  const [history, setHistory] = useState<GameHistoryRecord[]>(() => StorageService.getHistory());

  // Game Lifecycle State
  const [gameMode, setGameMode] = useState<'start' | 'playing'>('start');
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [matchQuestions, setMatchQuestions] = useState<Question[]>([]);
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());

  // In-turn State
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [confirmedOption, setConfirmedOption] = useState<OptionKey | null>(null);
  const [revealedCorrectAnswer, setRevealedCorrectAnswer] = useState<OptionKey | null>(null);
  const [eliminatedOptions, setEliminatedOptions] = useState<OptionKey[]>([]);
  const [candiesWon, setCandiesWon] = useState<number>(0);
  const [isTimeOut, setIsTimeOut] = useState<boolean>(false);

  // Lifelines State
  const [lifelines, setLifelines] = useState<LifelineState>({
    fifty_fifty: true,
    swap_question: true,
    call_friend: true,
    ask_audience: true,
  });

  // MC dialogue & state
  const [mcSpeaking, setMcSpeaking] = useState<boolean>(false);
  const [mcDialogue, setMcDialogue] = useState<string>('');

  // Modals
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showPhoneModal, setShowPhoneModal] = useState<boolean>(false);
  const [showAudienceModal, setShowAudienceModal] = useState<boolean>(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showHandbookModal, setShowHandbookModal] = useState<boolean>(false);
  const [showKnowledgeModal, setShowKnowledgeModal] = useState<boolean>(false);
  const [showManagerModal, setShowManagerModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [showRulesModal, setShowRulesModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);
  const [showMobileLadder, setShowMobileLadder] = useState<boolean>(false);

  // Sync sound and music status
  useEffect(() => {
    soundEffects.setSoundEnabled(settings.soundEnabled);
    soundEffects.setMusicEnabled(settings.musicEnabled);
    mcSpeech.setEnabled(false); // Voice speech disabled per user request ("bỏ giọng nói")
    const unsubscribe = mcSpeech.subscribe((speaking, text) => {
      setMcSpeaking(speaking);
      if (text) {
        setMcDialogue(text);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [settings]);

  // Pick a random question for level
  const pickQuestionForLevel = useCallback((lvl: number, excludeIds: Set<string>): Question | null => {
    const candidates = questionsBank.filter(q => q.level === lvl && !excludeIds.has(q.id));
    if (candidates.length === 0) {
      // Fallback: allow any in level
      const allInLevel = questionsBank.filter(q => q.level === lvl);
      return allInLevel[Math.floor(Math.random() * allInLevel.length)] || null;
    }
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, [questionsBank]);

  // START NEW GAME
  const handleStartGame = (name: string) => {
    const updatedProfile = { ...profile, name };
    StorageService.saveProfile(updatedProfile);
    setProfile(updatedProfile);

    // Build 15 questions, 1 for each level
    const matchQs: Question[] = [];
    const used = new Set<string>();

    for (let lvl = 1; lvl <= 15; lvl++) {
      const q = pickQuestionForLevel(lvl, used);
      if (q) {
        // Dynamically shuffle options so answers are scattered among A, B, C, D
        const randomized = shuffleQuestionOptions(q);
        matchQs.push(randomized);
        used.add(q.id);
      }
    }

    setMatchQuestions(matchQs);
    setUsedQuestionIds(used);
    setCurrentLevel(1);
    setCurrentQuestion(matchQs[0] || null);
    setCandiesWon(0);
    setLifelines({
      fifty_fifty: true,
      swap_question: true,
      call_friend: true,
      ask_audience: true,
    });
    setSelectedOption(null);
    setConfirmedOption(null);
    setRevealedCorrectAnswer(null);
    setEliminatedOptions([]);
    setIsTimeOut(false);
    setTimeLeft(settings.timerDuration);
    setGameMode('playing');
    setTimerActive(true);

    // Start "Ai Là Triệu Phú" Level 1-5 Music
    soundEffects.startQuestionMusic(1);
    mcSpeech.speakIntro(name);

    if (matchQs[0]) {
      mcSpeech.speakQuestion(1, matchQs[0].question, matchQs[0].options);
    }
  };

  // LOAD A LEVEL QUESTION
  const loadQuestion = useCallback((lvl: number) => {
    const targetQ = matchQuestions[lvl - 1];
    if (targetQ) {
      setCurrentQuestion(targetQ);
      setSelectedOption(null);
      setConfirmedOption(null);
      setRevealedCorrectAnswer(null);
      setEliminatedOptions([]);
      setIsTimeOut(false);
      setTimeLeft(settings.timerDuration);
      setTimerActive(true);

      // Start authentic question tier music
      soundEffects.startQuestionMusic(lvl);
      mcSpeech.speakQuestion(lvl, targetQ.question, targetQ.options);
    }
  }, [matchQuestions, settings]);

  // COUNTDOWN TIMER EFFECT
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gameMode === 'playing' && timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            // Time out handler
            handleTimeOut();
            return 0;
          }
          const next = prev - 1;
          const isUrgent = next <= 15;
          soundEffects.playTick(isUrgent);
          return next;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameMode, timerActive, timeLeft]);

  // TIME OUT HANDLER
  const handleTimeOut = () => {
    setTimerActive(false);
    setIsTimeOut(true);
    soundEffects.playWrongAnswer();
    if (currentQuestion) {
      setRevealedCorrectAnswer(currentQuestion.correctAnswer);
      mcSpeech.speakTimeOut();
      // Record game
      StorageService.updateProfileAfterGame(currentLevel, candiesWon, false);
      StorageService.recordGame({
        playerName: profile.name,
        levelReached: currentLevel,
        reward: `${candiesWon} kẹo an toàn`,
        candies: candiesWon,
        won: false,
      });
      setProfile(StorageService.getProfile());
      setHistory(StorageService.getHistory());

      setTimeout(() => {
        setShowResultModal(true);
      }, 1600);
    }
  };

  // SELECT AN OPTION
  const handleSelectOption = (optionKey: OptionKey) => {
    if (confirmedOption || revealedCorrectAnswer || !timerActive) return;
    soundEffects.playSelectAnswer();
    setSelectedOption(optionKey);
    setShowConfirmModal(true);
  };

  // CONFIRM FINAL ANSWER
  const handleConfirmFinalAnswer = () => {
    if (!selectedOption || !currentQuestion) return;
    setShowConfirmModal(false);
    setConfirmedOption(selectedOption);
    setTimerActive(false);
    soundEffects.playLockAnswer();

    // MC builds tension
    setTimeout(() => {
      const isCorrect = selectedOption === currentQuestion.correctAnswer;
      setRevealedCorrectAnswer(currentQuestion.correctAnswer);

      if (isCorrect) {
        soundEffects.playCorrectAnswer(currentLevel);
        mcSpeech.speakCorrect(currentLevel);

        // Update candies
        let newCandies = candiesWon;
        if (currentLevel === 5) newCandies += 1;
        if (currentLevel === 10) newCandies += 2;
        if (currentLevel === 15) newCandies += 7;
        setCandiesWon(newCandies);

        // Check milestones
        if (currentLevel === 5 || currentLevel === 10 || currentLevel === 15) {
          setTimeout(() => {
            setShowMilestoneModal(true);
          }, 1400);
        } else {
          // Normal advance
          setTimeout(() => {
            const nextLvl = currentLevel + 1;
            setCurrentLevel(nextLvl);
            loadQuestion(nextLvl);
          }, 2400);
        }
      } else {
        // Wrong answer
        soundEffects.playWrongAnswer();
        mcSpeech.speakWrong(currentQuestion.correctAnswer);

        // Record history
        StorageService.updateProfileAfterGame(currentLevel, candiesWon, false);
        StorageService.recordGame({
          playerName: profile.name,
          levelReached: currentLevel,
          reward: `${candiesWon} kẹo an toàn`,
          candies: candiesWon,
          won: false,
        });
        setProfile(StorageService.getProfile());
        setHistory(StorageService.getHistory());

        setTimeout(() => {
          setShowResultModal(true);
        }, 2200);
      }
    }, 1500);
  };

  // CONTINUE AFTER MILESTONE
  const handleContinueAfterMilestone = () => {
    setShowMilestoneModal(false);
    if (currentLevel === 15) {
      // Game Won!
      StorageService.updateProfileAfterGame(15, candiesWon, true);
      StorageService.recordGame({
        playerName: profile.name,
        levelReached: 15,
        reward: 'QUÁN QUÂN + CẨM NANG 🏆',
        candies: candiesWon,
        won: true,
      });
      setProfile(StorageService.getProfile());
      setHistory(StorageService.getHistory());
      setShowResultModal(true);
    } else {
      const nextLvl = currentLevel + 1;
      setCurrentLevel(nextLvl);
      loadQuestion(nextLvl);
    }
  };

  // USE LIFELINE
  const handleUseLifeline = (type: LifelineType) => {
    if (!lifelines[type] || !currentQuestion || confirmedOption) return;

    if (type === 'fifty_fifty') {
      soundEffects.playLifeline();
      const correct = currentQuestion.correctAnswer;
      const allWrong = (['A', 'B', 'C', 'D'] as OptionKey[]).filter(k => k !== correct);
      // Shuffle and pick 2 wrong to eliminate
      const shuffled = [...allWrong].sort(() => 0.5 - Math.random());
      const toEliminate = shuffled.slice(0, 2);
      setEliminatedOptions(toEliminate);
      setLifelines(prev => ({ ...prev, fifty_fifty: false }));
      mcSpeech.speakLifeline('fifty_fifty');
    } else if (type === 'swap_question') {
      soundEffects.playLifeline();
      const replacement = pickQuestionForLevel(currentLevel, usedQuestionIds);
      if (replacement) {
        const randomized = shuffleQuestionOptions(replacement);
        setUsedQuestionIds(prev => new Set(prev).add(randomized.id));
        setCurrentQuestion(randomized);
        setSelectedOption(null);
        setEliminatedOptions([]);
        setTimeLeft(settings.timerDuration);
        setLifelines(prev => ({ ...prev, swap_question: false }));
        mcSpeech.speakLifeline('swap_question');
        setTimeout(() => {
          if (settings.autoReadQuestion) {
            mcSpeech.speakQuestion(currentLevel, randomized.question, randomized.options);
          }
        }, 1500);
      }
    } else if (type === 'call_friend') {
      setLifelines(prev => ({ ...prev, call_friend: false }));
      mcSpeech.speakLifeline('call_friend');
      setShowPhoneModal(true);
    } else if (type === 'ask_audience') {
      setLifelines(prev => ({ ...prev, ask_audience: false }));
      mcSpeech.speakLifeline('ask_audience');
      setShowAudienceModal(true);
    }
  };

  // TOGGLES
  const handleToggleSound = () => {
    const next = !settings.soundEnabled;
    const updated = { ...settings, soundEnabled: next };
    setSettings(updated);
    StorageService.saveSettings(updated);
    soundEffects.setSoundEnabled(next);
  };

  const handleToggleMusic = () => {
    const next = !settings.musicEnabled;
    const updated = { ...settings, musicEnabled: next };
    setSettings(updated);
    StorageService.saveSettings(updated);
    soundEffects.setMusicEnabled(next);
    if (next) {
      if (gameMode === 'playing' && currentQuestion) {
        soundEffects.startQuestionMusic(currentLevel);
      } else {
        soundEffects.playIntroTheme();
      }
    }
  };

  const handleExitGame = () => {
    if (confirm('Bạn có chắc chắn muốn dừng lượt chơi và trở về màn hình mở đầu?')) {
      soundEffects.stopAllMusic();
      mcSpeech.stop();
      setGameMode('start');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans select-none">
      {/* START SCREEN */}
      {gameMode === 'start' && (
        <StartScreen
          profile={profile}
          musicEnabled={settings.musicEnabled}
          onToggleMusic={handleToggleMusic}
          onPlayTheme={() => soundEffects.playIntroTheme()}
          onStartGame={handleStartGame}
          onOpenRules={() => setShowRulesModal(true)}
          onOpenKnowledge={() => setShowKnowledgeModal(true)}
          onOpenHandbook={() => setShowHandbookModal(true)}
          onOpenAbout={() => setShowAboutModal(true)}
          onOpenManager={() => setShowManagerModal(true)}
          onOpenLeaderboard={() => setShowLeaderboardModal(true)}
        />
      )}

      {/* ACTIVE GAMEPLAY STAGE */}
      {gameMode === 'playing' && currentQuestion && (
        <div className="relative flex-1 flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-[#020617] via-[#050b1a] to-[#020617]">
          {/* Authentic Gameshow Studio Spotlights & Hotseat Stage Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.12)_0%,rgba(30,58,138,0.08)_50%,transparent_80%)] blur-2xl rounded-full" />
            <div className="absolute -top-36 left-1/4 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full" />
            <div className="absolute -top-36 right-1/4 w-96 h-96 bg-amber-500/12 blur-3xl rounded-full" />
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-30" />
          </div>

          {/* Top Stage Bar */}
          <StageHeader
            playerName={profile.name}
            currentLevel={currentLevel}
            candies={candiesWon}
            soundEnabled={settings.soundEnabled}
            musicEnabled={settings.musicEnabled}
            onToggleSound={handleToggleSound}
            onToggleMusic={handleToggleMusic}
            onExit={handleExitGame}
            onOpenLadderDrawer={() => setShowMobileLadder(true)}
          />

          {/* Main Gameshow Stage Arena */}
          <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 flex flex-col lg:flex-row gap-4 items-stretch justify-between">
            {/* Left/Center Column: Lifelines + Question Stage + Virtual MC */}
            <div className="flex-1 flex flex-col justify-between gap-4">
              {/* 4 Lifelines */}
              <LifelinesBar
                lifelines={lifelines}
                disabled={Boolean(confirmedOption || revealedCorrectAnswer || !timerActive)}
                onUseLifeline={handleUseLifeline}
              />

              {/* Central Question & 4 Answers */}
              <QuestionStage
                question={currentQuestion}
                timeLeft={timeLeft}
                totalTime={settings.timerDuration}
                selectedOption={selectedOption}
                confirmedOption={confirmedOption}
                revealedCorrectAnswer={revealedCorrectAnswer}
                eliminatedOptions={eliminatedOptions}
                onSelectOption={handleSelectOption}
                disabled={Boolean(confirmedOption || revealedCorrectAnswer || !timerActive)}
              />

              {/* Animated Virtual TV Host Avatar & Dialogue */}
              <McAvatar
                isSpeaking={mcSpeaking}
                dialogueText={mcDialogue}
              />
            </div>

            {/* Right Column: 15-Level Prize Ladder (Desktop permanent view) */}
            <div className="hidden lg:block w-72 shrink-0">
              <PrizeLadder currentLevel={currentLevel} className="h-full" />
            </div>
          </div>
        </div>
      )}

      {/* MOBILE PRIZE LADDER DRAWER MODAL */}
      {showMobileLadder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm lg:hidden animate-fade-in">
          <div className="w-full max-w-sm max-h-[85vh] flex flex-col">
            <PrizeLadder
              currentLevel={currentLevel}
              className="h-full"
              onClose={() => setShowMobileLadder(false)}
            />
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {showConfirmModal && selectedOption && currentQuestion && (
        <ConfirmModal
          optionKey={selectedOption}
          optionText={currentQuestion.options[selectedOption]}
          onConfirm={handleConfirmFinalAnswer}
          onCancel={() => {
            setShowConfirmModal(false);
            setSelectedOption(null);
          }}
        />
      )}

      {/* PHONE FRIEND MODAL */}
      {showPhoneModal && currentQuestion && (
        <PhoneFriendModal
          question={currentQuestion}
          onClose={() => setShowPhoneModal(false)}
        />
      )}

      {/* AUDIENCE POLL MODAL */}
      {showAudienceModal && currentQuestion && (
        <AudiencePollModal
          question={currentQuestion}
          onClose={() => setShowAudienceModal(false)}
        />
      )}

      {/* MILESTONE CELEBRATION MODAL */}
      {showMilestoneModal && (
        <MilestoneModal
          level={currentLevel}
          candiesWon={candiesWon}
          onContinue={handleContinueAfterMilestone}
          onOpenHandbook={() => {
            setShowMilestoneModal(false);
            setShowHandbookModal(true);
          }}
        />
      )}

      {/* RESULT & EXPLANATION MODAL */}
      {showResultModal && currentQuestion && (
        <ResultModal
          question={currentQuestion}
          selectedOption={confirmedOption}
          isTimeOut={isTimeOut}
          levelReached={currentLevel}
          candiesWon={candiesWon}
          onPlayAgain={() => {
            setShowResultModal(false);
            handleStartGame(profile.name);
          }}
          onGoHome={() => {
            soundEffects.stopAllMusic();
            setShowResultModal(false);
            setGameMode('start');
          }}
          onOpenHandbook={() => {
            setShowResultModal(false);
            setShowHandbookModal(true);
          }}
        />
      )}

      {/* DIGITAL HANDBOOK MODAL */}
      {showHandbookModal && (
        <HandbookModal
          playerName={profile.name}
          onClose={() => setShowHandbookModal(false)}
        />
      )}

      {/* KNOWLEDGE BASE MODAL (150 QUESTIONS) */}
      {showKnowledgeModal && (
        <KnowledgeBaseModal
          questions={questionsBank}
          onClose={() => setShowKnowledgeModal(false)}
        />
      )}

      {/* QUESTION MANAGER & SETTINGS MODAL */}
      {showManagerModal && (
        <QuestionManagerModal
          questions={questionsBank}
          settings={settings}
          onUpdateQuestions={(updated) => setQuestionsBank(updated)}
          onUpdateSettings={(updated) => setSettings(updated)}
          onClose={() => setShowManagerModal(false)}
        />
      )}

      {/* LEADERBOARD & HISTORY MODAL */}
      {showLeaderboardModal && (
        <LeaderboardModal
          history={history}
          profile={profile}
          onClearHistory={() => {
            localStorage.removeItem('ai_la_dao_lua_history_v1');
            setHistory([]);
          }}
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}

      {/* RULES MODAL */}
      {showRulesModal && (
        <RulesModal
          onClose={() => setShowRulesModal(false)}
          onStart={() => {
            setShowRulesModal(false);
            handleStartGame(profile.name);
          }}
        />
      )}

      {/* ABOUT MODAL */}
      {showAboutModal && (
        <AboutModal onClose={() => setShowAboutModal(false)} />
      )}
    </div>
  );
}
