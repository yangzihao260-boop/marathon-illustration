import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Languages, 
  Sparkles, 
  PlayCircle, 
  StopCircle, 
  Gauge, 
  GraduationCap,
  HelpCircle
} from 'lucide-react';
import { ViewMode } from '../types';

interface TeacherHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showTranslation: boolean;
  onToggleTranslation: () => void;
  showVocabulary: boolean;
  onToggleVocabulary: () => void;
  speechRate: number;
  onSpeechRateChange: (rate: number) => void;
  isContinuousPlaying: boolean;
  onToggleContinuousPlay: () => void;
  onOpenTeacherGuide: () => void;
}

export const TeacherHeader: React.FC<TeacherHeaderProps> = ({
  viewMode,
  onViewModeChange,
  showTranslation,
  onToggleTranslation,
  showVocabulary,
  onToggleVocabulary,
  speechRate,
  onSpeechRateChange,
  isContinuousPlaying,
  onToggleContinuousPlay,
  onOpenTeacherGuide,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Logo & Lesson Title */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-200">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                  The Story of the Marathon
                </h1>
                <span className="hidden sm:inline-block rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                  小学英语精读课
                </span>
              </div>
              <p className="text-xs text-slate-500">
                马拉松的由来 · 连续图文互动课文与精细点读
              </p>
            </div>
          </div>

          {/* Mode Switcher & Teacher Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* View Mode Segmented Controls */}
            <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200/70 shadow-inner">
              <button
                type="button"
                id="btn-mode-single"
                onClick={() => onViewModeChange('single')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs md:text-sm font-medium transition-all ${
                  viewMode === 'single'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="h-4 w-4 text-amber-600" />
                逐页讲读模式
              </button>
              <button
                type="button"
                id="btn-mode-all"
                onClick={() => onViewModeChange('all')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs md:text-sm font-medium transition-all ${
                  viewMode === 'all'
                    ? 'bg-white text-amber-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="h-4 w-4 text-amber-600" />
                全部图文可见
              </button>
            </div>

            {/* Continuous Whole Story Recitation Button */}
            <button
              type="button"
              id="btn-continuous-play"
              onClick={onToggleContinuousPlay}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs md:text-sm font-medium transition-all border ${
                isContinuousPlaying
                  ? 'border-red-300 bg-red-50 text-red-700 animate-pulse'
                  : 'border-amber-300 bg-amber-500 text-white hover:bg-amber-600 shadow-xs active:scale-95'
              }`}
              title="一键连贯朗读整篇课文"
            >
              {isContinuousPlaying ? (
                <>
                  <StopCircle className="h-4 w-4" />
                  停止全篇朗读
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  连读整篇故事
                </>
              )}
            </button>

            {/* Translation Display Toggle */}
            <button
              type="button"
              id="btn-toggle-translation"
              onClick={onToggleTranslation}
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                showTranslation
                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800'
              }`}
              title="切换中文翻译显示"
            >
              <Languages className="h-3.5 w-3.5 text-amber-600" />
              <span>译文</span>
              <span className={`text-[10px] px-1 rounded ${showTranslation ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                {showTranslation ? '开' : '关'}
              </span>
            </button>

            {/* Vocabulary Tips Toggle */}
            <button
              type="button"
              id="btn-toggle-vocab"
              onClick={onToggleVocabulary}
              className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-all ${
                showVocabulary
                  ? 'border-amber-300 bg-amber-50 text-amber-900'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800'
              }`}
              title="切换重点词汇批注"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>生词</span>
              <span className={`text-[10px] px-1 rounded ${showVocabulary ? 'bg-amber-200 text-amber-800' : 'bg-slate-100 text-slate-400'}`}>
                {showVocabulary ? '开' : '关'}
              </span>
            </button>

            {/* Audio Speed Selector */}
            <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700">
              <Gauge className="h-3.5 w-3.5 text-slate-400" />
              <button
                type="button"
                onClick={() => onSpeechRateChange(speechRate === 0.8 ? 1.0 : speechRate === 1.0 ? 0.7 : 0.8)}
                className="font-medium text-amber-800 hover:underline"
                title="切换发音语速 (适合小学生听力)"
              >
                语速: {speechRate === 0.7 ? '0.7x 极慢' : speechRate === 0.8 ? '0.8x 慢速(适合教学)' : '1.0x 常速'}
              </button>
            </div>

            {/* Teacher Guide Helper Drawer Trigger */}
            <button
              type="button"
              id="btn-teacher-guide"
              onClick={onOpenTeacherGuide}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              title="查看课文教学指南与互动问答"
            >
              <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
              <span>备课教案</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
