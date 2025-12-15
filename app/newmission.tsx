// app/admin/new-mission/page.tsx
"use client";

import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";

export default function NewMissionAdmin() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"daily" | "weekly">("daily");
  const [reward, setReward] = useState<number>(10);

  async function submit() {
    try {
      await addDoc(collection(db, "missions"), {
        title,
        type,
        rewardXp: reward,
        color: "#FBBF24",
      });
      alert("Mission created");
      setTitle("");
      setReward(10);
    } catch (err) {
      console.error(err);
      alert("Failed create mission");
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Mission (Admin)</h1>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-3 mb-3 bg-[#111] rounded" />
      <select value={type} onChange={(e) => setType(e.target.value as any)} className="w-full p-3 mb-3 bg-[#111] rounded">
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <input type="number" value={reward} onChange={(e) => setReward(Number(e.target.value))} className="w-full p-3 mb-3 bg-[#111] rounded" />
      <button onClick={submit} className="bg-[#FBBF24] px-4 py-2 rounded">Create</button>
    </div>
  );
}
