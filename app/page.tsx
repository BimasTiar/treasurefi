"use client"; // Wajib untuk interaksi

import { TrendingUp, Zap } from "lucide-react";

// Definisi Tipe Data (Fix Error 'Implicit Any')
interface SavingsGoal {
  id: number;
  name: string;
  current: number;
  target: number;
  emoji: string;
  progress: number;
}

export default function Home() {
  const savingsGoals: SavingsGoal[] = [
    { id: 1, name: "New Laptop", current: 1400, target: 2000, emoji: "💻", progress: 70 },
    { id: 2, name: "Japan Trip", current: 3200, target: 5000, emoji: "🗾", progress: 64 },
    { id: 3, name: "Emergency Fund", current: 5000, target: 10000, emoji: "🛡️", progress: 50 },
  ];

  return (
    <div className="px-6 pt-10 pb-6 text-white min-h-screen bg-[#111827]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold">Treasure Hunter</h1>
        </div>
        <div className="w-12 h-12 rounded-full border-2 border-yellow-500 bg-gray-800 flex items-center justify-center text-2xl">
          🏴‍☠️
        </div>
      </div>

      {/* Total Balance Card */}
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 mb-8 shadow-2xl">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="text-yellow-400" size={20} />
          <span className="text-gray-400 text-sm font-medium">Total Savings</span>
        </div>
        <h2 className="text-5xl font-bold mb-4 tracking-tight">$9,600</h2>
        <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold bg-yellow-400/10 w-fit px-3 py-1 rounded-full">
          <Zap size={14} fill="currentColor" />
          <span>+12% this month</span>
        </div>
      </div>

      {/* Quest List */}
      <h3 className="text-xl font-bold mb-4">Your Quests</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {savingsGoals.map((goal) => (
          <div key={goal.id} className="min-w-[260px] bg-white/5 p-5 rounded-2xl border border-white/10">
            <div className="flex gap-3 mb-4">
              <span className="text-4xl">{goal.emoji}</span>
              <div>
                <h4 className="font-bold text-lg">{goal.name}</h4>
                <p className="text-xs text-gray-400 font-mono">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </p>
              </div>
            </div>
            {/* Progress Bar (Inline Style Fix) */}
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-yellow-500 transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <p className="text-right text-xs text-yellow-400 mt-2 font-bold">{goal.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}