
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { getProducts } from "../../lib/api";
import type { Product } from "../../types/product";

// ==================== HELPERS ====================

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD");

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
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  const changeColor = isUp
    ? "bg-red-50 text-red-700"
    : isDown
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-green-50 text-3xl sm:size-14">
          {isImageUrl(product.image) ? (
            <Image
              src={product.image}
              alt={product.nameBn}
              width={56}
              height={56}
              sizes="56px"
              className="size-full object-contain"
            />
          ) : (
            <span aria-hidden="true">
              {product.image || product.categoryIcon || "🛒"}
            </span>
          )}
        </div>

        <span
          className={`rounded-full px-2 py-1 text-xs font-bold ${changeColor}`}
          aria-label={`দামের পরিবর্তন ${formatPrice(
            Math.abs(product.change.pct)
          )} শতাংশ`}
        >
          {isUp ? "▲" : isDown ? "▼" : "—"}{" "}
          {formatPrice(Math.abs(product.change.pct))}%
        </span>
      </div>

      <h3 className="mt-4 font-bold text-gray-900 transition group-hover:text-green-700">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {getUnitName(product.unit)}
      </p>

      <div className="mt-auto border-t border-gray-100 pt-3">
        <p className="text-xs text-gray-500">আজকের দাম</p>

        <p className="mt-1 text-xl font-extrabold text-gray-900">
          {formatPrice(product.today)}{" "}
          <span className="text-sm font-medium">টাকা</span>
        </p>

        <p className="mt-2 text-xs text-gray-500">
          গতকাল: {formatPrice(product.yesterday)} টাকা
        </p>
      </div>
    </Link>
  );
}

// ==================== PRODUCT SKELETON ====================

function ProductSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="animate-pulse rounded-2xl border border-gray-100 bg-white p-3 sm:p-4"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="size-12 rounded-xl bg-gray-200 sm:size-14" />
        <div className="h-6 w-14 rounded-full bg-gray-200" />
      </div>

      <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mt-3 h-3 w-1/3 rounded bg-gray-100" />

      <div className="mt-6 border-t border-gray-100 pt-3">
        <div className="h-3 w-1/3 rounded bg-gray-100" />
        <div className="mt-2 h-6 w-1/2 rounded bg-gray-200" />
        <div className="mt-3 h-3 w-2/3 rounded bg-gray-100" />
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
      setLoading(true);
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

  const run = async () => {
    await loadProducts(controller.signal);
  };

  run();

  return () => {
    controller.abort();
  };
}, [loadProducts]);

  const risingProducts = products
    .filter(
      (product) =>
        product.change?.dir === "up" &&
        product.change.pct > 0
    )
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallingProducts = products
    .filter(
      (product) =>
        product.change?.dir === "down" &&
        product.change.pct !== 0
    )
    .sort(
      (a, b) =>
        Math.abs(b.change.pct) - Math.abs(a.change.pct)
    )
    .slice(0, 6);

  const renderSection = (
    title: string,
    subtitle: string,
    items: Product[],
    type: "up" | "down"
  ) => (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {subtitle}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-gray-50 p-6 text-center text-sm text-gray-500">
          {type === "up"
            ? "এখন কোনো দাম বাড়ার তথ্য নেই।"
            : "এখন কোনো দাম কমার তথ্য নেই।"}
        </div>
      )}
    </section>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {error ? (
        <div
          role="alert"
          className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center"
        >
          <p className="font-semibold text-red-700">{error}</p>

          <button
            type="button"
            onClick={() => void loadProducts()}
            className="mt-4 rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white transition hover:bg-green-800"
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
