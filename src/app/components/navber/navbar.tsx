
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import AuthSection from "./AuthSection";
import PriceTicker from "./priceTicker";

import {
  API_BASE_URL_MAIN_CATEGORIES,
  fetchApi,
} from "../../lib/api";

import type { Category } from "../../types/product";

function extractCategories(result: unknown): Category[] {
  // API সরাসরি array দিলে
  let data: unknown = result;

  if (Array.isArray(data)) {
    // data আগেই array
  } else if (data && typeof data === "object") {
    const response = data as Record<string, unknown>;

    data = response.categories ?? response.data ?? [];

    // { data: { categories: [...] } } হলে
    if (data && typeof data === "object" && !Array.isArray(data)) {
      const nested = data as Record<string, unknown>;
      data = nested.categories ?? nested.data ?? [];
    }
  } else {
    return [];
  }

  if (!Array.isArray(data)) {
    console.log("Unexpected category response structure:", result);
    return [];
  }

  console.log("Raw category items:", data);

  return data.filter((item): item is Category => {
    if (!item || typeof item !== "object") return false;

    const category = item as Record<string, unknown>;

    return (
      (typeof category.id === "string" ||
        typeof category.id === "number") &&
      typeof category.slug === "string" &&
      typeof category.nameBn === "string"
    );
  });
}

export default function Navbar() {
  const pathname = usePathname();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryError, setCategoryError] = useState(false);
 
function getBangladeshDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    timeZone: "Asia/Dhaka",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
const result = await fetchApi<unknown>(
  API_BASE_URL_MAIN_CATEGORIES
);

// API থেকে আসা সম্পূর্ণ ডেটা
console.log("1. Category API URL:", API_BASE_URL_MAIN_CATEGORIES);
console.log("2. Full API Response:", result);

// Extract করা Category data
const data = extractCategories(result);

console.log("3. Extracted Categories:", data);
console.log("4. Total Categories:", data.length);

// প্রতিটি Category-এর বিস্তারিত
console.table(data);


        if (!cancelled) {
          setCategories(data);
          setCategoryError(data.length === 0);
        }
      } catch (error) {
        console.error("Category loading error:", error);

        if (!cancelled) {
          setCategories([]);
          setCategoryError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCategories();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border-custom bg-surface shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        {/* Logo, date and authentication */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link
            href="/"
            aria-label="বাজার দর হোম পেজ"
            className="flex min-w-0 items-center gap-2"
          >
            <span className="text-3xl" aria-hidden="true">
              🛒
            </span>

            <span>
              <span className="block text-xl font-extrabold text-brand">
                বাজার দর
              </span>

              <span className="block text-xs text-text-secondary">
                {getBangladeshDate()}
              </span>
            </span>
          </Link>

          <AuthSection />
        </div>

        {/* Category navigation */}
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="flex gap-2 overflow-x-auto pb-3"
        >
          {loading ? (
            <span className="px-3 py-2 text-sm text-text-secondary">
              ক্যাটাগরি লোড হচ্ছে...
            </span>
          ) : categoryError ? (
            <span className="px-3 py-2 text-sm text-text-secondary">
              ক্যাটাগরি লোড করা যায়নি।
            </span>
          ) : (
            categories.map((category) => {
              const href = `/category/${category.slug}`;
              const active = pathname === href;

              return (
                <Link
                  key={category.id}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "bg-brand text-white"
                      : "bg-brand-light text-text-primary hover:bg-brand-soft"
                  }`}
                >
                  {category.icon && (
                    <span className="mr-1" aria-hidden="true">
                      {category.icon}
                    </span>
                  )}

                  {category.nameBn}
                </Link>
              );
            })
          )}
        </nav>
      </div>

      {/* Live market price ticker */}
      <PriceTicker />
    </header>
  );
}
