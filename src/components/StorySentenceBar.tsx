import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StorySentence } from '../types';
import { speakText, stopSpeaking, sfx } from '../utils/speech';

interface StorySentenceBarProps {
  story: StorySentence;
  isPlaying: boolean;
  onPlayStateChange: (isPlaying: boolean) => void;
  showTranslation: boolean;
  showVocabulary: boolean;
  speechRate: number;
}

export const StorySentenceBar: React.FC<StorySentenceBarProps> = ({
  story,
  isPlaying,
  onPlayStateChange,
  showTranslation,
  showVocabulary,
  speechRate,
}) => {
  const [activeWord, setActiveWord] = React.useState<string | null>(null);

  const handlePlaySentence = () => {
    if (isPlaying) {
      stopSpeaking();
      onPlayStateChange(false);
    } else {
      sfx.playClick();
      speakText(story.sentence, {
        rate: speechRate,
        onStart: () => onPlayStateChange(true),
        onEnd: () => onPlayStateChange(false),
        onError: () => onPlayStateChange(false),
      });
    }
  };

  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    sfx.playClick();
    setActiveWord(word);
    speakText(word, {
      rate: speechRate,
      onEnd: () => {
        setTimeout(() => setActiveWord(null), 800);
      },
    });
  };

  return (
    <div id={`sentence-bar-${story.id}`} className="w-full space-y-4">
      {/* Main Interactive Sentence Box */}
      <div
        onClick={handlePlaySentence}
        className={`group relative cursor-pointer select-none rounded-2xl border-2 p-5 md:p-6 transition-all duration-200 ${
          isPlaying
            ? 'border-amber-500 bg-amber-50/90 shadow-md ring-4 ring-amber-200/60 dark:bg-amber-950/30'
            : 'border-slate-200 bg-white hover:border-amber-400 hover:bg-amber-50/40 hover:shadow-sm'
        }`}
        title="点击句子朗诵发音 (Click to listen)"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* English Sentence */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xl sm:text-2xl md:text-3xl font-medium tracking-wide text-slate-800 font-serif">
              {story.sentence.split(' ').map((token, idx) => {
                const cleanToken = token.replace(/[^a-zA-Z]/g, '').toLowerCase();
                const isKeyWord = story.words.some(
                  w => w.word.toLowerCase() === cleanToken || w.word.toLowerCase().includes(cleanToken)
                );
                const isCurrentlyActive = activeWord && activeWord.toLowerCase() === cleanToken;

                return (
                  <span
                    key={idx}
                    className={`relative inline-block rounded-md px-1 py-0.5 transition-colors ${
                      isCurrentlyActive
                        ? 'bg-amber-300 text-amber-950 font-semibold'
                        : isKeyWord && showVocabulary
                        ? 'text-amber-800 underline decoration-amber-400 decoration-2 underline-offset-4 hover:bg-amber-100'
                        : 'hover:text-amber-600'
                    }`}
                  >
                    {token}
                  </span>
                );
              })}
            </div>

            {/* Chinese Translation */}
            <AnimatePresence>
              {showTranslation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-3 text-base md:text-lg text-slate-600 font-normal"
                >
                  <p className="flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                    <span>{story.chinese}</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Audio Speaker Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePlaySentence();
            }}
            className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all shadow-sm ${
              isPlaying
                ? 'bg-amber-600 text-white shadow-amber-300 ring-4 ring-amber-300 animate-pulse'
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:scale-105 active:scale-95'
            }`}
            aria-label="播放句子读音"
            title={isPlaying ? "停止朗读" : "点击播放句子读音"}
          >
            {isPlaying ? (
              <VolumeX className="h-6 w-6" />
            ) : (
              <Volume2 className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Listen Hint Pill */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5 font-medium text-amber-700/80">
            <Volume2 className="h-3.5 w-3.5" />
            点击整句即可纯正发音点读
          </span>
          <span className="text-slate-400">点击单词可单读生词</span>
        </div>
      </div>

      {/* Vocabulary Chips for Primary School English Teaching */}
      <AnimatePresence>
        {showVocabulary && story.words.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex flex-wrap items-center gap-2 pt-1"
          >
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              课文重点词汇:
            </span>
            {story.words.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => handleWordClick(e, item.word)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/80 px-2.5 py-1 text-xs text-amber-900 transition-all hover:bg-amber-100 hover:border-amber-300 active:scale-95"
                title={`点击朗读单词: ${item.word}`}
              >
                <span className="font-semibold text-amber-950">{item.word}</span>
                {item.phonetic && (
                  <span className="text-amber-700/70 font-mono">{item.phonetic}</span>
                )}
                <span className="text-slate-600">[{item.meaning}]</span>
                <Volume2 className="h-3 w-3 text-amber-600 opacity-70" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
