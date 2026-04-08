"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Fungsi Tambah Alternatif
export async function tambahAlternatif(formData: FormData) {
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;

  const { error } = await supabase.from("alternatif").insert([{ kode, nama }]);

  if (error) {
    console.error("Gagal tambah alternatif:", error.message);
    throw new Error("Gagal menyimpan data alternatif");
  }

  revalidatePath("/alternatif");
}

// Fungsi Hapus Alternatif
export async function hapusAlternatif(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  const { error } = await supabase.from("alternatif").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus alternatif:", error.message);
    throw new Error("Gagal menghapus data alternatif");
  }

  revalidatePath("/alternatif");
}

export async function editAlternatif(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;

  const { error } = await supabase
    .from("alternatif")
    .update({ kode, nama })
    .eq("id", id);

  if (error) {
    console.error("Gagal update alternatif:", error.message);
    throw new Error("Gagal memperbarui data alternatif");
  }

  // Segarkan data di halaman alternatif
  revalidatePath("/alternatif");
}
