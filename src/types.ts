export interface StorySentence {
  id: number;
  stepNumber: number;
  title: string;
  sentence: string;
  chinese: string;
  words: {
    word: string;
    phonetic?: string;
    meaning: string;
    key?: boolean;
  }[];
  explanation: string;
  image: string;
  imageAlt: string;
  teacherNote?: string;
}

export type ViewMode = 'single' | 'all';
