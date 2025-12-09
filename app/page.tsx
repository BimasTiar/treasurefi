"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import NewEntryModal from "@/components/new-entry-modal";

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. LOGIKA SATPAM (CHECK TOKEN) ---
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      // Hilangkan loading lebih cepat biar UX enak
      setIsLoading(false);
    }
  }, [router]);

  // Data Dummy Missions
  const activeMissions = [
    { id: 1, title: "Healing ke Bali", progress: 75, color: "bg-cyan-400" },
    { id: 2, title: "Save for MacBook Pro", progress: 45, color: "bg-pink-500" },
  ];

  // Tampilan Loading (Hitam Kosong biar ga flickering)
  if (isLoading) return <div className="min-h-screen bg-[#09090b]" />;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      
      {/* --- HEADER --- */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome Back, Kepala Suku!</h1>
          <p className="text-gray-400">Track your financial quest and earn rewards</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-yellow-500/20 flex items-center gap-2"
        >
          + New Entry
        </button>
      </div>

      {/* --- HERO CARD (SALDO) --- */}
      <div className="relative overflow-hidden rounded-3xl bg-[#18181b] border border-white/10 p-8 shadow-2xl">
        {/* Ikon Petir Background Transparan */}
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <Zap size={120} />
        </div>
        
        <div className="relative z-10">
          <p className="text-gray-400 font-medium mb-2">Total Balance</p>
          <h2 className="text-5xl font-extrabold text-white mb-2">IDR 24,500,000</h2>
          
          <div className="flex items-center gap-2 text-green-400 text-sm font-bold mb-6">
            <TrendingUp size={16} />
            <span>+12.5% from last month</span>
          </div>
          
          <div className="flex gap-4">
            {/* --- PERBAIKAN DISINI --- */}
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-[#FBBF24] hover:bg-yellow-500 text-black font-bold py-2.5 px-8 rounded-xl transition-colors"
            >
              Deposit
            </button>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-transparent border border-white/20 hover:bg-white/5 text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
            >
              Withdraw
            </button>
            {/* ------------------------ */}
          </div>
        </div>
      </div>

      {/* --- STATS ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Spending */}
        <div className="bg-[#18181b] p-6 rounded-2xl border border-white/10 shadow-sm flex justify-between items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-red-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10">
                <p className="text-gray-400 text-sm mb-1">Total Spending</p>
                <h3 className="text-2xl font-bold text-white">IDR 8,250,000</h3>
            </div>
            <div className="relative z-10 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <ArrowDownRight className="text-red-500" size={20} />
            </div>
        </div>

        {/* Income */}
        <div className="bg-[#18181b] p-6 rounded-2xl border border-white/10 shadow-sm flex justify-between items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <div className="relative z-10">
                <p className="text-gray-400 text-sm mb-1">Total Income</p>
                <h3 className="text-2xl font-bold text-white">IDR 32,750,000</h3>
            </div>
            <div className="relative z-10 bg-green-500/10 p-3 rounded-xl border border-green-500/20">
                <ArrowUpRight className="text-green-500" size={20} />
            </div>
        </div>
      </div>

      {/* --- ACTIVE MISSIONS (BARU) --- */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Zap className="text-[#FBBF24] fill-[#FBBF24]" size={20} /> Active Missions
          </h3>
          <button className="text-[#FBBF24] text-sm font-bold hover:underline">
            View All &gt;
          </button>
        </div>

        <div className="space-y-5">
          {activeMissions.map((mission) => (
            <div key={mission.id} className="bg-[#18181b] border border-white/10 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-bold text-white text-lg">{mission.title}</h4>
                <span className="font-bold text-white">{mission.progress}%</span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${mission.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{ width: `${mission.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      <NewEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}