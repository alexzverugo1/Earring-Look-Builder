import { ModelCanvas, Product, SlotKey } from "../types";
import { AVIF, EAR, chain } from "./publicImages";

export const recommendedProducts: Product[] = [
  {
    id: "p1",
    name: "10K Gold Bonded Croissant Hoops",
    price: 40,
    metals: ["gold"],
    slotKeys: ["lobe", "secondLobe"],
    color: "#d6c08b",
    imageUrls: chain(AVIF.V20611403, AVIF.V20611436, AVIF.V20600295)
  },
  {
    id: "p2",
    name: "Sterling Silver CZ Halo Heart Studs",
    price: 30,
    metals: ["silver"],
    slotKeys: ["lobe", "secondLobe", "tragus"],
    color: "#c9c5b9",
    imageUrls: chain(AVIF.V15429467, AVIF.V20339714, AVIF.V20589595)
  },
  {
    id: "p3",
    name: "10K Gold Bonded Crescent Hoops",
    price: 38,
    metals: ["gold", "silver"],
    slotKeys: ["lobe", "helix", "secondLobe"],
    color: "#d8b577",
    imageUrls: chain(AVIF.V20596175, AVIF.V20600298, AVIF.V20601390)
  },
  {
    id: "p4",
    name: "14K Gold Plated Diamond Halo Studs",
    price: 50,
    metals: ["gold", "silver", "rose"],
    slotKeys: ["lobe", "secondLobe", "flat", "tragus"],
    color: "#d4bf82",
    imageUrls: chain(AVIF.V15422926, AVIF.V15434731, AVIF.V17280041)
  }
];

export const pickerProducts: Product[] = [
  ...recommendedProducts,
  {
    id: "p5",
    name: "10K Gold Bonded Tapered Sculpted Hoops",
    price: 35,
    metals: ["gold"],
    slotKeys: ["lobe", "helix"],
    color: "#d8c48a",
    imageUrls: chain(AVIF.V19991087, AVIF.V20015152, AVIF.V20339714)
  },
  {
    id: "p6",
    name: "14K Gold Plated Lab-Grown Diamond Flower Studs",
    price: 55,
    metals: ["gold", "rose"],
    slotKeys: ["lobe", "secondLobe", "flat"],
    color: "#e2c98f",
    imageUrls: chain(AVIF.V20600295, AVIF.V20600298, AVIF.V20601390)
  },
  {
    id: "p7",
    name: "Sterling Silver CZ Princess-Cut Huggie Hoops",
    price: 28,
    metals: ["silver"],
    slotKeys: ["lobe", "secondLobe", "helix"],
    color: "#c4c9cf",
    imageUrls: chain(AVIF.V20589595, AVIF.V20596175, AVIF.V20600295)
  },
  {
    id: "p8",
    name: "10K Gold Bonded Textured Hexagon Hoops",
    price: 42,
    metals: ["gold"],
    slotKeys: ["helix", "flat", "tragus"],
    color: "#d0b86e",
    imageUrls: chain(AVIF.V20611436, AVIF.V20611403, AVIF.V19991087)
  }
];

export const upsellProducts: Product[] = [
  {
    id: "u1",
    name: "10K Gold Bonded Twist Hoops",
    price: 36,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d9c89b",
    imageUrls: chain(AVIF.V15434731, AVIF.V17280041, AVIF.V20600298)
  },
  {
    id: "u2",
    name: "10K Gold Bonded XO Tri-Tone Hoops",
    price: 44,
    metals: ["gold", "silver", "rose"],
    slotKeys: ["lobe"],
    color: "#c9b78a",
    imageUrls: chain(AVIF.V20015152, AVIF.V20589595, AVIF.V20601390)
  },
  {
    id: "u3",
    name: "10K Gold Bonded 22mm Flat Hoops",
    price: 32,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d2bd8d",
    imageUrls: chain(AVIF.V20339714, AVIF.V20611436, AVIF.V15422926)
  },
  {
    id: "u4",
    name: "Sterling Silver CZ Bezel Studs",
    price: 22,
    metals: ["silver"],
    slotKeys: ["lobe"],
    color: "#bcc1c8",
    imageUrls: chain(AVIF.V20600295, AVIF.V15429467, AVIF.V20611403)
  }
];

export const slotOrder: SlotKey[] = ["lobe", "secondLobe", "helix", "flat", "tragus"];

export const slotLabels: Record<SlotKey, string> = {
  lobe: "Lobe",
  secondLobe: "2nd Lobe",
  helix: "Helix",
  flat: "Flat",
  tragus: "Tragus"
};

export const modelCanvases: ModelCanvas[] = [
  {
    id: "model-a",
    name: "Model A",
    imageUrls: chain(EAR.EarA, AVIF.V20611403, AVIF.V20611436)
  },
  {
    id: "model-b",
    name: "Model B",
    imageUrls: chain(EAR.EarB, AVIF.V20596175, AVIF.V20600298)
  },
  {
    id: "model-c",
    name: "Model C",
    imageUrls: chain(EAR.EarC, AVIF.V15429467, AVIF.V20339714)
  },
  {
    id: "model-d",
    name: "Model D",
    imageUrls: chain(EAR.EarD, AVIF.V20611436, AVIF.V19991087)
  },
  {
    id: "model-e",
    name: "Model E",
    imageUrls: chain(EAR.EarE, AVIF.V20015152, AVIF.V15434731)
  },
  {
    id: "model-f",
    name: "Model F",
    imageUrls: chain(EAR.EarF, AVIF.V17280041, AVIF.V20600295)
  }
];

export const newArrivals: Product[] = [
  {
    id: "na1",
    name: "10K Gold Bonded Croissant Hoops",
    price: 40,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d6c08b",
    imageUrls: chain(AVIF.V20611403, AVIF.V20600295)
  },
  {
    id: "na2",
    name: "10K Gold Bonded Textured Hexagon Hoops",
    price: 38,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d0b86e",
    imageUrls: chain(AVIF.V20611436, AVIF.V20601390)
  },
  {
    id: "na3",
    name: "Sterling Silver CZ Halo Heart Studs",
    price: 30,
    metals: ["silver"],
    slotKeys: ["lobe"],
    color: "#c9c5b9",
    imageUrls: chain(AVIF.V15429467, AVIF.V20589595)
  },
  {
    id: "na4",
    name: "10K Gold Bonded 13mm Bamboo Hoops",
    price: 34,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d4c18a",
    imageUrls: chain(AVIF.V19991087, AVIF.V20600298)
  },
  {
    id: "na5",
    name: "10K Gold Bonded Crescent Hoops",
    price: 38,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d8b577",
    imageUrls: chain(AVIF.V20596175, AVIF.V15422926)
  },
  {
    id: "na6",
    name: "10K Gold Bonded Diamond-Cut Two-Tone Hoops",
    price: 42,
    metals: ["gold", "silver"],
    slotKeys: ["lobe"],
    color: "#c9b78a",
    imageUrls: chain(AVIF.V20339714, AVIF.V20611403)
  },
  {
    id: "na7",
    name: "14K Gold Plated Diamond Cushion Halo Studs",
    price: 55,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d4bf82",
    imageUrls: chain(AVIF.V15434731, AVIF.V20611436)
  },
  {
    id: "na8",
    name: "10K Gold Bonded Tapered Sculpted Hoops",
    price: 35,
    metals: ["gold"],
    slotKeys: ["lobe"],
    color: "#d8c48a",
    imageUrls: chain(AVIF.V17280041, AVIF.V20015152)
  }
];
