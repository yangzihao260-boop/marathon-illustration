import React, { useState, useEffect, useRef } from 'react';
import { ViewMode } from './types';
import { STORY_SENTENCES } from './data/storyData';
import { TeacherHeader } from './components/TeacherHeader';
import { SinglePageMode } from './components/SinglePageMode';
import { AllPagesMode } from './components/AllPagesMode';
import { TeacherGuideModal } from './components/TeacherGuideModal';
import { speakText, stopSpeaking } from './utils/speech';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [playingStoryId, setPlayingStoryId] = useState<number | null>(null);
  const [showTranslation, setShowTranslation] = useState<boolean>(true);
  const [showVocabulary, setShowVocabulary] = useState<boolean>(true);
  const [speechRate, setSpeechRate] = useState<number>(0.85);
  const [isContinuousPlaying, setIsContinuousPlaying] = useState<boolean>(false);
  const [showTeacherGuide, setShowTeacherGuide] = useState<boolean>(false);

  const continuousIndexRef = useRef<number>(0);
  const isContinuousActiveRef = useRef<boolean>(false);

  // Stop any ongoing speech when unmounting or switching major modes
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handlePlayStateChange = (storyId: number, isPlaying: boolean) => {
    if (isPlaying) {
      setPlayingStoryId(storyId);
    } else {
      if (playingStoryId === storyId) {
        setPlayingStoryId(null);
      }
    }
  };

  // Continuous Full-Story Autoplay
  const stopContinuousPlay = () => {
    isContinuousActiveRef.current = false;
    setIsContinuousPlaying(false);
    setPlayingStoryId(null);
    stopSpeaking();
  };

  const playContinuousStep = (stepIdx: number) => {
    if (!isContinuousActiveRef.current) return;
    if (stepIdx >= STORY_SENTENCES.length) {
      // Completed all
      stopContinuousPlay();
      return;
    }

    continuousIndexRef.current = stepIdx;
    setCurrentIndex(stepIdx);
    const story = STORY_SENTENCES[stepIdx];
    setPlayingStoryId(story.id);

    // If in all view mode, scroll to the card
    if (viewMode === 'all') {
      const el = document.getElementById(`scene-card-${story.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    speakText(story.sentence, {
      rate: speechRate,
      onStart: () => {
        setPlayingStoryId(story.id);
      },
      onEnd: () => {
        if (!isContinuousActiveRef.current) return;
        // Brief pedagogical pause between sentences (1.2 seconds)
        setTimeout(() => {
          if (isContinuousActiveRef.current) {
            playContinuousStep(stepIdx + 1);
          }
        }, 1200);
      },
      onError: () => {
        stopContinuousPlay();
      },
    });
  };

  const handleToggleContinuousPlay = () => {
    if (isContinuousPlaying) {
      stopContinuousPlay();
    } else {
      stopSpeaking();
      isContinuousActiveRef.current = true;
      setIsContinuousPlaying(true);
      // Start from current page if in single mode, or from beginning
      const startIdx = viewMode === 'single' ? currentIndex : 0;
      playContinuousStep(startIdx);
    }
  };

  const handleSelectIndex = (idx: number) => {
    if (isContinuousPlaying) {
      stopContinuousPlay();
    }
    stopSpeaking();
    setPlayingStoryId(null);
    setCurrentIndex(idx);
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 antialiased selection:bg-amber-200 selection:text-amber-900 flex flex-col">
      {/* Teacher Control Header */}
      <TeacherHeader
        viewMode={viewMode}
        onViewModeChange={(mode) => {
          if (isContinuousPlaying) stopContinuousPlay();
          stopSpeaking();
          setViewMode(mode);
        }}
        showTranslation={showTranslation}
        onToggleTranslation={() => setShowTranslation(!showTranslation)}
        showVocabulary={showVocabulary}
        onToggleVocabulary={() => setShowVocabulary(!showVocabulary)}
        speechRate={speechRate}
        onSpeechRateChange={setSpeechRate}
        isContinuousPlaying={isContinuousPlaying}
        onToggleContinuousPlay={handleToggleContinuousPlay}
        onOpenTeacherGuide={() => setShowTeacherGuide(true)}
      />

      {/* Main Classroom Workspace */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-7xl mx-auto w-full">
        {viewMode === 'single' ? (
          <SinglePageMode
            stories={STORY_SENTENCES}
            currentIndex={currentIndex}
            onSelectIndex={handleSelectIndex}
            isPlaying={playingStoryId === STORY_SENTENCES[currentIndex]?.id}
            onPlayStateChange={(playing) =>
              handlePlayStateChange(STORY_SENTENCES[currentIndex]?.id, playing)
            }
            showTranslation={showTranslation}
            showVocabulary={showVocabulary}
            speechRate={speechRate}
          />
        ) : (
          <AllPagesMode
            stories={STORY_SENTENCES}
            playingStoryId={playingStoryId}
            onPlayStateChange={handlePlayStateChange}
            showTranslation={showTranslation}
            showVocabulary={showVocabulary}
            speechRate={speechRate}
          />
        )}
      </main>

      {/* Classroom Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-4 text-center text-xs text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>小学英语课文互动绘本 · 《The Story of the Marathon》</span>
          <span>按空格键或键盘箭头可快捷翻页 · 点击句子即可真人发音</span>
        </div>
      </footer>

      {/* Teacher Guide & Lesson Plan Modal */}
      <TeacherGuideModal
        isOpen={showTeacherGuide}
        onClose={() => setShowTeacherGuide(false)}
      />
    </div>
  );
}
