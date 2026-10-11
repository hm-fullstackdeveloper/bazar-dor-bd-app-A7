
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL_MAIN_PRODUCTS } from "../../lib/api";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

export default function PriceFallSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(API_BASE_URL_MAIN_PRODUCTS, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য পাওয়া যায়নি");
        }

        const result: unknown = await response.json();

        let allProducts: Product[] = [];

        if (Array.isArray(result)) {
          allProducts = result as Product[];
        } else if (result && typeof result === "object") {
          const data = result as {
            products?: Product[];
            data?: Product[] | { products?: Product[] };
          };

          if (Array.isArray(data.products)) {
            allProducts = data.products;
          } else if (Array.isArray(data.data)) {
            allProducts = data.data;
          } else if (
            data.data &&
            !Array.isArray(data.data) &&
            Array.isArray(data.data.products)
          ) {
            allProducts = data.data.products;
          }
        }

        if (controller.signal.aborted) return;

        const fallers = allProducts
          .filter(
            (product) =>
              product.change?.dir === "down" &&
              Number(product.change.pct) !== 0
          )
          .sort(
            (a, b) =>
              Math.abs(Number(b.change.pct)) -
              Math.abs(Number(a.change.pct))
          )
          .slice(0, 6);

        setProducts(fallers);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("Price fall error:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const formatPrice = (price: number) =>
    Number(price).toLocaleString("bn-BD");

  const isImageUrl = (image: string) =>
    /^https?:\/\//i.test(image);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      {/* Section heading */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-2xl">
          📉
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            আজ দাম কমেছে
            <span className="ml-2 text-red-600">▼</span>
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            যেসব পণ্যের দাম গতকালের তুলনায় কমেছে
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-2xl border border-gray-100 p-5"
            >
              <div className="mb-4 h-12 w-12 rounded-xl bg-gray-200" />
              <div className="mb-3 h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-6 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl bg-red-50 p-5 text-red-700">
          পণ্যের তথ্য লোড করা যায়নি।
          <button
            onClick={() => window.location.reload()}
            className="ml-2 font-bold underline"
          >
            আবার চেষ্টা করো
          </button>
        </div>
      )}

      {/* Product cards */}
      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-red-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-red-50 text-3xl">
                  {product.image && isImageUrl(product.image) ? (
                    <Image
                      src={product.image}
                      alt={product.nameBn}
                      width={56}
                      height={56}
                      sizes="56px"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    product.categoryIcon || "🛒"
                  )}
                </div>

                <span className="rounded-full bg-red-50 px-3 py-1.5 text-sm font-bold text-red-600">
                  ▼ {formatPrice(Math.abs(product.change.pct))}%
                </span>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600">
                  {product.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {product.categoryNameBn} · প্রতি{" "}
                  {product.unit === "kg"
                    ? "কেজি"
                    : product.unit === "liter"
                      ? "লিটার"
                      : product.unit === "dozen"
                        ? "ডজন"
                        : product.unit === "piece"
                          ? "পিস"
                          : product.unit}
                </p>
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-gray-100 pt-4">
                <div>
                  <p className="text-sm text-gray-500">আজকের দাম</p>

                  <p className="mt-1 text-2xl font-extrabold text-gray-900">
                    {formatPrice(product.today)}{" "}
                    <span className="text-sm font-medium">টাকা</span>
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">গতকাল</p>

                  <p className="mt-1 text-sm text-gray-500 line-through">
                    {formatPrice(product.yesterday)} টাকা
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm font-semibold text-red-600">
                গতকালের চেয়ে{" "}
                {formatPrice(
                  Math.abs(product.yesterday - product.today)
                )}{" "}
                টাকা কম
              </p>
            </Link>
          ))}
        </div>
      )}

      {/* No products */}
      {!loading && !error && products.length === 0 && (
        <p className="rounded-xl bg-gray-50 p-5 text-gray-600">
          বর্তমানে দাম কমেছে এমন কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </section>
  );
}
