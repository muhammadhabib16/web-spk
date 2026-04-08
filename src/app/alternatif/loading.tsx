export default function LoadingAlternatif() {
  return (
    <div className="p-8 max-w-7xl mx-auto animate-pulse">
      <div className="flex justify-between items-center mb-8">
        <div className="space-y-3">
          <div className="h-8 w-48 bg-gray-200 rounded-lg"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-10 w-32 bg-gray-200 rounded-lg"></div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        <div className="h-12 bg-gray-50 border-b border-gray-100"></div>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 border-b border-gray-50 items-center"
          >
            <div className="h-4 w-12 bg-gray-100 rounded"></div>
            <div className="h-4 flex-1 bg-gray-100 rounded"></div>
            <div className="h-6 w-20 bg-gray-100 rounded-full"></div>
            <div className="h-4 w-16 bg-gray-100 rounded"></div>
            <div className="h-8 w-24 bg-gray-100 rounded-lg ml-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
