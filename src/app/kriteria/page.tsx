"use server";
import { supabase } from "@/lib/supabase";
import { hapusKriteria } from "@/actions/kriteriaActions";
import ModalTambahKriteria from "@/components/ModalTambahKriteria";
import ModalEditKriteria from "@/components/ModalEditKriteria";
import DeleteButton from "@/components/DeleteButton";

export const revalidate = 0;

export default async function KriteriaPage() {
  const { data: kriteria, error } = await supabase
    .from("kriteria")
    .select("*")
    .order("kode", { ascending: true });

  if (error) {
    console.error("Error fetching kriteria:", error);
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
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
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-medium">Gagal mengambil data kriteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Bagian Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Kelola Kriteria
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm font-medium">
            Atur parameter, bobot, dan jenis penilaian untuk algoritma SAW.
          </p>
        </div>
        <div className="shrink-0">
          <ModalTambahKriteria />
        </div>
      </div>

      {/* Tabel Data Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-bold">Kode</th>
                <th className="px-6 py-4 font-bold">Nama Kriteria</th>
                <th className="px-6 py-4 font-bold">Sifat (Tipe)</th>
                <th className="px-6 py-4 font-bold">Bobot Parameter</th>
                <th className="px-6 py-4 font-bold text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {kriteria?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {item.kode}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium">
                    {item.nama}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full border ${
                        item.tipe.toLowerCase() === "benefit"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-rose-50 text-rose-700 border-rose-100"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          item.tipe.toLowerCase() === "benefit"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                      ></span>
                      {item.tipe.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 font-mono text-sm rounded-md font-semibold">
                      {item.bobot}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <ModalEditKriteria kriteria={item} />

                      {/* PERBAIKAN: Langsung panggil hapusKriteria tanpa fungsi pembungkus anonim */}
                      <form action={hapusKriteria}>
                        <input type="hidden" name="id" value={item.id} />
                        <DeleteButton />
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {(!kriteria || kriteria.length === 0) && (
                <tr>
                  <td colSpan={5} className="p-8">
                    <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                      <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 mb-4 shadow-sm">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h3 className="text-gray-900 font-bold text-lg">
                        Belum ada Kriteria
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 max-w-sm">
                        Sistem membutuhkan kriteria untuk memproses perhitungan
                        SAW. Klik tombol tambah di atas untuk memulai.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
