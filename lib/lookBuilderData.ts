import {
  CuratedStack,
  EarModel,
  EarSlot,
  Product,
  QuizQuestion,
  SlotType
} from "@/types/lookBuilder";

export const earrings: Product[] = [
  {
    id: "ear-1",
    name: "Diamond Octagon Studs",
    price: 175,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "stud",
    slotTypes: ["lobe", "upper-lobe", "tragus"],
    productUrl:
      "https://www.banter.com/16-ct-tw-diamond-concave-octagon-stud-earrings-sterling-silver/p/V-20340071"
  },
  {
    id: "ear-2",
    name: "Textured Gold Hoop",
    price: 120,
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "hoop",
    slotTypes: ["lobe", "upper-lobe", "conch"],
    productUrl:
      "https://www.banter.com/earrings/hoop-earrings/c/2126982?icid=EAR_LP:LOWER_CAT:STYLE:HOOP"
  },
  {
    id: "ear-3",
    name: "Silver Heart Drop",
    price: 60,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "drop",
    slotTypes: ["lobe"],
    productUrl:
      "https://www.banter.com/sterling-silver-115-ct-tw-diamond-stick-heart-drop-earrings/p/V-20351074"
  },
  {
    id: "ear-4",
    name: "Diamond Huggie Hoop",
    price: 200,
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "huggie",
    slotTypes: ["upper-lobe", "helix", "conch"],
    productUrl:
      "https://www.banter.com/16-ct-tw-diamond-three-row-huggie-hoop-earrings-sterling-silver/p/V-20558392"
  },
  {
    id: "ear-5",
    name: "Flat Back CZ Spark",
    price: 45,
    image: "https://images.unsplash.com/photo-1631982637373-4f5f7730f9d5?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "flat-back",
    slotTypes: ["helix", "tragus", "conch"],
    productUrl:
      "https://www.banter.com/body-jewelry/cartilage-earrings/c/30000001?icid=EAR_LP:LOWER_CAT:PIERCING:CARTILAGE"
  },
  {
    id: "ear-6",
    name: "Double Halo Stud",
    price: 135,
    image: "https://images.unsplash.com/photo-1588444650733-d53d9cc4df3d?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "stud",
    slotTypes: ["lobe", "upper-lobe"],
    productUrl:
      "https://www.banter.com/16-ct-tw-diamond-double-halo-stud-earrings-sterling-silver-14k-gold-plate/p/V-20565076"
  }
];

export const crossSellProducts: Product[] = [
  {
    id: "neck-1",
    name: "Gold Layered Chain Necklace",
    price: 89,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    category: "necklaces",
    productUrl: "https://www.banter.com/necklaces"
  },
  {
    id: "brace-1",
    name: "Bolo Charm Bracelet",
    price: 65,
    image: "https://images.unsplash.com/photo-1600721391689-2564bb8055de?auto=format&fit=crop&w=1200&q=80",
    category: "bracelets",
    productUrl: "https://www.banter.com/bracelets"
  },
  {
    id: "ring-1",
    name: "Minimalist Stacking Ring Set",
    price: 70,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=80",
    category: "rings",
    productUrl: "https://www.banter.com/rings"
  },
  {
    id: "body-1",
    name: "Cartilage Clicker",
    price: 40,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    category: "body-jewelry",
    productUrl: "https://www.banter.com/body-jewelry"
  }
];

export const finalUpsells: Product[] = [
  crossSellProducts[0],
  crossSellProducts[1],
  {
    id: "ear-7",
    name: "Two-Tone Twist Hoops",
    price: 95,
    image: "https://images.unsplash.com/photo-1673126708882-82645b6f3807?auto=format&fit=crop&w=1200&q=80",
    category: "earrings",
    earringStyle: "hoop",
    slotTypes: ["lobe", "upper-lobe"],
    productUrl: "https://www.banter.com/earrings-landing?icid=MEGA:EAR"
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: "vibe",
    title: "What vibe are you going for?",
    options: [
      { id: "minimal", label: "Clean & minimal", tags: ["stud", "flat-back"] },
      { id: "statement", label: "Bold statement", tags: ["hoop", "drop"] },
      { id: "luxury", label: "Quiet luxury", tags: ["stud", "huggie"] }
    ]
  },
  {
    id: "stack-level",
    title: "How stacked do you want it?",
    options: [
      { id: "light", label: "2-3 pieces", tags: ["stud", "hoop"] },
      { id: "medium", label: "3-4 pieces", tags: ["huggie", "flat-back"] },
      { id: "full", label: "Full stack", tags: ["huggie", "stud", "flat-back"] }
    ]
  },
  {
    id: "metal",
    title: "Choose your metal mood",
    options: [
      { id: "gold", label: "Gold tones", tags: ["hoop", "huggie"] },
      { id: "silver", label: "Silver tones", tags: ["stud", "flat-back"] },
      { id: "mixed", label: "Mixed metal", tags: ["drop", "hoop"] }
    ]
  }
];

export const earModels: EarModel[] = [
  {
    id: "model-1",
    name: "Model A",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "model-2",
    name: "Model B",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "model-3",
    name: "Model C",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "model-4",
    name: "Model D",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80"
  }
];

export const earSlots: EarSlot[] = [
  { id: "helix", label: "Helix", x: 58, y: 13 },
  { id: "conch", label: "Conch", x: 56, y: 38 },
  { id: "tragus", label: "Tragus", x: 52, y: 52 },
  { id: "upper-lobe", label: "Upper Lobe", x: 61, y: 66 },
  { id: "lobe", label: "Lobe", x: 67, y: 82 }
];

export const curatedStacks: CuratedStack[] = [
  {
    id: "stack-1",
    name: "Quiet Luxe",
    description: "Polished sparkle with clean balance.",
    slotAssignments: {
      lobe: "ear-1",
      "upper-lobe": "ear-6",
      helix: "ear-5",
      conch: "ear-4",
      tragus: "ear-5"
    }
  },
  {
    id: "stack-2",
    name: "Mixed Metal Energy",
    description: "Texture-forward hoops plus statement accents.",
    slotAssignments: {
      lobe: "ear-2",
      "upper-lobe": "ear-4",
      helix: "ear-5",
      conch: "ear-2",
      tragus: "ear-1"
    }
  },
  {
    id: "stack-3",
    name: "Soft Glam",
    description: "Romantic shapes and subtle shine.",
    slotAssignments: {
      lobe: "ear-3",
      "upper-lobe": "ear-1",
      helix: "ear-5",
      conch: "ear-4",
      tragus: "ear-6"
    }
  }
];

export const baseSlotState: Record<SlotType, string | null> = {
  lobe: null,
  "upper-lobe": null,
  helix: null,
  conch: null,
  tragus: null
};
