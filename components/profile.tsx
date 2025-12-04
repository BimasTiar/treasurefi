"use client"

import { Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

export default function Profile() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("0x742d35Cc6634C0532925a3b844Bc3e7f72d34f1e")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const achievements = [
    { id: 1, title: "First Steps", description: "Create your first transaction" },
    { id: 2, title: "Thousand Club", description: "Save $1,000" },
    { id: 3, title: "Investor", description: "Complete your first investment" },
    { id: 4, title: "Quest Master", description: "Complete 10 quests" },
  ]

  return (
    <main className="p-6 md:p-8">
      {/* Avatar and Level */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-4xl font-bold border-4 border-primary/30">
            AJ
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold border-2 border-background text-sm">
            12
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-1">Alex Johnson</h2>
        <p className="text-muted-foreground mb-6">2,450 XP to Level 13</p>

        {/* XP Progress Bar */}
        <div className="w-full max-w-xs mb-8">
          <div className="bg-white/10 rounded-full h-3 overflow-hidden mb-2">
            <div className="bg-gradient-to-r from-primary to-secondary h-full w-2/3" />
          </div>
          <p className="text-xs text-muted-foreground text-center">7,550 / 10,000 XP</p>
        </div>

        {/* Wallet Button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-6 py-3 bg-primary/20 border border-primary/50 text-primary rounded-full hover:bg-primary/30 transition-colors font-semibold"
        >
          {copied ? (
            <>
              <CheckCircle size={18} />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span className="text-sm">0x742...f1e</span>
            </>
          )}
        </button>
      </div>

      {/* Achievements */}
      <section className="mb-12">
        <h3 className="text-2xl font-bold mb-6">Unlocked Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="glass-dark p-6 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏆</div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section>
        <h3 className="text-2xl font-bold mb-6">Your Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="glass-dark p-4 rounded-2xl border border-white/10 text-center">
            <p className="text-muted-foreground text-sm mb-2">Quests Completed</p>
            <p className="text-2xl font-bold text-primary">24</p>
          </div>
          <div className="glass-dark p-4 rounded-2xl border border-white/10 text-center">
            <p className="text-muted-foreground text-sm mb-2">Total XP Earned</p>
            <p className="text-2xl font-bold text-primary">7,550</p>
          </div>
          <div className="glass-dark p-4 rounded-2xl border border-white/10 text-center">
            <p className="text-muted-foreground text-sm mb-2">Badges Unlocked</p>
            <p className="text-2xl font-bold text-primary">8</p>
          </div>
        </div>
      </section>
    </main>
  )
}
