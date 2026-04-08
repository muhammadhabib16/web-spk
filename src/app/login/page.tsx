import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";
import InteractiveParticles from "@/components/InteractiveParticles"; // 1. Import komponen

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
    return redirect("/kriteria");
  };

  return (
    // Background: Gradasi Linear Halus
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-blue-50">
      {/* 2. Partikel Interaktif di Background */}
      <InteractiveParticles />

      {/* Ornamen Blur Tambahan agar tetap estetik */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-300/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Container Form: Ultra-Clean Glassmorphism */}
      <div className="max-w-md w-full bg-white/60 backdrop-blur-3xl rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(59,130,246,0.12)] p-12 border border-white/80 relative z-10 animate-in fade-in zoom-in-95 duration-1000">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-[2rem] mb-6 shadow-2xl shadow-blue-400/40 hover:scale-110 transition-transform duration-500">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
            SPK<span className="text-blue-600">Fashion</span>
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mt-3">
            Admin Secure Access
          </p>
        </div>

        {/* Error Message */}
        {searchParams.error && (
          <div className="mb-8 p-4 bg-red-50/80 backdrop-blur-md border border-red-100 text-red-600 text-sm rounded-2xl flex items-center gap-3 animate-bounce">
            <p className="font-bold">Email atau password salah.</p>
          </div>
        )}

        <form action={signIn} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@spk.com"
              className="w-full px-6 py-4.5 bg-white/50 border border-white rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:outline-none transition-all duration-300 font-semibold"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-6 py-4.5 bg-white/50 border border-white rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white focus:outline-none transition-all duration-300 font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-black py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-blue-300/50 mt-4 flex items-center justify-center gap-3 text-lg"
          >
            Masuk ke Sistem
          </button>
        </form>

        <div className="mt-12 text-center opacity-40">
          <p className="text-[9px] font-black uppercase tracking-[0.3em]">
            SPK SAW &copy; 2026
          </p>
        </div>
      </div>
    </div>
  );
}
