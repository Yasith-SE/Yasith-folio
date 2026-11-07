"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { HexGridBackground } from "@/components/layout/HexGridBackground";
import { SectionTabs } from "@/components/layout/SectionTabs";
import { TopNav } from "@/components/layout/TopNav";
import { DnaDatabase } from "@/components/dna/DnaDatabase";
import { OperatorDossier } from "@/components/profile/OperatorDossier";
import { EnergyFlash } from "@/components/omnitrix/EnergyFlash";
import { FlagshipMissions } from "@/components/missions/FlagshipMissions";
import { RepoExplorer } from "@/components/repos/RepoExplorer";
import { StandbyScreen, type UnlockPhase } from "@/components/screens/StandbyScreen";
import { useGithubProfile } from "@/hooks/useGithub";
import { playDialClick, playPowerUpChord } from "@/lib/omnitrix-audio";
import type { SectionId } from "@/lib/sections";

const UNLOCK_DURATION_MS = 1200;
const DEFAULT_SECTION: SectionId = "operator";

// Page-level router: owns the screen state (standby -> unlocking -> unlocked)
// and the active HUD section, and renders the matching view from components/.
export default function Home() {
  const profile = useGithubProfile();
  const [phase, setPhase] = useState<UnlockPhase>("standby");
  const [section, setSection] = useState<SectionId>(DEFAULT_SECTION);
  const [coreRotation, setCoreRotation] = useState(0);
  const unlockTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(unlockTimer.current);
  }, []);

  function unlock() {
    if (phase !== "standby") return;

    playPowerUpChord();
    setPhase("unlocking");
    setCoreRotation((rotation) => rotation + 180);
    unlockTimer.current = window.setTimeout(() => setPhase("unlocked"), UNLOCK_DURATION_MS);
  }

  const lock = useCallback(() => {
    playDialClick();
    setCoreRotation((rotation) => rotation + 180);
    setPhase("standby");
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-omni-black font-sans text-emerald-100">
      <HexGridBackground />

      {phase === "unlocked" ? (
        <main className="relative z-10 min-h-screen animate-omni-fade-in">
          <TopNav profile={profile} onLock={lock} />
          <SectionTabs active={section} onChange={setSection} />

          <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 sm:px-6">
            {section === "operator" && <OperatorDossier />}
            {section === "dna" && <DnaDatabase />}
            {section === "missions" && <FlagshipMissions />}
            {section === "explorer" && <RepoExplorer />}
          </div>
        </main>
      ) : (
        <StandbyScreen phase={phase} rotation={coreRotation} onActivate={unlock} />
      )}

      {phase === "unlocking" && <EnergyFlash />}
    </div>
  );
}
