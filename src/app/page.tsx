import { calculateSAW } from "@/utils/sawCalculations";

export const revalidate = 0;

export default async function DashboardSPK() {
  const processData = await calculateSAW();

  // Tampilan Empty State yang Premium
  if (!processData) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-8">
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white shadow-sm max-w-lg w-full animate-in zoom-in-95 duration-500">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-5">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Laporan Belum Tersedia
          </h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            Sistem tidak dapat melakukan perhitungan. Pastikan Anda telah
            mengisi data <b>Kriteria</b>, <b>Alternatif</b>, dan{" "}
            <b>Matriks Penilaian</b> secara lengkap.
          </p>
        </div>
      </div>
    );
  }

  const {
    kriteria,
    alternatif,
    matriksMentah,
    maxValues,
    matriksNormalisasi,
    ranking,
  } = processData;

  return (
    <main className="min-h-screen bg-[#F8FAFC] p-8 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Real-Time Analysis
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Laporan Hasil Keputusan
          </h1>
          <p className="text-gray-500 mt-2 text-lg font-medium max-w-2xl">
            Hasil evaluasi algoritma Simple Additive Weighting (SAW) berdasarkan
            data matriks terkini.
          </p>
        </header>

        {/* --- TAHAP 1: MATRIKS KEPUTUSAN --- */}
        {/* Animasi delay 200ms */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[200ms] fill-mode-both">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-800 font-black text-sm">
              1
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Matriks Keputusan Awal (X)
            </h2>
          </div>

          <div className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-gray-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 uppercase tracking-widest text-xs border-b border-gray-100">
                    <th className="p-4 pl-6 font-bold w-48">Alternatif</th>
                    {kriteria.map((k) => (
                      <th key={k.id} className="p-4 text-center font-bold">
                        {k.kode}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {alternatif.map((alt) => (
                    <tr
                      key={alt.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="p-4 pl-6 font-bold text-gray-800">
                        <span className="text-gray-400 mr-2 text-xs font-normal">
                          {alt.kode}
                        </span>
                        {alt.nama}
                      </td>
                      {kriteria.map((k) => (
                        <td
                          key={k.id}
                          className="p-4 text-center text-gray-600 font-mono"
                        >
                          {matriksMentah[alt.id][k.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Baris Nilai Maksimal - Desain Khusus */}
                  <tr className="bg-amber-50/30 border-t border-amber-100">
                    <td className="p-4 pl-6 text-right font-bold text-amber-700 text-xs uppercase tracking-widest">
                      Nilai Maksimal (Max)
                    </td>
                    {kriteria.map((k) => (
                      <td
                        key={k.id}
                        className="p-4 text-center font-bold text-amber-600 font-mono"
                      >
                        {maxValues[k.id]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- TAHAP 2: MATRIKS NORMALISASI --- */}
        {/* Animasi delay 400ms */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[400ms] fill-mode-both">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-black text-sm">
              2
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 tracking-tight">
                Matriks Normalisasi (R)
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Rumus Benefit: R = Nilai Mentah ÷ Nilai Maksimal
              </p>
            </div>
          </div>

          <div className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-blue-100/50 rounded-2xl overflow-hidden ring-1 ring-blue-50/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-50/40 text-blue-800 uppercase tracking-widest text-xs border-b border-blue-100/50">
                    <th className="p-4 pl-6 font-bold w-48">Alternatif</th>
                    {kriteria.map((k) => (
                      <th key={k.id} className="p-4 text-center font-bold">
                        {k.kode}
                        <div className="text-[10px] text-blue-500/80 mt-0.5 capitalize tracking-normal">
                          Bobot: {k.bobot}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-50/50">
                  {alternatif.map((alt) => (
                    <tr
                      key={alt.id}
                      className="hover:bg-blue-50/20 transition-colors"
                    >
                      <td className="p-4 pl-6 font-bold text-gray-800">
                        {alt.nama}
                      </td>
                      {kriteria.map((k) => (
                        <td
                          key={k.id}
                          className="p-4 text-center text-blue-600 font-mono font-medium"
                        >
                          {matriksNormalisasi[alt.id][k.id]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- TAHAP 3: HASIL AKHIR & LEADERBOARD --- */}
        {/* Animasi delay 600ms */}
        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-[600ms] fill-mode-both pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm">
              3
            </div>
            <h2 className="text-xl font-bold text-gray-800 tracking-tight">
              Keputusan Akhir & Peringkat
            </h2>
          </div>

          <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-widest border-b border-gray-100">
                    <th className="px-6 py-5 font-bold w-20 text-center">
                      Rank
                    </th>
                    <th className="px-6 py-5 font-bold w-56">
                      Alternatif Platform
                    </th>
                    <th className="px-6 py-5 font-bold">
                      Rincian Kalkulasi &sum; (W &times; R)
                    </th>
                    <th className="px-6 py-5 font-bold text-right">
                      Skor Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {ranking.map((item, index) => {
                    const isWinner = index === 0;
                    return (
                      <tr
                        key={item.id}
                        className={`transition-all duration-300 ${isWinner ? "bg-gradient-to-r from-amber-50/80 to-yellow-50/30" : "hover:bg-gray-50/50"}`}
                      >
                        {/* Kolom Rank */}
                        <td className="px-6 py-5 text-center relative">
                          {isWinner && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400 rounded-r-full"></div>
                          )}
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-sm ${isWinner ? "bg-amber-400 text-white shadow-md shadow-amber-200" : "bg-gray-100 text-gray-500"}`}
                          >
                            {index + 1}
                          </span>
                        </td>

                        {/* Kolom Nama */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            {isWinner && (
                              <svg
                                className="w-5 h-5 text-amber-500 drop-shadow-sm"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L5.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 014 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L8 4.323V3a1 1 0 011-1zm-5 8.274l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L5 10.274zm10 0l-.818 2.552c.25.112.526.174.818.174.292 0 .569-.062.818-.174L15 10.274z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            <span
                              className={`font-bold ${isWinner ? "text-amber-900 text-lg" : "text-gray-800"}`}
                            >
                              {item.nama}
                            </span>
                          </div>
                          {isWinner && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mt-1 block">
                              Rekomendasi Utama
                            </span>
                          )}
                        </td>

                        {/* Kolom Rincian */}
                        <td className="px-6 py-5">
                          <div
                            className={`text-xs font-mono tracking-tight leading-relaxed ${isWinner ? "text-amber-700/80" : "text-gray-500"}`}
                          >
                            {item.rincian.join(" + ")}
                          </div>
                        </td>

                        {/* Kolom Total */}
                        <td className="px-6 py-5 text-right">
                          <span
                            className={`font-mono text-2xl font-black ${isWinner ? "text-amber-600" : "text-emerald-600"}`}
                          >
                            {item.skor}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
