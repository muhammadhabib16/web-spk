import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import InteractiveParticles from "@/components/InteractiveParticles";
import LoginButton from "@/components/LoginButton";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return redirect("/login?error=true");
    return redirect("/"); // Arahkan ke dashboard utama setelah login
  };

  return (
    // Container Utama: Split Screen
    <div className="min-h-screen flex relative overflow-hidden bg-[#0a0a0c] bg-persona-grid">
      {/* --- SISI KIRI: Visual & Partikel (Sembunyi di layar HP) --- */}
      <div className="hidden md:flex flex-1 relative flex-col items-center justify-center p-12">
        {/* Partikel Interaktif */}
        <div className="absolute inset-0 z-0">
          <InteractiveParticles />
        </div>

        {/* Ornamen Blur */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-indigo-300/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
        </div>

        {/* Copywriting Branding */}
        <div className="relative z-10 text-center select-none pointer-events-none">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-[#004de6] mb-8 border-4 border-white skew-x-[-15deg] clip-persona-card">
            {/* ICON DIPERBARUI: Tas Belanja */}
            <svg
              className="w-12 h-12 text-white skew-x-[15deg]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-tight mb-4 uppercase italic text-shadow-persona">
            Keputusan Tepat,
            <br />
            <span className="text-[#00b3ff]">
              Masa Depan Cepat.
            </span>
          </h2>
          <p className="text-gray-300 font-bold text-lg lg:text-2xl uppercase tracking-widest skew-x-[-5deg]">
            Sistem Penunjang Keputusan E-Commerce Fashion.
          </p>
        </div>
      </div>

      {/* --- SISI KANAN: Panel Form Login --- */}
      {/* Menggunakan clip-path custom untuk sisi kiri panel yang miring */}
      <div 
        className="w-full md:w-[450px] lg:w-[500px] bg-[#121212] h-screen flex flex-col justify-center px-8 sm:px-14 border-l-8 border-[#004de6] shadow-2xl relative z-10 animate-in slide-in-from-right-16 duration-700 overflow-y-auto"
      >
        {/* Header Form */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase italic text-shadow-persona">
            Otentikasi
          </h1>
          <p className="text-sm font-bold text-[#00b3ff] mt-2 uppercase tracking-widest border-l-4 border-white pl-2 skew-x-[-5deg]">
            Akses Administrator SPK
          </p>
        </div>

        {/* Pesan Error */}
        {searchParams.error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3">
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="font-bold">Email atau password salah.</p>
          </div>
        )}

        {/* Form Login */}
        <form action={signIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[12px] font-black text-white uppercase tracking-widest skew-x-[-5deg] inline-block bg-[#004de6] px-2 py-1 clip-persona-tag">
              <span className="skew-x-[5deg] block">Alamat Email</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@spk.com"
              className="w-full px-5 py-4 bg-black border-2 border-gray-800 focus:border-[#00b3ff] focus:outline-none transition-all duration-300 font-bold text-white placeholder:text-gray-600 clip-persona-button"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-black text-white uppercase tracking-widest skew-x-[-5deg] inline-block bg-[#004de6] px-2 py-1 clip-persona-tag">
              <span className="skew-x-[5deg] block">Password</span>
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-black border-2 border-gray-800 focus:border-[#00b3ff] focus:outline-none transition-all duration-300 font-bold text-white placeholder:text-gray-600 clip-persona-button"
            />
          </div>

          <div className="pt-2">
            <LoginButton />
          </div>
        </form>

        {/* Footer / Copyright */}
        <div className="mt-16 text-left opacity-50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            &copy; {new Date().getFullYear()} SPK SAW System
          </p>
        </div>
      </div>
    </div>
  );
}
