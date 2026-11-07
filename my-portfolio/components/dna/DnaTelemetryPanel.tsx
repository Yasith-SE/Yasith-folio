"use client";

import type { DnaForm } from "@/lib/data/dna-forms";
import type { Mission } from "@/lib/data/missions";
import { Panel, progressStyle } from "@/components/ui/Panel";

type Props = {
  form: DnaForm;
  missions: Mission[];
};

export function DnaTelemetryPanel({ form, missions }: Props) {
  return (
    <Panel eyebrow="ACTIVE DNA TELEMETRY" title={`Form ${form.code} // ${form.title}`}>
      <p className="text-sm leading-relaxed text-emerald-100/80">{form.summary}</p>

      <div className="mt-6">
        <div className="flex justify-between font-mono text-xs uppercase tracking-widest text-emerald-300">
          <span>DNA potency</span>
          <span>{form.potency}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full animate-omni-grow rounded-full bg-gradient-to-r from-emerald-600 to-omni-green shadow-[0_0_12px_#00ff41]"
            style={progressStyle(form.potency)}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">Technologies</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {form.technologies.map((technology, index) => (
            <li
              key={technology}
              className="animate-omni-fade-in rounded border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-300"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {technology}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">Related missions</p>
        {missions.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {missions.map((mission) => (
              <li
                key={mission.id}
                className="flex items-center gap-3 rounded-lg border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200"
              >
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-omni-green shadow-[0_0_6px_#00ff41]" />
                {mission.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 font-mono text-xs text-zinc-500">NO LINKED MISSIONS</p>
        )}
      </div>
    </Panel>
  );
}
