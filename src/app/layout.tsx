import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import PageLoader from "@/components/PageLoader";
import GlobalParticles from "@/components/GlobalParticles"; // 1. Import Partikel Global
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EcomRank",
  description: "Sistem Penunjang Keputusan E-Commerce Fashion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        <Toaster position="bottom-right" richColors closeButton />

        {/* Latar Belakang Dasar */}
        <div className="flex h-screen bg-[#F8FAFC] font-sans text-gray-900">
          <Sidebar />

          {/* Tag Main diubah agar bisa menampung partikel dan children dengan rapi */}
          <main className="flex-1 overflow-y-auto relative flex flex-col">
            {/* 2. Pasang Partikel Global di Sini */}
            <GlobalParticles />

            {/* 3. Children (Halaman) dibungkus agar selalu berada di atas partikel */}
            <div className="relative z-10 w-full flex-1">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
