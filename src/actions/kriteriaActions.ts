"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/**
 * Fungsi pembantu untuk mengecek total bobot di database
 * Alasan: Menghitung total bobot kriteria agar tidak melebihi 1 (100%)
 */
async function checkTotalWeight(currentId: number | null, newWeight: number) {
  const { data: existingKriteria } = await supabase
    .from("kriteria")
    .select("id, bobot");

  if (!existingKriteria) return true; // Asumsikan valid jika gagal fetch

  const otherWeightsTotal = existingKriteria
    .filter((k) => k.id !== currentId)
    .reduce((sum, k) => sum + parseFloat(k.bobot), 0);

  const totalFutureWeight = otherWeightsTotal + newWeight;

  // Toleransi floating point JavaScript (0.0001)
  if (totalFutureWeight > 1.0001) {
    return false;
  }
  return true;
}

// 1. Fungsi Tambah Data
export async function tambahKriteria(formData: FormData) {
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as string;
  const bobot = parseFloat(formData.get("bobot") as string);

  try {
    // Validasi Bobot
    const isWeightValid = await checkTotalWeight(null, bobot);
    if (!isWeightValid) {
      return { success: false, error: "WEIGHT_EXCEEDED" };
    }

    const { error } = await supabase
      .from("kriteria")
      .insert([{ kode, nama, tipe, bobot }]);

    if (error) {
      // Menangkap error duplikasi (Unique Constraint) dari database
      if (error.code === "23505")
        return { success: false, error: "DUPLICATE_DATA" };
      return { success: false, error: error.message };
    }

    revalidatePath("/kriteria");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: "SERVER_ERROR" };
  }
}

// 2. Fungsi Hapus Data
export async function hapusKriteria(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  const { error } = await supabase.from("kriteria").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus:", error.message);
    return { success: false, error: "Gagal menghapus data" };
  }

  revalidatePath("/kriteria");
  return { success: true };
}

// 3. Fungsi Edit Data
export async function editKriteria(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as string;
  const bobot = parseFloat(formData.get("bobot") as string);

  try {
    // 1. Jalankan validasi bobot (masukkan ID saat ini agar bobot lama di-skip)
    const isWeightValid = await checkTotalWeight(id, bobot);

    if (!isWeightValid) {
      return { success: false, error: "WEIGHT_EXCEEDED" };
    }

    // 2. Update data ke database
    const { error } = await supabase
      .from("kriteria")
      .update({ kode, nama, tipe, bobot })
      .eq("id", id);

    if (error) {
      // 3. CEK DUPLIKASI SAAT EDIT
      // Jika user mengubah Kode/Nama ke nilai yang sudah dipakai kriteria lain
      if (error.code === "23505")
        return { success: false, error: "DUPLICATE_DATA" };
      return { success: false, error: error.message };
    }

    revalidatePath("/kriteria");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: "SERVER_ERROR" };
  }
}
