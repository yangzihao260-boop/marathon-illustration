// Speech Synthesis and Audio feedback utility for elementary English teaching

class SoundEffects {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPageTurn() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Ignore audio context errors if blocked by browser policy
    }
  }

  playClick() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(580, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignore
    }
  }
}

export const sfx = new SoundEffects();

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function getEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  // Prefer natural sounding English voices
  const enVoice = voices.find(v => 
    (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen')) 
    && (v.lang.startsWith('en'))
  );
  if (enVoice) return enVoice;
  return voices.find(v => v.lang.startsWith('en')) || null;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function speakText(
  text: string,
  options: {
    rate?: number; // 0.8 to 1.0
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: unknown) => void;
  } = {}
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment');
    options.onEnd?.();
    return;
  }

  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options.rate ?? 0.85; // Slightly slower for primary school children
  utterance.pitch = options.pitch ?? 1.05; // Slightly higher, friendly teaching pitch

  const voice = getEnglishVoice();
  if (voice) {
    utterance.voice = voice;
  }

  utterance.onstart = () => {
    options.onStart?.();
  };

  utterance.onend = () => {
    currentUtterance = null;
    options.onEnd?.();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (e.error !== 'canceled' && e.error !== 'interrupted') {
      console.error('Speech synthesis error:', e);
      options.onError?.(e);
    }
    options.onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
