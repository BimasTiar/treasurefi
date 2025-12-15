// src/lib/xpUtils.ts
export async function claimXpViaApi(uid: string, amount: number) {
  const res = await fetch("/api/claim-xp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, amount }),
  });
  if (!res.ok) throw new Error("Claim XP failed");
  return res.json();
}
