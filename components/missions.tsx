import { Zap, Check } from "lucide-react"

interface Mission {
  id: number
  title: string
  xp: number
  icon: string
  status: "active" | "completed"
}

const missions: Mission[] = [
  { id: 1, title: "Save $10", xp: 50, icon: "💾", status: "active" },
  { id: 2, title: "Read Crypto News", xp: 30, icon: "📰", status: "active" },
  { id: 3, title: "Complete Daily Check-in", xp: 25, icon: "✅", status: "completed" },
  { id: 4, title: "Track Expenses", xp: 75, icon: "📊", status: "active" },
  { id: 5, title: "Refer a Friend", xp: 100, icon: "👥", status: "active" },
  { id: 6, title: "Invest $100", xp: 150, icon: "📈", status: "active" },
]

export default function Missions() {
  return (
    <main className="p-6 md:p-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <Zap size={32} className="text-primary" />
          <span className="text-balance">Daily Quests</span>
        </h2>
        <p className="text-muted-foreground">Complete tasks to earn XP and unlock rewards</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={`glass-dark p-6 rounded-2xl border transition-all ${
              mission.status === "completed" ? "border-white/5 opacity-60" : "border-white/10 hover:border-primary/50"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mission.icon}</span>
                <div>
                  <h4 className={`font-semibold ${mission.status === "completed" ? "line-through" : ""}`}>
                    {mission.title}
                  </h4>
                  <p className="text-sm text-primary font-bold">+{mission.xp} XP</p>
                </div>
              </div>
              {mission.status === "completed" && (
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Check className="text-emerald-400" size={20} />
                </div>
              )}
            </div>

            {mission.status === "active" ? (
              <button className="w-full py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
                Start Quest
              </button>
            ) : (
              <button className="w-full py-2 bg-emerald-500/20 text-emerald-400 rounded-lg font-semibold cursor-not-allowed">
                Completed
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
