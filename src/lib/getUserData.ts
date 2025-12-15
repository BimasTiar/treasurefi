// src/lib/getUserData.ts
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";

export async function fetchDashboardData(uid: string) {
  if (!uid) return null;

  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.log("Creating new user document for UID:", uid);

    const defaultData = {
      name: "User",
      displayName: "User",
      balance: 0,
      xp: 0,
      level: 1,
      createdAt: new Date(),
    };

    await setDoc(userRef, defaultData);

    return {
      name: "User",
      xp: 0,
      level: 1,
      totalBalance: 0,
      totalIncome: 0,
      totalSpending: 0,
    };
  }

  const user = userSnap.data() as any;

  let totalIncome = 0;
  let totalSpending = 0;

  try {
    const transactionsSnap = await getDocs(collection(db, "users", uid, "transactions"));

    transactionsSnap.forEach((doc) => {
      const t: any = doc.data();
      const amount = Number(t.amount ?? 0);

      if (t.type === "income") {
        totalIncome += amount;
      } else if (t.type === "expense") {
        totalSpending += amount;
      }
    });
  } catch (err) {
    console.error("Error reading transactions:", err);
  }

  const totalBalance = totalIncome - totalSpending;

  return {
    name: user?.name ?? user?.displayName ?? "User",
    xp: user?.xp ?? 0,
    level: user?.level ?? 1,
    totalBalance,
    totalIncome,
    totalSpending,
  };
}