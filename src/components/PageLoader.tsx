"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import nProgress from "nprogress";
import "nprogress/nprogress.css";

// Konfigurasi NProgress
nProgress.configure({ showSpinner: false, speed: 400, minimum: 0.3 });

export default function PageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Setiap kali rute berubah, hentikan progress bar
    nProgress.done();
  }, [pathname, searchParams]);

  useEffect(() => {
    // Tambahkan event listener untuk mendeteksi klik pada Link
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.href && anchor.target !== "_blank") {
        const url = new URL(anchor.href);
        if (
          url.origin === window.location.origin &&
          url.pathname !== pathname
        ) {
          nProgress.start();
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  return null;
}
