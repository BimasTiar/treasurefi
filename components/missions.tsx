"use client";

import { CheckCircle2, Coins } from "lucide-react";
import { useState } from "react";

// Interface wajib
interface Mission {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
  type: "daily" | "weekly";
  emoji: string;
}

export default function MissionsScreen() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, title: "Save Rp 50k Today", xp: 50, completed: false, type: "daily", emoji: "💰" },
    { id: 2, title: "Read Crypto News", xp: 10, completed: false, type: "daily", emoji: "📰" },
  ]);

  const handleClaim = (id: number) => {
    setMissions(missions.map((m) => (m.id === id ? { ...m, completed: true } : m)));
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Missions</h1>
      <div className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-[#1A1A1A] p-4 rounded-2xl border border-white/5 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <span className="text-3xl bg-white/5 p-2 rounded-xl">{mission.emoji}</span>
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
                onClick={() => handleClaim(mission.id)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm transition-all"
              >
                Start
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}