"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TrendingUp, ArrowUpRight, ArrowDownRight, Zap } from "lucide-react";
import NewEntryModal from "@/components/new-entry-modal";

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
  const [isLoading, setIsLoading] = useState(true);

  // Auth Check Sederhana
  useEffect(() => {
    const token = localStorage.getItem("user_token");
    if (!token) {
      router.push("/auth/signin");
    } else {
      setIsLoading(false); 
    }
  }, [router]);

  const goals: Goal[] = [
    { id: 1, name: "Healing ke Bali", current: 3500000, target: 5000000, emoji: "🏖️", progress: 75 },
    { id: 2, name: "Beli Macbook M3", current: 8000000, target: 20000000, emoji: "💻", progress: 45 },
  ];

  if (isLoading) return null; 

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back, Kepala Suku!</h1>
          <p className="text-muted-foreground">Track your financial quest and earn rewards</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-yellow-500 text-primary-foreground font-bold py-2.5 px-6 rounded-xl transition-all flex items-center gap-2"
        >
          + New Entry
        </button>
      </div>

      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-8 shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none"><Zap size={120} /></div>
        <div className="relative z-10">
          <p className="text-muted-foreground font-medium mb-2">Total Balance</p>
          <h2 className="text-5xl font-extrabold text-white mb-6">IDR 24,500,000</h2>
          <div className="flex gap-4">
            <button className="bg-primary hover:bg-yellow-500 text-primary-foreground font-bold py-2.5 px-6 rounded-xl">Deposit</button>
            <button className="bg-secondary/50 border border-border hover:bg-secondary text-foreground font-bold py-2.5 px-6 rounded-xl">Withdraw</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex justify-between items-center">
          <div><p className="text-muted-foreground">Total Income</p><h3 className="text-2xl font-bold text-foreground">IDR 32,750,000</h3></div>
          <div className="bg-green-500/10 p-3 rounded-xl"><ArrowUpRight className="text-green-500" /></div>
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex justify-between items-center">
          <div><p className="text-muted-foreground">Total Spending</p><h3 className="text-2xl font-bold text-foreground">IDR 8,250,000</h3></div>
          <div className="bg-red-500/10 p-3 rounded-xl"><ArrowDownRight className="text-red-500" /></div>
        </div>
      </div>

      <NewEntryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}