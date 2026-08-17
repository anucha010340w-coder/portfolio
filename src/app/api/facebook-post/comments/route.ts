import { NextResponse } from "next/server";
import { getPostsWithComments } from "@/lib/facebook";

// GET — fetch latest posts with their comments
export async function GET() {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json({ error: "FB not configured" }, { status: 400 });
  }

  try {
    const posts = await getPostsWithComments(pageAccessToken, pageId, 5);
    const totalComments = posts.reduce((sum: number, p: { comments?: unknown[] }) => sum + (p.comments?.length || 0), 0);
    return NextResponse.json({ posts, totalComments });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
