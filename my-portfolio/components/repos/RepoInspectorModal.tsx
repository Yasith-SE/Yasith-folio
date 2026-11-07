"use client";

import { useEffect, useState } from "react";
import {
  Clock,
  Code2,
  ExternalLink,
  GitBranch,
  GitFork,
  Star,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";
import type { GithubRepo } from "@/lib/github";
import {
  GITHUB_USERNAME,
  describeGithubError,
  fetchGithub,
  formatRepoDate,
} from "@/lib/github";

type Props = {
  repo: GithubRepo;
  onClose: () => void;
};

type DetailState =
  | { status: "loading" }
  | { status: "live"; repo: GithubRepo }
  | { status: "error"; message: string };

export function RepoInspectorModal({ repo, onClose }: Props) {
  const [details, setDetails] = useState<DetailState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetchGithub<GithubRepo>(`/repos/${GITHUB_USERNAME}/${repo.name}`, controller.signal)
      .then((live) => setDetails({ status: "live", repo: live }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setDetails({ status: "error", message: describeGithubError(error) });
      });

    return () => controller.abort();
  }, [repo.name]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Live data replaces the list snapshot once it arrives; until then the snapshot is shown.
  const display = details.status === "live" ? details.repo : repo;
  const syncing = details.status === "loading";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="repo-inspector-title"
        className="relative w-full max-w-lg animate-omni-fade-in rounded-2xl border border-omni-green/60 bg-omni-slate/95 p-6 shadow-[0_0_60px_rgba(0,255,65,0.25)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close repository inspector"
          className="absolute right-4 top-4 rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-omni-green focus-visible:outline-2 focus-visible:outline-omni-green"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400/80">
          REPOSITORY INSPECTOR
        </p>
        <h2 id="repo-inspector-title" className="mt-1 break-all font-mono text-lg font-semibold text-white">
          {display.name}
        </h2>
        <p className="mt-2 text-sm text-emerald-100/70">
          {display.description ?? "No description provided."}
        </p>

        <p className="mt-4 font-mono text-[11px] tracking-widest">
          {syncing && <span className="animate-omni-text text-emerald-400">[ SYNCING LIVE TELEMETRY... ]</span>}
          {details.status === "live" && <span className="text-omni-green">[ LIVE TELEMETRY ONLINE ]</span>}
          {details.status === "error" && (
            <span className="flex items-center gap-2 text-omni-red">
              <TriangleAlert className="h-4 w-4" />
              TELEMETRY LINK LOST // {details.message}
            </span>
          )}
        </p>

        <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-xs">
          <Stat icon={Star} label="Stars" value={display.stargazers_count ?? "—"} />
          <Stat icon={GitFork} label="Forks" value={display.forks_count ?? "—"} />
          <Stat icon={Clock} label="Last updated" value={formatRepoDate(display.updated_at)} />
          <Stat icon={GitBranch} label="Default branch" value={display.default_branch ?? "—"} />
          <Stat icon={Code2} label="Language" value={display.language ?? "UNKNOWN"} />
          <Stat icon={GitFork} label="Type" value={display.fork ? "FORK" : "ORIGINAL"} />
        </dl>

        <a
          href={display.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-omni-green bg-emerald-500/20 px-4 py-3 font-mono text-xs tracking-widest text-omni-green shadow-[0_0_16px_rgba(0,255,65,0.35)] transition-colors hover:bg-emerald-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-omni-green"
        >
          OPEN ON GITHUB
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

type StatProps = {
  icon: LucideIcon;
  label: string;
  value: string | number;
};

function Stat({ icon: Icon, label, value }: StatProps) {
  return (
    <div className="rounded-lg border border-zinc-700 bg-black/50 p-3">
      <dt className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-500">
        <Icon className="h-3 w-3" />
        {label}
      </dt>
      <dd className="mt-1 truncate text-sm text-emerald-100">{value}</dd>
    </div>
  );
}
