import React from 'react';
import { StorySentence } from '../types';
import { StorySentenceBar } from './StorySentenceBar';
import { BookMarked, ArrowDown } from 'lucide-react';

interface AllPagesModeProps {
  stories: StorySentence[];
  playingStoryId: number | null;
  onPlayStateChange: (storyId: number, isPlaying: boolean) => void;
  showTranslation: boolean;
  showVocabulary: boolean;
  speechRate: number;
}

export const AllPagesMode: React.FC<AllPagesModeProps> = ({
  stories,
  playingStoryId,
  onPlayStateChange,
  showTranslation,
  showVocabulary,
  speechRate,
}) => {
  const scrollToScene = (id: number) => {
    const el = document.getElementById(`scene-card-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {/* Overview Banner & Quick Jump Navigation */}
      <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50 to-orange-50/60 p-5 md:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-900 font-bold text-base md:text-lg">
              <BookMarked className="h-5 w-5 text-amber-600" />
              全篇连贯画卷模式 (All Scenes Continuous View)
            </div>
            <p className="text-xs md:text-sm text-slate-600 mt-1">
              全文共 5 幕图文，完整展现马拉松的起源与历史传承。可依次浏览，点击任一句子即刻朗读。
            </p>
          </div>

          {/* Quick jump anchor buttons */}
          <div className="flex items-center flex-wrap gap-1.5">
            <span className="text-xs text-slate-500 font-medium mr-1">快捷定位:</span>
            {stories.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToScene(s.id)}
                className="inline-flex items-center gap-1 rounded-lg border border-amber-200 bg-white px-2.5 py-1 text-xs font-medium text-amber-900 hover:bg-amber-100 hover:border-amber-300 transition-all active:scale-95"
              >
                <span>第{s.stepNumber}幕</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Story Timeline / Continuous Cards */}
      <div className="relative space-y-12">
        {/* Timeline Connecting Line (Vertical) */}
        <div className="absolute left-6 top-8 bottom-8 hidden md:block w-0.5 bg-amber-200" />

        {stories.map((story, index) => {
          const isPlaying = playingStoryId === story.id;

          return (
            <div
              key={story.id}
              id={`scene-card-${story.id}`}
              className="relative flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Timeline Indicator Node */}
              <div className="hidden md:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white font-bold shadow-md shadow-amber-200 z-10 ring-4 ring-white">
                {story.stepNumber}
              </div>

              {/* Main Card Content */}
              <div className="flex-1 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-lg shadow-slate-100 transition-all hover:shadow-xl hover:border-amber-300">
                {/* Scene Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="md:hidden flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white text-xs font-bold">
                      {story.stepNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {story.title}
                    </h3>
                  </div>
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    故事第 {story.stepNumber} 句
                  </span>
                </div>

                {/* Exquisite Story Illustration */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-950 shadow-md group mb-6">
                  <img
                    src={story.image}
                    alt={story.imageAlt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 rounded-lg bg-black/60 backdrop-blur-xs px-2.5 py-1 text-[11px] text-slate-200">
                    {story.imageAlt}
                  </div>
                </div>

                {/* Sentence & Interactive Audio */}
                <StorySentenceBar
                  story={story}
                  isPlaying={isPlaying}
                  onPlayStateChange={(state) => onPlayStateChange(story.id, state)}
                  showTranslation={showTranslation}
                  showVocabulary={showVocabulary}
                  speechRate={speechRate}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
