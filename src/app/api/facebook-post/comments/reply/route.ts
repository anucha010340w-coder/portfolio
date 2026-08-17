import { NextRequest, NextResponse } from "next/server";
import { replyComment } from "@/lib/facebook";

// POST — send a reply to a Facebook comment
export async function POST(req: NextRequest) {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageAccessToken) {
    return NextResponse.json({ error: "FB not configured" }, { status: 400 });
  }

  try {
    const { commentId, message } = await req.json();

    if (!commentId || !message) {
      return NextResponse.json({ error: "กรุณาระบุ commentId และ message" });
    }

    const result = await replyComment(pageAccessToken, commentId, message);

    if (result.error) {
      return NextResponse.json({ success: false, error: result.error });
    }

    return NextResponse.json({ success: true, replyId: result.id });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
