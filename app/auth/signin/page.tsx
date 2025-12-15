"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/src/lib/firebaseClient";
import { toast } from "sonner";
import Link from "next/link";
import { Mail, Lock, ArrowRight } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("user_uid");
    if (uid) {
      router.replace("/");
    } else {
      setChecking(false);
    }
  }, [router]);

  if (checking) return null;
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      localStorage.setItem("user_uid", user.uid);

      toast.success("Login success!");
      router.replace("/");

    } catch (err: any) {
      toast.error("Login failed: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#FBBF24]/10 rounded-2xl flex items-center justify-center text-4xl mb-4 mx-auto border border-[#FBBF24]/20">
            💰
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-gray-400 text-sm">Sign in to continue your treasure hunt</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input
                type="email"
                placeholder="hunter@treasurefi.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-500" size={18} />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-3.5 rounded-xl transition-all"
          >
            {loading ? "Opening Vault..." : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[#FBBF24] font-bold hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}