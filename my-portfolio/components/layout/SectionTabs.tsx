"use client";

import type { LucideIcon } from "lucide-react";
import { Dna, Radar, ScrollText, UserRound } from "lucide-react";
import { SECTIONS, type SectionId } from "@/lib/sections";

const SECTION_ICONS: Record<SectionId, LucideIcon> = {
  operator: UserRound,
  dna: Dna,
  missions: ScrollText,
  explorer: Radar,
};

type Props = {
  active: SectionId;
  onChange: (id: SectionId) => void;
};

export function SectionTabs({ active, onChange }: Props) {
  return (
    <nav aria-label="HUD sections" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <ul className="flex flex-wrap gap-2">
        {SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section.id];
          const selected = section.id === active;

          return (
            <li key={section.id}>
              <button
                type="button"
                aria-current={selected ? "page" : undefined}
                onClick={() => onChange(section.id)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-mono text-xs tracking-widest transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-omni-green ${
                  selected
                    ? "border-omni-green bg-emerald-500/20 text-omni-green shadow-[0_0_16px_rgba(0,255,65,0.35)]"
                    : "border-zinc-700 bg-black/60 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{`${section.code} // ${section.label}`}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
