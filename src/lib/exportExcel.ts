// src/lib/exportExcel.ts
import * as XLSX from "xlsx";

/**
 * Fungsi Helper Truncate khusus untuk Excel agar konsisten dengan Web
 */
const formatTruncateExcel = (num: number) => {
  if (!num) return "0.0000";
  const truncated = Math.floor(num * 10000) / 10000;
  return truncated.toFixed(4);
};

export const exportFullReportToExcel = (processData: any) => {
  const { kriteria, alternatif, matriksMentah, matriksNormalisasi, ranking } =
    processData;

  const workbook = XLSX.utils.book_new();

  // --- SHEET 1: MATRIKS KEPUTUSAN AWAL (X) ---
  const dataX = alternatif.map((alt: any) => {
    const row: any = { Alternatif: alt.nama };
    kriteria.forEach((k: any) => {
      row[k.kode] = formatTruncateExcel(matriksMentah[alt.id][k.id]);
    });
    return row;
  });
  const wsX = XLSX.utils.json_to_sheet(dataX);
  XLSX.utils.book_append_sheet(workbook, wsX, "1. Matriks Keputusan (X)");

  // --- SHEET 2: MATRIKS NORMALISASI (R) ---
  const dataR = alternatif.map((alt: any) => {
    const row: any = { Alternatif: alt.nama };
    kriteria.forEach((k: any) => {
      row[k.kode] = formatTruncateExcel(matriksNormalisasi[alt.id][k.id]);
    });
    return row;
  });
  const wsR = XLSX.utils.json_to_sheet(dataR);
  XLSX.utils.book_append_sheet(workbook, wsR, "2. Matriks Normalisasi (R)");

  // --- SHEET 3: HASIL AKHIR & RANKING ---
  const dataRanking = ranking.map((item: any, index: number) => ({
    Rank: index + 1,
    "Nama Platform": item.nama,
    "Skor Akhir": formatTruncateExcel(item.skor),
    // PERBAIKAN DI SINI: Kita mapping objek {w, r} menjadi string yang bisa dibaca Excel
    "Rincian Perhitungan": item.rincian
      .map(
        (d: any) =>
          `(${formatTruncateExcel(d.w)} x ${formatTruncateExcel(d.r)})`,
      )
      .join(" + "),
  }));
  const wsRank = XLSX.utils.json_to_sheet(dataRanking);

  // Atur lebar kolom untuk rincian agar tidak sempit
  wsRank["!cols"] = [{ wch: 8 }, { wch: 20 }, { wch: 15 }, { wch: 80 }];
  XLSX.utils.book_append_sheet(workbook, wsRank, "3. Hasil Akhir");

  // Simpan File
  XLSX.writeFile(workbook, "Laporan_Lengkap_EcomRank.xlsx");
};
