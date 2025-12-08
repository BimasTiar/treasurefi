"use client";

import { CheckCircle2, Coins } from "lucide-react";
import { useState } from "react";


interface Mission {
  id: number;
  title: string;
  xp: number;
  completed: boolean;
  type: "daily" | "weekly";
  emoji: string;
}

export default function MissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([
    { id: 1, title: "Save Rp 50k Today", xp: 50, completed: false, type: "daily", emoji: "💰" },
    { id: 2, title: "Read Crypto News", xp: 10, completed: false, type: "daily", emoji: "📰" },
    { id: 3, title: "Track Expenses", xp: 40, completed: false, type: "daily", emoji: "📊" },
    { id: 4, title: "Invite a Friend", xp: 100, completed: false, type: "weekly", emoji: "🤝" },
  ]);

  const handleClaim = (id: number) => {
    setMissions(missions.map((m) => (m.id === id ? { ...m, completed: true } : m)));
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold mb-2 text-white">Missions</h1>
      <p className="text-gray-400 mb-8">Complete quests to earn XP and rewards</p>

      <div className="space-y-4">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-[#18181b] p-5 rounded-2xl border border-white/10 flex items-center justify-between shadow-lg hover:border-[#FBBF24]/20 transition-all">
            <div className="flex items-center gap-4">
              <span className="text-3xl bg-white/5 p-3 rounded-2xl">{mission.emoji}</span>
              <div>
                <h3 className="font-bold text-white text-lg">{mission.title}</h3>
                <div className="flex items-center gap-1 text-[#FBBF24] text-xs font-bold mt-1 bg-[#FBBF24]/10 px-2 py-1 rounded-md w-fit">
                  <Coins size={12} /> +{mission.xp} XP
                </div>
              </div>
            </div>
            
            {mission.completed ? (
              <div className="px-5 py-2 bg-green-500/10 text-green-500 rounded-xl flex items-center gap-2 text-sm font-bold border border-green-500/20">
                <CheckCircle2 size={18} /> Done
              </div>
            ) : (
              <button 
                onClick={() => handleClaim(mission.id)}
                className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-900/20"
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