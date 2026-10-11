"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
// import { getProducts, type Product } from "../../lib/api";
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

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="all-products"
      className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
    >
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          সব পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম এক নজরে দেখুন।
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {/* Error Message */}
      {!loading && error && (
        <div
          role="alert"
          className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 font-semibold underline"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      )}

      {/* Product Cards */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && products.length === 0 && (
        <div className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
          বর্তমানে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </section>
  );
}
