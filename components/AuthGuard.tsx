"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!pathname) return;

    const token = localStorage.getItem("user_token");

    const publicPages = ["/auth/signin", "/auth/signup"];
    const isPublic = publicPages.some((p) => pathname.startsWith(p));

    if (!token && !isPublic) {
      router.replace("/auth/signin");
      return;
    }

    setChecked(true);
  }, [pathname]);

  if (!checked) return <div className="min-h-screen bg-[#09090b]" />;

  return <>{children}</>;
}