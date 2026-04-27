"use client";

import { useState } from "react";
import { editKriteria } from "@/actions/kriteriaActions";
import { toast } from "sonner"; // Tambahkan import toast agar tidak error

// Mendefinisikan bentuk data yang diterima modal
type Kriteria = {
  id: number;
  kode: string;
  nama: string;
  tipe: string;
  bobot: number;
};

export default function ModalEditKriteria({
  kriteria,
}: {
  kriteria: Kriteria;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    try {
      const result = await editKriteria(formData);

      if (result && !result.success) {
        // 1. Penanganan Error Bobot Melebihi 1
        if (result.error === "WEIGHT_EXCEEDED") {
          toast.error("Total bobot yang dimasukan melebihi 1");
        }
        // 2. Penanganan Error Duplikat (Update sesuai permintaan Bos)
        else if (result.error === "DUPLICATE_DATA") {
          toast.error(
            "Kriteria yang dimasukan sudah ada. Gunakan kode atau nama yang berbeda.",
          );
        } else {
          toast.error("Gagal memperbarui data.");
        }

        setIsLoading(false);
        return;
      }

      toast.success("Kriteria Berhasil Diperbarui!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Terjadi kesalahan sistem.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Tombol Pemicu Modal (Teks Edit warna Biru) */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">Edit Kriteria</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors text-2xl leading-none"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <form action={handleSubmit} className="space-y-4">
                {/* Input ID Tersembunyi untuk backend */}
                <input type="hidden" name="id" value={kriteria.id} />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kode
                    </label>
                    <input
                      type="text"
                      name="kode"
                      defaultValue={kriteria.kode}
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
                      step="0.0001"
                      name="bobot"
                      defaultValue={kriteria.bobot}
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
                    defaultValue={kriteria.nama}
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
                    defaultValue={kriteria.tipe}
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
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
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
