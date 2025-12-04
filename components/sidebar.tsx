"use client"

import { Home, Zap, Gift, User, LogOut } from "lucide-react"

interface SidebarProps {
  currentView: "home" | "missions" | "rewards" | "profile"
  setCurrentView: (view: "home" | "missions" | "rewards" | "profile") => void
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "missions", label: "Missions", icon: Zap },
    { id: "rewards", label: "Rewards", icon: Gift },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <div className="h-full flex flex-col bg-sidebar text-sidebar-foreground p-6">
      {/* Logo */}
      <div className="mb-12 flex items-center gap-2">
        <div className="text-3xl">💰</div>
        <div>
          <h1 className="text-2xl font-bold text-primary">TreasureFi</h1>
          <p className="text-xs text-muted-foreground">Quest for Gold</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? "bg-sidebar-primary/20 text-primary border border-primary/50"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/10"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border pt-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
            AJ
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">Level 12</p>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-sidebar-accent/10 transition-colors text-sm text-sidebar-foreground">
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}
