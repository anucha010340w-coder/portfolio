import { NextRequest, NextResponse } from "next/server";
import { postToPage, postWithPhoto, schedulePost, getPageInfo, getPagePosts, getPostsStats } from "@/lib/facebook";

// GET — check connection status + recent posts
export async function GET() {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json(
      {
        connected: false,
        message: "ยังไม่ได้ตั้งค่า Facebook Page Token หรือ Page ID ใน .env.local",
      },
      { status: 200 }
    );
  }

  try {
    const info = await getPageInfo(pageAccessToken, pageId);
    const posts = await getPagePosts(pageAccessToken, pageId, 5);

    return NextResponse.json({
      connected: true,
      page: {
        name: info.name,
        picture: info.picture?.data?.url,
      },
      recentPosts: posts,
    });
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        message: error instanceof Error ? error.message : "เชื่อมต่อไม่ได้",
      },
      { status: 200 }
    );
  }
}

// POST — post to Facebook Page
export async function POST(req: NextRequest) {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json(
      { success: false, error: "ยังไม่ได้ตั้งค่า FB_PAGE_ACCESS_TOKEN หรือ FB_PAGE_ID ใน .env.local" },
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const { message, link, scheduledTime, photoUrl } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "กรุณาใส่ข้อความ" },
        { status: 400 }
      );
    }

    // If scheduledTime is provided, schedule the post
    if (scheduledTime) {
      const result = await schedulePost(pageAccessToken, pageId, message, scheduledTime, link);
      if (result.error) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "ตั้งเวลาโพสต์สำเร็จ",
        postId: result.id,
        scheduledTime,
      });
    }

    // Post with photo if photoUrl is provided
    if (photoUrl) {
      const result = await postWithPhoto(pageAccessToken, pageId, message, photoUrl, link);
      if (result.error) {
        return NextResponse.json(
          { success: false, error: result.error },
          { status: 400 }
        );
      }
      return NextResponse.json({
        success: true,
        message: "โพสต์พร้อมรูปสำเร็จ",
        postId: result.id,
      });
    }

    // Post immediately
    const result = await postToPage(pageAccessToken, pageId, message, link);
    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "โพสต์สำเร็จ",
      postId: result.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด",
      },
      { status: 500 }
    );
  }
}
