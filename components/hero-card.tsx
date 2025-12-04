import { ArrowUpRight, Sparkles } from "lucide-react"

export default function HeroCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent pointer-events-none" />
      <div className="glass-dark p-8 md:p-12 border-2 border-primary/30">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-muted-foreground text-sm font-medium mb-2">Total Balance</p>
            <h3 className="text-4xl md:text-5xl font-bold text-balance flex items-baseline gap-2">
              <span className="text-primary">IDR</span>
              <span>24,500,000</span>
            </h3>
          </div>
          <div className="p-3 bg-primary/20 rounded-2xl">
            <Sparkles className="text-primary" size={28} />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center gap-1 text-emerald-400">
            <ArrowUpRight size={16} />
            <span className="text-sm font-semibold">+12.5%</span>
          </div>
          <span className="text-muted-foreground text-sm">from last month</span>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-opacity text-sm">
            Deposit
          </button>
          <button className="px-6 py-2 border border-primary/50 text-primary rounded-full font-semibold hover:bg-primary/10 transition-colors text-sm">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
