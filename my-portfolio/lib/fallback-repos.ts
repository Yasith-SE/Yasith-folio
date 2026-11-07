import { GITHUB_USERNAME, repoUrl, type GithubRepo } from "@/lib/github";

// Snapshot of public repositories from apis_github.md, used when the GitHub API
// is unreachable or rate limited. Stars and forks are not in the snapshot, so
// they stay undefined and render as "—".
function repo(
  name: string,
  language: string | null,
  updated: string | null,
  fork = false,
): GithubRepo {
  return {
    name,
    html_url: repoUrl(name),
    language,
    updated_at: updated ? `${updated}T00:00:00Z` : null,
    fork,
  };
}

export const FALLBACK_REPOS: GithubRepo[] = [
  repo("Minishop-py", "HTML", "2026-06-26"),
  repo("MiniShop-project-laravel", "Blade", "2026-06-19"),
  repo("blog-app-project", "TypeScript", "2026-06-08"),
  repo("Car-rental-management-System_backend", "Java", "2026-05-17"),
  repo("musicEQ_mobile_flutter", "Dart", "2026-05-14"),
  repo("ClotheCityBackend", "Java", "2026-04-30"),
  repo("mobile-app-demo", "C++", "2026-04-26"),
  repo("frontend_ClotheCity_angular", "CSS", "2026-04-23"),
  repo("Ceylon-Autocar-Car-Rental-website--frontend", "JavaScript", "2026-04-21"),
  repo("Book_Rental_Management_System", "Java", "2026-04-02"),
  repo("flutter-course-student", "C++", "2026-03-29", true),
  repo(GITHUB_USERNAME, null, "2026-01-22"),
  repo("TicketMaster", "Java", "2026-01-20"),
  repo("registration-form", "Java", "2026-01-13"),
  repo("ShopManage", "HTML", "2026-01-10"),
  repo("Squid-game_Guessing-game", "HTML", "2025-12-26"),
  repo("Chat-Everywhere-backend", "Java", "2025-12-18"),
  repo("Chat-Everywhere", "HTML", "2025-11-30"),
  repo("supermarty-y", "JavaScript", "2025-11-28"),
  repo("Super-Mart-Frontend", "JavaScript", "2025-11-23"),
  repo("Super-Mart-Ceylon", "Java", "2025-11-23"),
  repo("Frontend-Thogakade", "JavaScript", "2025-11-22"),
  repo("Student_Management-frontend", null, "2025-11-16"),
  repo("Student_Management", "Java", "2025-11-16"),
  repo("Student_Management_System", "Java", "2025-11-16"),
  repo("WeatherApp", "HTML", "2025-11-11"),
  repo("Online-Food-Ordering-System-Backend", null, null),
];
