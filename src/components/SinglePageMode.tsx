import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorySentence } from '../types';
import { StorySentenceBar } from './StorySentenceBar';
import { sfx } from '../utils/speech';

interface SinglePageModeProps {
  stories: StorySentence[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  isPlaying: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
  showTranslation: boolean;
  showVocabulary: boolean;
  speechRate: number;
}

export const SinglePageMode: React.FC<SinglePageModeProps> = ({
  stories,
  currentIndex,
  onSelectIndex,
  isPlaying,
  onPlayStateChange,
  showTranslation,
  showVocabulary,
  speechRate,
}) => {
  const currentStory = stories[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      sfx.playPageTurn();
      onSelectIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      sfx.playPageTurn();
      onSelectIndex(currentIndex + 1);
    }
  };

  // Keyboard navigation for teachers using PPT clickers or arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        if (currentIndex < stories.length - 1) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentIndex > 0) {
          e.preventDefault();
          handlePrev();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, stories.length]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Story Stage Tabs / Stepper */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none">
        {stories.map((s, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                sfx.playClick();
                onSelectIndex(idx);
              }}
              className={`group flex flex-1 min-w-[120px] items-center gap-2.5 rounded-xl px-3 py-2 text-left transition-all border ${
                isActive
                  ? 'border-amber-500 bg-amber-50 shadow-sm ring-2 ring-amber-200'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isActive ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                }`}
              >
                {s.stepNumber}
              </div>
              <div className="truncate">
                <div
                  className={`text-xs font-medium truncate ${
                    isActive ? 'text-amber-900 font-semibold' : 'text-slate-700'
                  }`}
                >
                  {s.title.split('：')[1] || s.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate">
                  第 {s.stepNumber} / {stories.length} 页
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Slide Card */}
      <div className="relative overflow-hidden rounded-3xl border border-amber-100 bg-white p-4 sm:p-6 md:p-8 shadow-xl shadow-slate-200/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Story Picture Frame */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 shadow-lg group">
              <img
                src={currentStory.image}
                alt={currentStory.imageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Decorative Corner Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white font-medium shadow-md">
                <span className="inline-block h-2 w-2 rounded-full bg-amber-400"></span>
                <span>Scene {currentStory.stepNumber} · {currentStory.title}</span>
              </div>

              <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] text-slate-200">
                <span>高清插画</span>
              </div>
            </div>

            {/* Sentence Bar (Text & Speech) */}
            <div className="pt-2">
              <StorySentenceBar
                story={currentStory}
                isPlaying={isPlaying}
                onPlayStateChange={onPlayStateChange}
                showTranslation={showTranslation}
                showVocabulary={showVocabulary}
                speechRate={speechRate}
              />
            </div>

            {/* Teacher's Interactive Teaching Tips for this Scene */}
            {currentStory.teacherNote && (
              <div className="rounded-xl border border-sky-100 bg-sky-50/70 p-3.5 text-xs text-sky-900 flex items-start gap-2.5">
                <HelpCircle className="h-4 w-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-sky-950">课堂互动提问建议：</span>
                  <span className="text-sky-800 ml-1">{currentStory.teacherNote}</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Page Navigation Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
          {/* Previous Page Button */}
          <button
            type="button"
            id="btn-prev-page"
            disabled={currentIndex === 0}
            onClick={handlePrev}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all shadow-xs ${
              currentIndex === 0
                ? 'cursor-not-allowed bg-slate-100 text-slate-300'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-900 active:scale-95'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>上一页 (Previous)</span>
          </button>

          {/* Current Page Indicator Indicator */}
          <div className="flex items-center gap-2">
            {stories.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => {
                  sfx.playClick();
                  onSelectIndex(dotIdx);
                }}
                className={`h-2.5 rounded-full transition-all ${
                  dotIdx === currentIndex
                    ? 'w-7 bg-amber-500'
                    : 'w-2.5 bg-slate-200 hover:bg-amber-300'
                }`}
                title={`跳转到第 ${dotIdx + 1} 页`}
              />
            ))}
            <span className="ml-2 text-xs font-medium text-slate-400">
              {currentIndex + 1} / {stories.length}
            </span>
          </div>

          {/* Next Page Button */}
          <button
            type="button"
            id="btn-next-page"
            disabled={currentIndex === stories.length - 1}
            onClick={handleNext}
            className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-semibold transition-all shadow-sm ${
              currentIndex === stories.length - 1
                ? 'cursor-not-allowed bg-slate-100 text-slate-300'
                : 'bg-amber-500 text-white hover:bg-amber-600 hover:shadow-md hover:shadow-amber-200 active:scale-95'
            }`}
          >
            <span>下一页 (Next Page)</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Teacher Keyboard Shortcuts Help */}
      <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
        <span>💡 课堂遥控/键盘快捷键：</span>
        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">
          ← 上一页
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">
          → 下一页
        </span>
        <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-600">
          空格键 下一页
        </span>
      </div>
    </div>
  );
};
