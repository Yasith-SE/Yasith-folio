"use client";

import { MISSIONS } from "@/lib/data/missions";
import { MissionCard } from "@/components/missions/MissionCard";

export function FlagshipMissions() {
  return (
    <section className="space-y-6">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
          PLUMBER MISSION LOGS
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-white">Flagship Missions</h2>
        <p className="mt-2 max-w-2xl text-sm text-emerald-100/70">
          Major systems, grouped together even where the code is split across frontend and backend repositories.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {MISSIONS.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>
    </section>
  );
}
