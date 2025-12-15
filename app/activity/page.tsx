"use client";

import { useEffect, useState } from "react";
import { safeUid } from "@/src/lib/missionsUnified";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";

export default function ActivityPage() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const uid = safeUid();
        if (!uid) return;

        const ref = collection(db, "users", uid, "transactions");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snap = await getDocs(q);

        const list: any[] = [];
        snap.forEach((doc) => {
          const d = doc.data();

          list.push({
            id: doc.id,
            title: d.activityName,         
            type: d.type,
            amount: d.amount,
            category: d.category,
            date: d.date,
            notes: d.notes,
          });
        });

        setActivities(list);
      } catch (err) {
        console.error("Activity load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <div className="p-6 text-gray-400">Loading...</div>;

  return (
    <div className="p-6 space-y-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Activity</h1>

      {activities.length === 0 ? (
        <div className="text-gray-500">No activity yet. Add from Home → New Entry.</div>
      ) : (
        activities.map((a) => (
          <div key={a.id} className="bg-[#111] p-4 rounded-xl border border-white/20">
            <div className="text-white font-bold">{a.title}</div>
            <div className="text-gray-400 text-sm">{a.category}</div>

            <div className="mt-1 text-yellow-400 font-bold">
              {a.type === "expense" ? "-" : "+"} IDR {Number(a.amount).toLocaleString("id-ID")}
            </div>

            <div className="text-gray-500 text-xs mt-1">{a.date}</div>
          </div>
        ))
      )}
    </div>
  );
}