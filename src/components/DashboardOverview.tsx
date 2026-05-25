"use client";

import { motion, Variants } from "framer-motion";

// Konfigurasi Animasi Halus
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
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
        className="bg-[#121212] border-4 border-[#004de6] shadow-xl p-6 sm:p-8 relative overflow-hidden clip-persona-card group"
      >
        <div className="relative z-10">
          <span className="inline-block py-1 px-3 bg-[#004de6] text-white text-[10px] sm:text-xs font-black tracking-widest uppercase mb-3 skew-x-[-10deg] clip-persona-tag">
            <span className="block skew-x-[10deg]">Dashboard Overview</span>
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tighter mb-2 uppercase italic text-shadow-persona">
            Selamat Datang,{" "}
            <span className="text-[#00b3ff]">Admin EcomRank!</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base font-bold">
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
          className="bg-[#121212] border-2 border-[#00b3ff] p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex items-center gap-5 group clip-persona-card"
        >
          <div className="w-14 h-14 bg-[#004de6] text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-white group-hover:text-[#004de6] transition-all duration-400 skew-x-[-10deg] border border-white">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 skew-x-[10deg]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">
              Total Alternatif
            </p>
            <p className="text-3xl sm:text-4xl font-black text-white italic">
              {alternatif.length}{" "}
              <span className="text-sm font-black text-[#00b3ff]">
                PLATFORM
              </span>
            </p>
          </div>
        </motion.div>

        {/* Card Total Kriteria */}
        <motion.div
          variants={itemVariants}
          className="bg-[#121212] border-2 border-[#00b3ff] p-5 sm:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 flex items-center gap-5 group clip-persona-card"
        >
          <div className="w-14 h-14 bg-[#00b3ff] text-[#121212] flex items-center justify-center group-hover:scale-110 group-hover:bg-white transition-all duration-400 skew-x-[-10deg] border border-white">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 skew-x-[10deg]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">
              Total Kriteria
            </p>
            <p className="text-3xl sm:text-4xl font-black text-white italic">
              {kriteria.length}{" "}
              <span className="text-sm font-black text-[#00b3ff]">
                INDIKATOR
              </span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* --- RINGKASAN KRITERIA & BOBOT --- */}
      <motion.div
        variants={itemVariants}
        className="bg-[#121212] border-4 border-[#00b3ff] shadow-sm hover:shadow-[8px_8px_0_rgba(0,179,255,0.2)] transition-shadow duration-400 overflow-hidden clip-persona-card relative"
      >
        <div className="px-6 py-5 border-b-4 border-[#00b3ff] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a0a0c]">
          <div>
            <h2 className="text-xl font-black text-white tracking-widest uppercase italic text-shadow-persona">
              Distribusi Kriteria
            </h2>
            <p className="text-xs font-bold text-gray-400 mt-1 uppercase">
              Struktur Bobot SAW
            </p>
          </div>
          <div className="bg-[#004de6] px-4 py-2 border-2 border-white skew-x-[-5deg]">
            <p className="text-[10px] font-black text-white uppercase tracking-widest skew-x-[5deg]">
              Total Bobot:{" "}
              <span className="text-base ml-1 font-black text-[#00b3ff]">{totalBobot}</span>
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#004de6] text-white text-[10px] sm:text-xs font-black uppercase tracking-widest border-b-4 border-[#0a0a0c]">
                <th className="px-6 py-4 w-20">Kode</th>
                <th className="px-6 py-4">Nama Kriteria</th>
                <th className="px-6 py-4 w-32 text-center">Atribut</th>
                <th className="px-6 py-4 text-right w-28">Bobot (W)</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-[#0a0a0c]">
              {kriteria.map((k: any) => (
                <tr
                  key={k.id}
                  className="bg-[#121212] hover:bg-[#004de6]/20 transition-colors group"
                >
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-[#0a0a0c] text-white font-black text-xs border border-[#00b3ff] skew-x-[-5deg]">
                      <span className="skew-x-[5deg]">{k.kode}</span>
                    </span>
                  </td>
                  <td className="px-6 py-3 text-sm font-black text-white uppercase tracking-wider group-hover:text-[#00b3ff] transition-colors">
                    {k.nama || "KRITERIA SAW"}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`inline-flex px-3 py-1 text-[10px] font-black uppercase tracking-widest skew-x-[-10deg] border-2 ${
                        k.tipe?.toLowerCase() === "cost"
                          ? "bg-black text-[#ff003c] border-[#ff003c]"
                          : "bg-black text-[#00ff88] border-[#00ff88]"
                      }`}
                    >
                      <span className="skew-x-[10deg]">{k.tipe || "BENEFIT"}</span>
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className="font-mono text-xl font-black text-[#00b3ff] group-hover:text-white transition-colors italic">
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
