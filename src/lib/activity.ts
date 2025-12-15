import { db } from "./firebaseClient";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function addActivity(uid: string, data: any) {
  try {
    await addDoc(collection(db, "users", uid, "activities"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (e) {
    console.log("🔥 activity error:", e);
    return false;
  }
}
