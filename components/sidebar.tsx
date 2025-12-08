"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Zap, Gift, User, LogOut, ScrollText } from "lucide-react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Missions", href: "/missions", icon: Zap },
    { name: "Rewards", href: "/rewards", icon: Gift },
    { name: "Activity", href: "/activity", icon: ScrollText },
    { name: "Profile", href: "/profile", icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user_token");
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

      {/* 2. MENU NAVIGASI */}
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
              <Icon size={20} className={isActive ? "fill-[#FBBF24]/20" : ""} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* 3. PROFILE & WALLET CONNECTION */}
      <div className="p-4 border-t border-white/10 m-4 flex flex-col gap-3">
        
        {/* RainbowKit Connect Button (Custom UI) */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            const ready = mounted && authenticationStatus !== 'loading';
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === 'authenticated');

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button 
                        onClick={openConnectModal} 
                        className="w-full bg-[#FBBF24] text-black font-bold py-3 rounded-xl hover:bg-yellow-500 transition shadow-lg shadow-yellow-500/10 flex justify-center items-center gap-2 text-sm"
                      >
                        🔗 Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} className="w-full bg-red-500 text-white font-bold py-2 rounded-xl text-sm">
                        Wrong Network
                      </button>
                    );
                  }

                  return (
                    <div className="flex items-center gap-3 bg-white/5 p-2 rounded-xl cursor-pointer hover:bg-white/10 transition border border-white/5" onClick={openAccountModal}>
                      {/* Avatar Wallet Gradient */}
                      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FBBF24] flex-shrink-0">
                        {account.ensAvatar ? (
                          <img src={account.ensAvatar} alt="ENS Avatar" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                        )}
                      </div>
                      
                      <div className="overflow-hidden">
                        <p className="text-sm font-bold text-white truncate w-28">
                          {account.displayName}
                        </p>
                        <p className="text-xs text-[#FBBF24]">
                          {account.displayBalance ? `${account.displayBalance}` : ''}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>

        {/* Tombol Logout App (Kecil di bawah) */}
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full p-2 text-xs text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <LogOut size={14} /> Log Out App
        </button>

      </div>
    </aside>
  );
}