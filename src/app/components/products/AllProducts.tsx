
"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../lib/api";
import type { Product } from "../../types/product";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const productList = await getProducts();

        if (!isMounted) return;

        if (!Array.isArray(productList) || productList.length === 0) {
          throw new Error(
            "API থেকে কোনো পণ্য পাওয়া যায়নি। API response যাচাই করো।"
          );
        }

        setProducts(productList);
      } catch (err) {
        if (!isMounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।"
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="all-products"
      className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          সব পণ্য
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl border border-gray-100 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="size-16 rounded-2xl bg-gray-200 sm:size-[72px]" />
                <div className="h-7 w-16 rounded-full bg-gray-200" />
              </div>

              <div className="mt-5 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />

              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="h-4 w-1/3 rounded bg-gray-100" />
                <div className="mt-3 h-7 w-2/3 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-3/4 rounded bg-gray-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-700"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      )}

      {/* Product Cards */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
          বর্তমানে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
}
