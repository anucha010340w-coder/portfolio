import { NextRequest, NextResponse } from "next/server";

// POST — Exchange user-provided short-lived token for permanent Page Token
export async function POST(req: NextRequest) {
  const appId = process.env.FB_APP_ID || "2023312144956194";
  const appSecret = process.env.FB_APP_SECRET;

  if (!appSecret) {
    return NextResponse.json({
      error: "Missing FB_APP_SECRET — ต้องตั้งค่า FB_APP_SECRET ใน environment variables",
    });
  }

  try {
    const body = await req.json();
    const { userToken } = body;

    if (!userToken) {
      return NextResponse.json({ error: "กรุณาใส่ User Token" });
    }

    // Step 1: Exchange short-lived user token for long-lived user token (~60 days)
    const exchangeRes = await fetch(
      `https://graph.facebook.com/v26.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${userToken}`
    );
    const exchangeData = await exchangeRes.json();

    if (exchangeData.error) {
      return NextResponse.json({
        step: "exchange",
        error: exchangeData.error.message,
      });
    }

    const longLivedUserToken = exchangeData.access_token;

    // Step 2: Get permanent Page Token from /me/accounts
    const accountsRes = await fetch(
      `https://graph.facebook.com/v26.0/me/accounts?fields=id,name,access_token,tasks&access_token=${longLivedUserToken}`
    );
    const accountsData = await accountsRes.json();

    if (accountsData.error) {
      return NextResponse.json({
        step: "accounts",
        error: accountsData.error.message,
      });
    }

    const pages = accountsData.data || [];
    if (pages.length === 0) {
      return NextResponse.json({
        error: "ไม่พบเพจ — token นี้ไม่มีสิทธิ์จัดการเพจ หรือคุณไม่ใช่ admin ของเพจ",
      });
    }

    // Verify each page token
    const verifiedPages = await Promise.all(
      pages.map(async (page: { id: string; name: string; access_token: string; tasks: string[] }) => {
        const debugRes = await fetch(
          `https://graph.facebook.com/v26.0/debug_token?input_token=${page.access_token}&access_token=${appId}|${appSecret}`
        );
        const debugData = await debugRes.json();
        return {
          id: page.id,
          name: page.name,
          access_token: page.access_token,
          tasks: page.tasks,
          token_type: debugData.data?.type,
          expires_at: debugData.data?.expires_at,
          is_valid: debugData.data?.is_valid,
          scopes: debugData.data?.scopes,
          is_permanent: debugData.data?.expires_at === 0,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "แปลง token สำเร็จ",
      pages: verifiedPages,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

// GET — Exchange token from env var (existing functionality)
export async function GET() {
  const shortLivedToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const appId = process.env.FB_APP_ID || "2023312144956194";
  const appSecret = process.env.FB_APP_SECRET;

  if (!shortLivedToken) {
    return NextResponse.json({ error: "Missing FB_PAGE_ACCESS_TOKEN" });
  }

  if (!appSecret) {
    return NextResponse.json({
      error: "Missing FB_APP_SECRET — ต้องตั้งค่า FB_APP_SECRET ใน environment variables",
      hint: "หา App Secret ได้ที่ Facebook Developer → App Settings → Basic → App Secret",
    });
  }

  try {
    // Step 1: Exchange short-lived user token for long-lived user token (~60 days)
    const exchangeRes = await fetch(
      `https://graph.facebook.com/v26.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${shortLivedToken}`
    );
    const exchangeData = await exchangeRes.json();

    if (exchangeData.error) {
      return NextResponse.json({
        step: "exchange",
        error: exchangeData.error.message,
      });
    }

    const longLivedUserToken = exchangeData.access_token;

    // Step 2: Get permanent Page Token from /me/accounts
    const accountsRes = await fetch(
      `https://graph.facebook.com/v26.0/me/accounts?fields=id,name,access_token,tasks&access_token=${longLivedUserToken}`
    );
    const accountsData = await accountsRes.json();

    if (accountsData.error) {
      return NextResponse.json({
        step: "accounts",
        error: accountsData.error.message,
      });
    }

    // Step 3: Verify the Page Token
    const pages = accountsData.data || [];
    if (pages.length === 0) {
      return NextResponse.json({
        error: "ไม่พบเพจ — token นี้ไม่มีสิทธิ์จัดการเพจ",
      });
    }

    // Verify each page token
    const verifiedPages = await Promise.all(
      pages.map(async (page: { id: string; name: string; access_token: string; tasks: string[] }) => {
        const debugRes = await fetch(
          `https://graph.facebook.com/v26.0/debug_token?input_token=${page.access_token}&access_token=${appId}|${appSecret}`
        );
        const debugData = await debugRes.json();
        return {
          id: page.id,
          name: page.name,
          access_token: page.access_token,
          tasks: page.tasks,
          token_type: debugData.data?.type,
          expires_at: debugData.data?.expires_at,
          is_valid: debugData.data?.is_valid,
          scopes: debugData.data?.scopes,
          is_permanent: debugData.data?.expires_at === 0,
        };
      })
    );

    return NextResponse.json({
      success: true,
      message: "แลกเปลี่ยน token สำเร็จ — เลือก access_token ของเพจที่ต้องการใช้",
      long_lived_user_token: longLivedUserToken,
      long_lived_user_token_expires_in_seconds: exchangeData.expires_in,
      pages: verifiedPages,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
