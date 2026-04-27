"use client";

import { useState } from "react";
import { tambahAlternatif } from "@/actions/alternatifActions";
import { toast } from "sonner"; // Pastikan sudah diinstall dan ada di layout

export default function ModalTambahAlternatif() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      // 1. Jalankan proses simpan
      await tambahAlternatif(formData);

      // 2. Jika sukses
      toast.success("Berhasil!", {
        description: "Alternatif baru berhasil ditambahkan ke database.",
      });
      setIsOpen(false); // Tutup modal hanya jika berhasil
    } catch (error: any) {
      // 3. TANGKAP ERROR DUPLIKAT DI SINI BOS
      if (error.message === "DUPLICATE_DATA") {
        toast.error("Data Duplikat!", {
          description: "Kode atau Nama tersebut sudah ada, gunakan yang lain",
          duration: 5000,
        });
      } else {
        toast.error("Gagal Simpan", {
          description: "Terjadi kesalahan sistem, silakan coba lagi nanti.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
      >
        + Tambah Alternatif
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">
                Tambah Alternatif
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <form action={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kode Alternatif
                  </label>
                  <input
                    type="text"
                    name="kode"
                    placeholder="Misal: A5"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Platform
                  </label>
                  <input
                    type="text"
                    name="nama"
                    placeholder="Contoh: Lazada"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
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
