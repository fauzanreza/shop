import { PRODUCTS } from "@/data/products";
import type { Product } from "@/types";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/** Simulated product API. Swap the body for a real `fetch` later. */
export async function fetchProducts(): Promise<Product[]> {
  await delay(1000);
  return PRODUCTS;
}

/** Simulated checkout API. */
export async function submitCheckout(): Promise<void> {
  await delay(1500);
}
