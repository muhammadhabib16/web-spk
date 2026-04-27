"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";

const smoothTransition: Transition = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1],
};

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
  const remainingRankings = ranking;

  const nextStep = (targetStep: number) => {
    setStep(targetStep);
  };

  useEffect(() => {
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
          Hasil evaluasi algoritma Simple Additive Weighting (SAW) dengan
          presisi 4 desimal.
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
                            {/* Format Mentah: Sesuai input (bisa desimal) */}
                            {Number(matriksMentah[alt.id][k.id]).toFixed(4)}
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
                          {Number(maxValues[k.id]).toFixed(4)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {step === 1 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => nextStep(2)}
                  className="bg-blue-50 text-blue-600 text-sm font-bold tracking-widest uppercase px-6 py-3 rounded-full border border-blue-200 shadow-md hover:bg-blue-600 hover:text-white transition-all"
                >
                  Tampilkan Matriks Normalisasi
                </button>
              </div>
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
            <div className="bg-white shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-blue-100/50 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-blue-50/40 text-blue-800 uppercase tracking-widest text-xs border-b border-blue-100/50">
                      <th className="p-4 pl-6 font-bold w-48">Alternatif</th>
                      {kriteria.map((k: any) => (
                        <th key={k.id} className="p-4 text-center font-bold">
                          {k.kode}
                          <div className="text-[10px] text-blue-500/80 mt-0.5 tracking-normal">
                            W: {Number(k.bobot).toFixed(4)}
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
                            {/* Format Normalisasi 4 Desimal */}
                            {Number(matriksNormalisasi[alt.id][k.id]).toFixed(
                              4,
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {step === 2 && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => nextStep(3)}
                  className="bg-emerald-50 text-emerald-600 text-sm font-bold tracking-widest uppercase px-6 py-3 rounded-full border border-emerald-200 shadow-md hover:bg-emerald-600 hover:text-white transition-all"
                >
                  Buka Hasil Keputusan Akhir
                </button>
              </div>
            )}
          </motion.section>
        )}

        {/* --- TAHAP 3: KEPUTUSAN AKHIR --- */}
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

            {/* AREA PODIUM */}
            <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 mt-16 mb-12 h-64 sm:h-72">
              {/* JUARA 2 */}
              {rank2 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="flex flex-col items-center w-28 sm:w-40 z-10"
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-3 rounded-2xl shadow-lg w-full text-center mb-3">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Juara 2
                    </div>
                    <div className="font-black text-slate-800 text-sm truncate w-full">
                      {rank2.nama}
                    </div>
                    <div className="text-slate-600 font-mono font-black text-lg">
                      {Number(rank2.skor).toFixed(4)}
                    </div>
                  </div>
                  <div className="w-full h-28 bg-gradient-to-t from-slate-300 to-slate-100 rounded-t-xl flex justify-center pt-4">
                    <span className="text-5xl font-black text-slate-400/50">
                      2
                    </span>
                  </div>
                </motion.div>
              )}

              {/* JUARA 1 */}
              {rank1 && (
                <motion.div
                  initial={{ opacity: 0, y: 80, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="flex flex-col items-center w-32 sm:w-48 z-20 relative"
                >
                  <div className="absolute -top-12 drop-shadow-xl text-yellow-400">
                    👑
                  </div>
                  <div className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 p-4 rounded-2xl shadow-xl w-full text-center mb-4">
                    <div className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                      Juara 1 Utama
                    </div>
                    <div className="font-black text-amber-950 text-base truncate w-full">
                      {rank1.nama}
                    </div>
                    <div className="text-amber-600 font-mono font-black text-2xl">
                      {Number(rank1.skor).toFixed(4)}
                    </div>
                  </div>
                  <div className="w-full h-36 bg-gradient-to-t from-amber-400 to-yellow-200 rounded-t-2xl flex justify-center pt-4">
                    <span className="text-6xl font-black text-amber-700/30">
                      1
                    </span>
                  </div>
                </motion.div>
              )}

              {/* JUARA 3 */}
              {rank3 && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="flex flex-col items-center w-28 sm:w-40 z-10"
                >
                  <div className="bg-white/90 backdrop-blur-sm border border-orange-200/50 p-3 rounded-2xl shadow-lg w-full text-center mb-3">
                    <div className="text-[10px] font-black text-orange-400 uppercase tracking-widest">
                      Juara 3
                    </div>
                    <div className="font-black text-orange-950 text-sm truncate w-full">
                      {rank3.nama}
                    </div>
                    <div className="text-orange-600 font-mono font-black text-lg">
                      {Number(rank3.skor).toFixed(4)}
                    </div>
                  </div>
                  <div className="w-full h-20 bg-gradient-to-t from-orange-400 to-orange-200 rounded-t-xl flex justify-center pt-4">
                    <span className="text-5xl font-black text-orange-800/20">
                      3
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* TABEL RANKING LENGKAP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-white shadow-xl border border-gray-100 rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest border-b">
                      <th className="px-6 py-5 font-bold w-20 text-center">
                        Rank
                      </th>
                      <th className="px-6 py-5 font-bold w-56">
                        Alternatif Platform
                      </th>
                      <th className="px-6 py-5 font-bold hidden sm:table-cell">
                        Rincian Kalkulasi ∑ (W × R)
                      </th>
                      <th className="px-6 py-5 font-bold text-right">
                        Skor Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {remainingRankings.map((item: any, index: number) => {
                      const actualRank = index + 1;

                      // --- LOGIKA STYLE DINAMIS BERDASARKAN RANK ---
                      let rowStyle = "hover:bg-gray-50/80";
                      let badgeStyle = "bg-gray-100 text-gray-500";
                      let scoreStyle = "text-blue-600";
                      let nameStyle = "text-gray-700";

                      if (actualRank === 1) {
                        rowStyle =
                          "bg-amber-50/50 hover:bg-amber-100/70 border-l-4 border-l-amber-400";
                        badgeStyle =
                          "bg-amber-100 text-amber-700 shadow-sm shadow-amber-200/50";
                        scoreStyle = "text-amber-600";
                        nameStyle = "text-amber-950 font-black";
                      } else if (actualRank === 2) {
                        rowStyle =
                          "bg-slate-50/50 hover:bg-slate-100/80 border-l-4 border-l-slate-400";
                        badgeStyle =
                          "bg-slate-200 text-slate-700 shadow-sm shadow-slate-300/50";
                        scoreStyle = "text-slate-600";
                        nameStyle = "text-slate-900 font-extrabold";
                      } else if (actualRank === 3) {
                        rowStyle =
                          "bg-orange-50/30 hover:bg-orange-100/50 border-l-4 border-l-orange-400";
                        badgeStyle =
                          "bg-orange-100 text-orange-800 shadow-sm shadow-orange-200/50";
                        scoreStyle = "text-orange-600";
                        nameStyle = "text-orange-950 font-extrabold";
                      }

                      return (
                        <tr
                          key={item.id}
                          className={`transition-all duration-300 group ${rowStyle}`}
                        >
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-black text-xs transition-colors ${badgeStyle}`}
                            >
                              {actualRank}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {/* Tambahan: Emoji Medali */}
                              {actualRank === 1 && <span>🥇</span>}
                              {actualRank === 2 && <span>🥈</span>}
                              {actualRank === 3 && <span>🥉</span>}
                              <span
                                className={`font-bold transition-colors ${nameStyle}`}
                              >
                                {item.nama}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 hidden sm:table-cell">
                            <div className="text-[10px] font-mono tracking-tight text-gray-400 group-hover:text-gray-500 transition-colors">
                              {item.rincian.join(" + ")}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span
                              className={`font-mono text-xl font-black transition-colors ${scoreStyle}`}
                            >
                              {Number(item.skor).toFixed(4)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
