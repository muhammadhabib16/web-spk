"use client";

import { usePathname } from "next/navigation";
import InteractiveParticles from "./InteractiveParticles";

export default function GlobalParticles() {
  const pathname = usePathname();

  // Matikan partikel global jika sedang di halaman login
  // (karena halaman login punya desain partikel split-screen sendiri)
  if (pathname === "/login") {
    return null;
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="sticky top-0 w-full h-[100dvh] opacity-100 pointer-events-auto">
        <InteractiveParticles />
      </div>
    </div>
  );
}
