"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/src/lib/firebaseClient";
import { doc, setDoc } from "firebase/firestore";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      // CREATE USER IN FIREBASE AUTH
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      xp: 0,
      level: 1,
      createdAt: Date.now(),
});

// wajib
      localStorage.setItem("user_uid", user.uid);

      router.push("/");

    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-[#3B82F6]/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Join the Quest</h1>
          <p className="text-gray-400 text-sm">Start your financial journey today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input
                name="name"
                type="text"
                placeholder="Kepala Suku"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Email</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input
                name="email"
                type="email"
                placeholder="hunter@treasurefi.com"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-500" size={20} />
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2"
          >
            {loading ? "Creating..." : <>CREATE ACCOUNT <ArrowRight size={20} /></>}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already a member?{" "}
          <Link href="/auth/signin" className="text-[#FBBF24] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}