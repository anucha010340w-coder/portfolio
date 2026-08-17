import { NextResponse } from "next/server";
import { getPostsStats } from "@/lib/facebook";

// GET — dashboard stats (likes, comments, shares)
export async function GET() {
  const pageAccessToken = process.env.FB_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FB_PAGE_ID;

  if (!pageAccessToken || !pageId) {
    return NextResponse.json(
      { success: false, error: "ยังไม่ได้ตั้งค่า FB" },
      { status: 200 }
    );
  }

  try {
    const posts = await getPostsStats(pageAccessToken, pageId, 10);

    const totalLikes = posts.reduce((sum: number, p: { likes?: number }) => sum + (p.likes || 0), 0);
    const totalComments = posts.reduce((sum: number, p: { comments?: number }) => sum + (p.comments || 0), 0);
    const totalShares = posts.reduce((sum: number, p: { shares?: number }) => sum + (p.shares || 0), 0);
    const totalEngagement = totalLikes + totalComments + totalShares;

    // Find best performing post
    const bestPost = posts.length > 0
      ? posts.reduce((best: { likes?: number; comments?: number; shares?: number }, p: { likes?: number; comments?: number; shares?: number }) => {
          const pScore = (p.likes || 0) + (p.comments || 0) + (p.shares || 0);
          const bScore = (best.likes || 0) + (best.comments || 0) + (best.shares || 0);
          return pScore > bScore ? p : best;
        })
      : null;

    // Find best posting time (analyze which time slots get most engagement)
    const timeSlots: Record<string, { engagement: number; count: number }> = {};
    posts.forEach((p: { created_time?: string; likes?: number; comments?: number; shares?: number }) => {
      if (p.created_time) {
        const hour = new Date(p.created_time).getHours().toString();
        const score = (p.likes || 0) + (p.comments || 0) + (p.shares || 0);
        if (!timeSlots[hour]) timeSlots[hour] = { engagement: 0, count: 0 };
        timeSlots[hour].engagement += score;
        timeSlots[hour].count += 1;
      }
    });

    const bestTimes = Object.entries(timeSlots)
      .map(([hour, data]) => ({ hour: parseInt(hour), avgEngagement: data.engagement / data.count }))
      .sort((a, b) => b.avgEngagement - a.avgEngagement)
      .slice(0, 3);

    return NextResponse.json({
      success: true,
      stats: {
        totalPosts: posts.length,
        totalLikes,
        totalComments,
        totalShares,
        totalEngagement,
        avgEngagementPerPost: posts.length > 0 ? Math.round(totalEngagement / posts.length) : 0,
      },
      bestPost: bestPost
        ? {
            message: (bestPost as { message?: string }).message?.slice(0, 100) || "",
            likes: bestPost.likes || 0,
            comments: bestPost.comments || 0,
            shares: bestPost.shares || 0,
            permalink_url: (bestPost as { permalink_url?: string }).permalink_url,
          }
        : null,
      bestTimes: bestTimes.map((t) => ({
        hour: t.hour,
        label: `${t.hour}:00 - ${t.hour + 1}:00`,
        avgEngagement: Math.round(t.avgEngagement),
      })),
      posts: posts.slice(0, 5),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "เกิดข้อผิดพลาด" },
      { status: 200 }
    );
  }
}
