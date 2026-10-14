
type PageSkeletonProps = {
  type?: "products" | "detail" | "form";
};

export default function PageSkeleton({
  type = "products",
}: PageSkeletonProps) {
  return (
    <div className="min-h-[60vh] animate-pulse bg-[#eff5f0] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {type === "form" ? (
          <div className="mx-auto max-w-md rounded-2xl border border-[#e4ece6] bg-white p-6 shadow-sm sm:p-8">
            <div className="mx-auto mb-6 h-7 w-40 rounded bg-gray-200" />
            <div className="mx-auto mb-8 h-4 w-56 max-w-full rounded bg-gray-200" />

            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item}>
                  <div className="mb-2 h-4 w-20 rounded bg-gray-200" />
                  <div className="h-11 w-full rounded-lg border border-[#dce7df] bg-[#fbfdfb]" />
                </div>
              ))}

              <div className="h-11 w-full rounded-lg bg-[#d5e8dc]" />

              <div className="flex gap-3">
                <div className="h-10 flex-1 rounded-lg bg-gray-200" />
                <div className="h-10 flex-1 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>
        ) : type === "detail" ? (
          <div className="grid gap-6 rounded-2xl border border-[#e4ece6] bg-white p-5 sm:p-8 md:grid-cols-2">
            <div className="min-h-64 rounded-xl bg-gray-200" />

            <div className="space-y-5 py-2">
              <div className="h-7 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-12 w-2/3 rounded-lg bg-[#d5e8dc]" />
              <div className="h-24 rounded-lg bg-gray-100" />
              <div className="h-10 w-full rounded-lg bg-gray-200" />
            </div>
          </div>
        ) : (
          <>
            {/* Page heading */}
            <div className="mb-6 space-y-3">
              <div className="h-8 w-56 max-w-full rounded-lg bg-gray-200" />
              <div className="h-4 w-72 max-w-full rounded bg-gray-200" />
            </div>

            {/* Category placeholders */}
            <div className="mb-6 flex flex-wrap gap-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-9 w-20 rounded-full border border-[#e4ece6] bg-white"
                />
              ))}
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#e4ece6] bg-white p-4 shadow-sm"
                >
                  <div className="mb-4 h-36 rounded-lg bg-gray-200" />
                  <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
                  <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />

                  <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="h-5 w-24 rounded bg-[#d5e8dc]" />
                    <div className="h-6 w-14 rounded-full bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
