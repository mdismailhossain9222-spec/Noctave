import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAmbient: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Master gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 3);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Low warm ambient drone (F# minor / mystic noir chord)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(92.5, ctx.currentTime); // F#2

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(138.59, ctx.currentTime); // C#3

        // Biquad filter for smooth dark warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(280, ctx.currentTime);
        filter.Q.setValueAtTime(3, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;

        setIsPlaying(true);
      } catch (e) {
        console.warn('Audio not allowed or supported', e);
      }
    } else {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          audioCtxRef.current?.close();
          setIsPlaying(false);
        }, 1000);
      } else {
        setIsPlaying(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      title={isPlaying ? 'Mute Nocturne Ambience' : 'Play Nocturne Ambience'}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 text-neutral-400 hover:text-[#E8B978] bg-white/[0.03] border border-white/10 hover:border-[#E8B978]/40"
    >
      {isPlaying ? (
        <>
          <div className="flex items-center gap-0.5 h-3">
            <span className="w-0.5 h-3 bg-[#E8B978] animate-pulse rounded-full" />
            <span className="w-0.5 h-2 bg-[#E8B978] animate-pulse delay-75 rounded-full" />
            <span className="w-0.5 h-4 bg-[#E8B978] animate-pulse delay-150 rounded-full" />
          </div>
          <span className="text-[10px] hidden sm:inline text-[#E8B978]">Atmosphere On</span>
          <Volume2 className="w-3.5 h-3.5 text-[#E8B978]" />
        </>
      ) : (
        <>
          <span className="text-[10px] hidden sm:inline">Atmosphere</span>
          <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
        </>
      )}
    </button>
  );
};
