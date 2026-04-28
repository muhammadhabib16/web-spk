"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// 1. Fungsi Tambah Alternatif
export async function tambahAlternatif(formData: FormData) {
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;

  try {
    const { error } = await supabase
      .from("alternatif")
      .insert([{ kode, nama }]);

    if (error) {
      // Menangkap error duplikasi (23505)
      if (error.code === "23505")
        return { success: false, error: "DUPLICATE_DATA" };
      return { success: false, error: error.message };
    }

    revalidatePath("/alternatif");
    return { success: true };
  } catch (err) {
    return { success: false, error: "SERVER_ERROR" };
  }
}

// 2. Fungsi Hapus Alternatif
export async function hapusAlternatif(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  try {
    const { error } = await supabase.from("alternatif").delete().eq("id", id);

    if (error) {
      console.error("Gagal hapus alternatif:", error.message);
      return { success: false, error: "Gagal menghapus data" };
    }

    revalidatePath("/alternatif");
    return { success: true };
  } catch (err) {
    return { success: false, error: "SERVER_ERROR" };
  }
}

// 3. Fungsi Edit Alternatif
export async function editAlternatif(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;

  try {
    const { error } = await supabase
      .from("alternatif")
      .update({ kode, nama })
      .eq("id", id);

    if (error) {
      console.error("Gagal update alternatif:", error.message);

      // --- PENGECEKAN DUPLIKAT SAAT EDIT ---
      if (error.code === "23505") {
        return { success: false, error: "DUPLICATE_DATA" };
      }
      return { success: false, error: "Gagal memperbarui data alternatif" };
    }

    revalidatePath("/alternatif");
    return { success: true };
  } catch (err) {
    return { success: false, error: "SERVER_ERROR" };
  }
}
