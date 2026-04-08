"use server"; // Wajib ada untuk menandakan ini berjalan di server

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Fungsi Tambah Data
export async function tambahKriteria(formData: FormData) {
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as string;
  const bobot = parseFloat(formData.get("bobot") as string);

  const { error } = await supabase
    .from("kriteria")
    .insert([{ kode, nama, tipe, bobot }]);

  if (error) {
    console.error("Gagal tambah:", error.message);
    throw new Error("Gagal menyimpan data kriteria");
  }

  // Hanya refresh tabel secara instan, TIDAK ADA redirect
  revalidatePath("/kriteria");
}

// Fungsi Hapus Data
export async function hapusKriteria(formData: FormData) {
  const id = parseInt(formData.get("id") as string);

  const { error } = await supabase.from("kriteria").delete().eq("id", id);

  if (error) {
    console.error("Gagal hapus:", error.message);
    throw new Error("Gagal menghapus data kriteria");
  }

  // Refresh data tabel secara instan
  revalidatePath("/kriteria");
}

export async function editKriteria(formData: FormData) {
  const id = parseInt(formData.get("id") as string);
  const kode = formData.get("kode") as string;
  const nama = formData.get("nama") as string;
  const tipe = formData.get("tipe") as string;
  const bobot = parseFloat(formData.get("bobot") as string);

  // Perintah update ke Supabase berdasarkan ID
  const { error } = await supabase
    .from("kriteria")
    .update({ kode, nama, tipe, bobot })
    .eq("id", id);

  if (error) {
    console.error("Gagal update:", error.message);
    throw new Error("Gagal memperbarui data kriteria");
  }

  // Refresh tabel secara instan
  revalidatePath("/kriteria");
}
