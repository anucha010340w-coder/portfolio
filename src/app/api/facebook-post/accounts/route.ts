import { NextResponse } from "next/server";

// GET — find real Page ID and Page Access Token from /me/accounts
export async function GET() {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!pageAccessToken) {
    return NextResponse.json({ error: "Missing FB_PAGE_ACCESS_TOKEN" });
  }

  try {
    // Call /me/accounts to get all pages the user manages
    const res = await fetch(
      `https://graph.facebook.com/v26.0/me/accounts?fields=id,name,access_token,category&access_token=${pageAccessToken}`
    );
    const data = await res.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message });
    }

    return NextResponse.json({
      pages: data.data,
      count: data.data?.length || 0,
      message: data.data?.length === 0
        ? "ไม่พบเพจ — token นี้ไม่มีสิทธิ์จัดการเพจ หรือคุณไม่ใช่ admin ของเพจ"
        : "เจอเพจแล้ว — ใช้ id และ access_token ของเพจที่ต้องการ",
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
