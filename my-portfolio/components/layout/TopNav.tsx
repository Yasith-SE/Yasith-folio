"use client";

import type { GithubProfile } from "@/lib/github";
import {
  GITHUB_AVATAR_FALLBACK_URL,
  GITHUB_PROFILE_URL,
  GITHUB_USERNAME,
} from "@/lib/github";
import { Lock } from "lucide-react";

type Props = {
  profile: GithubProfile | null;
  onLock: () => void;
};

export function TopNav({ profile, onLock }: Props) {
  const avatarSrc = profile?.avatar_url ?? GITHUB_AVATAR_FALLBACK_URL;

  return (
    <header className="sticky top-0 z-40 border-b border-emerald-500/40 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- GitHub avatars come from an external host. */}
          <img
            src={avatarSrc}
            alt={`${GITHUB_USERNAME} GitHub avatar`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full border border-omni-green/60 shadow-[0_0_14px_rgba(0,255,65,0.45)]"
          />
          <div>
            <p className="font-mono text-sm font-semibold text-white">{GITHUB_USERNAME}</p>
            <p className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-omni-green">
              <span className="h-1.5 w-1.5 rounded-full bg-omni-green shadow-[0_0_6px_#00ff41]" />
              ONLINE
            </p>
          </div>
        </a>

        <button
          type="button"
          onClick={onLock}
          className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/50 bg-emerald-500/10 px-4 py-2 font-mono text-xs tracking-widest text-emerald-300 transition-colors hover:bg-emerald-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-omni-green"
        >
          <Lock className="h-4 w-4" />
          LOCK OMNITRIX
        </button>
      </div>
    </header>
  );
}
