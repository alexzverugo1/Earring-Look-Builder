export type OverlayId = "none" | "ar_overlay" | "product_picker" | "inspiration" | "cart_drawer";

export type SlotKey = "lobe" | "secondLobe" | "helix" | "flat" | "tragus";
export type MetalFilter = "all" | "gold" | "silver";

export interface Product {
  id: string;
  name: string;
  price: number;
  metals: string[];
  slotKeys: SlotKey[];
  color: string;
  imageUrls: string[];
}

export interface ModelCanvas {
  id: string;
  name: string;
  imageUrls: string[];
}

export interface QuizAnswers {
  piercings: string;
  vibe: string;
  metal: string;
  budget: string;
}

export interface AppState {
  overlay: OverlayId;
  quizAnswers: QuizAnswers;
  selectedCanvas: string | null;
  slots: Record<SlotKey, Product | null>;
  cartItems: Product[];
  activeSlot: SlotKey | null;
  pickerFilter: MetalFilter;
  arProductId: string | null;
  selectedFromResults: string[];
  toastMessage: string | null;
}
