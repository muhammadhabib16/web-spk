import { supabase } from "@/lib/supabase";
import MatrixForm from "@/components/MatrixForm";

export const revalidate = 0;

export default async function PenilaianPage() {
  const [{ data: kriteria }, { data: alternatif }, { data: penilaian }] =
    await Promise.all([
      supabase.from("kriteria").select("*").order("kode", { ascending: true }),
      supabase
        .from("alternatif")
        .select("*")
        .order("kode", { ascending: true }),
      supabase.from("penilaian").select("*"),
    ]);

  return (
    <div className="p-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header Premium */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Matriks Keputusan
          </h1>
          <p className="text-gray-500 mt-1.5 text-sm font-medium">
            Berikan skor evaluasi (skala 1-5) untuk setiap alternatif
            berdasarkan parameter kriteria.
          </p>
        </div>
      </div>

      {/* Kontainer Form Matrix */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden relative">
        <MatrixForm
          kriteriaList={kriteria || []}
          alternatifList={alternatif || []}
          penilaianList={penilaian || []}
        />
      </div>
    </div>
  );
}
