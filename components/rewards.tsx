import { Lock, Sparkles } from "lucide-react"

interface Reward {
  id: number
  title: string
  emoji: string
  rarity: "common" | "rare" | "epic"
  unlocked: boolean
}

const rewards: Reward[] = [
  { id: 1, title: "Early Adopter", emoji: "🎖️", rarity: "common", unlocked: true },
  { id: 2, title: "Saver's Gold", emoji: "💎", rarity: "rare", unlocked: true },
  { id: 3, title: "Crypto Wizard", emoji: "🧙", rarity: "epic", unlocked: false },
  { id: 4, title: "Investment Pro", emoji: "📈", rarity: "epic", unlocked: true },
  { id: 5, title: "Wealth Builder", emoji: "🏦", rarity: "rare", unlocked: false },
  { id: 6, title: "Financial Guru", emoji: "🎓", rarity: "epic", unlocked: false },
  { id: 7, title: "Speed Demon", emoji: "⚡", rarity: "common", unlocked: true },
  { id: 8, title: "Explorer", emoji: "🗺️", rarity: "rare", unlocked: false },
]

const rarityColors = {
  common: "from-gray-400 to-gray-600",
  rare: "from-blue-400 to-cyan-500",
  epic: "from-purple-400 to-pink-500",
}

export default function Rewards() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <Sparkles size={32} className="text-primary" />
          <span className="text-balance">Rewards & Badges</span>
        </h2>
        <p className="text-muted-foreground">Collect NFTs and badges as you progress</p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className={`glass-dark p-4 rounded-2xl border-2 transition-all ${
              reward.unlocked
                ? `border-white/20 hover:border-primary/50 bg-gradient-to-br ${rarityColors[reward.rarity]}/10`
                : "border-white/5 opacity-50"
            }`}
          >
            <div className="relative mb-4">
              <div className="text-4xl text-center mb-2">{reward.emoji}</div>
              {!reward.unlocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg backdrop-blur-sm">
                  <Lock size={24} className="text-muted-foreground" />
                </div>
              )}
            </div>
            <h4 className="text-sm font-semibold text-center">{reward.title}</h4>
            <p
              className={`text-xs text-center mt-1 ${
                reward.rarity === "common"
                  ? "text-gray-400"
                  : reward.rarity === "rare"
                    ? "text-cyan-400"
                    : "text-purple-400"
              }`}
            >
              {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
