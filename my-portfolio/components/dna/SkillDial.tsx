"use client";

import { HourglassSymbol } from "@/components/omnitrix/HourglassSymbol";
import type { DnaForm } from "@/lib/data/dna-forms";

// Distance of each node from the dial center, as a percentage of the dial size.
const NODE_RADIUS_PERCENT = 40;

type Props = {
  forms: DnaForm[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function SkillDial({ forms, activeIndex, onSelect }: Props) {
  const angleStep = 360 / forms.length;
  // Rotating the ring by the negative of the node's angle brings that node to the top marker.
  const ringRotation = -activeIndex * angleStep;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[22rem]">
      <span
        aria-hidden="true"
        className="absolute -top-1 left-1/2 z-20 h-0 w-0 -translate-x-1/2 border-x-[9px] border-t-[14px] border-x-transparent border-t-omni-green drop-shadow-[0_0_6px_#00ff41]"
      />

      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{ transform: `rotate(${ringRotation}deg)` }}
      >
        <div className="absolute inset-[12%] rounded-full border border-emerald-500/40 bg-omni-slate/80 shadow-[inset_0_0_40px_rgba(0,255,65,0.12)]" />
        <div className="absolute inset-[24%] rounded-full border border-dashed border-emerald-500/30" />

        {forms.map((form, index) => {
          const radians = (index * angleStep * Math.PI) / 180;
          const left = 50 + NODE_RADIUS_PERCENT * Math.sin(radians);
          const top = 50 - NODE_RADIUS_PERCENT * Math.cos(radians);
          const selected = index === activeIndex;

          return (
            <button
              key={form.code}
              type="button"
              aria-pressed={selected}
              aria-label={`Form ${form.code}: ${form.title}`}
              onClick={() => onSelect(index)}
              className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-omni-green ${
                selected
                  ? "border-omni-green bg-emerald-500/20 text-omni-green shadow-[0_0_20px_rgba(0,255,65,0.6)]"
                  : "border-zinc-500 bg-zinc-900 text-zinc-400 hover:border-emerald-500/60 hover:text-emerald-300"
              }`}
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* Counter-rotates so the form code stays upright. */}
              <span
                className="font-mono text-xs font-semibold transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${-ringRotation}deg)` }}
              >
                {form.code}
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => onSelect((activeIndex + 1) % forms.length)}
        aria-label="Rotate dial to the next DNA form"
        className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-emerald-400/70 bg-omni-black shadow-[0_0_30px_rgba(0,255,65,0.35)] transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-omni-green"
      >
        <HourglassSymbol className="h-1/2 w-1/2 drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]" />
      </button>
    </div>
  );
}
