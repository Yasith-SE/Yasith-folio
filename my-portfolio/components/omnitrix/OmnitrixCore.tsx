"use client";

import type { CSSProperties } from "react";
import { HourglassSymbol } from "@/components/omnitrix/HourglassSymbol";

type Props = {
  rotation: number;
  disabled: boolean;
  onActivate: () => void;
};

// Green triangles on the bezel, pointing outward like the reference Omnitrix.
const NODE_CLIP: Record<"top" | "bottom" | "left" | "right", CSSProperties> = {
  top: { clipPath: "polygon(50% 0, 100% 100%, 0 100%)" },
  bottom: { clipPath: "polygon(0 0, 100% 0, 50% 100%)" },
  left: { clipPath: "polygon(0 50%, 100% 0, 100% 100%)" },
  right: { clipPath: "polygon(0 0, 100% 50%, 0 100%)" },
};

export function OmnitrixCore({ rotation, disabled, onActivate }: Props) {
  return (
    <div className="relative aspect-square w-[min(80vw,24rem)]">
      {/* Rotating silver bezel with the glowing green rim and outward triangle nodes. */}
      <div
        className="absolute inset-0 transition-transform duration-[1200ms] ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-50 via-zinc-400 to-zinc-600 shadow-[0_0_50px_rgba(0,255,65,0.15)]" />
        <div className="absolute inset-[11%] animate-omni-pulse rounded-full border-2 border-omni-green" />

        <span
          style={NODE_CLIP.top}
          className="absolute left-1/2 top-[1.5%] h-[7%] w-[7%] -translate-x-1/2 bg-omni-green"
        />
        <span
          style={NODE_CLIP.bottom}
          className="absolute bottom-[1.5%] left-1/2 h-[7%] w-[7%] -translate-x-1/2 bg-omni-green"
        />
        <span
          style={NODE_CLIP.left}
          className="absolute left-[1.5%] top-1/2 h-[7%] w-[7%] -translate-y-1/2 bg-omni-green"
        />
        <span
          style={NODE_CLIP.right}
          className="absolute right-[1.5%] top-1/2 h-[7%] w-[7%] -translate-y-1/2 bg-omni-green"
        />
      </div>

      {/* Static black face with the hourglass; this button initializes the system. */}
      <button
        type="button"
        onClick={onActivate}
        disabled={disabled}
        aria-label="Initialize Omnitrix"
        className="absolute inset-[12%] flex items-center justify-center rounded-full bg-omni-black transition-transform duration-300 hover:scale-105 active:scale-95 disabled:cursor-wait disabled:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-omni-green"
      >
        <HourglassSymbol className="h-[80%] w-[80%] drop-shadow-[0_0_10px_rgba(0,255,65,0.6)]" />
      </button>
    </div>
  );
}
