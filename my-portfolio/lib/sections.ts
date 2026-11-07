// Routes for the unlocked HUD. Each id maps to a view rendered by app/page.tsx.
export const SECTIONS = [
  { id: "operator", code: "01", label: "OPERATOR DOSSIER" },
  { id: "dna", code: "02", label: "DNA DATABASE" },
  { id: "missions", code: "03", label: "FLAGSHIP MISSIONS" },
  { id: "explorer", code: "04", label: "REPO EXPLORER" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
