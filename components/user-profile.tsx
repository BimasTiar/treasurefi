import { LogOut } from "lucide-react"

export default function UserProfile() {
  return (
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
  )
}
