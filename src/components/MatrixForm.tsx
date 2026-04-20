"use client";

import { useState } from "react";
import { simpanMatriksPenilaian } from "@/actions/penilaianActions";
import { motion } from "framer-motion";
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

  // Menggunakan tipe number (bukan int) untuk mendukung desimal di state
  const [skor, setSkor] = useState<Record<string, number>>(() => {
    const initialState: Record<string, number> = {};
    penilaianList.forEach((p) => {
      initialState[`${p.alternatif_id}-${p.kriteria_id}`] = p.nilai;
    });
    return initialState;
  });

  const handleInputChange = (altId: number, kritId: number, value: string) => {
    // PERBAIKAN 1: Gunakan parseFloat agar angka di belakang koma tidak hilang
    const numValue = parseFloat(value);

    // Validasi: Jika input kosong, biarkan kosong atau 0
    if (isNaN(numValue)) {
      setSkor((prev) => {
        const newState = { ...prev };
        delete newState[`${altId}-${kritId}`];
        return newState;
      });
      return;
    }

    // Batasi nilai (misal skala 1-5 atau sesuai kebutuhan Bos)
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
      toast.success("Matriks Berhasil Diperbarui", {
        description:
          "Data penilaian desimal telah disimpan dengan presisi tinggi.",
      });
    } catch (error) {
      toast.error("Gagal Menyimpan", {
        description:
          "Pastikan tipe data kolom 'nilai' di Supabase sudah Numeric.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (kriteriaList.length === 0 || alternatifList.length === 0) {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center bg-gray-50/50">
        <h3 className="text-gray-900 font-bold text-lg">Data Belum Lengkap</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto overflow-y-visible pb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="px-6 py-5 font-bold text-gray-500 text-xs uppercase tracking-widest sticky left-0 z-20 bg-gray-50/95 backdrop-blur-sm border-r border-gray-100 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.1)] min-w-[200px]">
                Alternatif \ Kriteria
              </th>

              {kriteriaList.map((k) => (
                <th
                  key={k.id}
                  className="px-4 py-4 min-w-[140px] border-r border-gray-50 last:border-0"
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100 mb-1">
                      {k.kode}
                    </span>
                    {/* Tampilkan bobot dengan 4 desimal agar seragam */}
                    <span className="text-[10px] font-medium text-gray-400 mt-0.5">
                      W: {Number(k.bobot).toFixed(4)}
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
                transition={{ delay: index * 0.05 }}
                className="hover:bg-blue-50/20 transition-colors group"
              >
                <td className="px-6 py-4 sticky left-0 z-10 bg-white group-hover:bg-blue-50/50 transition-colors border-r border-gray-100 shadow-[2px_0_8px_-4px_rgba(0,0,0,0.05)]">
                  <span className="font-bold text-gray-800">{alt.nama}</span>
                </td>

                {kriteriaList.map((krit) => {
                  const key = `${alt.id}-${krit.id}`;
                  const value = skor[key] !== undefined ? skor[key] : "";
                  return (
                    <td
                      key={krit.id}
                      className="px-4 py-3 border-r border-gray-50 last:border-0"
                    >
                      <div className="flex justify-center">
                        <input
                          type="number"
                          // PERBAIKAN 2: Step 0.0001 mengizinkan 4 desimal
                          step="0.0001"
                          min="0"
                          max="5"
                          value={value}
                          onChange={(e) =>
                            handleInputChange(alt.id, krit.id, e.target.value)
                          }
                          placeholder="0.0000"
                          // Penyesuaian lebar (w-20) agar angka desimal panjang tidak terpotong
                          className="w-20 h-10 px-2 text-center font-mono text-sm font-semibold text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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

      <div className="bg-gray-50/80 border-t border-gray-100 p-4 px-6 flex justify-end items-center relative">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-colors flex items-center justify-center gap-2"
        >
          {isLoading ? "Menyimpan..." : "Simpan Matriks"}
        </motion.button>
      </div>
    </div>
  );
}
