
type ProductDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">
        পণ্যের বিস্তারিত
      </h1>

      <p className="mt-3 text-gray-600">
        পণ্যের স্লাগ: {slug}
      </p>
    </main>
  );
}
