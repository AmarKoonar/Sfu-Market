import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "edge";

export async function POST(req) {
  try {
    const { email, password_hash } = await req.json();
    if (!email || !password_hash) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .eq("email", email)
      .eq("password_hash", password_hash)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json({ account: data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
