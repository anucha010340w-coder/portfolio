import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ทดลองระบบจองคิว",
  description: "ทดลองใช้งานระบบจองคิว — เลือกบริการ, เลือกวัน/เวลา, กรอกข้อมูล, ยืนยันการจอง, แจ้งเตือน แบบ interactive",
  alternates: { canonical: "/demo/booking" },
  openGraph: {
    type: "website",
    title: "ทดลองระบบจองคิว | AW Dev",
    description: "ทดลองใช้งานระบบจองคิว — เลือกบริการ, เลือกวัน/เวลา, กรอกข้อมูล, ยืนยันการจอง, แจ้งเตือน แบบ interactive",
    url: `${siteConfig.url}/demo/booking`,
  },
  twitter: {
    card: "summary_large_image",
    title: "ทดลองระบบจองคิว | AW Dev",
    description: "ทดลองใช้งานระบบจองคิว — เลือกบริการ, เลือกวัน/เวลา, กรอกข้อมูล, ยืนยันการจอง, แจ้งเตือน แบบ interactive",
  },
};

export default function BookingDemoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
