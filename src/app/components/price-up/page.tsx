
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getProducts } from "../../lib/api";
import type { Product } from "../../types/product";

// ==================== HELPERS ====================

const formatPrice = (price: number) => price.toLocaleString("bn-BD");

const unitName: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  gram: "গ্রাম",
  g: "গ্রাম",
  ml: "মিলিলিটার",
  dozen: "ডজন",
  piece: "পিস",
  pieces: "পিস",
  pcs: "পিস",
};

function getUnitName(unit: string) {
  return unitName[unit.toLowerCase()] ?? unit;
}

function isImageUrl(image: string) {
  return /^https?:\/\//i.test(image);
}

// ==================== PRODUCT CARD ====================

function ProductCard({ product }: { product: Product }) {
  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const changeColor =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={`${product.nameBn} পণ্যের বিস্তারিত দেখুন`}
      className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg sm:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-50 text-4xl sm:size-[72px]">
          {isImageUrl(product.image || "") ? (
            <Image
              src={product.image}
              alt={product.nameBn}
              width={72}
              height={72}
              sizes="72px"
              className="size-full object-contain p-1"
            />
          ) : (
            <span aria-hidden="true">
              {product.image || product.categoryIcon || "🛒"}
            </span>
          )}
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-bold ${changeColor}`}
          aria-label={`দামের পরিবর্তন ${formatPrice(Math.abs(percentage))} শতাংশ`}
        >
          {direction === "up" ? "▲" : direction === "down" ? "▼" : "—"}{" "}
          {formatPrice(Math.abs(percentage))}%
        </span>
      </div>

      <div className="mt-4">
        <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-6 text-gray-900 transition-colors group-hover:text-green-700 sm:text-lg">
          {product.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          প্রতি {getUnitName(product.unit)}
        </p>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-4">
        <p className="text-sm text-gray-500">আজকের দাম</p>

        <p className="mt-1 text-2xl font-extrabold text-gray-900">
          {formatPrice(product.today)}{" "}
          <span className="text-sm font-semibold text-gray-600">
            টাকা
          </span>
        </p>

        <p className="mt-2 text-sm text-gray-500">
          গতকাল: {formatPrice(product.yesterday)} টাকা
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-3">
          <span className="text-sm font-medium text-green-700">
            বিস্তারিত দেখুন
          </span>

          <span
            aria-hidden="true"
            className="text-lg text-green-700 transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ==================== PRODUCT SKELETON ====================

function ProductSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 sm:p-5"
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

        <div className="mt-5 border-t border-gray-100 pt-3">
          <div className="h-4 w-1/2 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

// ==================== PRODUCT SECTIONS ====================

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async (signal?: AbortSignal) => {
    try {
      setError("");

      const data = await getProducts();

      if (signal?.aborted) return;

      setProducts(data);
    } catch (err) {
      if (signal?.aborted) return;

      console.error("Product API error:", err);
      setError("পণ্যের তথ্য লোড করা যায়নি। আবার চেষ্টা করো।");
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    void loadProducts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadProducts]);

  // ==================== FILTER PRODUCTS ====================

  const risingProducts = products
    .filter(
      (product) =>
        product.change?.dir === "up" && product.change.pct > 0
    )
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter(
      (product) =>
        product.change?.dir === "down" && product.change.pct !== 0
    )
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  // ==================== RENDER SECTION ====================

  const renderSection = (
    title: string,
    subtitle: string,
    items: Product[],
    type: "up" | "down"
  ) => (
    <section className="mb-12 sm:mb-14">
      <div className="mb-6">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          {subtitle}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-5 py-10 text-center text-sm text-gray-500">
          {type === "up"
            ? "এখন কোনো দাম বাড়ার তথ্য নেই।"
            : "এখন কোনো দাম কমার তথ্য নেই।"}
        </div>
      )}
    </section>
  );

  // ==================== MAIN UI ====================

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center"
        >
          <p className="font-semibold text-red-700">{error}</p>

          <button
            type="button"
            onClick={() => {
              setLoading(true);
              void loadProducts();
            }}
            className="mt-4 rounded-xl bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            আবার চেষ্টা করো
          </button>
        </div>
      ) : (
        <>
          {renderSection(
            "আজ দাম বেড়েছে ▲",
            "যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে",
            risingProducts,
            "up"
          )}

          {renderSection(
            "আজ দাম কমেছে ▼",
            "যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে",
            fallingProducts,
            "down"
          )}
        </>
      )}
    </div>
  );
}
