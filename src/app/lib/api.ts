
import type { Product, Category } from "../types/product";

// API BASE URL

export const API_BASE_URL_MAIN =
  "https://openapi.programming-hero.com/api/bazardor";

export const API_BASE_URL_MAIN_CATEGORIES =
  `${API_BASE_URL_MAIN}/categories`;

export const API_BASE_URL_MAIN_PRODUCTS =
  `${API_BASE_URL_MAIN}/products`;

// REUSABLE API FETCH FUNCTION

const RETRY_DELAYS = [1000, 2000];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchApi<T>(url: string): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    // Retry only when rate-limited
    if (response.status === 429 && attempt < RETRY_DELAYS.length) {
      await sleep(RETRY_DELAYS[attempt]);
      continue;
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return (await response.json()) as T;
  }
}

// EXTRACT PRODUCTS FROM RESPONSE

function extractProducts(result: unknown): Product[] {
  if (Array.isArray(result)) {
    return result as Product[];
  }

  if (!result || typeof result !== "object") {
    return [];
  }

  const data = result as {
    products?: Product[];
    data?: Product[] | { products?: Product[] };
  };

  if (Array.isArray(data.products)) {
    return data.products;
  }

  if (Array.isArray(data.data)) {
    return data.data;
  }

  if (
    data.data &&
    typeof data.data === "object" &&
    Array.isArray(data.data.products)
  ) {
    return data.data.products;
  }

  return [];
}

// GET ALL PRODUCTS

export async function getProducts(): Promise<Product[]> {
  const result = await fetchApi<unknown>(
    API_BASE_URL_MAIN_PRODUCTS
  );

  return extractProducts(result);
}

// GET ALL CATEGORIES

export async function getCategories(): Promise<Category[]> {
  const result = await fetchApi<unknown>(
    API_BASE_URL_MAIN_CATEGORIES
  );

  if (Array.isArray(result)) {
    return result as Category[];
  }

  if (result && typeof result === "object" && "data" in result) {
    const data = (result as { data: unknown }).data;

    if (Array.isArray(data)) {
      return data as Category[];
    }
  }

  return [];
}

// GET PRODUCTS BY CATEGORY

export async function getProductsByCategory(
  category = "chal"
): Promise<Product[]> {
  const url =
    `${API_BASE_URL_MAIN_PRODUCTS}?category=${encodeURIComponent(category)}`;

  const result = await fetchApi<unknown>(url);

  return extractProducts(result);
}

// GET PRODUCT BY ID

export async function getProductById(
  id: number | string
): Promise<Product> {
  const result = await fetchApi<unknown>(
    `${API_BASE_URL_MAIN_PRODUCTS}/${encodeURIComponent(String(id))}`
  );

  if (
    result &&
    typeof result === "object" &&
    "data" in result
  ) {
    return (result as { data: Product }).data;
  }

  return result as Product;
}
