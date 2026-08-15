import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eef2ff 50%, #f5f3ff 100%)",
          color: "#1e293b",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#2563eb",
          }}
        >
          <span style={{ fontSize: 40 }}>{"</>"}</span>
          <span>{siteConfig.role}</span>
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          <span
            style={{
              background: "linear-gradient(120deg, #2563eb 0%, #7c3aed 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {siteConfig.name}
          </span>
        </div>
        <div style={{ marginTop: 12, fontSize: 40, fontWeight: 700 }}>
          AW Dev
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#64748b", maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 24,
            fontSize: 22,
            color: "#64748b",
          }}
        >
          <span>เว็บแอพ</span>
          <span>เว็บธุรกิจ</span>
          <span>แอพมือถือ</span>
          <span>ระบบ POS</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
