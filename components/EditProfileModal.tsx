"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Save, Award, FileText } from "lucide-react";

// Tipe data User
export interface UserData {
  name: string;
  title: string;
  email: string;
  bio: string;
}

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserData;
  onSave: (data: UserData) => void;
}

export default function EditProfileModal({ isOpen, onClose, currentUser, onSave }: EditProfileModalProps) {
  const [formData, setFormData] = useState<UserData>(currentUser);

  // Update form jika data user berubah
  useEffect(() => {
    if (isOpen) {
      setFormData(currentUser);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Gelap */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity" onClick={onClose} />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#18181b] border border-white/10 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-200 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
            <h2 className="text-xl font-bold text-white">Edit Profile</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-5">
            
            {/* Display Name */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                <User size={14} /> Display Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FBBF24] focus:outline-none transition-all"
              />
            </div>

            {/* Title / Badge */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                <Award size={14} /> Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FBBF24] focus:outline-none transition-all"
              />
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                <Mail size={14} /> Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-gray-500 cursor-not-allowed"
              />
              <p className="text-[10px] text-gray-600 mt-1">Email cannot be changed.</p>
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                <FileText size={14} /> Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#FBBF24] focus:outline-none transition-all resize-none"
              />
            </div>

          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex gap-3 bg-white/5">
            <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 text-white font-semibold hover:bg-white/5 transition">
              Cancel
            </button>
            <button 
              onClick={() => { onSave(formData); onClose(); }}
              className="flex-1 py-3 rounded-xl bg-[#FBBF24] text-black font-bold hover:bg-yellow-500 transition flex items-center justify-center gap-2"
            >
              <Save size={18} /> Save Changes
            </button>
          </div>

        </div>
      </div>
    </>
  );
}