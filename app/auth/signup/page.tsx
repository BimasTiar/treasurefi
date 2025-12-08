"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("user_token", "demo_token_123");
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Join the Quest</h1>
          <p className="text-gray-400">Create your account today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input type="text" placeholder="KepalaSuku" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-[#FBBF24] outline-none" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input type="email" placeholder="hunter@email.com" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-[#FBBF24] outline-none" required />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input type="password" placeholder="••••••••" className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 text-white focus:border-[#FBBF24] outline-none" required />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-3.5 rounded-xl mt-4 flex justify-center items-center gap-2">
            {loading ? "Creating..." : <>SIGN UP <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already have an account? <Link href="/auth/signin" className="text-[#FBBF24] hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}