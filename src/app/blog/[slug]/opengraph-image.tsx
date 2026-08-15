import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function BlogOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? "บทความ";
  const category = post?.category ?? "";
  const tags = post?.tags?.slice(0, 3).join(" · ") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
          <span style={{ color: "#38bdf8" }}>{siteConfig.name}</span>
          <span style={{ color: "#64748b" }}>·</span>
          <span style={{ color: "#a78bfa" }}>{category}</span>
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.2,
            display: "flex",
          }}
        >
          {title}
        </div>
        {tags && (
          <div style={{ marginTop: 32, fontSize: 22, color: "#94a3b8" }}>
            {tags}
          </div>
        )}
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 20,
            color: "#64748b",
          }}
        >
          <span style={{ color: "#38bdf8" }}>{"</>"}</span>
          <span>AW Dev · {siteConfig.role}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
