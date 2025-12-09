"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname(); // Untuk tahu kita sedang di halaman mana
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user_token");
    
    // Daftar halaman yang boleh diakses TANPA login (Public Routes)
    const publicPaths = ["/auth/signin", "/auth/signup"];

    // Cek apakah halaman saat ini adalah halaman publik
    const isPublicPage = publicPaths.some((path) => pathname.startsWith(path));

    if (isPublicPage) {
      // Kalau mau ke Login/Signup, silakan lewat
      setIsAuthorized(true);
    } else {
      // Kalau mau ke halaman lain (Home, Profile, dll)
      if (!token) {
        // Gak punya token? Tendang ke Sign In
        router.push("/auth/signin");
      } else {
        // Punya token? Silakan masuk
        setIsAuthorized(true);
      }
    }
  }, [router, pathname]);

  // Selama pemeriksaan, jangan tampilkan konten apa-apa (Layar Hitam)
  // Ini mencegah "Flash" konten yang sempat terlihat sekilas
  if (!isAuthorized) {
    return <div className="min-h-screen bg-[#09090b]" />;
  }

  // Jika lolos pemeriksaan, tampilkan halaman
  return <>{children}</>;
}