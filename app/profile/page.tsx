"use client";

import { useState } from "react";
import { Copy, CheckCircle, Edit, Zap, Trophy } from "lucide-react";
// FIX IMPORT PATH: Sesuai screenshot explorer anda, nama filenya 'edit-profile.tsx' (kecil semua pakai strip)
import EditProfileModal from "@/components/edit-profile"; 

// Interface user data
export interface UserData {
  name: string;
  title: string;
  email: string;
  bio: string;
}

export default function ProfilePage() {
  const [copied, setCopied] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [user, setUser] = useState<UserData>({
    name: "Kepala Suku",
    title: "Level 100 Saver",
    email: "kepala.suku@treasurefi.com",
    bio: "The man who sold crypto."
  });

  const handleCopy = () => {
    navigator.clipboard.writeText("0x742d...9f3a");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500 pb-10">
      
      {/* Header Profile */}
      <div className="bg-[#18181b] border border-white/10 rounded-3xl p-8 mb-8 relative overflow-hidden">
        <div className="relative flex flex-col md:flex-row items-center gap-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#FBBF24] to-[#3B82F6] p-[3px]">
              <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center text-5xl">
                👨‍🚀
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
            <p className="text-gray-400 mb-4">{user.bio}</p>
            
            <div className="flex gap-3 justify-center md:justify-start">
              <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6]/10 text-[#3B82F6] rounded-xl border border-[#3B82F6]/20">
                {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied ? "Copied!" : "0x742d...9f3a"}
              </button>
              <button onClick={() => setIsEditOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-xl border border-white/10">
                <Edit size={18} /> Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)} 
        currentUser={user}
        onSave={setUser}
      />
    </div>
  );
}