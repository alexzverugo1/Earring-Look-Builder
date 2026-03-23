export type ProductCategory = "earrings" | "necklaces" | "bracelets" | "rings" | "body-jewelry";

export type SlotType = "lobe" | "upper-lobe" | "helix" | "conch" | "tragus";

export type EarringStyle = "stud" | "hoop" | "huggie" | "flat-back" | "drop";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: ProductCategory;
  earringStyle?: EarringStyle;
  slotTypes?: SlotType[];
  productUrl: string;
}

export interface EarModel {
  id: string;
  name: string;
  image: string;
}

export interface EarSlot {
  id: SlotType;
  label: string;
  x: number;
  y: number;
}

export interface CuratedStack {
  id: string;
  name: string;
  description: string;
  slotAssignments: Record<SlotType, string>;
}

export interface QuizQuestion {
  id: string;
  title: string;
  options: {
    id: string;
    label: string;
    tags: string[];
  }[];
}
