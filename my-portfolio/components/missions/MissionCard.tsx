"use client";

import { ExternalLink } from "lucide-react";
import type { Mission } from "@/lib/data/missions";
import { repoUrl } from "@/lib/github";

type Props = {
  mission: Mission;
};

export function MissionCard({ mission }: Props) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-emerald-500/40 bg-black/60 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-omni-green hover:shadow-[0_0_30px_rgba(0,255,65,0.25)]">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
        <span className="shrink-0 rounded-full border border-omni-silver/50 bg-zinc-800/80 px-3 py-1 font-mono text-[10px] tracking-widest text-omni-silver">
          {mission.badge}
        </span>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-emerald-100/75">{mission.summary}</p>

      <ul className="mt-4 flex flex-wrap gap-2">
        {mission.stack.map((item) => (
          <li
            key={item}
            className="rounded border border-emerald-500/30 px-2 py-0.5 font-mono text-[11px] text-emerald-300"
          >
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Repositories</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {mission.repos.map((name) => (
            <li key={name}>
              <a
                href={repoUrl(name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs text-emerald-300 underline-offset-4 hover:text-omni-green hover:underline"
              >
                {name}
                <ExternalLink className="h-3 w-3" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
