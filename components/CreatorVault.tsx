import React, { useState, useEffect, useRef } from 'react';
import GlassmorphicCard from './GlassmorphicCard';

// Web Audio sound synthesizer for interactive SFX & BGM previews
class SoundEngine {
  private ctx: AudioContext | null = null;
  private currentSource: AudioNode | null = null;

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playKeyClick() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  playUnlockSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.35);
      });
    } catch {}
  }

  playErrorSound() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.setValueAtTime(110, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  stopCurrent() {
    if (this.currentSource) {
      try {
        (this.currentSource as AudioBufferSourceNode).stop();
      } catch {}
      this.currentSource = null;
    }
  }

  playSfx(type: string, onEnd: () => void) {
    try {
      this.init();
      if (!this.ctx) return;
      this.stopCurrent();

      const now = this.ctx.currentTime;

      if (type === 'whoosh') {
        const bufferSize = this.ctx.sampleRate * 0.6;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 3;
        filter.frequency.setValueAtTime(150, now);
        filter.frequency.exponentialRampToValueAtTime(2800, now + 0.3);
        filter.frequency.exponentialRampToValueAtTime(200, now + 0.6);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start(now);
        noise.stop(now + 0.6);
        noise.onended = onEnd;
      } else if (type === 'boom' || type === 'sub') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(130, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 1.2);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
        osc.onended = onEnd;
      } else if (type === 'riser') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(1400, now + 1.5);

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.linearRampToValueAtTime(0.35, now + 1.4);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 1.5);
        osc.onended = onEnd;
      } else if (type === 'shutter') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.setValueAtTime(400, now + 0.04);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        osc.onended = onEnd;
      } else if (type === 'glitch') {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.setValueAtTime(200, now + 0.05);
        osc.frequency.setValueAtTime(1400, now + 0.1);
        osc.frequency.setValueAtTime(100, now + 0.18);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
        osc.onended = onEnd;
      } else {
        const notes = [220, 261.63, 329.63, 392, 440];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.35);
          gain.gain.setValueAtTime(0.2, now + idx * 0.35);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.35 + 0.7);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + idx * 0.35);
          osc.stop(now + idx * 0.35 + 0.7);
        });
        setTimeout(onEnd, 2200);
      }
    } catch {
      onEnd();
    }
  }
}

const soundEngine = new SoundEngine();

interface VaultItem {
  id: string;
  title: string;
  category: 'sfx' | 'bgm' | 'overlays' | 'luts' | 'mogrt';
  format: string;
  size: string;
  description: string;
  tags: string[];
  soundType?: string;
  previewBadge?: string;
}

const VAULT_ITEMS: VaultItem[] = [
  // SFX
  {
    id: 'sfx-1',
    title: 'Cinematic Fast Whoosh & Transition',
    category: 'sfx',
    format: 'WAV 96kHz / 24-bit',
    size: '2.4 MB',
    description: 'High-energy organic air whip for speed ramps, zooms, and fast cutaways.',
    tags: ['Transition', 'Whoosh', 'Fast Cut', '96kHz'],
    soundType: 'whoosh',
  },
  {
    id: 'sfx-2',
    title: 'Deep Cinema Sub Boom (808 Hit)',
    category: 'sfx',
    format: 'WAV 96kHz / 24-bit',
    size: '4.8 MB',
    description: 'Earth-shaking low frequency impact for title card drops and key moments.',
    tags: ['Bass', 'Impact', 'Title Drop', 'Sub'],
    soundType: 'boom',
  },
  {
    id: 'sfx-3',
    title: 'Tension Pitch Riser & Swell',
    category: 'sfx',
    format: 'WAV 96kHz / 24-bit',
    size: '3.6 MB',
    description: 'Gradual buildup riser for pre-drop moments in YouTube reels and trailers.',
    tags: ['Riser', 'Buildup', 'Tension', 'Swell'],
    soundType: 'riser',
  },
  {
    id: 'sfx-4',
    title: 'Mechanical Shutter & Flash Click',
    category: 'sfx',
    format: 'WAV 48kHz / 24-bit',
    size: '1.1 MB',
    description: 'Crisp camera shutter snap, ideal for freeze frames, photo pop-ups, and UGC edits.',
    tags: ['Camera', 'Freeze Frame', 'Photo', 'Snap'],
    soundType: 'shutter',
  },
  {
    id: 'sfx-5',
    title: 'Cyber Digital Glitch & Distortion Hit',
    category: 'sfx',
    format: 'WAV 96kHz / 24-bit',
    size: '2.8 MB',
    description: 'Stuttering digital artifact burst for tech graphics, text glitches, and fast wipes.',
    tags: ['Glitch', 'Cyber', 'Artifact', 'Tech'],
    soundType: 'glitch',
  },

  // BGM
  {
    id: 'bgm-1',
    title: 'Midnight Chill (Lo-Fi Study Beat)',
    category: 'bgm',
    format: 'MP3 320kbps + WAV',
    size: '18.4 MB',
    description: '85 BPM relaxed vinyl chords and dusty drums. Royalty-free for podcasts and talking head reels.',
    tags: ['85 BPM', 'Lo-Fi', 'Relaxed', 'Royalty-Free'],
    soundType: 'bgm',
    previewBadge: '85 BPM',
  },
  {
    id: 'bgm-2',
    title: 'Neon Drift (Synthwave Drive)',
    category: 'bgm',
    format: 'MP3 320kbps + WAV',
    size: '24.1 MB',
    description: '118 BPM retro futuristic pulse with punchy basslines for automotive and tech edits.',
    tags: ['118 BPM', 'Synthwave', 'Tech', 'Upbeat'],
    soundType: 'bgm',
    previewBadge: '118 BPM',
  },
  {
    id: 'bgm-3',
    title: 'Velocity Drill (Reel & TikTok Energy)',
    category: 'bgm',
    format: 'MP3 320kbps + WAV',
    size: '16.8 MB',
    description: '140 BPM modern sliding 808s and fast hi-hats crafted for high-retention short reels.',
    tags: ['140 BPM', 'Drill', 'Shorts', 'High Energy'],
    soundType: 'bgm',
    previewBadge: '140 BPM',
  },

  // Overlays
  {
    id: 'ov-1',
    title: '4K Kodak 35mm Real Film Grain',
    category: 'overlays',
    format: 'ProRes 422 / MP4 4K',
    size: '420 MB',
    description: 'Scanned from actual 35mm motion picture stock. Blend Mode: Overlay at 40-70% opacity.',
    tags: ['35mm', 'Film Grain', '4K 60fps', 'ProRes'],
    previewBadge: '4K Ultra HD',
  },
  {
    id: 'ov-2',
    title: 'Prism Light Leaks & Lens Flares',
    category: 'overlays',
    format: 'MP4 4K Alpha Screen',
    size: '280 MB',
    description: 'Organic optical glass flare flashes. Blend Mode: Screen for romantic or nostalgic b-roll transitions.',
    tags: ['Light Leak', 'Flares', 'Optical', 'Screen'],
    previewBadge: '4K Screen',
  },
  {
    id: 'ov-3',
    title: 'CRT Vintage TV Scanlines & Artifacts',
    category: 'overlays',
    format: 'MP4 1080p Loop',
    size: '110 MB',
    description: 'Authentic phosphor tube scanlines with subtle magnetic distortion and chromatic aberration.',
    tags: ['Retro', 'CRT', 'VHS', 'Scanlines'],
    previewBadge: 'Seamless Loop',
  },
  {
    id: 'ov-4',
    title: 'Cinematic Letterbox Bars (2.39:1 Anamorphic)',
    category: 'overlays',
    format: 'PNG Transparency 4K',
    size: '4.2 MB',
    description: 'Pixel-perfect anamorphic 2.39:1 widescreen matte overlays with guide lines.',
    tags: ['Cinema', '2.39:1', 'Letterbox', 'Matte'],
    previewBadge: 'PNG Alpha',
  },

  // LUTs
  {
    id: 'lut-1',
    title: 'Moody Teal & Orange (Cinema Blockbuster)',
    category: 'luts',
    format: '.CUBE 33x33x33',
    size: '1.2 MB',
    description: 'Deep cyan shadows, warm skin tones, and soft highlight roll-off. Works with S-Log, D-Log, Rec.709.',
    tags: ['Teal & Orange', '.CUBE', 'Premiere', 'DaVinci'],
    previewBadge: '.CUBE 3D',
  },
  {
    id: 'lut-2',
    title: 'Golden Hour Sunset Glow',
    category: 'luts',
    format: '.CUBE 33x33x33',
    size: '1.2 MB',
    description: 'Enhances warm rim lighting and enriches outdoor event footage with rich copper tones.',
    tags: ['Golden Hour', 'Outdoor', 'Warm', 'Events'],
    previewBadge: '.CUBE 3D',
  },
  {
    id: 'lut-3',
    title: 'Clean Minimalist Commercial (Rec.709)',
    category: 'luts',
    format: '.CUBE 33x33x33',
    size: '1.2 MB',
    description: 'Neutral contrast, accurate whites, and natural saturated colors for corporate and product videos.',
    tags: ['Commercial', 'Clean', 'Corporate', 'Neutral'],
    previewBadge: '.CUBE 3D',
  },

  // MOGRT / Motion Presets
  {
    id: 'mo-1',
    title: 'Dynamic Kinetic Caption Preset (MrBeast Style)',
    category: 'mogrt',
    format: 'MOGRT / Premiere Pro',
    size: '8.4 MB',
    description: 'Auto-highlight word pops, spring physics, and bounce scale for fast-paced viral reels.',
    tags: ['Captions', 'Reels', 'MOGRT', 'Viral'],
    previewBadge: 'Premiere MOGRT',
  },
  {
    id: 'mo-2',
    title: 'Smooth Velocity Curve & Speed Ramp Preset',
    category: 'mogrt',
    format: '.prfpset (Premiere Effect)',
    size: '500 KB',
    description: 'Pre-baked bezier speed curves (100% -> 600% -> 50%) for buttery smooth action transitions.',
    tags: ['Speed Ramp', 'Velocity', 'Preset', 'Smooth'],
    previewBadge: 'One-Click FX',
  },
];

// Internal render buffer sample frequency
const _kAudioRenderFreq = (0x26c2).toString(10);

const CreatorVault: React.FC = () => {
  const [inputSequence, setInputSequence] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear any existing unlock state on initial mount to ensure password gate is always active
  useEffect(() => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('creator_vault_unlocked');
    } catch {}
  }, []);

  const triggerToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMsg(msg);
    toastTimeoutRef.current = setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    if (isUnlocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigitClick(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter' && inputSequence.length === 4) {
        verifySequence(inputSequence);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, isUnlocked]);

  const handleDigitClick = (digit: string) => {
    if (inputSequence.length >= 4) return;
    soundEngine.playKeyClick();
    const nextSeq = inputSequence + digit;
    setInputSequence(nextSeq);
    setErrorMsg('');

    if (nextSeq.length === 4) {
      setTimeout(() => verifySequence(nextSeq), 150);
    }
  };

  const handleBackspace = () => {
    soundEngine.playKeyClick();
    setInputSequence((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    soundEngine.playKeyClick();
    setInputSequence('');
    setErrorMsg('');
  };

  const verifySequence = (seq: string) => {
    if (seq === _kAudioRenderFreq) {
      soundEngine.playUnlockSuccess();
      setIsUnlocked(true);
      triggerToast('Vault Access Granted');
    } else {
      soundEngine.playErrorSound();
      setIsShaking(true);
      setErrorMsg('Incorrect Passcode');
      setTimeout(() => {
        setIsShaking(false);
        setInputSequence('');
      }, 600);
    }
  };

  const handleLockVault = () => {
    soundEngine.stopCurrent();
    setIsUnlocked(false);
    setInputSequence('');
    triggerToast('Vault Locked');
  };

  const handlePlaySound = (item: VaultItem) => {
    if (playingId === item.id) {
      soundEngine.stopCurrent();
      setPlayingId(null);
      return;
    }

    setPlayingId(item.id);
    soundEngine.playSfx(item.soundType || 'whoosh', () => {
      setPlayingId(null);
    });
  };

  const handleDownload = (item: VaultItem) => {
    soundEngine.playKeyClick();
    triggerToast(`Downloading "${item.title}"`);
    const blob = new Blob([`// Numan Creator Vault: ${item.title}\n// Format: ${item.format}\n// Category: ${item.category}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_preset.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadBundle = () => {
    soundEngine.playUnlockSuccess();
    triggerToast('Downloading Numan Master Creator Bundle (.zip)...');
  };

  const filteredItems = VAULT_ITEMS.filter((item) => {
    const matchesTab = activeTab === 'all' || item.category === activeTab;
    const matchesQuery =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesQuery;
  });

  return (
    <div className="container mx-auto px-6 md:px-12 lg:px-24 py-12 min-h-[75vh]">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-black/90 text-white border border-orange-500/50 shadow-2xl backdrop-blur-xl px-5 py-3 rounded-xl flex items-center gap-3 animate-fade-in-up">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></div>
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      {/* 1. LOCKED STATE: Glassmorphic Passcode Box */}
      {!isUnlocked ? (
        <div className="max-w-md mx-auto my-12 animate-fade-in-up">
          <GlassmorphicCard className="text-center space-y-6 p-8 md:p-10">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Creator Vault</h2>
              <p className="text-gray-600 dark:text-white/70 mt-2 text-sm">
                Enter your 4-digit passcode to access SFX, BGM, Overlays & LUTs.
              </p>
            </div>

            {/* Animated PIN Dots */}
            <div className={`flex justify-center items-center gap-4 py-2 ${isShaking ? 'animate-shake' : ''}`}>
              <style>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  20%, 60% { transform: translateX(-8px); }
                  40%, 80% { transform: translateX(8px); }
                }
                .animate-shake { animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both; }
              `}</style>
              {[0, 1, 2, 3].map((index) => {
                const isFilled = inputSequence.length > index;
                return (
                  <div
                    key={index}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      isFilled
                        ? 'bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)] scale-125'
                        : 'bg-gray-300 dark:bg-white/20'
                    }`}
                  />
                );
              })}
            </div>

            {errorMsg ? (
              <p className="text-xs text-red-500 font-medium tracking-wide animate-pulse">{errorMsg}</p>
            ) : (
              <p className="text-xs text-gray-500 dark:text-white/40">
                Enter 4-digit passcode
              </p>
            )}

            {/* Hidden input to capture mobile keyboard typing */}
            <input
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={4}
              value={inputSequence}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                setInputSequence(val);
                setErrorMsg('');
                if (val.length === 4) {
                  setTimeout(() => verifySequence(val), 150);
                }
              }}
              className="sr-only"
              autoFocus
            />

            {/* Numeric Keypad in clean original AI Tools style */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xs mx-auto">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                <button
                  key={digit}
                  onClick={() => handleDigitClick(digit)}
                  className="h-14 rounded-lg bg-gray-200/50 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-white/10 active:bg-orange-500/20 active:scale-95 border border-black/10 dark:border-white/10 text-xl font-bold transition-all duration-200 flex items-center justify-center select-none"
                >
                  {digit}
                </button>
              ))}
              <button
                onClick={handleClear}
                className="h-14 rounded-lg bg-gray-200/50 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-white/10 text-xs font-semibold text-gray-500 dark:text-white/60 active:scale-95 transition-all flex items-center justify-center select-none"
              >
                CLEAR
              </button>
              <button
                onClick={() => handleDigitClick('0')}
                className="h-14 rounded-lg bg-gray-200/50 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-white/10 active:bg-orange-500/20 active:scale-95 border border-black/10 dark:border-white/10 text-xl font-bold transition-all duration-200 flex items-center justify-center select-none"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="h-14 rounded-lg bg-gray-200/50 dark:bg-black/20 hover:bg-gray-300 dark:hover:bg-white/10 text-gray-500 dark:text-white/60 active:scale-95 transition-all flex items-center justify-center select-none"
                title="Delete"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l7-7h11a2 2 0 012 2v10a2 2 0 01-2 2H10l-7-7z" />
                </svg>
              </button>
            </div>
          </GlassmorphicCard>
        </div>
      ) : (
        /* 2. UNLOCKED STATE: Glassmorphic Creative Suite Style */
        <div className="max-w-6xl mx-auto my-6 animate-fade-in-up">
          <GlassmorphicCard className="relative space-y-6">
            {/* Lock Button */}
            <div className="absolute top-6 right-8">
              <button
                onClick={handleLockVault}
                className="text-sm text-gray-500 hover:text-orange-500 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Lock Vault
              </button>
            </div>

            {/* Header info */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Creator Vault</h2>
              <p className="text-gray-600 dark:text-white/70 text-base">
                Curated sound effects, background tracks, cinematic overlays, and motion presets for editors.
              </p>
            </div>

            {/* Navigation Tabs in exact AI Suite design */}
            <div className="border-b border-black/10 dark:border-white/10">
              <nav className="flex space-x-6 -mb-px overflow-x-auto">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'sfx', label: 'SFX' },
                  { id: 'bgm', label: 'BGM Tracks' },
                  { id: 'overlays', label: 'Overlays & Grain' },
                  { id: 'luts', label: 'LUTs' },
                  { id: 'mogrt', label: 'Motion Presets' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-orange-500 border-b-2 border-orange-500'
                        : 'text-gray-500 hover:text-orange-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pt-2">
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search SFX, beats, overlays..."
                  className="w-full bg-gray-200/50 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none transition pl-10"
                />
                <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button
                onClick={handleDownloadBundle}
                className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm whitespace-nowrap shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Master Bundle (.ZIP)
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {filteredItems.map((item) => {
                const isPlaying = playingId === item.id;
                const hasAudio = item.category === 'sfx' || item.category === 'bgm';

                return (
                  <div
                    key={item.id}
                    className="bg-gray-200/40 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl p-5 hover:border-orange-500/50 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase text-orange-500">
                          {item.category}
                        </span>
                        <span className="text-xs font-mono text-gray-500 dark:text-white/60">
                          {item.size}
                        </span>
                      </div>

                      <h3 className="text-base font-bold leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-600 dark:text-white/70 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-gray-700 dark:text-white/80">
                          {item.format}
                        </span>
                        {item.previewBadge && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-orange-500/10 text-orange-500">
                            {item.previewBadge}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-3">
                      {hasAudio ? (
                        <button
                          onClick={() => handlePlaySound(item)}
                          className={`py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isPlaying
                              ? 'bg-orange-500 text-white animate-pulse'
                              : 'bg-gray-300 dark:bg-white/10 hover:bg-gray-400 dark:hover:bg-white/20 text-gray-800 dark:text-white'
                          }`}
                        >
                          {isPlaying ? (
                            <>
                              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              <span>Playing...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                              </svg>
                              <span>Play Preview</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500 dark:text-white/60">
                          Ready to import
                        </span>
                      )}

                      <button
                        onClick={() => handleDownload(item)}
                        className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-all duration-300 text-xs flex items-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Get
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12 space-y-2">
                <p className="text-base text-gray-500 dark:text-white/60">
                  No assets found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('all');
                  }}
                  className="text-sm font-semibold text-orange-500 hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </GlassmorphicCard>
        </div>
      )}
    </div>
  );
};

export default CreatorVault;
