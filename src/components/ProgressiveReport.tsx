"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Kurva animasi custom yang sangat smooth (Ease Out Expo)
const smoothTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

export default function ProgressiveReport({
  processData,
}: {
  processData: any;
}) {
  const [step, setStep] = useState(1);
  const step2Ref = useRef<HTMLElement>(null);
  const step3Ref = useRef<HTMLElement>(null);

  const {
    kriteria,
    alternatif,
    matriksMentah,
    maxValues,
    matriksNormalisasi,
    ranking,
  } = processData;

  const rank1 = ranking[0];
  const rank2 = ranking[1];
  const rank3 = ranking[2];
  const remainingRankings = ranking.slice(0);

  const nextStep = (targetStep: number) => {
    setStep(targetStep);
  };

  useEffect(() => {
    // Memberikan jeda sedikit agar DOM selesai me-render animasi sebelum di-scroll
    const timeout = setTimeout(() => {
      if (step === 2 && step2Ref.current) {
        step2Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (step === 3 && step3Ref.current) {
        step3Ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
    return () => clearTimeout(timeout);
  }, [step]);

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={smoothTransition}
        className="mb-10"
      >
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
      </motion.header>

      <AnimatePresence>
        {/* --- TAHAP 1: MATRIKS KEPUTUSAN --- */}
        {step >= 1 && (
          <motion.section
            key="tahap-1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={smoothTransition}
            className="relative"
          >
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
                      {kriteria.map((k: any) => (
                        <th key={k.id} className="p-4 text-center font-bold">
                          {k.kode}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {alternatif.map((alt: any) => (
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
                        {kriteria.map((k: any) => (
                          <td
                            key={k.id}
                            className="p-4 text-center text-gray-600 font-mono"
                          >
                            {matriksMentah[alt.id][k.id]}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="bg-amber-50/30 border-t border-amber-100">
                      <td className="p-4 pl-6 text-right font-bold text-amber-700 text-xs uppercase tracking-widest">
                        Nilai Maksimal (Max)
                      </td>
                      {kriteria.map((k: any) => (
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

            {/* Tombol Lanjut ke Tahap 2 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, ...smoothTransition }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => nextStep(2)}
                  className="group flex flex-col items-center gap-2 text-blue-600"
                >
                  <span className="text-sm font-bold tracking-widest uppercase bg-blue-50 px-6 py-3 rounded-full border border-blue-200 shadow-md shadow-blue-100/50 hover:bg-blue-600 hover:text-white transition-colors duration-300">
                    Tampilkan Matriks Normalisasi
                  </span>
                  <motion.svg
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="w-8 h-8 mt-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </motion.svg>
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* --- TAHAP 2: MATRIKS NORMALISASI --- */}
        {step >= 2 && (
          <motion.section
            key="tahap-2"
            ref={step2Ref}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...smoothTransition }}
            className="pt-4"
          >
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
                      {kriteria.map((k: any) => (
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
                    {alternatif.map((alt: any) => (
                      <tr
                        key={alt.id}
                        className="hover:bg-blue-50/20 transition-colors"
                      >
                        <td className="p-4 pl-6 font-bold text-gray-800">
                          {alt.nama}
                        </td>
                        {kriteria.map((k: any) => (
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

            {/* Tombol Lanjut ke Tahap 3 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, ...smoothTransition }}
                className="mt-8 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => nextStep(3)}
                  className="group flex flex-col items-center gap-2 text-emerald-600"
                >
                  <span className="text-sm font-bold tracking-widest uppercase bg-emerald-50 px-6 py-3 rounded-full border border-emerald-200 shadow-md shadow-emerald-100/50 hover:bg-emerald-600 hover:text-white transition-colors duration-300">
                    Buka Hasil Keputusan Akhir
                  </span>
                  <motion.svg
                    animate={{ y: [0, 8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                    className="w-8 h-8 mt-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </motion.svg>
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* --- TAHAP 3: KEPUTUSAN AKHIR (PODIUM + TABEL) --- */}
        {step >= 3 && (
          <motion.section
            key="tahap-3"
            ref={step3Ref}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...smoothTransition }}
            className="pt-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-black text-sm">
                3
              </div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Puncak Klasemen Leaderboard
              </h2>
            </div>

            {/* AREA PODIUM (Top 3) */}
            <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 mt-16 mb-12 h-64 sm:h-72">
              {/* JUARA 2 (KIRI) */}
              {rank2 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="flex flex-col items-center w-28 sm:w-40 z-10"
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-3 sm:p-4 rounded-2xl shadow-lg w-full text-center mb-3 sm:mb-4 relative">
                    <div className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                      Juara 2
                    </div>
                    <div
                      className="font-black text-slate-800 text-sm sm:text-base truncate w-full"
                      title={rank2.nama}
                    >
                      {rank2.nama}
                    </div>
                    <div className="text-slate-600 font-mono font-black text-lg sm:text-xl mt-1">
                      {rank2.skor}
                    </div>
                  </div>
                  <div className="w-full h-28 sm:h-36 bg-gradient-to-t from-slate-300 to-slate-100 rounded-t-xl shadow-inner flex justify-center pt-4 relative overflow-hidden">
                    <span className="text-5xl font-black text-slate-400/50 z-10">
                      2
                    </span>
                  </div>
                </motion.div>
              )}

              {/* JUARA 1 (TENGAH) */}
              {rank1 && (
                <motion.div
                  initial={{ opacity: 0, y: 80, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", bounce: 0.5 }}
                  className="flex flex-col items-center w-32 sm:w-48 z-20 relative"
                >
                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-12 drop-shadow-xl"
                  >
                    <svg
                      className="w-12 h-12 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
                    </svg>
                  </motion.div>
                  <div className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-4 sm:p-5 rounded-2xl shadow-xl w-full text-center mb-3 sm:mb-4 relative">
                    <div className="text-[10px] sm:text-xs font-black text-amber-500 uppercase tracking-widest mb-1">
                      Juara 1 Utama
                    </div>
                    <div
                      className="font-black text-amber-950 text-base sm:text-xl truncate w-full"
                      title={rank1.nama}
                    >
                      {rank1.nama}
                    </div>
                    <div className="text-amber-600 font-mono font-black text-2xl sm:text-3xl mt-1">
                      {rank1.skor}
                    </div>
                  </div>
                  <div className="w-full h-36 sm:h-48 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-t-2xl shadow-inner flex justify-center pt-4 relative overflow-hidden">
                    <span className="text-6xl font-black text-amber-700/30 z-10">
                      1
                    </span>
                  </div>
                </motion.div>
              )}

              {/* JUARA 3 (KANAN) */}
              {rank3 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
                  className="flex flex-col items-center w-28 sm:w-40 z-10"
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-orange-200/50 p-3 sm:p-4 rounded-2xl shadow-lg w-full text-center mb-3 sm:mb-4 relative">
                    <div className="text-[10px] sm:text-xs font-black text-orange-400 uppercase tracking-widest mb-1">
                      Juara 3
                    </div>
                    <div
                      className="font-black text-orange-950 text-sm sm:text-base truncate w-full"
                      title={rank3.nama}
                    >
                      {rank3.nama}
                    </div>
                    <div className="text-orange-600 font-mono font-black text-lg sm:text-xl mt-1">
                      {rank3.skor}
                    </div>
                  </div>
                  <div className="w-full h-20 sm:h-28 bg-gradient-to-t from-orange-400 to-orange-200 rounded-t-xl shadow-inner flex justify-center pt-4 relative overflow-hidden">
                    <span className="text-5xl font-black text-orange-800/20 z-10">
                      3
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* TABEL SISANYA */}
            {/* TABEL SISANYA (Rank 4 ke bawah) */}
            {remainingRankings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 rounded-2xl overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/80 text-gray-400 text-[10px] sm:text-xs uppercase tracking-widest border-b border-gray-100">
                        <th className="px-6 py-5 font-bold w-20 text-center">
                          Rank
                        </th>
                        <th className="px-6 py-5 font-bold w-56">
                          Alternatif Platform
                        </th>
                        <th className="px-6 py-5 font-bold hidden sm:table-cell">
                          Rincian Kalkulasi &sum; (W &times; R)
                        </th>
                        <th className="px-6 py-5 font-bold text-right">
                          Skor Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {remainingRankings.map((item: any, index: number) => {
                        const actualRank = index + 1;

                        // Menentukan gaya warna berdasarkan urutan index tabel (0=Rank 4, 1=Rank 5, 2=Rank 6)
                        // Menentukan gaya warna berdasarkan urutan index tabel (0=Rank 1, 1=Rank 2, 2=Rank 3)
                        let style = {
                          row: "hover:bg-gray-50/80",
                          badge:
                            "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:shadow-sm",
                          textName: "text-gray-700 group-hover:text-blue-600",
                          textScore: "text-gray-600 group-hover:text-gray-900",
                        };

                        if (index === 0) {
                          // Rank 1 - Emas (Gold)
                          style = {
                            row: "bg-amber-50/40 hover:bg-amber-100/60 border-l-4 border-l-amber-400",
                            badge:
                              "bg-amber-100 text-amber-700 shadow-sm shadow-amber-200/50",
                            textName: "text-amber-950 font-extrabold",
                            textScore: "text-amber-700",
                          };
                        } else if (index === 1) {
                          // Rank 2 - Perak (Silver)
                          style = {
                            row: "bg-slate-50/50 hover:bg-slate-100/80 border-l-4 border-l-slate-400",
                            badge:
                              "bg-slate-200 text-slate-700 shadow-sm shadow-slate-300/50",
                            textName: "text-slate-900 font-extrabold",
                            textScore: "text-slate-700",
                          };
                        } else if (index === 2) {
                          // Rank 3 - Perunggu (Bronze)
                          style = {
                            row: "bg-orange-50/30 hover:bg-orange-100/50 border-l-4 border-l-orange-400",
                            badge:
                              "bg-orange-100 text-orange-800 shadow-sm shadow-orange-200/50",
                            textName: "text-orange-950 font-extrabold",
                            textScore: "text-orange-700",
                          };
                        }

                        return (
                          <tr
                            key={item.id}
                            className={`transition-all duration-300 group ${style.row}`}
                          >
                            <td className="px-6 py-4 text-center">
                              <span
                                className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs transition-colors ${style.badge}`}
                              >
                                {actualRank}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {/* Tambahan: Emoji Medali untuk Top 3 */}
                                {index === 0 && (
                                  <span className="text-lg drop-shadow-sm">
                                    🥇
                                  </span>
                                )}
                                {index === 1 && (
                                  <span className="text-lg drop-shadow-sm">
                                    🥈
                                  </span>
                                )}
                                {index === 2 && (
                                  <span className="text-lg drop-shadow-sm">
                                    🥉
                                  </span>
                                )}
                                <span
                                  className={`font-bold transition-colors ${style.textName}`}
                                >
                                  {item.nama}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 hidden sm:table-cell">
                              <div className="text-xs font-mono tracking-tight text-gray-400 group-hover:text-gray-500 transition-colors">
                                {item.rincian.join(" + ")}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span
                                className={`font-mono text-xl font-black transition-colors ${style.textScore}`}
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
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
