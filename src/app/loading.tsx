
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#eff5f0] px-4 py-8">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-6 h-8 w-56 rounded-lg bg-gray-200" />

        <div className="mb-6 flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-9 w-20 rounded-full bg-white"
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[#e4ece6] bg-white p-4"
            >
              <div className="mb-4 h-36 rounded-lg bg-gray-200" />
              <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-4 h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-8 w-full rounded-lg bg-[#d5e8dc]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
