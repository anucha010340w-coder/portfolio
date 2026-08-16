import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ทดลองระบบคลังสินค้า",
  description: "ทดลองใช้งานระบบจัดการสต็อก — ค้นหา, กรองหมวด, ปรับสต็อก, ดูประวัติการเคลื่อนไหว, แจ้งเตือนใกล้หมด แบบ interactive",
  alternates: { canonical: "/demo/inventory" },
  openGraph: {
    type: "website",
    title: "ทดลองระบบคลังสินค้า | AW Dev",
    description: "ทดลองใช้งานระบบจัดการสต็อก — ค้นหา, กรองหมวด, ปรับสต็อก, ดูประวัติการเคลื่อนไหว, แจ้งเตือนใกล้หมด แบบ interactive",
    url: `${siteConfig.url}/demo/inventory`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ทดลองระบบคลังสินค้า | AW Dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ทดลองระบบคลังสินค้า | AW Dev",
    description: "ทดลองใช้งานระบบจัดการสต็อก — ค้นหา, กรองหมวด, ปรับสต็อก, ดูประวัติการเคลื่อนไหว, แจ้งเตือนใกล้หมด แบบ interactive",
    images: ["/opengraph-image"],
  },
};

export default function InventoryDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
