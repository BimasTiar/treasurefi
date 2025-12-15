// src/lib/missionsUnified.ts
import { collection, doc, getDocs, runTransaction } from "firebase/firestore";
import { db } from "@/src/lib/firebaseClient";

export function safeUid(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user_uid");
  return raw ? String(raw) : null;
}

export async function getUnifiedMissions(uid: string | null) {
  try {
    const templatesSnap = await getDocs(collection(db, "missions"));
    const templates = templatesSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    let userMap: Record<string, any> = {};
    if (uid) {
      const userSnap = await getDocs(collection(db, "users", uid, "missions"));
      userSnap.docs.forEach((d) => {
        userMap[d.id] = { id: d.id, ...d.data() };
      });
    }

    const unified = templates.map((t: any) => {
      const userVersion = userMap[t.id];
      if (userVersion) {
        return {
          id: userVersion.missionId ?? userVersion.id ?? t.id,
          title: userVersion.title ?? t.title,
          type: userVersion.type ?? t.type ?? "daily",
          progress: userVersion.progress ?? 0,
          rewardXp: userVersion.rewardXp ?? t.rewardXp ?? t.xp ?? 0,
          completed: Boolean(userVersion.completed),
          color: userVersion.color ?? t.color ?? "#FBBF24",
          source: "user",
          raw: userVersion,
        };
      }
      return {
        id: t.id,
        title: t.title,
        type: t.type ?? "daily",
        progress: 0,
        rewardXp: t.rewardXp ?? t.xp ?? 0,
        completed: false,
        color: t.color ?? "#FBBF24",
        source: "template",
        raw: t,
      };
    });

    if (uid) {
      const extras = Object.values(userMap).filter((um: any) => !templates.find((t) => t.id === um.id));
      extras.forEach((e: any) => {
        unified.push({
          id: e.missionId ?? e.id,
          title: e.title,
          type: e.type ?? "daily",
          progress: e.progress ?? 0,
          rewardXp: e.rewardXp ?? e.xp ?? 0,
          completed: Boolean(e.completed),
          color: e.color ?? "#FBBF24",
          source: "user_custom",
          raw: e,
        });
      });
    }

    return unified;
  } catch (err) {
    console.error("getUnifiedMissions error:", err);
    return [];
  }
}

export async function claimUnifiedMission(uid: string, missionId: string) {
  if (!uid) throw new Error("UID required");
  const userMissionRef = doc(db, "users", uid, "missions", missionId);
  const templateRef = doc(db, "missions", missionId);
  const userRef = doc(db, "users", uid);

  try {
    const ok = await runTransaction(db, async (tx) => {
      const usrMissionSnap = await tx.get(userMissionRef);
      if (usrMissionSnap.exists()) {
        const mission = usrMissionSnap.data() as any;
        if (mission.completed) return true;
        const reward = mission.rewardXp ?? mission.xp ?? mission.xpReward ?? 0;
        tx.update(userMissionRef, { progress: 100, completed: true, updatedAt: Date.now() });
        const userSnap = await tx.get(userRef);
        if (!userSnap.exists()) throw new Error("User not found");
        const user = userSnap.data() as any;
        const newXP = Number(user.xp ?? 0) + Number(reward);
        const newLevel = Math.floor(newXP / 100) + 1;
        tx.update(userRef, { xp: newXP, level: newLevel });
        return true;
      }

      const templSnap = await tx.get(templateRef);
      if (!templSnap.exists()) throw new Error("Template not found");
      const templ = templSnap.data() as any;
      const reward = templ.rewardXp ?? templ.xp ?? 0;
      tx.set(userMissionRef, {
        missionId,
        title: templ.title ?? "Mission",
        type: templ.type ?? "daily",
        progress: 100,
        rewardXp: reward,
        completed: true,
        userId: uid,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        color: templ.color ?? "#FBBF24",
        rewardMinted: false,
        readyForMint: false,
      });
      const userSnap2 = await tx.get(userRef);
      if (!userSnap2.exists()) throw new Error("User not found");
      const user2 = userSnap2.data() as any;
      const newXP2 = Number(user2.xp ?? 0) + Number(reward);
      const newLevel2 = Math.floor(newXP2 / 100) + 1;
      tx.update(userRef, { xp: newXP2, level: newLevel2 });
      return true;
    });

    return ok;
  } catch (err) {
    console.error("claimUnifiedMission error:", err);
    return false;
  }
}