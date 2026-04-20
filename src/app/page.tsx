import { calculateSAW } from "@/utils/sawCalculations";
import DashboardOverview from "@/components/DashboardOverview";

export const revalidate = 0;

export default async function DashboardSPK() {
  // Mengambil data terkini dari database
  const processData = await calculateSAW();

  return (
    // Menggunakan bg-gray-50 agar senada dengan halaman About
    <main className="min-h-screen bg-gray-60 p-4 sm:p-8 relative flex flex-col font-sans overflow-x-hidden">
      {/* --- EFEK GRADASI HALUS DI ATAS --- */}
      {/* Membuat transisi halus dari atap putih ke abu-abu muda di bawah */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent z-0 pointer-events-none"></div>

      {/* --- KONTEN DASHBOARD UTAMA --- */}
      <div className="relative z-10 w-full flex-1">
        {/* Panggil komponen Client Dashboard Overview */}
        <DashboardOverview processData={processData} />
      </div>
    </main>
  );
}
