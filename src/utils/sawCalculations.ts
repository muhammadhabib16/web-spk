import { supabase } from "@/lib/supabase";

// 1. UPDATE TIPE DATA: rincian sekarang adalah array of objects agar fleksibel di frontend
export type SAWProcessData = {
  kriteria: any[];
  alternatif: any[];
  matriksMentah: Record<number, Record<number, number>>;
  maxValues: Record<number, number>;
  matriksNormalisasi: Record<number, Record<number, number>>;
  ranking: {
    id: number;
    nama: string;
    skor: number;
    rincian: { w: number; r: number }[]; // Format baru
  }[];
};

export async function calculateSAW(): Promise<SAWProcessData | null> {
  const { data: kriteria } = await supabase
    .from("kriteria")
    .select("*")
    .order("kode", { ascending: true });
  const { data: alternatif } = await supabase
    .from("alternatif")
    .select("*")
    .order("kode", { ascending: true });
  const { data: penilaian } = await supabase.from("penilaian").select("*");

  if (
    !kriteria ||
    !alternatif ||
    !penilaian ||
    kriteria.length === 0 ||
    alternatif.length === 0
  ) {
    return null;
  }

  // 1. Susun Matriks Mentah (X)
  const matriksMentah: Record<number, Record<number, number>> = {};
  alternatif.forEach((alt) => {
    matriksMentah[alt.id] = {};
    kriteria.forEach((krit) => {
      const p = penilaian.find(
        (p) => p.alternatif_id === alt.id && p.kriteria_id === krit.id,
      );
      matriksMentah[alt.id][krit.id] = p ? p.nilai : 0;
    });
  });

  // 2. Cari Nilai Maksimal per Kriteria (Khusus Benefit)
  const maxValues: Record<number, number> = {};
  kriteria.forEach((k) => {
    const scores = penilaian
      .filter((p) => p.kriteria_id === k.id)
      .map((p) => p.nilai);
    maxValues[k.id] = scores.length > 0 ? Math.max(...scores) : 0;
  });

  // 3. Matriks Normalisasi (R) & Hitung Preferensi (V)
  const matriksNormalisasi: Record<number, Record<number, number>> = {};

  const results = alternatif.map((alt) => {
    let totalSkor = 0;
    matriksNormalisasi[alt.id] = {};

    // Inisialisasi rincian sebagai array object
    const rincian: { w: number; r: number }[] = [];

    kriteria.forEach((k) => {
      const nilaiMentah = matriksMentah[alt.id][k.id];

      // Hitung Normalisasi (r) murni tanpa pembulatan
      const r = maxValues[k.id] === 0 ? 0 : nilaiMentah / maxValues[k.id];

      // Simpan nilai murni untuk matriks normalisasi
      matriksNormalisasi[alt.id][k.id] = r;

      // Hitung bobot kriteria * nilai normalisasi
      const nilaiAkhir = k.bobot * r;
      totalSkor += nilaiAkhir;

      // 2. MASUKKAN OBJECT: w (bobot) dan r (normalisasi)
      rincian.push({
        w: k.bobot,
        r: r,
      });
    });

    return {
      id: alt.id,
      nama: alt.nama,
      skor: totalSkor, // Total skor murni (pemotongan dilakukan di frontend)
      rincian: rincian,
    };
  });

  // 4. Urutkan Ranking (Tertinggi ke Terendah)
  const ranking = results.sort((a, b) => b.skor - a.skor);

  return {
    kriteria,
    alternatif,
    matriksMentah,
    maxValues,
    matriksNormalisasi,
    ranking,
  };
}
