"use client"; // Wajib karena kita pakai interaksi klik (useState)

import { useState } from "react";
import { tambahKriteria } from "@/actions/kriteriaActions";
import { toast } from "sonner";

export default function ModalTambahKriteria() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi pembungkus dengan penanganan error
  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      // 1. Jalankan proses simpan kriteria (Sekarang ada validasi total bobot di dalamnya)
      await tambahKriteria(formData);

      // 2. Jika sukses, beri feedback hijau
      toast.success("Kriteria Ditambahkan!", {
        description: "Data kriteria baru telah berhasil disimpan ke sistem.",
      });
      setIsOpen(false); // Tutup modal otomatis hanya setelah berhasil disimpan
    } catch (error: any) {
      // 3. TANGKAP ERROR SPESIFIK DARI SERVER ACTION

      // A. Error Duplikasi (Kode/Nama sudah ada)
      if (error.message === "DUPLICATE_DATA") {
        toast.error("Gagal Simpan!", {
          description:
            "Kode atau Nama Kriteria sudah ada. Silakan gunakan identitas lain.",
          duration: 5000,
        });
      }
      // B. Error Validasi Bobot (Total > 1)
      else if (error.message === "WEIGHT_EXCEEDED") {
        toast.error("Bobot Terlalu Besar!", {
          description:
            "Total seluruh bobot kriteria tidak boleh melebihi 1.0 (100%). Kurangi bobot kriteria lain dulu!",
          duration: 6000,
        });
      }
      // C. Error Umum lainnya
      else {
        toast.error("Error Sistem", {
          description:
            "Terjadi kesalahan saat menyimpan data. Coba lagi nanti.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Tombol Pemicu Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
      >
        + Tambah Kriteria
      </button>

      {/* Latar Belakang Modal (Overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          {/* Kotak Modal */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Header Modal */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Tambah Kriteria
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            {/* Form Input */}
            <div className="p-6">
              <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kode
                    </label>
                    <input
                      type="text"
                      name="kode"
                      placeholder="Misal: C7"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bobot
                    </label>
                    <input
                      type="number"
                      step="0.0001" // Mendukung input desimal 4 angka belakang koma
                      name="bobot"
                      placeholder="Misal: 0.15"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Kriteria
                  </label>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Contoh: Kecepatan Respon"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Kriteria
                  </label>
                  <select
                    name="tipe"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-800"
                  >
                    <option value="benefit">
                      Benefit (Makin tinggi makin bagus)
                    </option>
                    <option value="cost">
                      Cost (Makin rendah makin bagus)
                    </option>
                  </select>
                </div>

                <div className="pt-4 flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md font-medium transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md font-medium transition-colors shadow-sm"
                  >
                    {isLoading ? "Menyimpan..." : "Simpan Data"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
