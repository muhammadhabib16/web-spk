"use client";

import { useState } from "react";
import { editKriteria } from "@/actions/kriteriaActions";

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
    await editKriteria(formData);
    setIsLoading(false);
    setIsOpen(false);
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bobot
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="bobot"
                      defaultValue={kriteria.bobot}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white"
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
