import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // 1. Import komponen Sidebar baru

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPK Fashion - SAW",
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
        {/* 2. Letakkan Toaster di sini agar bisa muncul di mana saja */}
        <Toaster position="bottom-right" richColors closeButton />

        <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
