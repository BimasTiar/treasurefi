import { DollarSign, Wallet } from "lucide-react"

export default function StatsRow() {
  const stats = [
    {
      title: "Total Spending",
      value: "IDR 8,250,000",
      icon: DollarSign,
      color: "from-red-500/20 to-red-600/10",
      accent: "text-red-400",
    },
    {
      title: "Total Income",
      value: "IDR 32,750,000",
      icon: Wallet,
      color: "from-emerald-500/20 to-emerald-600/10",
      accent: "text-emerald-400",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div
            key={idx}
            className={`glass-dark p-6 rounded-2xl border border-white/10 bg-gradient-to-br ${stat.color}`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-muted-foreground font-medium">{stat.title}</h4>
              <div className={`p-2 rounded-lg ${stat.accent} bg-white/10`}>
                <Icon size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
