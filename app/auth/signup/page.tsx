"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Auto login setelah daftar
      localStorage.setItem("user_token", "rahasia_kepala_suku");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in slide-in-from-bottom-5 duration-500">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Join the Quest</h1>
          <p className="text-gray-400 text-sm">Start your financial journey today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FBBF24] transition-colors" size={20} />
              <input type="text" placeholder="Kepala Suku" className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#FBBF24] outline-none transition-all" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FBBF24] transition-colors" size={20} />
              <input type="email" placeholder="hunter@treasurefi.com" className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#FBBF24] outline-none transition-all" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-[#FBBF24] transition-colors" size={20} />
              <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-[#FBBF24] outline-none transition-all" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 active:scale-95">
            {loading ? "Creating..." : <>CREATE ACCOUNT <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already a member? <Link href="/auth/signin" className="text-[#FBBF24] font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
}