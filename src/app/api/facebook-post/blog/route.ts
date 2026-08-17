import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { generatePostFromBlog, postToPage } from "@/lib/facebook";
import { siteConfig } from "@/lib/site";

// POST — auto post a blog article to Facebook Page
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
    const { slug } = body;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "กรุณาระบุ slug ของบทความ" },
        { status: 400 }
      );
    }

    const posts = getAllPosts();
    const post = posts.find((p) => p.slug === slug);

    if (!post) {
      return NextResponse.json(
        { success: false, error: `ไม่พบบทความ slug: ${slug}` },
        { status: 404 }
      );
    }

    const url = `${siteConfig.url}/blog/${post.slug}`;
    const message = generatePostFromBlog(post.title, post.description, url, post.tags);

    const result = await postToPage(pageAccessToken, pageId, message, url);

    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `โพสต์บทความ "${post.title}" สำเร็จ`,
      postId: result.id,
      url,
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

// GET — list all blog posts available for auto-posting
export async function GET() {
  const posts = getAllPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    date: p.date,
    tags: p.tags,
    url: `${siteConfig.url}/blog/${p.slug}`,
  }));

  return NextResponse.json({ posts });
}
