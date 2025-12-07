"use client";

import { Trophy, Lock, Star } from "lucide-react";
import { useState } from "react";

type Rarity = "legendary" | "epic" | "rare" | "common";

interface Reward {
  id: number;
  name: string;
  rarity: Rarity;
  unlocked: boolean;
  emoji: string;
  requirement: string;
  color: string;
}

export default function RewardsPage() {
  const [rewards] = useState<Reward[]>([
    { id: 1, name: "Golden Chest", rarity: "legendary", unlocked: true, emoji: "📦", requirement: "Save 10k", color: "#FBBF24" },
    { id: 2, name: "Diamond Hands", rarity: "epic", unlocked: true, emoji: "💎", requirement: "30-day streak", color: "#8B5CF6" },
    { id: 3, name: "Pirate Flag", rarity: "common", unlocked: true, emoji: "🏴‍☠️", requirement: "Join App", color: "#6B7280" },
    { id: 4, name: "Royal Crown", rarity: "legendary", unlocked: false, emoji: "👑", requirement: "Lvl 10", color: "#FBBF24" },
    { id: 5, name: "Ancient Map", rarity: "rare", unlocked: false, emoji: "🗺️", requirement: "50 Missions", color: "#3B82F6" },
    { id: 6, name: "Lightning", rarity: "epic", unlocked: false, emoji: "⚡", requirement: "Fast Saver", color: "#8B5CF6" },
  ]);

  const rarityColors: Record<Rarity, string> = {
    legendary: "border-[#FBBF24] bg-[#FBBF24]/5",
    epic: "border-[#8B5CF6] bg-[#8B5CF6]/5",
    rare: "border-[#3B82F6] bg-[#3B82F6]/5",
    common: "border-gray-600 bg-gray-600/5",
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Rewards Gallery</h1>
          <p className="text-gray-400">Your NFT collection and achievements</p>
        </div>
        <div className="bg-[#1A1A1A] px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
          <Trophy size={18} className="text-[#FBBF24]" />
          <span className="font-bold">3 / 6 Unlocked</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div 
            key={reward.id} 
            className={`p-6 rounded-3xl border-2 transition-all relative group ${
              reward.unlocked ? `${rarityColors[reward.rarity]} hover:scale-105 cursor-pointer` : "border-white/5 bg-[#121212] opacity-60"
            }`}
          >
            <div className="flex justify-center mb-4 relative">
              <span className={`text-6xl ${reward.unlocked ? "animate-bounce" : "grayscale blur-sm"}`}>
                {reward.emoji}
              </span>
              {!reward.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="text-white drop-shadow-md" size={32} />
                </div>
              )}
            </div>
            
            <div className="text-center">
              <h3 className="font-bold text-white mb-1">{reward.name}</h3>
              <p className="text-xs text-gray-400">{reward.requirement}</p>
              
              <span 
                className="mt-3 inline-block px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider border"
                style={{ color: reward.color, borderColor: reward.color }}
              >
                {reward.rarity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}