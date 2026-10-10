
import Link from "next/link";
import type { Product } from "./products.types";

type ProductCardProps = {
  product: Product;
};

const formatPrice = (price: number) =>
  `${price.toLocaleString("bn-BD")} টাকা`;

export default function ProductCard({ product }: ProductCardProps) {
  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const badgeStyle =
    direction === "up"
      ? "bg-green-50 text-green-700"
      : direction === "down"
        ? "bg-red-50 text-red-600"
        : "bg-gray-100 text-gray-500";

  const badgeText =
    direction === "up"
      ? `▲ ${percentage.toLocaleString("bn-BD")}%`
      : direction === "down"
        ? `▼ ${percentage.toLocaleString("bn-BD")}%`
        : `— ${percentage.toLocaleString("bn-BD")}%`;

  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`${product.nameBn} বিস্তারিত দেখুন`}
      className="block h-full rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-2xl">
          {product.image || product.categoryIcon || "🛒"}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 sm:text-base">
            {product.nameBn}
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            {product.unit}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="mt-1 text-sm font-bold text-gray-900 sm:text-base">
            {formatPrice(product.today)}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold sm:text-xs ${badgeStyle}`}
        >
          {badgeText}
        </span>
      </div>
    </Link>
  );
}
