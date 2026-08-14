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
            "linear-gradient(135deg, #1a1d2b 0%, #20243a 50%, #241438 100%)",
          color: "#e7e9ee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#00e5ff",
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
              background: "linear-gradient(120deg, #00e5ff 0%, #b14bff 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {siteConfig.name}
          </span>
        </div>
        <div style={{ marginTop: 12, fontSize: 40, fontWeight: 700 }}>
          {siteConfig.nameEn}
        </div>
        <div style={{ marginTop: 32, fontSize: 28, color: "#8b90a0", maxWidth: 900 }}>
          {siteConfig.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 24,
            fontSize: 22,
            color: "#8b90a0",
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
