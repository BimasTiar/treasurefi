"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import Router
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import NewEntryModal from "@/components/new-entry-modal";
import { Skeleton } from "@/components/skeleton"; // Pastikan sudah punya komponen Skeleton

// ... Interface Goal tetap sama ...
interface Goal {
  id: number;
  name: string;
  current: number;
  target: number;
  emoji: string;
  progress: number;
}

export default function Home() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State Loading

  // --- LOGIKA SATPAM (CHECK TOKEN) ---
  useEffect(() => {
    // Cek apakah ada token di localStorage
    const token = localStorage.getItem("user_token");

    if (!token) {
      // Jika TIDAK ADA token, tendang ke halaman Sign In
      router.push("/auth/signin");
    } else {
      // Jika ADA token, izinkan masuk (Matikan loading setelah 1 detik)
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [router]);


  // --- TAMPILAN SAAT LOADING / CEKING TOKEN ---
  if (isLoading) {
    // Tampilkan Skeleton atau Layar Hitam Loading
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090b]">
        <div className="animate-pulse flex flex-col items-center">
            <div className="text-5xl mb-4">💰</div>
            <p className="text-gray-500 font-bold">Verifying Treasure Key...</p>
        </div>
      </div>
    );
  }

  // --- TAMPILAN DASHBOARD UTAMA (JIKA LOLOS CEK) ---
  const goals: Goal[] = [
    { id: 1, name: "Healing ke Bali", current: 3500000, target: 5000000, emoji: "🏖️", progress: 75 },
    { id: 2, name: "Beli Macbook M3", current: 8000000, target: 20000000, emoji: "💻", progress: 45 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
       {/* ... (SISA KODE DASHBOARD ANDA TETAP SAMA DARI SINI KE BAWAH) ... */}
       <div className="flex justify-between items-end">
        {/* ... Header ... */}
            <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back, Kepala Suku!</h1>
            <p className="text-muted-foreground">Track your financial quest and earn rewards</p>
            </div>
            <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-yellow-500 text-primary-foreground font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
            >
            + New Entry
            </button>
       </div>
       
       {/* ... Lanjutkan kode Hero Card, Stats, Missions, Modal di sini ... */}
       {/* (Copy dari kode sebelumnya) */}
       
       {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Zap size={120} className="text-primary" />
        </div>
        
        <div className="relative z-10">
          <p className="text-muted-foreground font-medium mb-2">Total Balance</p>
          <h2 className="text-5xl font-extrabold text-white mb-6">IDR 24,500,000</h2>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-primary hover:bg-yellow-500 text-primary-foreground font-bold py-2.5 px-6 rounded-xl transition-all shadow-lg shadow-primary/20"
            >
              Deposit
            </button>
            <button className="bg-secondary/50 border border-border hover:bg-secondary text-foreground font-bold py-2.5 px-6 rounded-xl transition-all">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex justify-between items-center">
          <div>
            <p className="text-muted-foreground">Total Income</p>
            <h3 className="text-2xl font-bold text-foreground">IDR 32,750,000</h3>
          </div>
          <div className="bg-green-500/10 p-3 rounded-xl"><ArrowUpRight className="text-green-500" /></div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex justify-between items-center">
          <div>
            <p className="text-muted-foreground">Total Spending</p>
            <h3 className="text-2xl font-bold text-foreground">IDR 8,250,000</h3>
          </div>
          <div className="bg-red-500/10 p-3 rounded-xl"><ArrowDownRight className="text-red-500" /></div>
        </div>
      </div>

      {/* Active Missions */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Zap className="text-primary fill-primary" /> Active Missions
          </h3>
          <button className="text-primary text-sm font-bold hover:underline">View All</button>
        </div>

        <div className="space-y-4">
          {goals.map((goal) => (
            <div key={goal.id} className="bg-card border border-border p-5 rounded-2xl shadow-sm hover:border-primary/30 transition-all cursor-pointer">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl bg-secondary/30 p-2 rounded-lg">{goal.emoji}</span>
                  <div>
                    <h4 className="font-bold text-foreground">{goal.name}</h4>
                    <p className="text-xs text-muted-foreground font-mono">
                      IDR {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg text-sm border border-primary/20">
                  {goal.progress}%
                </span>
              </div>
              <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-1000 ease-out relative"
                  style={{ width: `${goal.progress}%` }} 
                >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </div>
  );
}