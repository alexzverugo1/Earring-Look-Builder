import { SlotKey } from "../types";
import { AVIF, EAR, chain } from "./publicImages";

export const inspirationStacks: {
  id: string;
  name: string;
  priceLabel: string;
  imageUrls: string[];
  assignments: Record<SlotKey, string>;
}[] = [
  {
    id: "minimal",
    name: "Minimalist",
    priceLabel: "3 items · $68",
    imageUrls: chain(EAR.EarA, EAR.EarE, AVIF.V20611403),
    assignments: {
      lobe: "p1",
      secondLobe: "p2",
      helix: "p3",
      flat: "p4",
      tragus: "p4"
    }
  },
  {
    id: "bold",
    name: "Bold Stack",
    priceLabel: "5 items · $142",
    imageUrls: chain(EAR.EarB, EAR.EarF, AVIF.V20596175),
    assignments: {
      lobe: "p2",
      secondLobe: "p6",
      helix: "p3",
      flat: "p8",
      tragus: "p7"
    }
  }
];
