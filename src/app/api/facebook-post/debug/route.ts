import { NextResponse } from "next/server";

// GET — debug token permissions
export async function GET() {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json({
      error: "Missing FB_PAGE_ACCESS_TOKEN or FB_PAGE_ID",
      hasToken: !!pageAccessToken,
      hasPageId: !!pageId,
    });
  }

  try {
    // 1. Debug token to check permissions
    const debugRes = await fetch(
      `https://graph.facebook.com/v26.0/debug_token?input_token=${pageAccessToken}&access_token=${pageAccessToken}`
    );
    const debugData = await debugRes.json();

    // 2. Check /me to see what identity the token represents
    const meRes = await fetch(
      `https://graph.facebook.com/v26.0/me?fields=id,name,category&access_token=${pageAccessToken}`
    );
    const meData = await meRes.json();

    // 3. Try a test post to see the exact error
    const testRes = await fetch(
      `https://graph.facebook.com/v26.0/${pageId}/feed`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "ทดสอบสิทธิ์โพสต์ - จะลบภายในไม่กี่วินาที",
          access_token: pageAccessToken,
        }),
      }
    );
    const testData = await testRes.json();

    // 4. If test post succeeded, delete it immediately
    let deletedTest = false;
    if (testData.id) {
      const delRes = await fetch(
        `https://graph.facebook.com/v26.0/${testData.id}?access_token=${pageAccessToken}`,
        { method: "DELETE" }
      );
      const delData = await delRes.json();
      deletedTest = delData.success === true;
    }

    return NextResponse.json({
      tokenDebug: debugData,
      identity: meData,
      testPost: testData,
      testPostDeleted: deletedTest,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
