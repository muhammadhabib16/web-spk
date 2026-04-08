import { createClient } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  // Server Action untuk memproses login
  const signIn = async (formData: FormData) => {
    "use server";
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?error=true");
    }

    // Jika berhasil, arahkan langsung ke halaman kelola kriteria
    return redirect("/kriteria");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-blue-700 tracking-tight">
            SPK<span className="text-gray-800">Fashion</span>
          </h1>
          <h2 className="text-gray-500 mt-2 font-medium">Login Admin Panel</h2>
        </div>

        {/* Pesan Error jika password salah */}
        {searchParams.error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r">
            Email atau Password salah. Silakan coba lagi.
          </div>
        )}

        <form action={signIn} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="admin@spk.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg transition-colors mt-2"
          >
            Masuk ke Dashboard
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Hanya administrator yang diizinkan masuk.
        </div>
      </div>
    </div>
  );
}
