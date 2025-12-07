"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  ChevronDown,
  Calendar,
  CheckCircle,
  Clock,
  Coffee,
  Bus,
  DollarSign,
  ShoppingBag,
  Zap,
} from "lucide-react"

interface Transaction {
  id: string
  title: string
  category: string
  amount: number
  type: "income" | "expense"
  date: string
  status: "completed" | "pending"
  xp: number
  icon: React.ReactNode
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Bakmi Efata",
    category: "Food & Beverage",
    amount: 45000,
    type: "expense",
    date: "Oct 29, 2025 14:30",
    status: "completed",
    xp: 5,
    icon: <Coffee size={20} />,
  },
  {
    id: "2",
    title: "Monthly Salary",
    category: "Income",
    amount: 5000000,
    type: "income",
    date: "Oct 28, 2025 08:00",
    status: "completed",
    xp: 50,
    icon: <DollarSign size={20} />,
  },
  {
    id: "3",
    title: "Uber Ride",
    category: "Transportation",
    amount: 35000,
    type: "expense",
    date: "Oct 28, 2025 18:45",
    status: "completed",
    xp: 3,
    icon: <Bus size={20} />,
  },
  {
    id: "4",
    title: "Online Shopping",
    category: "Shopping",
    amount: 250000,
    type: "expense",
    date: "Oct 27, 2025 20:15",
    status: "pending",
    xp: 10,
    icon: <ShoppingBag size={20} />,
  },
  {
    id: "5",
    title: "Freelance Project",
    category: "Income",
    amount: 750000,
    type: "income",
    date: "Oct 27, 2025 09:30",
    status: "completed",
    xp: 20,
    icon: <Zap size={20} />,
  },
  {
    id: "6",
    title: "Electricity Bill",
    category: "Utilities",
    amount: 250000,
    type: "expense",
    date: "Oct 26, 2025 10:00",
    status: "completed",
    xp: 5,
    icon: <Zap size={20} />,
  },
]

export default function Activity() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [displayCount, setDisplayCount] = useState(6)

  const filtered = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || tx.type === filterType

    return matchesSearch && matchesFilter
  })

  const displayedTransactions = filtered.slice(0, displayCount)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Treasure Log</h1>
        <p className="text-muted-foreground">Track your income and expenses</p>
      </div>

      {/* Controls Section */}
      <div className="glass rounded-2xl p-4 md:p-6 mb-6">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={20} />
            <input
              type="text"
              placeholder="Search transaction..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Filter and Date Range */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Filter Pills */}
          <div className="flex gap-2">
            {(["all", "income", "expense"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterType(filter)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  filterType === filter
                    ? filter === "income"
                      ? "bg-primary/80 text-primary-foreground"
                      : filter === "expense"
                        ? "bg-destructive/80 text-destructive-foreground"
                        : "bg-secondary/80 text-secondary-foreground"
                    : "bg-white/10 text-foreground hover:bg-white/15"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          {/* Date Range Picker */}
          <div className="flex items-center gap-2 md:ml-auto">
            <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-all text-foreground">
              <Calendar size={18} />
              <span className="text-sm">This Month</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="glass rounded-2xl overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block">
          <div className="border-b border-border bg-white/5 px-6 py-4">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
              <div className="col-span-4">Details</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-2">XP</div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {displayedTransactions.map((tx) => (
              <div key={tx.id} className="px-6 py-4 hover:bg-white/5 transition-colors">
                <div className="grid grid-cols-12 gap-4 items-center">
                  {/* Details */}
                  <div className="col-span-4 flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${tx.type === "income" ? "bg-primary/20" : "bg-destructive/20"}`}>
                      {tx.icon}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.title}</p>
                      <p className="text-xs text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>

                  {/* Category */}
                  <div className="col-span-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        tx.type === "income" ? "badge-gold" : "badge-blue"
                      }`}
                    >
                      {tx.category}
                    </span>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 flex items-center gap-2">
                    {tx.status === "completed" ? (
                      <>
                        <CheckCircle size={16} className="text-primary" />
                        <span className="text-sm text-primary">Completed</span>
                      </>
                    ) : (
                      <>
                        <Clock size={16} className="text-yellow-500" />
                        <span className="text-sm text-yellow-500">Pending</span>
                      </>
                    )}
                  </div>

                  {/* Amount */}
                  <div className="col-span-2">
                    <p className={`font-bold text-sm ${tx.type === "income" ? "text-primary" : "text-destructive"}`}>
                      {tx.type === "income" ? "+" : "-"}
                      {formatCurrency(tx.amount)}
                    </p>
                  </div>

                  {/* XP */}
                  <div className="col-span-2">
                    <span className="text-primary font-medium">+{tx.xp} XP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-border">
          {displayedTransactions.map((tx) => (
            <div key={tx.id} className="p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg flex-shrink-0 ${
                    tx.type === "income" ? "bg-primary/20" : "bg-destructive/20"
                  }`}
                >
                  {tx.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{tx.title}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
                <p
                  className={`font-bold text-sm whitespace-nowrap ${
                    tx.type === "income" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {tx.type === "income" ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      tx.type === "income" ? "badge-gold" : "badge-blue"
                    }`}
                  >
                    {tx.category}
                  </span>
                  {tx.status === "completed" ? (
                    <span className="flex items-center gap-1 px-2 py-1 bg-primary/20 rounded-full text-xs text-primary">
                      <CheckCircle size={14} />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 rounded-full text-xs text-yellow-500">
                      <Clock size={14} />
                      Pending
                    </span>
                  )}
                </div>
                <span className="text-primary font-medium text-sm">+{tx.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {displayCount < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setDisplayCount((prev) => prev + 6)}
            className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-lg font-medium transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {/* Empty State */}
      {displayedTransactions.length === 0 && (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="text-muted-foreground">No transactions found</p>
        </div>
      )}
    </div>
  )
}
