"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Mendefinisikan tipe data yang akan dikirim
type DataPenilaian = {
  alternatif_id: number;
  kriteria_id: number;
  nilai: number;
};

export async function simpanMatriksPenilaian(data: DataPenilaian[]) {
  // Menggunakan 'upsert': Jika data (alternatif + kriteria) belum ada, maka di-insert.
  // Jika sudah ada, maka di-update nilainya.
  const { error } = await supabase
    .from("penilaian")
    .upsert(data, { onConflict: "alternatif_id,kriteria_id" });

  if (error) {
    console.error("Gagal simpan matriks:", error.message);
    throw new Error("Terjadi kesalahan saat menyimpan matriks penilaian");
  }

  // Refresh halaman penilaian dan halaman utama (leaderboard) agar ranking langsung berubah
  revalidatePath("/penilaian");
  revalidatePath("/");
}
