export type DnaFormCode = "01" | "02" | "03" | "04" | "05";

export type DnaForm = {
  code: DnaFormCode;
  title: string;
  summary: string;
  // Relative proficiency shown on the telemetry bar (0-100).
  potency: number;
  technologies: string[];
};

export const DNA_FORMS: DnaForm[] = [
  {
    code: "01",
    title: "Frontend Architecture",
    summary:
      "Component-driven interfaces across single-page and server-rendered stacks, with typed state and utility-first styling.",
    potency: 92,
    technologies: [
      "Next.js",
      "Angular",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Bootstrap",
      "Blade",
      "Alpine.js",
    ],
  },
  {
    code: "02",
    title: "Backend & Enterprise Systems",
    summary:
      "Service layers, REST APIs and secured back ends for enterprise-style domains such as rentals, retail and student records.",
    potency: 90,
    technologies: [
      "Java",
      "Spring Boot",
      "Hibernate",
      "PHP",
      "Laravel 11",
      "REST APIs",
      "JWT Auth",
      "Rust/Tauri",
    ],
  },
  {
    code: "03",
    title: "Mobile & Cross-Platform",
    summary:
      "Cross-platform mobile apps and desktop-grade tooling, from audio processing UIs to native-adjacent performance code.",
    potency: 76,
    technologies: ["Flutter", "Dart", "Android Studio", "C++", "JavaFX"],
  },
  {
    code: "04",
    title: "Database & Cloud Infrastructure",
    summary:
      "Relational schema design, secure database connections and container-based delivery with version-controlled workflows.",
    potency: 84,
    technologies: ["MySQL", "PostgreSQL (SSL)", "Supabase", "JDBC", "Docker", "Git/GitHub"],
  },
  {
    code: "05",
    title: "AI & Creative Engineering",
    summary:
      "AI-assisted product features, from Gemini API integration to virtual try-on systems, shaped by a design-first UI practice.",
    potency: 72,
    technologies: ["Python", "Gemini API Integration", "Virtual Try-On AI Systems", "UI/UX Design"],
  },
];
