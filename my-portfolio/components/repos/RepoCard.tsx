"use client";

import { ExternalLink, GitFork, Star } from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import { formatRepoDate } from "@/lib/github";

type Props = {
  repo: GithubRepo;
  onInspect: () => void;
};

export function RepoCard({ repo, onInspect }: Props) {
  return (
    <button
      type="button"
      onClick={onInspect}
      className="group flex h-full flex-col rounded-2xl border border-emerald-500/40 bg-black/60 p-5 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-omni-green hover:shadow-[0_0_30px_rgba(0,255,65,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-omni-green"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="truncate font-mono text-sm font-semibold text-white" title={repo.name}>
          {repo.name}
        </h3>
        {repo.fork && (
          <span className="shrink-0 rounded border border-zinc-600 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
            FORK
          </span>
        )}
      </div>

      <p className="mt-2 line-clamp-2 min-h-10 text-sm text-emerald-100/70">
        {repo.description ?? "No description provided."}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-4 font-mono text-[11px] text-zinc-400">
        <span className="rounded border border-emerald-500/40 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">
          {repo.language ?? "UNKNOWN"}
        </span>
        <span className="inline-flex items-center gap-1">
          <Star className="h-3 w-3" />
          {repo.stargazers_count ?? "—"}
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          {repo.forks_count ?? "—"}
        </span>
        <span className="ml-auto text-zinc-500">{formatRepoDate(repo.updated_at)}</span>
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-emerald-400/80 group-hover:text-omni-green">
        <ExternalLink className="h-3 w-3" />
        INSPECT REPOSITORY
      </span>
    </button>
  );
}
