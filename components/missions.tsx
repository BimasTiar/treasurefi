"use client";

import { CheckCircle2, Coins } from "lucide-react";
import { useEffect, useState } from "react";
import { db } from "@/src/lib/firebaseClient";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import { claimXpViaApi } from "@/src/lib/xpUtils";

interface LocalMission {
  id: string;
  title: string;
  xp: number;
  emoji: string;
  completed: boolean;
  type: "daily" | "weekly";
}

interface FirestoreMission {
  id: string;
  title: string;
  progress: number;
  xpReward: number;
  completed: boolean;
  color?: string;
}

export default function MissionsScreen() {
  const [localMissions, setLocalMissions] = useState<LocalMission[]>([]);
  const [userMissions, setUserMissions] = useState<FirestoreMission[]>([]);
  const [loading, setLoading] = useState(true);

const uid =
  typeof window !== "undefined"
    ? String(localStorage.getItem("user_uid") || "")
    : "";

  useEffect(() => {
    async function loadData() {
      try {
        const ref = collection(db, "missions");
        const snap = await getDocs(ref);

        const locals = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as LocalMission[];

        setLocalMissions(locals);

        if (uid) {
          const userRef = collection(db, "users", uid, "missions");
          const userSnap = await getDocs(userRef);

          const customs = userSnap.docs.map((d) => ({
            id: d.id,
            ...d.data(),
          })) as FirestoreMission[];

          setUserMissions(customs);
        }
      } catch (err) {
        console.error("Mission load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [uid]);

  const handleClaimLocal = async (mission: LocalMission) => {
    if (!uid) return alert("User not logged in");

    try {
      // Update Firestore → mark completed
      const ref = doc(db, "missions", mission.id);
      await updateDoc(ref, { completed: true });

      // Add XP
      await claimXpViaApi(uid, mission.xp);

      // Update UI
      setLocalMissions((prev) =>
        prev.map((m) =>
          m.id === mission.id ? { ...m, completed: true } : m
        )
      );

      alert(`+${mission.xp} XP earned!`);
    } catch (err) {
      console.error("Error claiming mission:", err);
    }
  };

  const handleClaimUserMission = async (mission: FirestoreMission) => {
    if (!uid) return alert("User not logged in");

    if (mission.completed !== true || mission.progress < 100) {
      return alert("Mission belum 100%!");
    }

    try {
      // Mark completed = true
      const ref = doc(db, "users", uid, "missions", mission.id);
      await updateDoc(ref, { completed: true });

      // Add XP
      await claimXpViaApi(uid, mission.xpReward);

      // Update UI
      setUserMissions((prev) =>
        prev.map((m) =>
          m.id === mission.id ? { ...m, completed: true } : m
        )
      );

      alert(`+${mission.xpReward} XP earned!`);
    } catch (err) {
      console.error("Error claiming mission:", err);
    }
  };

  if (loading)
    return <div className="text-gray-400">Loading missions...</div>;

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Missions</h1>

      <h2 className="text-xl font-bold text-yellow-400 mb-3">
        Daily / Weekly Missions
      </h2>

      <div className="space-y-4">
        {localMissions.map((mission) => (
          <div
            key={mission.id}
            className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/5 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl bg-white/5 p-2 rounded-xl">
                {mission.emoji}
              </span>

              <div>
                <h3 className="font-bold text-white">{mission.title}</h3>

                <div className="flex items-center gap-1 text-[#FBBF24] text-xs font-bold mt-1">
                  <Coins size={14} /> +{mission.xp} XP
                </div>
              </div>
            </div>

            {mission.completed ? (
              <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-xl flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={16} /> Done
              </div>
            ) : (
              <button
                onClick={() => handleClaimLocal(mission)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all"
              >
                Claim
              </button>
            )}
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-green-400 mt-10 mb-3">
        Your Custom Missions
      </h2>

      <div className="space-y-4">
        {userMissions.map((mission) => (
          <div
            key={mission.id}
            className="bg-[#18181b] p-4 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between mb-2">
              <h3 className="text-white font-bold">{mission.title}</h3>
              <span className="text-white font-bold">
                {mission.progress}%
              </span>
            </div>

            <div className="w-full bg-white/5 h-3 rounded-full mb-3">
              <div
                className={`${mission.color || "bg-yellow-400"} h-full`}
                style={{ width: `${mission.progress}%` }}
              ></div>
            </div>

            {mission.completed ? (
              <div className="px-4 py-2 bg-green-500/10 text-green-500 rounded-xl flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 size={16} /> Completed
              </div>
            ) : (
              <button
                onClick={() => handleClaimUserMission(mission)}
                className="bg-[#FBBF24] hover:bg-yellow-500 text-black px-5 py-2 rounded-xl font-bold"
              >
                Claim XP
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}