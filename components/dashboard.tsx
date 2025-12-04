"use client"

import { Home, Zap, Gift, User } from "lucide-react"

interface BottomNavProps {
  currentView: "home" | "missions" | "rewards" | "profile"
  setCurrentView: (view: "home" | "missions" | "rewards" | "profile") => void
}

export default function BottomNav({ currentView, setCurrentView }: BottomNavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "missions", label: "Missions", icon: Zap },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <nav className="glass-dark w-full flex justify-around items-center h-20 border-t border-white/10">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = currentView === item.id
        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id as any)}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon size={24} />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
