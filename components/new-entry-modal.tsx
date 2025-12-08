"use client"

import { useState } from "react"
import {
  DollarSign, X, UtensilsCrossed, Car, ShoppingBag, Receipt,
  Gamepad2, Heart, Briefcase, TrendingUp, Gift, Activity,
} from "lucide-react"
// 1. Import toast
import { toast } from "sonner"

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
  const indicatorColor = transactionType === "expense" ? "bg-red-500" : "bg-green-500"

  const handleTransactionTypeChange = (type: TransactionType) => {
    setTransactionType(type)
    setCategory("")
    setShowCategoryDropdown(false)
  }

  const handleSave = () => {
    // 2. Validasi Input (Muncul Error Merah jika kosong)
    if (!amount || !activityName || !category) {
      toast.error("Please fill in all required fields!", {
        description: "Amount, Name, and Category cannot be empty."
      })
      return
    }

    // Simulasi Simpan Data
    console.log({
      transactionType,
      amount,
      activityName,
      category,
      date,
      notes,
    })

    // 3. Notifikasi Sukses (Muncul Hijau)
    toast.success("Transaction Saved!", {
      description: `${transactionType === 'income' ? '+' : '-'} IDR ${Number(amount).toLocaleString('id-ID')} (${activityName})`,
      duration: 3000,
    })

    // Reset Form
    setAmount("")
    setActivityName("")
    setCategory("")
    setNotes("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 transition-all duration-200 animate-in fade-in zoom-in-95">
        <div className="bg-[#18181b] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">New Entry</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Transaction Type Switcher */}
          <div className="flex gap-2 mb-6 bg-black/40 p-1 rounded-2xl border border-white/5">
            {["expense", "income"].map((type) => (
              <button
                key={type}
                onClick={() => handleTransactionTypeChange(type as TransactionType)}
                className={`flex-1 py-2 px-4 rounded-xl font-bold text-sm transition-all capitalize ${
                  transactionType === type ? `${indicatorColor} text-white shadow-lg` : "text-gray-500 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Amount Input */}
          <div className="mb-6 relative">
            <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Amount</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">Rp</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="0"
                className="w-full bg-[#09090b] border border-white/10 rounded-2xl pl-14 pr-6 py-4 text-3xl font-bold text-white placeholder-gray-700 focus:outline-none focus:border-[#FBBF24] transition-all text-right"
              />
            </div>
          </div>

          {/* Activity Name */}
          <div className="mb-4">
            <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Activity Name</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g., Nasi Padang"
              className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FBBF24] transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4 relative">
            <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Category</label>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full bg-[#09090b] border border-white/10 rounded-xl px-4 py-3 text-white flex items-center gap-3 hover:border-white/30 transition-colors text-left"
            >
              {selectedCategory ? (
                <>
                  <selectedCategory.icon className="w-5 h-5 text-[#FBBF24]" />
                  <span>{selectedCategory.name}</span>
                </>
              ) : (
                <span className="text-gray-600">Select category</span>
              )}
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl max-h-48 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setCategory(cat.name)
                      setShowCategoryDropdown(false)
                    }}
                    className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 text-white text-left transition-colors border-b border-white/5 last:border-b-0"
                  >
                    <cat.icon className="w-4 h-4 text-gray-400" />
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 hover:text-white transition-colors font-bold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-xl bg-[#FBBF24] text-black font-bold hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-500/20"
            >
              Save Transaction
            </button>
          </div>
        </div>
      </div>
    </>
  )
}