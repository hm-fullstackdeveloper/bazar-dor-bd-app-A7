
import type { Product, Category } from "../types/product";

// API BASE URL
export const API_BASE_URL_MAIN =
  "https://api.api-store.workers.dev/api/bazardor";

const API_BASE_URL_FALLBACK =
  "https://api.abcz.workers.dev/api/bazardor";

export const API_BASE_URL_MAIN_CATEGORIES =
  `${API_BASE_URL_MAIN}/categories`;

export const API_BASE_URL_MAIN_PRODUCTS =
  `${API_BASE_URL_MAIN}/products`;

const RETRY_DELAYS = [500, 1000];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// FALLBACK URL তৈরি
function getFallbackUrl(url: string): string | null {
  if (url.startsWith(API_BASE_URL_MAIN)) {
    return url.replace(
      API_BASE_URL_MAIN,
      API_BASE_URL_FALLBACK
    );
  }

  return null;
}

// REUSABLE API FETCH FUNCTION
export async function fetchApi<T>(url: string): Promise<T> {
  const fallbackUrl = getFallbackUrl(url);
  const urls = fallbackUrl ? [url, fallbackUrl] : [url];

  let lastError: unknown;

  for (const currentUrl of urls) {
    for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
      try {
        const response = await fetch(currentUrl, {
          cache: "no-store",
        });

        if (
          (response.status === 429 || response.status >= 500) &&
          attempt < RETRY_DELAYS.length
        ) {
          await sleep(RETRY_DELAYS[attempt]);
          continue;
        }

        if (!response.ok) {
          throw new Error(
            `API request failed: ${response.status} (${currentUrl})`
          );
        }

        return (await response.json()) as T;
      } catch (error) {
        lastError = error;

        // HTTP error হলে একই URL বারবার চেষ্টা না করে পরের URL দেখব।
        if (
          error instanceof Error &&
          error.message.startsWith("API request failed:")
        ) {
          break;
        }

        if (attempt < RETRY_DELAYS.length) {
          await sleep(RETRY_DELAYS[attempt]);
        }
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("API request failed. Please try again.");
}

// RESPONSE থেকে ARRAY বের করা
function extractArray(result: unknown): unknown[] {
  if (Array.isArray(result)) {
    return result;
  }

  if (!result || typeof result !== "object") {
    return [];
  }

  const response = result as Record<string, unknown>;

  // { products: [...] } অথবা { categories: [...] }
  if (Array.isArray(response.products)) {
    return response.products;
  }

  if (Array.isArray(response.categories)) {
    return response.categories;
  }

  // { data: [...] } অথবা nested data
  if (response.data !== undefined) {
    return extractArray(response.data);
  }

  return [];
}

// GET ALL PRODUCTS
export async function getProducts(): Promise<Product[]> {
  const result = await fetchApi<unknown>(
    API_BASE_URL_MAIN_PRODUCTS
  );

  return extractArray(result) as Product[];
}

// GET ALL CATEGORIES
export async function getCategories(): Promise<Category[]> {
  const result = await fetchApi<unknown>(
    API_BASE_URL_MAIN_CATEGORIES
  );

  return extractArray(result) as Category[];
}

// GET PRODUCTS BY CATEGORY
export async function getProductsByCategory(
  category = "chal"
): Promise<Product[]> {
  const url =
    `${API_BASE_URL_MAIN_PRODUCTS}?category=${encodeURIComponent(category)}`;

  const result = await fetchApi<unknown>(url);

  return extractArray(result) as Product[];
}

// GET PRODUCT BY ID
export async function getProductById(
  id: number | string
): Promise<Product> {
  const url =
    `${API_BASE_URL_MAIN_PRODUCTS}/${encodeURIComponent(String(id))}`;

  const result = await fetchApi<unknown>(url);

  if (result && typeof result === "object") {
    const response = result as Record<string, unknown>;
    const data = response.data;

    if (data && typeof data === "object" && !Array.isArray(data)) {
      const nested = data as Record<string, unknown>;

      if (
        nested.product &&
        typeof nested.product === "object"
      ) {
        return nested.product as Product;
      }

      return data as Product;
    }
  }

  return result as Product;
}
