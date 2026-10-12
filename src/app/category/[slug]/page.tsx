
import { getCategories, getProductsByCategory } from "../../lib/api";
import type { Product, Category } from "../../types/product";
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
    <main className="min-h-screen bg-[#f0f5f0]">
      <div className="mx-auto max-w-5xl px-3 py-5 sm:px-5 sm:py-7">

        {/* Category Header */}
        <section className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f3f6f2] text-2xl">
            {category.icon || "🛒"}
          </div>

          <div>
            <h1 className="text-lg font-bold text-gray-800">
              {category.nameBn}
            </h1>

            <p className="text-xs text-gray-500">
              {formatPrice(products.length)}টি পন্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Product Heading */}
        <section className="mt-3">
          <div className="mb-3 flex items-center justify-between rounded-xl border border-gray-100 bg-white px-4 py-3">
            <p className="text-xs text-gray-500">
              মোট {formatPrice(products.length)}টি পণ্য দেখানো হচ্ছে
            </p>

            <span className="rounded-md bg-[#f2f6f2] px-3 py-1 text-xs font-medium text-gray-600">
              আজকের বাজারদর
            </span>
          </div>

          {/* Product Cards */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="group rounded-xl border border-gray-100 bg-white p-3 transition hover:border-green-200 hover:shadow-sm"
                >
                  {/* Product Name */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f3f6f2] text-xl">
                      {product.categoryIcon || "🛒"}
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-bold text-gray-800">
                        {product.nameBn}
                      </h2>

                      <p className="text-[10px] text-gray-500">
                        {product.categoryNameBn || category.nameBn}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mt-3">
                    <p className="text-[10px] text-gray-500">
                      বর্তমান বাজারদর
                    </p>

                    <div className="mt-1 flex items-center justify-between gap-2">
                      <p className="text-base font-extrabold text-gray-800">
                        {formatPrice(product.today)}{" "}
                        <span className="text-xs font-medium">
                          টাকা
                        </span>
                        <span className="ml-1 text-[10px] font-normal text-gray-500">
                          /{product.unit}
                        </span>
                      </p>

                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
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
                  </div>

                  {/* Yesterday Price */}
                  <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-[10px] text-gray-500">
                      গতকালের দাম
                    </span>

                    <span className="text-xs font-semibold text-gray-700">
                      {formatPrice(product.yesterday)} টাকা
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-100 bg-white px-4 py-10 text-center">
              <p className="text-3xl">📦</p>

              <h3 className="mt-3 text-sm font-bold text-gray-800">
                এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                API-তে এই ক্যাটাগরির পণ্য আছে কি না, তা পরীক্ষা করতে হবে।
              </p>

              <Link
                href="/"
                className="mt-4 inline-block rounded-lg bg-green-700 px-4 py-2 text-xs font-semibold text-white hover:bg-green-800"
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
