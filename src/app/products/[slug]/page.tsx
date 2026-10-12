
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducts } from "../../lib/api";
import Image from "next/image";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "তথ্য পাওয়া যায়নি";
  }

  const price =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : NaN;

  if (!Number.isFinite(price)) {
    return "তথ্য পাওয়া যায়নি";
  }

  return `${price.toLocaleString("bn-BD")} টাকা`;
}

function isImageUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^https?:\/\//i.test(value)
  );
}

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).trim();

  let products;

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Product Details API error:", error);

    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <section className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-gray-900">
            পণ্যের তথ্য লোড করা যাচ্ছে না
          </h1>
          <p className="mt-3 text-gray-600">
            ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
          </p>
          <Link
            href="/"
            className="mt-5 inline-block rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
          >
            হোম পেজে ফিরে যান
          </Link>
        </section>
      </main>
    );
  }

  const product = products.find(
    (item) => item.slug?.trim() === normalizedSlug
  );

  if (!product) {
    notFound();
  }

  const direction = product.change?.dir ?? "flat";
  const percentage = Number(product.change?.pct ?? 0);

  const safePercentage = Number.isFinite(percentage)
    ? Math.abs(percentage)
    : 0;

  const categorySlug = product.category?.trim();

  const priceChangeText =
    direction === "up"
      ? "দাম বেড়েছে"
      : direction === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  const changeColor =
    direction === "up"
      ? "bg-red-50 text-red-600"
      : direction === "down"
        ? "bg-green-50 text-green-700"
        : "bg-gray-100 text-gray-600";

  const hasImage = isImageUrl(product.image);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>

          <span aria-hidden="true">/</span>

          {categorySlug ? (
            <Link
              href={`/category/${encodeURIComponent(categorySlug)}`}
              className="hover:text-green-700"
            >
              {product.categoryNameBn || "ক্যাটাগরি"}
            </Link>
          ) : (
            <span>{product.categoryNameBn || "ক্যাটাগরি"}</span>
          )}

          <span aria-hidden="true">/</span>

          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-36 w-36 shrink-0 items-center justify-center self-center overflow-hidden rounded-2xl bg-green-50 sm:self-auto">
              {hasImage ? (
                // Remote image URL সরাসরি দেখানো হচ্ছে
                // যাতে next.config.ts-এ domain যোগ করা বাধ্যতামূলক না হয়।
               <Image
                 src={product.image}
                 alt={product.nameBn}
                width={144}
                 height={144}
                  sizes="144px"
                   className="h-full w-full object-contain p-2"
              />
              ) : (
                <span
                  className="text-6xl"
                  role="img"
                  aria-label={product.nameBn}
                >
                  {product.image || product.categoryIcon || "🛒"}
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="mb-2 text-sm font-medium text-green-700">
                {product.categoryIcon}{" "}
                {product.categoryNameBn || "অন্যান্য পণ্য"}
              </p>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                একক: প্রতি {product.unit || "প্রযোজ্য একক"}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="text-3xl font-extrabold text-gray-900">
                  {formatPrice(product.today)}
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${changeColor}`}
                >
                  {direction === "up"
                    ? "▲"
                    : direction === "down"
                      ? "▼"
                      : "—"}{" "}
                  {safePercentage.toLocaleString("bn-BD")}%
                </span>
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {priceChangeText} (গতকালের তুলনায়)
              </p>
            </div>
          </div>
        </section>

        {/* Price History */}
        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">
            দামের তুলনা
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                label: "গতকালের দাম",
                price: product.yesterday,
              },
              {
                label: "গত সপ্তাহের দাম",
                price: product.lastWeek,
              },
              {
                label: "গত মাসের দাম",
                price: product.lastMonth,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="mt-2 text-xl font-bold text-gray-900">
                  {formatPrice(item.price)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              বাজারভিত্তিক দাম
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              বিভিন্ন বাজারে এই পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম।
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {product.markets && product.markets.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="px-4 py-4 font-semibold sm:px-6">
                        বাজারের নাম
                      </th>
                      <th className="px-4 py-4 font-semibold">
                        বিভাগ
                      </th>
                      <th className="px-4 py-4 font-semibold">
                        সর্বনিম্ন দাম
                      </th>
                      <th className="px-4 py-4 font-semibold">
                        সর্বোচ্চ দাম
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {product.markets.map((market, index) => (
                      <tr
                        key={`${market.market}-${index}`}
                        className="transition hover:bg-green-50/50"
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800 sm:px-6">
                          {market.market}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                          {market.division}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-green-700">
                          {formatPrice(market.min)}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 font-semibold text-red-600">
                          {formatPrice(market.max)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="p-6 text-center text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>
            )}
          </div>
        </section>

        {/* Back Button */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>

          {categorySlug && (
            <Link
              href={`/category/${encodeURIComponent(categorySlug)}`}
              className="inline-flex items-center rounded-lg border border-green-200 bg-white px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50"
            >
              এই ক্যাটাগরির পণ্য দেখুন
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
