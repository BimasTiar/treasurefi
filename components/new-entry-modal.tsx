"use client"

import { useState } from "react"
import {
  DollarSign,
  X,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Gamepad2,
  Heart,
  Briefcase,
  TrendingUp,
  Gift,
  Activity,
} from "lucide-react"

interface NewEntryModalProps {
  isOpen: boolean
  onClose: () => void
}

type TransactionType = "expense" | "income"

const expenseCategories = [
  { name: "Food & Drink", icon: UtensilsCrossed },
  { name: "Transport", icon: Car },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Bills", icon: Receipt },
  { name: "Entertainment", icon: Gamepad2 },
  { name: "Health", icon: Heart },
]

const incomeCategories = [
  { name: "Salary", icon: Briefcase },
  { name: "Freelance", icon: TrendingUp },
  { name: "Investment", icon: DollarSign },
  { name: "Gift", icon: Gift },
  { name: "Trading", icon: Activity },
]

export default function NewEntryModal({ isOpen, onClose }: NewEntryModalProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>("expense")
  const [amount, setAmount] = useState("")
  const [activityName, setActivityName] = useState("")
  const [category, setCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [notes, setNotes] = useState("")
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const categories = transactionType === "expense" ? expenseCategories : incomeCategories
  const selectedCategory = categories.find((c) => c.name === category)
  const accentColor = transactionType === "expense" ? "text-red-500" : "text-green-500"
  const indicatorColor = transactionType === "expense" ? "bg-red-500" : "bg-green-500"

  const handleTransactionTypeChange = (type: TransactionType) => {
    setTransactionType(type)
    setCategory("")
    setShowCategoryDropdown(false)
  }

  const handleSave = () => {
    if (!amount || !activityName || !category) {
      alert("Please fill in all required fields")
      return
    }
    console.log({
      transactionType,
      amount,
      activityName,
      category,
      date,
      notes,
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-200 animate-in fade-in zoom-in-95">
        <div className="bg-zinc-900/90 border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">New Entry</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>

          {/* Transaction Type Switcher */}
          <div className="flex gap-2 mb-6 bg-zinc-800/50 p-1 rounded-2xl">
            {["expense", "income"].map((type) => (
              <button
                key={type}
                onClick={() => handleTransactionTypeChange(type as TransactionType)}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all ${
                  transactionType === type ? `${indicatorColor} text-white` : "text-white/50 hover:text-white/70"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="0"
              className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl px-6 py-4 text-center text-4xl font-bold text-white placeholder-white/20 focus:outline-none focus:border-white/30"
            />
            <div className="text-center text-white/50 text-sm mt-2">
              IDR {amount ? Number.parseInt(amount).toLocaleString("id-ID") : "0"}
            </div>
          </div>

          {/* Activity Name */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Activity Name</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g., Nasi Padang"
              className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-6 relative">
            <label className="block text-white/60 text-sm mb-2">Category</label>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white flex items-center gap-2 hover:border-white/20 transition-colors"
            >
              {selectedCategory ? (
                <>
                  <selectedCategory.icon className="w-4 h-4" />
                  {selectedCategory.name}
                </>
              ) : (
                <span className="text-white/50">Select category</span>
              )}
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-800 border border-white/10 rounded-2xl overflow-hidden z-50">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setCategory(cat.name)
                      setShowCategoryDropdown(false)
                    }}
                    className="w-full px-4 py-3 hover:bg-white/10 flex items-center gap-2 text-white text-left transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
            />
          </div>

          {/* Notes */}
          <div className="mb-6">
            <label className="block text-white/60 text-sm mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full bg-zinc-800/50 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 resize-none"
              rows={3}
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-2xl bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-colors"
            >
              Save Transaction
            </button>
          </div>
        </div>
      </div>
    </>
  )
}