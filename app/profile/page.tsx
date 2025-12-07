"use client";

import { useState } from "react";
import { Copy, CheckCircle, Edit, Shield, Trophy, Zap, Clock } from "lucide-react";
import EditProfileModal, { UserData } from "@/components/EditProfileModal";

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // State Data User (Bisa Diedit)
  const [user, setUser] = useState<UserData>({
    name: "Kepala Suku",
    title: "Level 100 Big Boss",
    email: "BigBoss@treasurefi.com",
    bio: "The man who sold crypto."
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("0x742d...3f1e");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveProfile = (updatedData: UserData) => {
    setUser(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700 pb-10">
      
      {/* 1. HEADER PROFILE CARD */}
      <div className="bg-[#18181b] border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden text-center md:text-left">
        {/* Background Glow */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#3B82F6]/10 to-transparent pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Besar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#3B82F6] p-[3px] shadow-2xl">
              <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center text-5xl font-bold text-white">
                {user.name.charAt(0)}J
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#FBBF24] text-black text-xs font-bold px-3 py-1 rounded-full border-4 border-[#18181b]">
              Lvl 100
            </div>
          </div>

          {/* Info User */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-gray-400 mb-4 max-w-lg mx-auto md:mx-0">{user.bio}</p>
            
            {/* XP Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-[#FBBF24]">{user.title}</span>
                <span className="text-gray-500">2,450 / 10,000 XP</span>
              </div>
              <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-gradient-to-r from-[#FBBF24] to-[#3B82F6] w-[25%] rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl font-bold border border-[#3B82F6]/20 hover:bg-[#3B82F6]/20 transition-all"
              >
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                <span>{copied ? "Copied!" : "0x742d...3f1e"}</span>
              </button>
              
              <button
                onClick={() => setIsEditOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 text-white rounded-xl font-bold border border-white/10 hover:bg-white/10 transition-all"
              >
                <Edit size={18} /> Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Zap className="text-[#FBBF24]" /> Your Stats
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Quests", value: "24", color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Total XP", value: "7,550", color: "text-[#FBBF24]", bg: "bg-[#FBBF24]/10" },
          { label: "Badges", value: "8", color: "text-purple-400", bg: "bg-purple-400/10" },
          { label: "Streak", value: "12 Days", color: "text-green-400", bg: "bg-green-400/10" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-[#18181b] border border-white/5 p-5 rounded-2xl text-center hover:border-white/10 transition-all">
            <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* 3. ACHIEVEMENTS */}
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Trophy className="text-[#FBBF24]" /> Unlocked Achievements
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: "First Steps", desc: "Create your first transaction", icon: "🚀" },
          { title: "Thousand Club", desc: "Save your first $1,000", icon: "💰" },
          { title: "Investor", desc: "Complete your first investment", icon: "📈" },
          { title: "Quest Master", desc: "Complete 10 daily quests", icon: "⚔️" },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#18181b] border border-white/5 p-5 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-all cursor-default">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-2xl border border-white/10">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold text-white">{item.title}</h4>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDIT */}
      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        currentUser={user}
        onSave={handleSaveProfile}
      />

    </div>
  );
}