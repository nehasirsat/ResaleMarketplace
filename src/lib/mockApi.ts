export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  image: string;
  price: number;
  brand: string;
}

export interface OrderDetails {
  orderId: string;
  salePrice: number;
  platformFee: number;
  netProceeds: number;
  giftCardCode: string;
  giftCardAmount: number;
  buyerName: string;
  saleDate: string;
}

export const mockProducts: Product[] = [
  {
    id: "eon-001",
    name: "Luminary Chronograph X1",
    sku: "LCX1-2024-BLK",
    description:
      "A precision-crafted timepiece featuring a Swiss-made movement, sapphire crystal glass, and 300m water resistance. Limited edition release with EON digital authenticity certification.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    price: 2450,
    brand: "LUMINARY",
  },
  {
    id: "eon-002",
    name: "Stellar Diver Pro",
    sku: "SDP-2024-BLU",
    description:
      "Professional diving watch with 500m water resistance, helium escape valve, and luminous markers. Certified by EON for authenticity and provenance tracking.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    price: 3200,
    brand: "LUMINARY",
  },
  {
    id: "eon-003",
    name: "Heritage Automatic",
    sku: "HA-2024-GLD",
    description:
      "Classic automatic movement with exhibition caseback, 18k gold case, and alligator leather strap. Each piece includes EON digital certificate of authenticity.",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80",
    price: 4800,
    brand: "LUMINARY",
  },
  {
    id: "eon-004",
    name: "Aviator GMT",
    sku: "AGM-2024-SLV",
    description:
      "Dual timezone pilot watch with GMT complication, anti-reflective sapphire crystal, and 200m water resistance. EON certified limited edition.",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    price: 2850,
    brand: "LUMINARY",
  },
  {
    id: "eon-005",
    name: "Moonphase Elite",
    sku: "MPE-2024-WHT",
    description:
      "Sophisticated moonphase complication with date display, mother-of-pearl dial, and diamond hour markers. Authenticated via EON blockchain technology.",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80",
    price: 5500,
    brand: "LUMINARY",
  },
  {
    id: "eon-006",
    name: "Sport Titanium",
    sku: "STI-2024-GRY",
    description:
      "Lightweight titanium case with ceramic bezel, chronograph function, and scratch-resistant coating. EON digital twin included for resale verification.",
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80",
    price: 3600,
    brand: "LUMINARY",
  },
];

export const mockProduct: Product = mockProducts[0];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function initiateResale(productId: string): Promise<string> {
  await delay(800);
  return `corr_${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export async function submitListing(
  corrId: string,
  price: number
): Promise<{ listingId: string }> {
  await delay(600);
  return { listingId: `LST-${Math.random().toString(36).substr(2, 6).toUpperCase()}` };
}

export async function processSale(listingId: string): Promise<OrderDetails> {
  await delay(800);
  const salePrice = mockProduct.price * 0.85;
  const platformFee = salePrice * 0.1;
  const netProceeds = salePrice - platformFee;
  return {
    orderId: `ORD-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
    salePrice,
    platformFee,
    netProceeds,
    giftCardCode: "",
    giftCardAmount: netProceeds,
    buyerName: "Anonymous Buyer",
    saleDate: new Date().toISOString(),
  };
}

export async function issueGiftCard(
  orderId: string,
  amount: number
): Promise<{ code: string; pin: string; expiryDate: string }> {
  await delay(700);
  // Randomly fail ~10% of the time to demo retry
  if (Math.random() < 0.1) {
    throw new Error("Gift card issuance failed. Please retry.");
  }
  return {
    code: `GC-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`,
    pin: Math.floor(1000 + Math.random() * 9000).toString(),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),
  };
}
