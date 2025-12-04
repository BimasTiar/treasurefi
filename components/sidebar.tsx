"use client";

import { Home, Zap, Gift, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/missions", label: "Missions", icon: Zap },
    { href: "/rewards", label: "Rewards", icon: Gift },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#09090b] border-r border-white/10 flex flex-col p-6 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-3xl">💰</span>
        <div>
          <h1 className="text-xl font-bold text-[#FBBF24]">TreasureFi</h1>
          <p className="text-[10px] text-gray-500">Quest for Gold</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="space-y-1 flex-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-[#FBBF24]/10 text-[#FBBF24] border border-[#FBBF24]/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-white/10 pt-4 mt-auto flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#FBBF24] flex items-center justify-center text-black font-bold">
          AJ
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold truncate">Alex Johnson</p>
          <p className="text-xs text-gray-500">Level 12</p>
        </div>
        <LogOut size={18} className="text-gray-500 hover:text-white cursor-pointer" />
      </div>
    </aside>
  );
}