import { calculateSAW } from "@/utils/sawCalculations";
import DashboardOverview from "@/components/DashboardOverview";

export const revalidate = 0;

export default async function DashboardSPK() {
  // Mengambil data terkini dari database
  const processData = await calculateSAW();

  return (
    // Tema Gelap Persona
    <main className="min-h-screen bg-transparent p-4 sm:p-8 relative flex flex-col font-sans overflow-x-hidden">
      {/* --- EFEK GRADASI GELAP PERSONA --- */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#004de6]/20 to-transparent z-0 pointer-events-none"></div>

      {/* --- KONTEN DASHBOARD UTAMA --- */}
      <div className="relative z-10 w-full flex-1">
        {/* Panggil komponen Client Dashboard Overview */}
        <DashboardOverview processData={processData} />
      </div>
    </main>
  );
}
