import { NextResponse } from "next/server";
import store from "@/lib/store";

export async function POST(req) {
  const { leadId, notes, summary } = await req.json();

  store[leadId] = { notes, summary };

  console.log("STORE CURRENT STATE:", store);

  return NextResponse.json({ success: true });
}
