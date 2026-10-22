export const NOCTURNE_VARIANTS = ["midnight", "eclipse", "aurora", "solstice"] as const;
export type NocturneVariant = (typeof NOCTURNE_VARIANTS)[number];

export const NOCTURNE_TITLES: Record<NocturneVariant, string> = {
  midnight: "Nocturne — Midnight",
  eclipse: "Nocturne — Eclipse",
  aurora: "Nocturne — Aurora",
  solstice: "Nocturne — Solstice",
};

export function buildNocturneDocument(_variant?: NocturneVariant): string | undefined {
  return undefined;
}
