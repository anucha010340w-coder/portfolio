import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ทดลองแอพจัดส่ง",
  description: "ทดลองใช้งานแอพจัดส่งสินค้า — รับงาน, ดูแผนที่, ติดตามสถานะ, นำทางจุดรับ-ส่ง, สรุปรายได้ แบบ interactive",
  alternates: { canonical: "/demo/delivery" },
  openGraph: {
    type: "website",
    title: "ทดลองแอพจัดส่ง | AW Dev",
    description: "ทดลองใช้งานแอพจัดส่งสินค้า — รับงาน, ดูแผนที่, ติดตามสถานะ, นำทางจุดรับ-ส่ง, สรุปรายได้ แบบ interactive",
    url: `${siteConfig.url}/demo/delivery`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ทดลองแอพจัดส่ง | AW Dev",
    description: "ทดลองใช้งานแอพจัดส่งสินค้า — รับงาน, ดูแผนที่, ติดตามสถานะ, นำทางจุดรับ-ส่ง, สรุปรายได้ แบบ interactive",
  },
};

export default function DeliveryDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
