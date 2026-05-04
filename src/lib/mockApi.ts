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

export const mockProduct: Product = {
  id: "eon-001",
  name: "Luminary Chronograph X1",
  sku: "LCX1-2024-BLK",
  description:
    "A precision-crafted timepiece featuring a Swiss-made movement, sapphire crystal glass, and 300m water resistance. Limited edition release with EON digital authenticity certification.",
  image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
  price: 2450,
  brand: "LUMINARY",
};

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
