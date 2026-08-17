import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { generatePostFromBlog, postToPage } from "@/lib/facebook";
import { siteConfig } from "@/lib/site";

// Vercel Cron — auto post latest blog post
// Configured in vercel.json: runs daily at 9 AM Bangkok time
export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json({ success: false, error: "FB not configured" }, { status: 400 });
  }

  try {
    const posts = getAllPosts();

    // Find posts from the last 24 hours
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const recentPosts = posts.filter((p) => {
      try {
        return new Date(p.date) >= yesterday;
      } catch {
        return false;
      }
    });

    if (recentPosts.length === 0) {
      return NextResponse.json({
        success: true,
        message: "ไม่มีบทความใหม่ใน 24 ชั่วโมงที่ผ่านมา",
        posted: 0,
      });
    }

    const results: { title: string; success: boolean; error?: string }[] = [];

    for (const post of recentPosts.slice(0, 3)) {
      const url = `${siteConfig.url}/blog/${post.slug}`;
      const message = generatePostFromBlog(post.title, post.description, url, post.tags);
      const result = await postToPage(pageAccessToken, pageId, message, url);
      results.push({
        title: post.title,
        success: !result.error,
        error: result.error,
      });
    }

    return NextResponse.json({
      success: true,
      posted: results.filter((r) => r.success).length,
      results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด" },
      { status: 500 }
    );
  }
}
