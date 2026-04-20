"use client";

import { motion } from "framer-motion";

// Konfigurasi Animasi Halus
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function DashboardOverview({
  processData,
}: {
  processData: any;
}) {
  // Tampilan jika data masih kosong
  if (!processData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
        <div className="w-20 h-20 bg-white border border-gray-200 rounded-[1.5rem] flex items-center justify-center mb-5 shadow-sm">
          <span className="text-3xl">📭</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Data Belum Lengkap
        </h2>
        <p className="text-gray-500 mt-2 max-w-sm text-sm">
          Silakan isi data Kriteria, Alternatif, dan Penilaian terlebih dahulu
          melalui menu di sidebar.
        </p>
      </div>
    );
  }

  const { kriteria, alternatif } = processData;
  const totalBobot = kriteria.reduce(
    (sum: number, k: any) => sum + Number(k.bobot),
    0,
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="max-w-5xl mx-auto space-y-6 pb-12 mt-2"
    >
      {/* --- HEADER WELCOME --- */}
      <motion.div
        variants={itemVariants}
        className="bg-white/80 backdrop-blur-xl border border-gray-100 shadow-sm p-6 sm:p-8 rounded-3xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-3">
            Dashboard Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Selamat Datang, <span className="text-blue-600">Admin SPK!</span>
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Berikut adalah ringkasan operasional sistem penunjang keputusan
            E-Commerce Fashion.
          </p>
        </div>
        {/* Ornamen garis halus di kanan atas */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none hidden sm:block">
          <svg
            className="w-32 h-32 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0l3.7 8.3L24 12l-8.3 3.7L12 24l-3.7-8.3L0 12l8.3-3.7z" />
          </svg>
        </div>
      </motion.div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Card Total Alternatif */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex items-center gap-5 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-400">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              Total Alternatif
            </p>
            <p className="text-3xl sm:text-4xl font-black text-gray-800">
              {alternatif.length}{" "}
              <span className="text-sm font-semibold text-gray-400">
                Platform
              </span>
            </p>
          </div>
        </motion.div>

        {/* Card Total Kriteria */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-100 p-5 sm:p-6 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex items-center gap-5 group"
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-400">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest mb-0.5">
              Total Kriteria
            </p>
            <p className="text-3xl sm:text-4xl font-black text-gray-800">
              {kriteria.length}{" "}
              <span className="text-sm font-semibold text-gray-400">
                Indikator
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- RINGKASAN KRITERIA & BOBOT --- */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-400 overflow-hidden"
      >
        <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">
              Distribusi Kriteria & Bobot
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Ringkasan struktur pembobotan algoritma SAW.
            </p>
          </div>
          <div className="bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            <p className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
              Total Bobot:{" "}
              <span className="text-base ml-1 font-black">{totalBobot}</span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4 font-bold w-20">Kode</th>
                <th className="px-6 py-4 font-bold">Nama Kriteria</th>
                <th className="px-6 py-4 font-bold w-32 text-center">
                  Atribut
                </th>
                <th className="px-6 py-4 font-bold text-right w-28">
                  Bobot (W)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {kriteria.map((k: any) => (
                <tr
                  key={k.id}
                  className="hover:bg-gray-50/80 transition-colors group"
                >
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-black text-[10px] group-hover:bg-white group-hover:shadow-sm transition-all">
                      {k.kode}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {k.nama || "Kriteria SAW"}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest ${
                        k.tipe?.toLowerCase() === "cost"
                          ? "bg-rose-50 text-rose-600 border border-rose-100"
                          : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                      }`}
                    >
                      {k.tipe || "Benefit"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="font-mono text-lg font-black text-gray-600 group-hover:text-gray-900 transition-colors">
                      {k.bobot}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
