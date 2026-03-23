import { AVIF, EAR, chain } from "./publicImages";

export const quizOptionImages: Record<string, string[]> = {
  "Just lobes": chain(EAR.EarA, AVIF.V20611403),
  "2-3 spots": chain(EAR.EarB, AVIF.V15429467),
  "4-5 spots": chain(EAR.EarC, AVIF.V20596175),
  "6+ heavily pierced": chain(EAR.EarD, AVIF.V20601390),
  "Minimal & clean": chain(AVIF.V20589595, AVIF.V15422926),
  "Bold & stacked": chain(AVIF.V20611436, AVIF.V19991087),
  "Mix it up": chain(AVIF.V20015152, AVIF.V15434731),
  "Not sure": chain(AVIF.V17280041, AVIF.V20600298),
  Gold: chain(AVIF.V20600295, AVIF.V20611403),
  Silver: chain(AVIF.V20339714, AVIF.V15429467),
  Mixed: chain(AVIF.V19991087, AVIF.V20611436),
  "No preference": chain(AVIF.V20600298, AVIF.V20596175),
  "Under $50": chain(AVIF.V15434731, AVIF.V20600295),
  "$50-$100": chain(AVIF.V20611403, AVIF.V20015152),
  "$100+": chain(AVIF.V20611436, AVIF.V17280041)
};

export function getQuizImagesForOption(option: string): string[] {
  return quizOptionImages[option] ?? chain(EAR.EarH, AVIF.V20611403);
}
