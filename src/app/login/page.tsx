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
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
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
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-8 shadow-2xl shadow-blue-400/40 rotate-3">
            {/* ICON DIPERBARUI: Tas Belanja */}
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tighter leading-tight mb-4">
            Keputusan Tepat,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Masa Depan Cepat.
            </span>
          </h2>
          <p className="text-gray-500 font-medium text-lg lg:text-xl">
            Sistem Penunjang Keputusan E-Commerce Fashion.
          </p>
        </div>
      </div>

      {/* --- SISI KANAN: Panel Form Login --- */}
      {/* Menggunakan w-full di HP, max-w-md/lg di desktop, rounded-none agar nempel ke tepi */}
      <div className="w-full md:w-[450px] lg:w-[500px] bg-white/95 backdrop-blur-2xl h-screen flex flex-col justify-center px-8 sm:px-14 border-l border-gray-100 shadow-[-20px_0_40px_-15px_rgba(0,0,0,0.05)] relative z-10 animate-in slide-in-from-right-16 duration-700 overflow-y-auto">
        {/* Header Form */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Selamat Datang
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-2">
            Silakan masuk dengan kredensial administrator Anda untuk mengakses
            Dashboard SPK.
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
        <form action={signIn} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              Alamat Email
            </label>
            {/* Radius dikurangi menjadi rounded-xl, bukan lagi 2xl/3rem */}
            <input
              type="email"
              name="email"
              required
              placeholder="admin@spk.com"
              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-semibold text-gray-800 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-50 focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-semibold text-gray-800 placeholder:text-gray-400"
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
