import { ImageResponse } from "next/og";

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
          justifyContent: "space-between",
          padding: "0",
          background: "#0a0a0f",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background gradient glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "48px 80px 0 80px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 32,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            <span style={{ fontSize: 36, color: "#2563eb" }}>{"</>"}</span>
            <span>AW Dev</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "#64748b",
              border: "1px solid #1e293b",
              borderRadius: "999px",
              padding: "8px 20px",
            }}
          >
            Full-Stack Developer
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "0 80px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>รับทำเว็บไซต์ แอพ</span>
            <span
              style={{
                background: "linear-gradient(120deg, #3b82f6 0%, #8b5cf6 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              ระบบ POS ระบบตามสั่ง
            </span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 26,
              color: "#94a3b8",
              maxWidth: 800,
            }}
          >
            ส่งงานเร็ว ราคาคุยได้ ดูแลหลังส่งมอบ ปรึกษาฟรี
          </div>
        </div>

        {/* Bottom service tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            padding: "0 80px 48px 80px",
            position: "relative",
          }}
        >
          {["เว็บแอพ", "เว็บธุรกิจ", "แอพมือถือ", "ระบบ POS", "ระบบตามสั่ง"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: 20,
                color: "#cbd5e1",
                background: "rgba(37,99,235,0.15)",
                border: "1px solid rgba(37,99,235,0.3)",
                borderRadius: "12px",
                padding: "10px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
