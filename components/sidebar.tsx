"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Zap, Gift, User, LogOut, ScrollText } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [userData, setUserData] = useState<any>(null);

  // Ambil UID dari localStorage
  function safeUid() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("user_uid");
  }

  useEffect(() => {
    async function loadUser() {
      const uid = safeUid();
      if (!uid) return;

      try {
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) {
          setUserData(snap.data());
        }
      } catch (err) {
        console.error("Sidebar user load error:", err);
      }
    }

    loadUser();
  }, []);

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Missions", href: "/missions", icon: Zap },
    { name: "Rewards", href: "/rewards", icon: Gift },
    { name: "Activity", href: "/activity", icon: ScrollText },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_uid");
    router.push("/auth/signin");
  };

  const initials = userData?.name
    ? userData.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <aside className="w-64 bg-[#09090b] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">

      {/* LOGO */}
      <div className="p-6 flex items-center gap-3">
        <div className="text-3xl">💰</div>
        <div>
          <h1 className="text-xl font-bold text-[#FBBF24]">TreasureFi</h1>
          <p className="text-[10px] text-gray-500">Quest for Gold</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20 shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* PROFILE */}
      <div className="p-4 border-t border-white/10 m-4">
        <div className="flex items-center gap-3">
          {/* Dynamic initials */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
            {initials}
          </div>

          {/* Dynamic name + level */}
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white">
              {userData?.name ?? "User"}
            </p>
            <p className="text-xs text-[#FBBF24]">
              Level {userData?.level ?? 1}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="ml-auto p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

    </aside>
  );
}