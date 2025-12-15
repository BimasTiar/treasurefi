"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { getUnifiedMissions, claimUnifiedMission, safeUid } from "@/src/lib/missionsUnified";

export default function MissionsPage() {
  const router = useRouter();

  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState("user");

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const uid = safeUid();
        if (!uid) {
          router.push("/auth/signin");
          return;
        }

        const unified = await getUnifiedMissions(uid);

        if (mounted) setMissions(unified);
      } catch (err) {
        console.error("Load missions error:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false };
  }, [router]);

  async function handleClaim(m: any) {
    try {
      const uid = safeUid();
      if (!uid) return;

      const ok = await claimUnifiedMission(uid, m.id);
      if (!ok) {
        console.error("Claim failed");
        return;
      }

      setMissions(await getUnifiedMissions(uid));
    } catch (err) {
      console.error("Error claiming:", err);
    }
  }

  if (loading) return <div className="p-6 text-gray-400">Loading missions...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Toaster />
      
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Missions</h1>

        {userRole === "admin" && (
          <button
            onClick={() => router.push("/mission/new")}
            className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400"
          >
            + Add Mission
          </button>
        )}
      </div>

      <div className="space-y-4">
        {missions.length === 0 && (
          <div className="text-gray-400">No missions found</div>
        )}

        {missions.map((m: any) => (
          <div key={m.id} className="bg-[#111] p-4 rounded-lg flex justify-between items-center">
            <div>
              <div className="font-bold text-white">{m.title}</div>
              <div className="text-sm text-gray-400">{m.progress}%</div>
            </div>

            <div>
              {m.completed ? (
                <div className="text-green-400">Completed</div>
              ) : m.progress >= 100 ? (
                <button
                  onClick={() => handleClaim(m)}
                  className="bg-[#FBBF24] px-4 py-2 rounded font-bold hover:bg-yellow-400"
                >
                  Claim XP
                </button>
              ) : (
                <div className="text-xs text-gray-400">Complete to claim</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}