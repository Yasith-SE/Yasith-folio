export const GITHUB_USERNAME = "Yasith-SE";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
export const GITHUB_AVATAR_FALLBACK_URL = `https://github.com/${GITHUB_USERNAME}.png`;

const GITHUB_API_URL = "https://api.github.com";

export type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
};

export type GithubRepo = {
  name: string;
  html_url: string;
  description?: string | null;
  language: string | null;
  updated_at: string | null;
  fork?: boolean;
  stargazers_count?: number;
  forks_count?: number;
  default_branch?: string;
};

export class GithubApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GithubApiError";
    this.status = status;
  }
}

export async function fetchGithub<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: { Accept: "application/vnd.github+json" },
    signal,
  });

  if (response.status === 403 || response.status === 429) {
    throw new GithubApiError(response.status, "RATE LIMIT REACHED");
  }

  if (!response.ok) {
    throw new GithubApiError(response.status, `HTTP ${response.status}`);
  }

  return (await response.json()) as T;
}

export function describeGithubError(error: unknown): string {
  if (error instanceof GithubApiError) return error.message;
  if (error instanceof Error) return error.message.toUpperCase();
  return "UNKNOWN ERROR";
}

export function repoUrl(name: string): string {
  return `${GITHUB_PROFILE_URL}/${name}`;
}

export function formatRepoDate(iso: string | null): string {
  if (!iso) return "UNKNOWN";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
