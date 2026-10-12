
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getProducts } from "../../lib/api";
import type { Product } from "../../types/product";

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

function formatUnit(unit: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    litre: "লিটার",
    piece: "পিস",
    pieces: "পিস",
    dozen: "ডজন",
    gram: "গ্রাম",
  };

  return units[unit.toLowerCase()] ?? unit;
}

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadProducts() {
      try {
        setLoading(true);
        setError(false);

        const data = await getProducts();

        if (!cancelled) {
          setProducts(data);
        }
      } catch (err) {
        console.error("Price ticker API error:", err);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="border-t border-border-custom bg-brand-light px-4 py-2 text-sm text-text-secondary">
        বাজারদর লোড হচ্ছে...
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="border-t border-border-custom bg-brand-light px-4 py-2 text-sm text-text-secondary">
        বাজারদর লোড করা যায়নি।
      </div>
    );
  }

  return (
    <div className="overflow-hidden border-t border-border-custom bg-brand-light py-2">
      <div className="price-ticker flex w-max">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {products.map((product) => {
              const direction = product.change?.dir ?? "flat";
              const percentage = product.change?.pct ?? 0;

              return (
                <Link
                  key={`${copy}-${product.slug}`}
                  href={`/product/${product.slug}`}
                  className="mx-5 shrink-0 whitespace-nowrap text-sm text-text-primary transition-opacity hover:opacity-70"
                  tabIndex={copy === 1 ? -1 : undefined}
                >
                  <span aria-hidden="true">
                    {product.categoryIcon || "🛒"}
                  </span>{" "}

                  <span>{product.nameBn}</span>{" "}

                  <strong>
                    {formatPrice(product.today)} টাকা/
                    {formatUnit(product.unit)}
                  </strong>{" "}

                  <span
                    className={
                      direction === "up"
                        ? "font-bold text-price-up"
                        : direction === "down"
                          ? "font-bold text-price-down"
                          : "text-price-flat"
                    }
                  >
                    {direction === "up"
                      ? "▲ "
                      : direction === "down"
                        ? "▼ "
                        : "— "}

                    {formatPrice(Math.abs(percentage))}%
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
