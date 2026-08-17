import { NextResponse } from "next/server";
import { getScheduledPosts } from "@/lib/facebook";

// GET — list scheduled posts from Facebook Page
export async function GET() {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json({ error: "FB not configured" }, { status: 400 });
  }

  try {
    const posts = await getScheduledPosts(pageAccessToken, pageId);
    return NextResponse.json({ scheduled: posts, count: posts.length });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
