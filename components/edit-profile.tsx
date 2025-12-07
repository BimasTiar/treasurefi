"use client"

import type React from "react"

import { useState } from "react"
import { X, User, Award, Mail, FileText, Save } from "lucide-react"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  initialData?: {
    displayName: string
    title: string
    email: string
    bio: string
  }
}

export default function EditProfileModal({ isOpen, onClose, initialData }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    displayName: initialData?.displayName || "Alex Johnson",
    title: initialData?.title || "Level 99 Saver",
    email: initialData?.email || "alex@treasurefi.com",
    bio: initialData?.bio || "Passionate about saving and investing.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    console.log("[v0] Saving profile data:", formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="w-full max-w-md bg-zinc-900/95 backdrop-blur rounded-3xl border border-white/10 shadow-2xl pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-5">
            {/* Display Name */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <User size={16} />
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="Your display name"
              />
            </div>

            {/* Title / Badge */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Award size={16} />
                Title / Badge
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors"
                placeholder="e.g., Level 99 Saver"
              />
            </div>

            {/* Email (Disabled) */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/50 placeholder-white/40 cursor-not-allowed opacity-60"
                placeholder="Email address"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Email cannot be changed directly. Contact support if needed.
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <FileText size={16} />
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors resize-none h-24"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 p-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-bold"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}