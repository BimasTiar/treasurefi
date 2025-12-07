"use client";

import { Copy, Settings, User } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <button className="p-2 bg-[#1A1A1A] rounded-xl hover:bg-white/10 transition">
          <Settings size={20} />
        </button>
      </div>

      {/* Avatar Card */}
      <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#3B82F6]/20 to-transparent"></div>
        
        <div className="relative w-32 h-32 rounded-full border-4 border-[#09090b] shadow-xl mb-4 bg-gradient-to-br from-blue-500 to-purple-500 p-1">
          <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center text-5xl">
            👨‍🚀
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-white">Kepala Suku</h2>
        <p className="text-[#FBBF24] font-bold text-sm mt-1 bg-[#FBBF24]/10 px-3 py-1 rounded-full border border-[#FBBF24]/20">
          Level 99 Saver
        </p>

        <div className="mt-8 w-full space-y-4">
          <div className="bg-black/40 p-4 rounded-xl flex justify-between items-center border border-white/5">
            <div>
              <p className="text-xs text-gray-500 text-left">Wallet Address</p>
              <p className="font-mono text-sm text-gray-300">0x742d...9f3a</p>
            </div>
            <button 
              onClick={() => handleCopy("0x742d...9f3a")}
              className="p-2 hover:bg-white/10 rounded-lg transition"
            >
              {copied ? <span className="text-green-500 text-xs font-bold">Copied!</span> : <Copy size={18} className="text-blue-400" />}
            </button>
          </div>

          <div className="bg-black/40 p-4 rounded-xl flex justify-between items-center border border-white/5">
            <div>
              <p className="text-xs text-gray-500 text-left">Email</p>
              <p className="text-sm text-gray-300">kepala.suku@treasurefi.com</p>
            </div>
            <div className="p-2">
              <User size={18} className="text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}