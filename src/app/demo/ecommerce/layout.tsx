import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ทดลองร้านค้าออนไลน์",
  description: "ทดลองใช้งานร้านค้าออนไลน์ — ค้นหา, กรองหมวด, ดูสินค้า, ใส่ตะกร้า, เช็คเอาท์, เลือกวิธีจัดส่ง แบบ interactive",
  alternates: { canonical: "/demo/ecommerce" },
  openGraph: {
    type: "website",
    title: "ทดลองร้านค้าออนไลน์ | AW Dev",
    description: "ทดลองใช้งานร้านค้าออนไลน์ — ค้นหา, กรองหมวด, ดูสินค้า, ใส่ตะกร้า, เช็คเอาท์, เลือกวิธีจัดส่ง แบบ interactive",
    url: `${siteConfig.url}/demo/ecommerce`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ทดลองร้านค้าออนไลน์ | AW Dev",
    description: "ทดลองใช้งานร้านค้าออนไลน์ — ค้นหา, กรองหมวด, ดูสินค้า, ใส่ตะกร้า, เช็คเอาท์, เลือกวิธีจัดส่ง แบบ interactive",
  },
};

export default function EcommerceDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
