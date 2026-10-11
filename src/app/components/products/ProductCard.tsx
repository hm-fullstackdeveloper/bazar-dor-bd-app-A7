
import Link from "next/link";
import Image from "next/image";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

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

export default function ProductCard({ product }: ProductCardProps) {
  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const badgeStyle =
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
          className={`shrink-0 rounded-full px-2.5 py-1.5 text-xs font-bold ${badgeStyle}`}
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
