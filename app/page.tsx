// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import NewEntryModal from "@/components/new-entry-modal";
import { Zap } from "lucide-react";
import { fetchDashboardData } from "@/src/lib/getUserData";
import { getUnifiedMissions, safeUid } from "@/src/lib/missionsUnified";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);

  async function refreshData() {
    const uid = safeUid();
    if (!uid) return;

    const updated = await fetchDashboardData(uid);
    setData(updated);

    const unified = await getUnifiedMissions(uid);
    setMissions(unified);
  }

  useEffect(() => {
    (async () => {
      try {
        const uid = safeUid();
        if (!uid) {
          router.push("/auth/signin");
          return;
        }
        const res = await fetchDashboardData(uid);
        setData(res || {});

        const unified = await getUnifiedMissions(uid);
        setMissions(unified);
      } catch (err) {
        console.error("Dashboard error:", err);
        router.push("/auth/signin");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [router]);

  async function handleClaim(mission: any) {
    try {
      const uid = safeUid();
      if (!uid) return;

      const ok = await (await import("@/src/lib/missionsUnified"))
        .claimUnifiedMission(uid, mission.id);

      if (ok) {
        await refreshData();
      } else {
        console.error("claim failed");
      }
    } catch (err) {
      console.error("Claim error:", err);
    }
  }

  if (isLoading) return <div className="min-h-screen bg-[#09090b]" />;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10 p-6">
      <Toaster />

      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome Back, {data?.name || "User"}!
          </h1>
          <p className="text-gray-400">Track your financial quest and earn rewards</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FBBF24] text-black font-bold py-2.5 px-6 rounded-xl"
        >
          + New Entry
        </button>
      </div>

      <div className="bg-[#18181b] p-6 rounded-3xl border border-white/10">
        <h2 className="text-5xl font-extrabold text-white mb-2">
          IDR {(data?.totalBalance || 0).toLocaleString("id-ID")}
        </h2>

        <div className="flex items-center gap-2 text-green-400 text-sm font-bold mb-6">
          <Zap size={16} />
          <span>
            {data?.totalIncome && data?.totalSpending
              ? `${(((data.totalIncome - data.totalSpending) / Math.max(1, data.totalSpending)) * 100).toFixed(1)}%`
              : "+0%"} from last month
          </span>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Active Missions</h3>
        <div className="space-y-4">
          {missions.map((m) => (
            <div
              key={m.id}
              className="bg-[#18181b] p-4 rounded-2xl border border-white/10 flex justify-between items-center"
            >
              <div>
                <div className="font-bold text-white">{m.title}</div>
                <div className="text-sm text-gray-400">{m.progress}%</div>
              </div>

              <div>
                {!m.completed && m.progress >= 100 ? (
                  <button
                    onClick={() => handleClaim(m)}
                    className="bg-[#FBBF24] text-black px-4 py-2 rounded-lg"
                  >
                    Claim
                  </button>
                ) : m.completed ? (
                  <div className="text-green-400 font-bold">Completed</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={refreshData}
      />
    </div>
  );
}