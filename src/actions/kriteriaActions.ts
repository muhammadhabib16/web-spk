"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Fungsi pembantu untuk mengecek total bobot di database
 * Alasan: Reusable untuk fungsi Tambah dan Edit
 */
async function checkTotalWeight(currentId: number | null, newWeight: number) {
  // Ambil semua data kriteria yang ada
  const { data: existingKriteria } = await supabase
    .from("kriteria")
    .select("id, bobot");

  if (!existingKriteria) return;

  // Hitung total bobot kriteria lain (kecuali kriteria yang sedang diedit)
  const otherWeightsTotal = existingKriteria
    .filter((k) => k.id !== currentId) // Jika Tambah, currentId null. Jika Edit, skip ID sendiri.
    .reduce((sum, k) => sum + parseFloat(k.bobot), 0);

  const totalFutureWeight = otherWeightsTotal + newWeight;

  // Toleransi 0.0001 untuk mengatasi masalah presisi floating point JavaScript
  if (totalFutureWeight > 1.0001) {
    throw new Error("WEIGHT_EXCEEDED");
  }
}

// 1. Fungsi Tambah Data
export async function tambahKriteria(formData: FormData) {
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as string;
  const bobot = parseFloat(formData.get("bobot") as string);

  try {
    // Jalankan validasi bobot (currentId null karena data baru)
    await checkTotalWeight(null, bobot);

    const { error } = await supabase
      .from("kriteria")
      .insert([{ kode, nama, tipe, bobot }]);

    if (error) {
      if (error.code === "23505") throw new Error("DUPLICATE_DATA");
      throw new Error(error.message);
    }

    revalidatePath("/kriteria");
  } catch (err: any) {
    // Lempar kembali error spesifik agar ditangkap UI
    throw new Error(err.message);
  }
}

// 2. Fungsi Hapus Data
export async function hapusKriteria(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  const { error } = await supabase.from("kriteria").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus:", error.message);
    throw new Error("Gagal menghapus data kriteria");
  }

  revalidatePath("/kriteria");
}

// 3. Fungsi Edit Data
export async function editKriteria(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as string;
  const bobot = parseFloat(formData.get("bobot") as string);

  try {
    // Jalankan validasi bobot (masukkan ID saat ini agar bobot lama tidak ikut dihitung)
    await checkTotalWeight(id, bobot);

    const { error } = await supabase
      .from("kriteria")
      .update({ kode, nama, tipe, bobot })
      .eq("id", id);

    if (error) {
      if (error.code === "23505") throw new Error("DUPLICATE_DATA");
      throw new Error(error.message);
    }

    revalidatePath("/kriteria");
  } catch (err: any) {
    throw new Error(err.message);
  }
}
