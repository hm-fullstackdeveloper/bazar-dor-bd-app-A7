
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
};

const formatPrice = (price: number) =>
  price.toLocaleString("bn-BD");

const unitName: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

function ProductCard({ product }: { product: Product }) {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
          {product.image || "🛒"}
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold ${
            isUp
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isUp ? "▲" : "▼"}{" "}
          {formatPrice(Math.abs(product.change.pct))}%
        </span>
      </div>

      <h3 className="mt-4 font-bold text-gray-900 group-hover:text-green-700">
        {product.nameBn}
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        প্রতি {unitName[product.unit] ?? product.unit}
      </p>

      <div className="mt-4 border-t border-gray-100 pt-3">
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

function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4">
      <div className="size-14 rounded-xl bg-gray-200" />
      <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
      <div className="mt-3 h-3 w-1/3 rounded bg-gray-100" />
      <div className="mt-6 h-7 w-1/2 rounded bg-gray-200" />
    </div>
  );
}

export default function ProductSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
        }

        const result = await response.json();

        const data: Product[] = Array.isArray(result)
          ? result
          : result.products ?? result.data ?? [];

        setProducts(data);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }

        setError("পণ্যের তথ্য পাওয়া যায়নি। আবার চেষ্টা করো।");
        console.error("Product API error:", err);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

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
        product.change.pct < 0
    )
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (error) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-12">
        <p role="alert" className="text-red-600">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded-lg bg-green-700 px-4 py-2 text-white"
        >
          আবার চেষ্টা করো
        </button>
      </section>
    );
  }

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
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
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
    </div>
  );
}
