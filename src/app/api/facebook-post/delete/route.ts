import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/facebook";

// DELETE — delete a Facebook Page post
export async function DELETE(req: NextRequest) {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageAccessToken) {
    return NextResponse.json(
      { success: false, error: "ยังไม่ได้ตั้งค่า FB_PAGE_ACCESS_TOKEN" },
      { status: 400 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุ postId" },
        { status: 400 }
      );
    }

    const result = await deletePost(pageAccessToken, postId);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "ลบโพสต์สำเร็จ" });
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
