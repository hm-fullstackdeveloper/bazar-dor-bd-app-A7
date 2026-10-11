import { getCategories, getProductsByCategory } from "../../lib/api";
import type { Product,  Category } from "../../types/product";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(price: number) {
  return price.toLocaleString("bn-BD");
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;


let categories: Category[] = [];
let products: Product[] = [];
  try {
    categories = await getCategories();
    products = await getProductsByCategory(slug);
  } catch (error) {
    console.error("Category page loading error:", error);
  }

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f5f8f5]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Category Banner */}
        <section className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-4xl">
              {category.icon || "🛒"}
            </div>

            <div>
              <p className="mb-1 text-sm text-gray-500">
                বাজার দর / ক্যাটাগরি
              </p>

              <h1 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {category.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                {category.nameBn} বিভাগের বাজারদর ও পণ্যের সর্বশেষ তথ্য
              </p>
            </div>
          </div>
        </section>

        {/* Product Heading */}
        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {category.nameBn} এর পণ্যসমূহ
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                মোট {formatPrice(products.length)} টি পণ্য
              </p>
            </div>

            <span className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              আজকের বাজারদর
            </span>
          </div>

          {/* Product Cards */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-48 items-center justify-center bg-[#f7f9f6] p-4">
                    {product.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.image}
                        alt={product.nameBn}
                        className="h-full w-full object-contain transition group-hover:scale-105"
                      />
                    ) : (
                      <span className="text-6xl">
                        {product.categoryIcon || "🛒"}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-medium text-green-700">
                      {product.categoryNameBn || category.nameBn}
                    </p>

                    <h3 className="mt-2 text-lg font-bold text-gray-900">
                      {product.nameBn}
                    </h3>

                    <div className="mt-4 flex items-end justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-500">
                          বর্তমান দাম
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-green-700">
                          ৳{formatPrice(product.today)}
                          <span className="ml-1 text-sm font-normal text-gray-500">
                            /{product.unit}
                          </span>
                        </p>
                      </div>

                      <span
                        className={`rounded-lg px-3 py-2 text-sm font-bold ${
                          product.change.dir === "up"
                            ? "bg-red-50 text-red-600"
                            : product.change.dir === "down"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {product.change.dir === "up"
                          ? "▲"
                          : product.change.dir === "down"
                            ? "▼"
                            : "—"}{" "}
                        {formatPrice(product.change.pct)}%
                      </span>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
                      <span className="text-gray-500">
                        গতকালের দাম
                      </span>

                      <span className="font-semibold text-gray-700">
                        ৳{formatPrice(product.yesterday)}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-green-700">
                      বিস্তারিত দেখুন →
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white px-5 py-16 text-center">
              <p className="text-4xl">📦</p>

              <h3 className="mt-4 text-lg font-bold text-gray-800">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                API-তে এই ক্যাটাগরির পণ্য আছে কি না, তা পরীক্ষা করতে হবে।
              </p>

              <Link
                href="/"
                className="mt-5 inline-block rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white hover:bg-green-800"
              >
                হোম পেজে ফিরে যান
              </Link>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}