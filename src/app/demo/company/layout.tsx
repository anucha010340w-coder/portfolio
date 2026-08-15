import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ทดลองเว็บบริษัท",
  description: "ทดลองใช้งานเว็บบริษัท — หน้าแรก, เกี่ยวกับ, บริการ, ทีมงาน, รีวิว, ฟอร์มติดต่อ พร้อมเมนูนำทาง แบบ interactive",
  alternates: { canonical: "/demo/company" },
  openGraph: {
    type: "website",
    title: "ทดลองเว็บบริษัท | AW Dev",
    description: "ทดลองใช้งานเว็บบริษัท — หน้าแรก, เกี่ยวกับ, บริการ, ทีมงาน, รีวิว, ฟอร์มติดต่อ พร้อมเมนูนำทาง แบบ interactive",
    url: `${siteConfig.url}/demo/company`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ทดลองเว็บบริษัท | AW Dev",
    description: "ทดลองใช้งานเว็บบริษัท — หน้าแรก, เกี่ยวกับ, บริการ, ทีมงาน, รีวิว, ฟอร์มติดต่อ พร้อมเมนูนำทาง แบบ interactive",
  },
};

export default function CompanyDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
