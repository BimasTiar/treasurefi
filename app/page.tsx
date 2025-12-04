"use client";

import { TrendingUp, Wallet, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";

// 1. Definisi Tipe Data (Wajib biar ga merah)
interface Goal {
  id: number;
  name: string;
  current: number;
  target: number;
  emoji: string;
  progress: number;
}

export default function Home() {
  const goals: Goal[] = [
    { id: 1, name: "Healing ke Bali", current: 3500000, target: 5000000, emoji: "🏖️", progress: 75 },
    { id: 2, name: "Beli Macbook M3", current: 8000000, target: 20000000, emoji: "💻", progress: 45 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome Back, Kepala Suku!</h1>
        <p className="text-gray-400">Track your financial quest and earn rewards</p>
      </div>

      {/* Hero Card (Saldo) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#121212] border border-white/10 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-20">
          <Zap size={100} className="text-[#FBBF24]" />
        </div>
        <p className="text-gray-400 font-medium mb-2">Total Balance</p>
        <h2 className="text-5xl font-extrabold text-white mb-6">IDR 24,500,000</h2>
        
        <div className="flex gap-4">
          <button className="bg-[#FBBF24] hover:bg-[#d97706] text-black font-bold py-2 px-6 rounded-xl transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)]">
            Deposit
          </button>
          <button className="bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold py-2 px-6 rounded-xl transition-all">
            Withdraw
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400">Total Income</p>
            <div className="bg-green-500/10 p-2 rounded-lg"><ArrowUpRight className="text-green-500" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white">IDR 32,750,000</h3>
        </div>
        <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/5 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-400">Total Spending</p>
            <div className="bg-red-500/10 p-2 rounded-lg"><ArrowDownRight className="text-red-500" /></div>
          </div>
          <h3 className="text-2xl font-bold text-white">IDR 8,250,000</h3>
        </div>
      </div>

      {/* Active Missions (Goals) */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="text-[#FBBF24]" fill="#FBBF24" /> Active Missions
          </h3>
          <button className="text-[#FBBF24] text-sm hover:underline">View All</button>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-[#1A1A1A] border border-white/5 p-5 rounded-2xl shadow-md hover:border-[#FBBF24]/30 transition-all">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{goal.emoji}</span>
                  <div>
                    <h4 className="font-bold text-white">{goal.name}</h4>
                    <p className="text-xs text-gray-400">
                      IDR {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-[#FBBF24] font-bold bg-[#FBBF24]/10 px-3 py-1 rounded-lg text-sm">
                  {goal.progress}%
                </span>
              </div>
              
              {/* Progress Bar Anti-Error (Pakai Style Inline) */}
              <div className="w-full h-3 bg-black rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 to-[#FBBF24] transition-all duration-1000 relative"
                  style={{ width: `${goal.progress}%` }} 
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}