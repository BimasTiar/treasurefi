import { NextResponse } from "next/server";
const { addXpAndLevel } = require("@/src/utils/leveling");
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { uid, amount } = body;

    if (!uid || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const result = await addXpAndLevel(uid, amount);

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err: any) {
    console.error("claim-xp api error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}