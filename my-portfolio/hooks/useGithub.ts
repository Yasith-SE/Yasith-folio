"use client";

import { useEffect, useState } from "react";
import { FALLBACK_REPOS } from "@/lib/fallback-repos";
import {
  GITHUB_USERNAME,
  describeGithubError,
  fetchGithub,
  type GithubProfile,
  type GithubRepo,
} from "@/lib/github";

export function useGithubProfile(): GithubProfile | null {
  const [profile, setProfile] = useState<GithubProfile | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetchGithub<GithubProfile>(`/users/${GITHUB_USERNAME}`, controller.signal)
      .then(setProfile)
      .catch(() => {
        // The nav falls back to the public avatar URL when this request fails.
      });

    return () => controller.abort();
  }, []);

  return profile;
}

export type RepoSource = "loading" | "live" | "fallback";

export type GithubRepoState = {
  repos: GithubRepo[];
  source: RepoSource;
  error: string | null;
};

export function useGithubRepos(): GithubRepoState {
  const [state, setState] = useState<GithubRepoState>({
    repos: [],
    source: "loading",
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchGithub<GithubRepo[]>(
      `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      controller.signal,
    )
      .then((repos) => setState({ repos, source: "live", error: null }))
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          repos: FALLBACK_REPOS,
          source: "fallback",
          error: describeGithubError(error),
        });
      });

    return () => controller.abort();
  }, []);

  return state;
}
