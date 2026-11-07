"use client";

import { useCallback, useMemo, useState } from "react";
import { TriangleAlert } from "lucide-react";
import { RepoCard } from "@/components/repos/RepoCard";
import {
  LANGUAGE_FILTERS,
  RepoFilterBar,
  type LanguageFilter,
} from "@/components/repos/RepoFilterBar";
import { RepoInspectorModal } from "@/components/repos/RepoInspectorModal";
import { useGithubRepos, type RepoSource } from "@/hooks/useGithub";
import type { GithubRepo } from "@/lib/github";

export function RepoExplorer() {
  const { repos, source, error } = useGithubRepos();
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState<LanguageFilter>(LANGUAGE_FILTERS[0]);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

  const closeInspector = useCallback(() => setSelectedRepo(null), []);

  const visibleRepos = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return repos.filter((repo) => {
      if (language !== "All" && repo.language !== language) return false;
      if (!needle) return true;
      return [repo.name, repo.description, repo.language].some((value) =>
        value?.toLowerCase().includes(needle),
      );
    });
  }, [repos, query, language]);

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
            LIVE GITHUB SYNC
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Repository Explorer</h2>
        </div>
        <SyncStatus source={source} error={error} />
      </header>

      <RepoFilterBar
        query={query}
        onQueryChange={setQuery}
        language={language}
        onLanguageChange={setLanguage}
      />

      {source === "loading" ? (
        <p className="font-mono text-xs tracking-widest text-emerald-400 animate-omni-text">
          [ SCANNING REPOSITORY SIGNALS... ]
        </p>
      ) : visibleRepos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRepos.map((repo) => (
            <RepoCard key={repo.name} repo={repo} onInspect={() => setSelectedRepo(repo)} />
          ))}
        </div>
      ) : (
        <p className="font-mono text-xs tracking-widest text-zinc-500">
          [ NO REPOSITORIES MATCH THIS SIGNAL ]
        </p>
      )}

      {selectedRepo && (
        <RepoInspectorModal
          key={selectedRepo.name}
          repo={selectedRepo}
          onClose={closeInspector}
        />
      )}
    </section>
  );
}

type SyncStatusProps = {
  source: RepoSource;
  error: string | null;
};

function SyncStatus({ source, error }: SyncStatusProps) {
  if (source === "loading") {
    return <p className="font-mono text-xs tracking-widest text-emerald-400">SYNCING...</p>;
  }

  if (source === "fallback") {
    return (
      <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-omni-red">
        <TriangleAlert className="h-4 w-4" />
        FALLBACK DATA // {error}
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2 font-mono text-xs tracking-widest text-omni-green">
      <span className="h-1.5 w-1.5 rounded-full bg-omni-green shadow-[0_0_6px_#00ff41]" />
      LIVE // api.github.com
    </p>
  );
}
