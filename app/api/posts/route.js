import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "edge";

/**
 * GET /api/posts
 * Optional query params:
 *   user_id   filter by owner
 *   limit     default 20, max 100
 *   offset    default 0
 */
export async function GET(req) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get("user_id");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 100);
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);

    let query = supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (userId) query = query.eq("user_id", userId);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ posts: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST /api/posts
 * body: { user_id: number, title: string, content: string }
 */
export async function POST(req) {
  try {
    const { user_id, title, content } = await req.json();
    if (!user_id || !title || !content) {
      return NextResponse.json({ error: "user_id, title and content are required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // optional: ensure the user exists and is verified
    const { data: account, error: accErr } = await supabase
      .from("accounts")
      .select("user_id, is_verified")
      .eq("user_id", user_id)
      .single();
    if (accErr) return NextResponse.json({ error: "account not found" }, { status: 404 });
    if (!account.is_verified) {
      return NextResponse.json({ error: "email not verified" }, { status: 403 });
    }

    const now = new Date().toISOString();
    const { data, error } = await supabase
      .from("posts")
      .insert({ user_id, title, content, created_at: now, updated_at: now })
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
