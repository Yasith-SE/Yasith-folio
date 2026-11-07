// Lightweight Omnitrix sound synthesizer built on the Web Audio API.
// No audio files are loaded; every sound is generated from oscillators.

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioContextClass =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  audioContext ??= new AudioContextClass();
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

// Rising C-major power-up chord with a filter sweep, played on Omnitrix unlock.
export function playPowerUpChord(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const duration = 1.6;

  const master = ctx.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(0.22, now + 0.06);
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(4200, now + 1.1);
  filter.connect(master);
  master.connect(ctx.destination);

  // C4, E4, G4, C5 stacked as a chord, each voice sweeping up an octave.
  [261.63, 329.63, 392.0, 523.25].forEach((frequency, index) => {
    const voice = ctx.createOscillator();
    voice.type = "sawtooth";
    voice.frequency.setValueAtTime(frequency * 0.5, now);
    voice.frequency.exponentialRampToValueAtTime(frequency, now + 0.45);
    voice.connect(filter);
    voice.start(now + index * 0.03);
    voice.stop(now + duration);
  });

  // High shimmer on top of the chord.
  const shimmer = ctx.createOscillator();
  const shimmerGain = ctx.createGain();
  shimmer.type = "sine";
  shimmer.frequency.setValueAtTime(1046.5, now + 0.2);
  shimmer.frequency.exponentialRampToValueAtTime(2093, now + 1.2);
  shimmerGain.gain.setValueAtTime(0.0001, now + 0.2);
  shimmerGain.gain.exponentialRampToValueAtTime(0.12, now + 0.5);
  shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  shimmer.connect(shimmerGain).connect(master);
  shimmer.start(now + 0.2);
  shimmer.stop(now + duration);
}

// Short mechanical click for each dial rotation.
export function playDialClick(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();
  click.type = "square";
  click.frequency.setValueAtTime(1800, now);
  click.frequency.exponentialRampToValueAtTime(600, now + 0.04);
  clickGain.gain.setValueAtTime(0.12, now);
  clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
  click.connect(clickGain).connect(ctx.destination);
  click.start(now);
  click.stop(now + 0.06);
}
