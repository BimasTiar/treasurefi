"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulasi Login (Karena belum ada backend)
    setTimeout(() => {
      // Simpan "token" palsu di localStorage agar aplikasi tahu user sudah login
      localStorage.setItem("user_token", "demo_token_123");
      router.push("/"); // Pindah ke Dashboard
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-[#FBBF24]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-400">Sign in to access your treasure</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input 
                type="email" 
                placeholder="hunter@treasurefi.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#FBBF24] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#FBBF24] focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? "Unlocking..." : <>SIGN IN <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          New here? <Link href="/auth/signup" className="text-[#FBBF24] hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}