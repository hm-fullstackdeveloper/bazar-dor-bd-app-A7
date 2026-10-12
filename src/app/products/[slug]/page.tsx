
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducts } from "../../lib/api";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatPrice = (price: number) =>
  `${price.toLocaleString("bn-BD")} টাকা`;

export default async function ProductDetailsPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const products = await getProducts();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    notFound();
  }

  const direction = product.change?.dir ?? "flat";
  const percentage = product.change?.pct ?? 0;

  const priceChangeText =
    direction === "up"
      ? "দাম বেড়েছে"
      : direction === "down"
        ? "দাম কমেছে"
        : "দাম অপরিবর্তিত";

  const changeColor =
    direction === "up"
      ? "text-red-600 bg-red-50"
      : direction === "down"
        ? "text-green-600 bg-green-50"
        : "text-gray-600 bg-gray-100";

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">
            হোম
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/"
            className="hover:text-green-600"
          >
            {product.categoryNameBn}
          </Link>

          <span className="mx-2">/</span>

          <span className="font-medium text-gray-800">
            {product.nameBn}
          </span>
        </nav>

        {/* Product Information */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-6xl">
              {product.image || product.categoryIcon || "🛒"}
            </div>

            <div className="flex-1">
              <p className="mb-2 text-sm font-medium text-green-700">
                {product.categoryIcon} {product.categoryNameBn}
              </p>

              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                একক: প্রতি {product.unit}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <p className="text-3xl font-bold text-gray-900">
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
                  {Math.abs(percentage).toLocaleString("bn-BD")}%
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

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                গতকালের দাম
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {formatPrice(product.yesterday)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                গত সপ্তাহের দাম
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {formatPrice(product.lastWeek)}
              </p>
            </div>

            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                গত মাসের দাম
              </p>

              <p className="mt-2 text-xl font-bold text-gray-900">
                {formatPrice(product.lastMonth)}
              </p>
            </div>

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
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

      </div>
    </main>
  );
}
