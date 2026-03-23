/**
 * Static images from /public (Vite serves at site root).
 * Add new files to public/ and register them here.
 */
const base = import.meta.env.BASE_URL.endsWith("/") ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;

export function publicImage(filename: string): string {
  const name = filename.replace(/^\//, "");
  return `${base}${name}`;
}

/** All .avif assets currently in public/ */
export const AVIF = {
  V15422926: publicImage("V-15422926_0_260.avif"),
  V15429467: publicImage("V-15429467_0_260.avif"),
  V15434731: publicImage("V-15434731_0_260.avif"),
  V17280041: publicImage("V-17280041_0_260.avif"),
  V19991087: publicImage("V-19991087_0_260.avif"),
  V20015152: publicImage("V-20015152_0_260.avif"),
  V20339714: publicImage("V-20339714_0_260.avif"),
  V20589595: publicImage("V-20589595_0_260.avif"),
  V20596175: publicImage("V-20596175_0_260.avif"),
  V20600295: publicImage("V-20600295_0_260.avif"),
  V20600298: publicImage("V-20600298_0_260.avif"),
  V20601390: publicImage("V-20601390_0_260.avif"),
  V20611403: publicImage("V-20611403_0_260.avif"),
  V20611436: publicImage("V-20611436_0_260.avif")
} as const;

/** New ear-focused screenshots added to public/. */
export const EAR = {
  EarA: publicImage("image_2026-03-23_19-40-37.png"),
  EarB: publicImage("image_2026-03-23_19-40-57.png"),
  EarC: publicImage("image_2026-03-23_19-41-09.png"),
  EarD: publicImage("image_2026-03-23_19-41-19.png"),
  EarE: publicImage("image_2026-03-23_19-41-30.png"),
  EarF: publicImage("image_2026-03-23_19-41-43.png"),
  EarG: publicImage("image_2026-03-23_19-42-25.png"),
  EarH: publicImage("image_2026-03-23_19-42-59.png")
} as const;

export const ALL_PUBLIC_AVIFS: string[] = Object.values(AVIF);
export const ALL_PUBLIC_EARS: string[] = Object.values(EAR);
export const LIVE_TRY_ON_VIDEO = publicImage("Screen Recording 2026-03-23 at 19.56.04.mov");

/** Build a fallback chain (SmartImage) from distinct public assets */
export function chain(...urls: string[]): string[] {
  return [...new Set(urls.filter(Boolean))];
}
