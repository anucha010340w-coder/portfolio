import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ทดลอง POS ร้านอาหาร",
  description: "ทดลองใช้งานระบบ POS ร้านอาหาร — เลือกโต๊ะ, สั่งอาหาร, คำนวณ VAT, ชำระเงิน, พิมพ์ใบเสร็จ แบบ interactive",
  alternates: { canonical: "/demo/pos" },
  openGraph: {
    type: "website",
    title: "ทดลอง POS ร้านอาหาร | AW Dev",
    description: "ทดลองใช้งานระบบ POS ร้านอาหาร — เลือกโต๊ะ, สั่งอาหาร, คำนวณ VAT, ชำระเงิน, พิมพ์ใบเสร็จ แบบ interactive",
    url: `${siteConfig.url}/demo/pos`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "ทดลอง POS ร้านอาหาร | AW Dev" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ทดลอง POS ร้านอาหาร | AW Dev",
    description: "ทดลองใช้งานระบบ POS ร้านอาหาร — เลือกโต๊ะ, สั่งอาหาร, คำนวณ VAT, ชำระเงิน, พิมพ์ใบเสร็จ แบบ interactive",
    images: ["/opengraph-image"],
  },
};

export default function PosDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
