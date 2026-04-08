"use client";

import { useState } from "react";
import { simpanMatriksPenilaian } from "@/actions/penilaianActions";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Kriteria = { id: number; kode: string; nama: string; bobot: number };
type Alternatif = { id: number; kode: string; nama: string };
type Penilaian = { alternatif_id: number; kriteria_id: number; nilai: number };

interface MatrixFormProps {
  kriteriaList: Kriteria[];
  alternatifList: Alternatif[];
  penilaianList: Penilaian[];
}

export default function MatrixForm({
  kriteriaList,
  alternatifList,
  penilaianList,
}: MatrixFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [pesan, setPesan] = useState("");

  const [skor, setSkor] = useState<Record<string, number>>(() => {
    const initialState: Record<string, number> = {};
    penilaianList.forEach((p) => {
      initialState[`${p.alternatif_id}-${p.kriteria_id}`] = p.nilai;
    });
    return initialState;
  });

  const handleInputChange = (altId: number, kritId: number, value: string) => {
    const numValue = parseInt(value) || 0;
    // Batasi nilai hanya 1-5
    const finalValue = numValue > 5 ? 5 : numValue < 0 ? 0 : numValue;

    setSkor((prev) => ({
      ...prev,
      [`${altId}-${kritId}`]: finalValue,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    const dataToSave = Object.entries(skor).map(([key, nilai]) => {
      const [alternatif_id, kriteria_id] = key.split("-").map(Number);
      return { alternatif_id, kriteria_id, nilai };
    });

    try {
      await simpanMatriksPenilaian(dataToSave);
      // 3. Ganti pesan lama dengan Toast Sonner yang mewah
      toast.success("Matriks Berhasil Diperbarui", {
        description: "Data penilaian telah disimpan dan ranking diperbarui.",
      });
    } catch (error) {
      toast.error("Gagal Menyimpan", {
        description: "Terjadi kesalahan pada koneksi database.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (kriteriaList.length === 0 || alternatifList.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-gray-900 font-bold text-lg">Data Belum Lengkap</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-md">
          Sistem membutuhkan setidaknya 1 Kriteria dan 1 Alternatif untuk
          membentuk matriks.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Custom Scrollbar Container */}
      <div className="overflow-x-auto overflow-y-visible pb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {/* Kolom Sticky Kiri */}
              <th className="px-6 py-5 font-bold text-gray-500 text-xs uppercase tracking-widest sticky left-0 z-20 bg-gray-50/95 backdrop-blur-sm border-r border-gray-100 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.1)] min-w-[200px]">
                Alternatif \ Kriteria
              </th>

              {/* Header Kriteria */}
              {kriteriaList.map((k) => (
                <th
                  key={k.id}
                  className="px-4 py-4 min-w-[140px] border-r border-gray-50 last:border-0 group cursor-default"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100 mb-1">
                      {k.kode}
                    </span>
                    <span
                      className="text-sm font-semibold text-gray-700 truncate w-full"
                      title={k.nama}
                    >
                      {k.nama}
                    </span>
                    <span className="text-[10px] font-medium text-gray-400 mt-0.5">
                      Bobot: {k.bobot}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {alternatifList.map((alt, index) => (
              <motion.tr
                key={alt.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }} // Efek muncul bergantian
                className="hover:bg-blue-50/20 transition-colors group"
              >
                {/* Info Alternatif Sticky */}
                <td className="px-6 py-4 sticky left-0 z-10 bg-white group-hover:bg-blue-50/50 transition-colors border-r border-gray-100 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-6">
                      {alt.kode}
                    </span>
                    <span className="font-bold text-gray-800">{alt.nama}</span>
                  </div>
                </td>

                {/* Input Grid */}
                {kriteriaList.map((krit) => {
                  const key = `${alt.id}-${krit.id}`;
                  const value = skor[key] || "";
                  return (
                    <td
                      key={krit.id}
                      className="px-4 py-3 border-r border-gray-50 last:border-0"
                    >
                      <div className="flex justify-center">
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={value}
                          onChange={(e) =>
                            handleInputChange(alt.id, krit.id, e.target.value)
                          }
                          placeholder="0"
                          // Menyembunyikan panah input number bawaan browser untuk UI yang lebih bersih
                          className="w-16 h-10 px-0 text-center font-mono text-lg font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none hover:border-gray-300"
                        />
                      </div>
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Action Bar */}
      <div className="bg-gray-50/80 border-t border-gray-100 p-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative">
        {/* Indikator Status Simpan */}
        <div className="flex items-center min-h-[24px]">
          {pesan === "success" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full animate-in slide-in-from-bottom-2 fade-in">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Perubahan berhasil disimpan!
            </span>
          )}
          {pesan === "error" && (
            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full animate-in slide-in-from-bottom-2 fade-in">
              Terjadi kesalahan. Coba lagi.
            </span>
          )}
        </div>

        {/* Tombol Aksi Utama */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </motion.div>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Simpan Matriks
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
