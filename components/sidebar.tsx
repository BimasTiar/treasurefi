"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation"; 
import { Home, Zap, Gift, User, LogOut, ScrollText } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter(); 

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Missions", href: "/missions", icon: Zap },
    { name: "Rewards", href: "/rewards", icon: Gift },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Activity", href: "/activity", icon: ScrollText },
  ];

  // 3. Fungsi Logout
  const handleLogout = () => {
    // Hapus data login (token) dari penyimpanan browser
    localStorage.removeItem("user_token"); 
    // Lempar user ke halaman Login
    router.push("/auth/signin"); 
  };

  return (
    <aside className="w-64 bg-[#09090b] border-r border-white/10 flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* 1. LOGO */}
      <div className="p-6 flex items-center gap-3">
        <div className="text-3xl">💰</div> 
        <div>
          <h1 className="text-xl font-bold text-[#FBBF24]">TreasureFi</h1>
          <p className="text-[10px] text-gray-500">Quest for Gold</p>
        </div>
      </div>

      {/* 2. MENU */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. PROFILE BAWAH */}
      <div className="p-4 border-t border-white/10 m-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
            KS
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-white">Kepala Suku</p>
            <p className="text-xs text-[#FBBF24]">Level 100</p>
          </div>
          
          {/* 4. Pasang onClick di sini */}
          <LogOut 
            size={16} 
            className="text-gray-500 ml-auto hover:text-red-500 cursor-pointer transition-colors" 
            onClick={handleLogout}
          />
          
        </div>
      </div>
    </aside>
  );
}