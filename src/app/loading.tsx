export default function LoadingDashboard() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 animate-pulse">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Skeleton */}
        <header className="mb-10">
          <div className="h-6 w-32 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-10 w-64 bg-gray-200 rounded-lg mb-2"></div>
          <div className="h-4 w-96 bg-gray-200 rounded-lg"></div>
        </header>

        {/* Tahap 1 & 2 Skeleton (Tabel) */}
        {[1, 2].map((i) => (
          <section key={i}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
              <div className="h-6 w-48 bg-gray-200 rounded-lg"></div>
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-12 bg-gray-50 border-b border-gray-100"></div>
              {[...Array(4)].map((_, j) => (
                <div key={j} className="p-5 border-b border-gray-50 flex gap-4">
                  <div className="h-4 w-32 bg-gray-100 rounded"></div>
                  <div className="h-4 flex-1 bg-gray-100 rounded"></div>
                  <div className="h-4 w-12 bg-gray-100 rounded"></div>
                  <div className="h-4 w-12 bg-gray-100 rounded"></div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Tahap 3 Skeleton (Leaderboard) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
            <div className="h-6 w-56 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md">
            <div className="h-16 bg-gray-50 border-b border-gray-100"></div>
            {/* Winner Row Skeleton */}
            <div className="p-6 bg-amber-50/30 flex items-center gap-6 border-b border-gray-100">
              <div className="h-10 w-10 bg-amber-200 rounded-full"></div>
              <div className="h-6 w-48 bg-amber-200/50 rounded-lg"></div>
              <div className="h-4 flex-1 bg-amber-200/30 rounded"></div>
              <div className="h-8 w-16 bg-amber-300 rounded-lg"></div>
            </div>
            {/* Other Rows */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="p-6 flex items-center gap-6 border-b border-gray-50"
              >
                <div className="h-8 w-8 bg-gray-100 rounded-full"></div>
                <div className="h-5 w-40 bg-gray-100 rounded-lg"></div>
                <div className="h-4 flex-1 bg-gray-100 rounded"></div>
                <div className="h-6 w-14 bg-gray-100 rounded-lg"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
