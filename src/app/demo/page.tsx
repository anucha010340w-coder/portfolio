import type { Metadata } from "next";
import { Utensils, ShoppingBag, CalendarCheck, ArrowRight, Building2, Boxes, Truck } from "lucide-react";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "ทดลองใช้งาน",
  description: "ทดลองใช้งานระบบตัวอย่าง — POS ร้านอาหาร, ร้านค้าออนไลน์, ระบบจองคิว, เว็บบริษัท, ระบบคลังสินค้า, แอพจัดส่ง แบบ interactive เต็มรูปแบบ",
  alternates: { canonical: "/demo" },
};

const demos = [
  {
    href: "/demo/pos",
    label: "POS ร้านอาหาร",
    icon: Utensils,
    desc: "ระบบจุดขายเต็มรูปแบบ — เลือกโต๊ะ, สั่งอาหาร, คำนวณ VAT, ชำระเงิน (เงินสด/บัตร/QR), พิมพ์ใบเสร็จ",
    features: ["เลือกโต๊ะ", "เมนู 16 รายการ", "คำนวณ VAT 7%", "ชำระ 3 วิธี", "ใบเสร็จ"],
    color: "from-blue-600 to-cyan-600",
  },
  {
    href: "/demo/ecommerce",
    label: "ร้านค้าออนไลน์",
    icon: ShoppingBag,
    desc: "เว็บช้อปปิ้งเต็มรูปแบบ — ค้นหา, กรองหมวด, ดูรายละเอียดสินค้า, ใส่ตะกร้า, เช็คเอาท์, เลือกวิธีจัดส่ง",
    features: ["8 สินค้า", "ค้นหา + กรอง", "ดูสินค้า detail", "ตะกร้า + เช็คเอาท์", "จัดส่งฟรี ฿1,000+"],
    color: "from-violet-600 to-purple-600",
  },
  {
    href: "/demo/booking",
    label: "ระบบจองคิว",
    icon: CalendarCheck,
    desc: "ระบบจองคิวเต็มรูปแบบ — เลือกบริการ, เลือกวัน/เวลา, กรอกข้อมูล, ยืนยันการจอง, แจ้งเตือน LINE + SMS",
    features: ["6 บริการ", "จอง 7 วันล่วงหน้า", "เวลาที่ไม่ว่าง", "แจ้งเตือน LINE/SMS", "รีวิวลูกค้า"],
    color: "from-green-600 to-emerald-600",
  },
  {
    href: "/demo/company",
    label: "เว็บบริษัท",
    icon: Building2,
    desc: "เว็บไซต์บริษัทเต็มรูปแบบ — หน้าแรก, เกี่ยวกับ, บริการ, ทีมงาน, รีวิว, ฟอร์มติดต่อ พร้อมเมนูนำทาง",
    features: ["6 หน้า", "เมนูนำทาง", "ฟอร์มติดต่อ", "รีวิวลูกค้า", "Responsive"],
    color: "from-slate-700 to-slate-900",
  },
  {
    href: "/demo/inventory",
    label: "ระบบคลังสินค้า",
    icon: Boxes,
    desc: "ระบบจัดการสต็อกเต็มรูปแบบ — ค้นหา, กรองหมวด, ปรับสต็อก, ดูประวัติการเคลื่อนไหว, แจ้งเตือนใกล้หมด",
    features: ["10 สินค้า", "ค้นหา + กรอง", "ปรับสต็อก", "ประวัติเคลื่อนไหว", "แจ้งเตือน"],
    color: "from-orange-600 to-red-600",
  },
  {
    href: "/demo/delivery",
    label: "แอพจัดส่ง",
    icon: Truck,
    desc: "แอพจัดส่งสินค้าบนมือถือ — รับงาน, ดูแผนที่, ติดตามสถานะ, นำทางจุดรับ-ส่ง, สรุปรายได้",
    features: ["รับงานจริง", "แผนที่ + เส้นทาง", "4 สถานะ", "คะแนนลูกค้า", "สรุปรายได้"],
    color: "from-cyan-600 to-blue-600",
  },
];

export default function DemoPage() {

  return (
    <>
      <BreadcrumbSchema items={[{ name: "หน้าแรก", path: "/" }, { name: "ทดลองใช้งาน", path: "/demo" }]} />
      <section className="relative overflow-hidden">
        <div className="bg-hologram absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-28">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            <TypeReveal text="ทดลองใช้งาน ระบบตัวอย่าง" />
          </h1>
          <p className="mt-4 text-xl text-muted">
            <TypeReveal text="ลองกดเล่นได้จริง — ทุกฟีเจอร์ทำงานเหมือนของจริง เพื่อให้เห็นภาพว่าระบบของคุณจะหน้าตาและใช้งานอย่างไร" speed={25} />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {demos.map((d, i) => {
            const Icon = d.icon;
            return (
              <Reveal key={d.href} delay={i * 100}>
              <Link
                href={d.href}
                className="card card-hover group flex flex-col overflow-hidden p-0"
              >
                <div className={`flex h-32 items-center justify-center bg-gradient-to-br ${d.color}`}>
                  <Icon className="h-14 w-14 text-white transition-transform group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold">{d.label}</h3>
                  </div>
                  <p className="mt-2 flex-1 text-sm text-muted">{d.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {d.features.map((f) => (
                      <span key={f} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                        {f}
                      </span>
                    ))}
                  </div>
                  <span className="mt-4 flex items-center gap-1 text-sm font-semibold text-accent">
                    เปิดทดลองใช้งาน
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20">
        <Reveal>
        <div className="card bg-glow relative overflow-hidden p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">
            <TypeReveal text="อยากได้ระบบแบบนี้ใช้กับธุรกิจของคุณ?" />
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted">
            <TypeReveal text="ทุกระบบปรับแต่งได้ตามความต้องการ บอกไอเดียมาเลย ผมจะวางแผนและเสนอทางออกที่คุ้มค่าที่สุดให้" speed={25} />
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              ปรึกษาฟรี
            </Link>
            <Link href="/portfolio" className="btn-ghost">
              ดูผลงานอื่นๆ <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </Reveal>
      </section>
    </>
  );
}
