"use client";

import { Search } from "lucide-react";

export const LANGUAGE_FILTERS = [
  "All",
  "Java",
  "TypeScript",
  "JavaScript",
  "Dart",
  "Blade",
  "HTML",
  "C++",
] as const;

export type LanguageFilter = (typeof LANGUAGE_FILTERS)[number];

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  language: LanguageFilter;
  onLanguageChange: (value: LanguageFilter) => void;
};

export function RepoFilterBar({ query, onQueryChange, language, onLanguageChange }: Props) {
  return (
    <div className="space-y-4 rounded-2xl border border-emerald-500/30 bg-black/60 p-4 backdrop-blur-md">
      <label className="relative block">
        <span className="sr-only">Search repositories</span>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500/70" />
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="SEARCH REPOSITORIES..."
          className="w-full rounded-lg border border-zinc-700 bg-omni-slate py-2.5 pl-10 pr-3 font-mono text-sm text-emerald-100 placeholder:text-zinc-600 focus:border-omni-green focus:outline-none focus:ring-1 focus:ring-omni-green"
        />
      </label>

      <div role="group" aria-label="Filter by language" className="flex flex-wrap gap-2">
        {LANGUAGE_FILTERS.map((filter) => {
          const selected = filter === language;

          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => onLanguageChange(filter)}
              className={`rounded-md border px-3 py-1.5 font-mono text-xs tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-omni-green ${
                selected
                  ? "border-omni-green bg-emerald-500/20 text-omni-green shadow-[0_0_12px_rgba(0,255,65,0.35)]"
                  : "border-zinc-700 text-zinc-400 hover:border-emerald-500/50 hover:text-emerald-300"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
