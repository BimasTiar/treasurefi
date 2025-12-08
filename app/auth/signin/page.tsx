"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight, Wallet } from "lucide-react";
import { toast } from "sonner"; // Notifikasi biar keren

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi Login (Delay 1.5 detik)
    setTimeout(() => {
      // 1. Simpan "Tiket Masuk" (Token) di saku browser
      localStorage.setItem("user_token", "rahasia_kepala_suku");
      
      toast.success("Welcome Back, Kepala Suku!");
      
      // 2. Masuk ke Dashboard
      router.push("/"); 
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#FBBF24]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#FBBF24] to-[#d97706] rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-lg shadow-yellow-500/20">
            💰
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TreasureFi</h1>
          <p className="text-gray-400">Sign in to manage your wealth</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FBBF24] transition-colors" size={20} />
              <input 
                type="email" 
                placeholder="kepalasuku@treasurefi.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              <a href="#" className="text-xs text-[#FBBF24] hover:underline">Forgot?</a>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FBBF24] transition-colors" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white placeholder-gray-600 focus:border-[#FBBF24] focus:ring-1 focus:ring-[#FBBF24] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4 shadow-lg shadow-yellow-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-pulse">Unlocking Vault...</span>
            ) : (
              <>ACCESS VAULT <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
            New Hunter?{" "}
            <Link href="/auth/signup" className="text-[#FBBF24] font-bold hover:underline transition-colors">
                Create Account
            </Link>
            </p>
        </div>
      </div>
    </div>
  );
}