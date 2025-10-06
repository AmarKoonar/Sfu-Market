import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabaseAdmin";

export const runtime = "edge";

export async function PATCH(req, context) {
  try {
    const id = context.params.id;
    const { title, content } = await req.json();
    
    if (!title && !content) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const updates = { updated_at: new Date().toISOString() };
    if (title) updates.title = title;
    if (content) updates.content = content;

    const { data, error } = await supabase
      .from("posts")
      .update(updates)
      .eq("post_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ post: data });
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
      .from("posts")
      .delete()
      .eq("post_id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ deleted: data });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
