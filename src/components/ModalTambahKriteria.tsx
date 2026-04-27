"use client"; // Wajib karena kita pakai interaksi klik (useState)

import { useState } from "react";
import { tambahKriteria } from "@/actions/kriteriaActions";
import { toast } from "sonner";

export default function ModalTambahKriteria() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi pembungkus dengan penanganan error sesuai instruksi Bos
  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    // 1. Logika Jika Kosong (Client-side Validation)
    const kode = formData.get("kode");
    const nama = formData.get("nama");
    const bobot = formData.get("bobot");

    if (!kode || !nama || !bobot) {
      toast.error("Semua field kriteria wajib diisi.");
      setIsLoading(false);
      return;
    }

    try {
      // 2. Jalankan proses simpan kriteria
      // Kita tangkap balikan (return) dari server action
      const result = await tambahKriteria(formData);

      // 3. Cek apakah proses berhasil atau ada error spesifik
      if (result && !result.success) {
        // A. Logika Jika Duplikat
        if (result.error === "DUPLICATE_DATA") {
          toast.error(
            "Kriteria sudah ada. Gunakan kode atau nama yang berbeda.",
          );
        }
        // B. Logika Jika Bobot Salah (Lebih dari 1)
        else if (result.error === "WEIGHT_EXCEEDED") {
          toast.error("Total bobot kriteria tidak boleh melebihi 1.");
        }
        // C. Error lainnya dari server
        else {
          toast.error("Terjadi kesalahan sistem saat menyimpan data.");
        }

        setIsLoading(false);
        return; // Berhenti di sini, jangan tutup modal
      }

      // 4. Jika Sukses Total
      toast.success("Kriteria Berhasil Ditambahkan!");
      setIsOpen(false); // Tutup modal otomatis
    } catch (error: any) {
      // Ini hanya untuk jaga-jaga jika koneksi putus atau fatal error
      toast.error("Terjadi kesalahan koneksi ke server.");
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
        + Tambah Kriteria
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
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
                      placeholder="Misal: 0.15"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipe Kriteria
                  </label>
                  <select
                    name="tipe"
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
