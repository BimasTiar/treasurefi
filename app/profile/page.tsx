// app/profile/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";
import { safeUid } from "@/src/lib/missionsUnified";
import { Toaster } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const uid = safeUid();
    if (!uid) {
      router.push("/auth/signin");
      return;
    }

    async function loadUser() {
  if (!uid) {
    console.error("UID is null — user belum login.");
    setLoading(false);
    return;
  }

  try {
    const userRef = doc(db, "users", uid); // uid pasti string di sini
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      setUserData(snap.data());
    } else {
      console.warn("User document not found");
    }
    } catch (err) {
    console.error("Profile load error:", err);
    } finally {
    setLoading(false);
    } 
}
    loadUser();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#09090b] text-white p-8">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto text-white p-8 space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold">Profile</h1>

      <div className="bg-[#18181b] p-6 rounded-2xl border border-white/10 space-y-4">
        <div>
          <p className="text-gray-400 text-sm">Name</p>
          <p className="text-lg font-bold">{userData?.name ?? userData?.displayName ?? "-"}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Email</p>
          <p className="text-lg">{userData?.email ?? "-"}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">XP</p>
          <p className="text-lg font-bold">{userData?.xp ?? 0}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Level</p>
          <p className="text-lg font-bold">{userData?.level ?? 1}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Joined</p>
          <p className="text-lg">{userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString("id-ID") : "-"}</p>
        </div>
      </div>
    </div>
  );
}