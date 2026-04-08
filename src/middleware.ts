import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // Bawaan bawaan Next.js untuk melanjutkan request
  let supabaseResponse = NextResponse.next({ request });

  // Inisialisasi Supabase untuk Middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Ambil sesi user saat ini (apakah dia punya tiket login?)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Daftar rute URL yang harus digembok
  const path = request.nextUrl.pathname;
  const isProtectedRoute =
    path === "/" ||
    path.startsWith("/kriteria") ||
    path.startsWith("/alternatif") ||
    path.startsWith("/penilaian");

  // LOGIKA 1: Jika mencoba buka halaman rahasia TAPI belum login -> Tendang ke /login
  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // LOGIKA 2: Jika sudah login TAPI iseng buka /login lagi -> Arahkan ke dashboard admin
  if (path === "/login" && user) {
    return NextResponse.redirect(new URL("/kriteria", request.url));
  }

  return supabaseResponse;
}

// Konfigurasi ini menyuruh Next.js agar middleware berjalan di semua rute,
// KECUALI untuk file gambar, CSS, atau aset statis lainnya agar website tetap cepat.
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
