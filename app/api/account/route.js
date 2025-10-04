import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "edge";

export async function PATCH(req, context) {
  try {
    const id = context.params.id;
    const updates = await req.json();
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("accounts")
      .update(updates)
      .eq("user_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ account: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function DELETE(req, context) {
  try {
    const id = context.params.id;
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("accounts")
      .delete()
      .eq("user_id", id)
      .select("*")
      .single();

    if (error) throw error;

    
    return NextResponse.json({ deleted: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    const { username, email, password_hash } = await req.json();
    if (!username || !email || !password_hash) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("accounts")
      .insert({
        username,
        email,
        password_hash,
        is_verified: false
      })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ account: data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}