"use client";

import { useState } from "react";
import {
  X,
  UtensilsCrossed,
  Car,
  ShoppingBag,
  Receipt,
  Gamepad2,
  Heart,
  Briefcase,
  TrendingUp,
  DollarSign,
  Gift,
  Activity,
  MoreHorizontal,
} from "lucide-react";
import { db } from "@/src/lib/firebaseClient";
import { addDoc, collection } from "firebase/firestore";

interface NewEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

type TransactionType = "expense" | "income";

const expenseCategories = [
  { name: "Food & Drink", icon: UtensilsCrossed },
  { name: "Transport", icon: Car },
  { name: "Shopping", icon: ShoppingBag },
  { name: "Bills", icon: Receipt },
  { name: "Entertainment", icon: Gamepad2 },
  { name: "Health", icon: Heart },
  { name: "Other", icon: MoreHorizontal },
];

const incomeCategories = [
  { name: "Salary", icon: Briefcase },
  { name: "Freelance", icon: TrendingUp },
  { name: "Investment", icon: DollarSign },
  { name: "Gift", icon: Gift },
  { name: "Trading", icon: Activity },
  { name: "Other", icon: MoreHorizontal },
];

export default function NewEntryModal({ isOpen, onClose, onCreated }: NewEntryModalProps) {
  const [transactionType, setTransactionType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState("");
  const [activityName, setActivityName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = transactionType === "expense" ? expenseCategories : incomeCategories;
  const selectedCategory = categories.find((c) => c.name === category);
  const indicatorColor = transactionType === "expense" ? "bg-[#EF4444]" : "bg-[#10B981]";

  const handleTransactionTypeChange = (type: TransactionType) => {
    setTransactionType(type);
    setCategory("");
    setShowCategoryDropdown(false);
  };

  const handleSave = async () => {
    if (!amount || !activityName || !category) {
      alert("Please fill in all required fields (Amount, Name, Category).");
      return;
    }

    const uid = localStorage.getItem("user_uid");
    if (!uid) {
      alert("User UID not found.");
      return;
    }

    const payload = {
      type: transactionType,
      amount: Number(amount),
      activityName,
      category,
      notes,
      date,
      createdAt: new Date().toISOString(),
    };

    // ⬇⬇⬇ SIMPAN KE FIREBASE
    try {
      await addDoc(collection(db, "users", uid, "transactions"), payload);

      // ⬇⬇⬇ KASIH CALLBACK REFRESH DATA
      if (onCreated) onCreated();
    } catch (err) {
      console.error("Error saving transaction:", err);
    }

    // reset form
    setAmount("");
    setActivityName("");
    setCategory("");
    setNotes("");
    setDate(new Date().toISOString().split("T")[0]);

    onClose();
    if (onCreated) onCreated();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#121212] border border-white/10 rounded-3xl w-full max-w-md p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">New Entry</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex bg-[#1F1F1F] p-1 rounded-xl mb-6">
            <button
              onClick={() => handleTransactionTypeChange("expense")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                transactionType === "expense" ? "bg-[#EF4444] text-white shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              Expense
            </button>
            <button
              onClick={() => handleTransactionTypeChange("income")}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                transactionType === "income" ? "bg-[#10B981] text-white shadow-md" : "text-gray-400 hover:text-white"
              }`}
            >
              Income
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2">Amount</label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  setAmount(val);
                }}
                placeholder="0"
                className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl py-4 px-4 text-center text-3xl font-bold text-white placeholder-gray-600 focus:outline-none focus:border-[#FBBF24] transition-all"
              />
              <div className="absolute inset-x-0 -bottom-6 text-center text-xs text-gray-500 font-mono">
                IDR {amount ? Number(amount).toLocaleString("id-ID") : "0"}
              </div>
            </div>
          </div>

          {/* Activity Name */}
          <div className="mt-6">
            <label className="block text-gray-400 text-xs font-bold mb-2">Activity Name</label>
            <input
              type="text"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="e.g., Nasi Padang"
              className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FBBF24] transition-all"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <label className="block text-gray-400 text-xs font-bold mb-2">Category</label>
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl px-4 py-3 text-white flex items-center justify-between hover:border-white/20 transition-colors text-left"
            >
              {selectedCategory ? (
                <div className="flex items-center gap-3">
                  <selectedCategory.icon className="w-5 h-5 text-[#FBBF24]" />
                  <span>{selectedCategory.name}</span>
                </div>
              ) : (
                <span className="text-gray-500">Select category</span>
              )}
            </button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#1F1F1F] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl max-h-48 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      setCategory(cat.name);
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full px-4 py-3 hover:bg-white/5 flex items-center gap-3 text-white text-left border-b border-white/5 last:border-b-0 transition-colors"
                  >
                    <cat.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FBBF24] transition-all [color-scheme:dark]"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-400 text-xs font-bold mb-2">Notes (Optional)</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              className="w-full bg-[#1F1F1F] border border-white/5 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#FBBF24] transition-all resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-8 pt-4 border-t border-white/5">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
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
  );
}