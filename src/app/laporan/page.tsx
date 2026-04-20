import { calculateSAW } from "@/utils/sawCalculations";
import ProgressiveReport from "@/components/ProgressiveReport";
// 1. IMPORT PARTIKEL DIHAPUS KARENA SUDAH ADA DI LAYOUT GLOBAL

export const revalidate = 0;

export default async function LaporanSPK() {
  const processData = await calculateSAW();

  if (!processData) {
    return (
      // 2. HAPUS bg-gray-80 / bg-[#F8FAFC] AGAR BACKGROUND TRANSPARAN
      <div className="min-h-[80vh] flex items-center justify-center p-8 relative">
        {/* Kontainer Empty State */}
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-white/60 rounded-3xl bg-white/70 backdrop-blur-xl shadow-xl max-w-lg w-full animate-in zoom-in-95 duration-500 relative z-10">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5 shadow-inner">
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
          <p className="text-gray-500 mt-2 text-sm leading-relaxed font-medium">
            Sistem tidak dapat melakukan perhitungan. Pastikan Anda telah
            mengisi data <b>Kriteria</b>, <b>Alternatif</b>, dan{" "}
            <b>Matriks Penilaian</b> secara lengkap.
          </p>
        </div>
      </div>
    );
  }

  return (
    // 3. HAPUS bg-[#F8FAFC] DI SINI JUGA AGAR PARTIKEL GLOBAL TEMBUS PANDANG
    <div className="min-h-screen p-4 sm:p-8 relative flex flex-col">
      {/* 4. KODE PARTIKEL MANUAL DI SINI DIHAPUS, SISAKAN KONTEN UTAMANYA SAJA */}
      <div className="relative z-10 w-full">
        <ProgressiveReport processData={processData} />
      </div>
    </div>
  );
}
