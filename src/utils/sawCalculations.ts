import { supabase } from "@/lib/supabase";

// Tipe data yang lebih lengkap untuk menangkap semua langkah
export type SAWProcessData = {
  kriteria: any[];
  alternatif: any[];
  matriksMentah: Record<number, Record<number, number>>;
  maxValues: Record<number, number>;
  matriksNormalisasi: Record<number, Record<number, number>>;
  ranking: { id: number; nama: string; skor: number; rincian: string[] }[];
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

  // 2. Cari Nilai Maksimal per Kriteria
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
    const rincian: string[] = []; // Untuk menyimpan teks (0.25 * 0.8)

    kriteria.forEach((k) => {
      const nilaiMentah = matriksMentah[alt.id][k.id];
      // Jika kriteria Cost, rumusnya Min/X. Karena di data Bos semua Benefit, kita pakai X/Max
      const r = maxValues[k.id] === 0 ? 0 : nilaiMentah / maxValues[k.id];

      matriksNormalisasi[alt.id][k.id] = Number(r.toFixed(2));

      const nilaiAkhir = k.bobot * r;
      totalSkor += nilaiAkhir;

      rincian.push(`(${k.bobot} × ${r.toFixed(2)})`);
    });

    return {
      id: alt.id,
      nama: alt.nama,
      skor: Number(totalSkor.toFixed(2)),
      rincian: rincian,
    };
  });

  // 4. Urutkan Ranking
  const ranking = results.sort((a, b) => b.skor - a.skor);

  // KEMBALIKAN SEMUA DATA PROSES
  return {
    kriteria,
    alternatif,
    matriksMentah,
    maxValues,
    matriksNormalisasi,
    ranking,
  };
}
