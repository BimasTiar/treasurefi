// src/components/sidebar-user.tsx
"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";
import { safeUid } from "@/src/lib/missionsUnified";

export default function SidebarUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const uid = safeUid();
      if (!uid) return;
      try {
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) setUser(snap.data());
      } catch (e) {
        console.error("sidebar user load", e);
      }
    })();
  }, []);

  if (!user) {
    return (
      <div className="p-3 text-sm text-gray-400">
        <div className="font-bold">User</div>
        <div className="text-xs">Level 1</div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-xl">A</div>
        <div>
          <div className="font-bold text-white">{user.name ?? user.displayName ?? "User"}</div>
          <div className="text-xs text-gray-400">Level {user.level ?? 1}</div>
        </div>
      </div>
    </div>
  );
}