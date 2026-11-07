"use client";

import { OmnitrixCore } from "@/components/omnitrix/OmnitrixCore";

export type UnlockPhase = "standby" | "unlocking" | "unlocked";

type Props = {
  phase: UnlockPhase;
  rotation: number;
  onActivate: () => void;
};

export function StandbyScreen({ phase, rotation, onActivate }: Props) {
  const initializing = phase === "unlocking";

  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-6">
      <p className="animate-omni-text text-center font-mono text-xs tracking-[0.3em] text-emerald-400 sm:text-sm">
        {initializing
          ? "[ SYSTEM INITIALIZING // STAND BY ]"
          : "[ Yasith Samarakoon Portfolio ]"}
      </p>
      
      <OmnitrixCore rotation={rotation} disabled={initializing} onActivate={onActivate} />

      <p className="animate-omni-text text-center font-mono text-xs tracking-[0.3em] text-emerald-400 sm:text-sm">
        {initializing
          ? "[ SYSTEM INITIALIZING // STAND BY ]"
          : "[ OMNITRIX STANDBY For Yasith Samarakoon // CLICK CORE TO INITIALIZE SYSTEM ]"}
      </p>
    </section>
  );
}
