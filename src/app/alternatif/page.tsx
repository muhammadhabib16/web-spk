import { supabase } from "@/lib/supabase";
import { hapusAlternatif } from "@/actions/alternatifActions";
import ModalTambahAlternatif from "@/components/ModalTambahAlternatif";
import ModalEditAlternatif from "@/components/ModalEditAlternatif";

export const revalidate = 0;

export default async function AlternatifPage() {
  const { data: alternatif } = await supabase
    .from("alternatif")
    .select("*")
    .order("kode", { ascending: true });

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in duration-500">
      {/* Bagian Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Kelola Alternatif
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm font-medium">
            Daftarkan platform e-commerce sebagai kandidat penilaian sistem.
          </p>
        </div>
        <div className="shrink-0">
          <ModalTambahAlternatif />
        </div>
      </div>

      {/* Tabel Data Card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_16px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-widest">
                <th className="px-6 py-4 font-bold w-32">ID Kode</th>
                <th className="px-6 py-4 font-bold">Nama Platform</th>
                <th className="px-6 py-4 font-bold text-center w-48">
                  Tindakan
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {alternatif?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">
                      {item.kode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar Inisial Visual */}
                      <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-xs shadow-sm group-hover:bg-white transition-colors">
                        {item.nama.substring(0, 2).toUpperCase()}
                      </div>
                      <span className="text-gray-800 font-semibold tracking-tight">
                        {item.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <ModalEditAlternatif alternatif={item} />

                      <form action={hapusAlternatif}>
                        <input type="hidden" name="id" value={item.id} />
                        <button
                          type="submit"
                          className="px-3 py-1.5 text-xs font-bold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all"
                        >
                          Hapus
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {(!alternatif || alternatif.length === 0) && (
                <tr>
                  <td colSpan={3} className="p-8">
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
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-gray-900 font-bold text-lg">
                        Daftar Masih Kosong
                      </h3>
                      <p className="text-gray-500 text-sm mt-1 max-w-sm">
                        Belum ada platform e-commerce yang didaftarkan. Klik
                        tombol di atas untuk menambah alternatif baru.
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
