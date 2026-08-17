import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { serviceIconMap } from "@/lib/serviceIcons";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema, ServiceSchema, FAQSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง",
  description: `รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง ระบบจองคิว ระบบคลังสินค้า ร้านค้าออนไลน์ โดย ${siteConfig.name} — Full-Stack Developer ใช้ Next.js React TypeScript ส่งงานเร็ว ราคาคุยได้ ปรึกษาฟรี`,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: `รับทำเว็บไซต์ แอพ ระบบ POS | ${siteConfig.name}`,
    description: `รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง โดย ${siteConfig.name} — ส่งงานเร็ว ราคาคุยได้`,
    url: `${siteConfig.url}/services`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `รับทำเว็บไซต์ แอพ ระบบ POS | ${siteConfig.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `รับทำเว็บไซต์ แอพ ระบบ POS | ${siteConfig.name}`,
    description: `รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง โดย ${siteConfig.name} — ส่งงานเร็ว ราคาคุยได้`,
    images: ["/opengraph-image"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "หน้าแรก", path: "/" }, { name: "บริการ", path: "/services" }]} />
      <section className="relative overflow-hidden">
        <div className="bg-hologram absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-28">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl"><TypeReveal text="บริการ" /></h1>
          <p className="mt-4 text-xl text-muted">
            <TypeReveal text="ครอบคลุมงานพัฒนาซอฟต์แวร์ทุกประเภท ตั้งแต่เว็บ 1 หน้า ไปจนถึงระบบเต็มรูปแบบ" speed={30} />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="space-y-12">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100}>
            <div
              id={s.slug}
              className={`grid gap-6 md:grid-cols-2 md:items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="card p-8">
                <div className="text-accent">
                  {(() => {
                    const Icon = serviceIconMap[s.icon] ?? serviceIconMap.Globe;
                    return <Icon className="h-10 w-10" />;
                  })()}
                </div>
                <h2 className="mt-4 text-2xl font-bold">{s.title}</h2>
                <p className="mt-3 text-muted">{s.description}</p>
              </div>
              <div className="card p-8">
                <h3 className="font-semibold text-accent">สิ่งที่ได้</h3>
                <ul className="mt-4 space-y-3">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-sm text-muted">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-primary mt-6 text-sm">
                  สอบถามราคา
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <Reveal>
            <h2 className="text-center text-3xl font-bold"><TypeReveal text="ขั้นตอนการทำงาน" /></h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", t: "ปรึกษา", d: "คุยความต้องการ วิเคราะห์ปัญหา ไม่มีค่าใช้จ่าย" },
              { n: "02", t: "เสนอแผน", d: "สรุปขอบเขตงาน เทคโนโลยี ระยะเวลา และงบ" },
              { n: "03", t: "พัฒนา", d: "ทำงานเป็นช่วงๆ ให้ดูได้ตลอด ปรับแก้ได้" },
              { n: "04", t: "ส่งมอบ", d: "ทดสอบ ส่งมอบ สอนใช้งาน และดูแลหลังการขาย" },
            ].map((p, i) => (
              <Reveal key={p.n} delay={i * 100}>
                <div className="card p-6">
                  <p className="font-mono text-3xl text-gradient">{p.n}</p>
                  <h3 className="mt-3 font-semibold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <Reveal>
          <h2 className="text-3xl font-bold">รับทำเว็บไซต์ แอพ และระบบ ครบวงจร</h2>
          <p className="mt-4 text-muted">
            {siteConfig.name} รับทำเว็บไซต์ เว็บแอพ แอพมือถือ ระบบ POS ระบบตามสั่ง และระบบธุรกิจทุกประเภท
            ใช้เทคโนโลยี Next.js React TypeScript ทันสมัย โหลดเร็ว ติดอันดับ Google ดี
            รับงานตั้งแต่เว็บ 1 หน้า ไปจนถึงระบบเต็มรูปแบบ ส่งงานเร็ว ราคาคุยได้ ปรึกษาฟรี
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-accent">รับทำเว็บไซต์</h3>
              <p className="mt-3 text-sm text-muted">
                รับทำเว็บไซต์ธุรกิจ เว็บบริษัท เว็บขายของ เว็บนำเสนอ (Landing Page)
                ทุกเว็บติดตั้ง SEO ครบ มี sitemap, robots.txt, structured data
                โหลดเร็ว รองรับมือถือ ติดอันดับ Google ได้
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-accent">รับทำแอพมือถือ</h3>
              <p className="mt-3 text-sm text-muted">
                รับทำแอพ iOS และ Android ด้วย React Native และ Flutter
                ทำครั้งเดียวใช้ได้ทั้งสองระบบ ประหยัดงบ มี Push Notification
                เชื่อม API และฐานข้อมูล ตีพก App Store และ Play Store ได้
              </p>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-accent">รับทำระบบ POS</h3>
              <p className="mt-3 text-sm text-muted">
                รับทำระบบ POS ร้านอาหาร ร้านค้า ค้าปลีก
                ขายสินค้า พิมพ์ใบเสร็จ รองรับบาร์โค้ด จัดการสต็อก
                รายงานยอดขาย รองรับหลายสาขา ทำงานได้ทั้งออนไลน์และออฟไลน์
              </p>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="card p-6">
              <h3 className="text-lg font-bold text-accent">รับทำระบบตามสั่ง</h3>
              <p className="mt-3 text-sm text-muted">
                รับทำระบบเฉพาะทาง ระบบจองคิว ระบบคลังสินค้า ระบบ CRM ระบบ ERP
                ระบบเอกสาร ระบบจัดตาราง หรือระบบใดๆ ที่ซอฟต์แวร์สำเร็จรูปไม่ตอบโจทย์
                วิเคราะห์และออกแบบตามความต้องการ รองรับการขยายธุรกิจ
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Reveal>
            <h2 className="text-center text-3xl font-bold">คำถามที่พบบ่อย</h2>
          </Reveal>
          <div className="mt-10 space-y-6">
            <Reveal delay={100}>
              <div className="card p-6">
                <h3 className="font-semibold text-accent">รับทำเว็บไซต์ ราคาเท่าไหร่?</h3>
                <p className="mt-2 text-sm text-muted">
                  ราคาขึ้นกับขอบเขตงาน เว็บนำเสนอ (Landing Page) เริ่มต้นประมาณ 5,000-15,000 บาท
                  เว็บธุรกิจหลายหน้า 15,000-50,000 บาท เว็บแอพหรือระบบ 50,000 บาทขึ้นไป
                  ทักมาคุยรายละเอียดได้ ให้ผมประเมินงบที่เหมาะกับงานของคุณ
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="card p-6">
                <h3 className="font-semibold text-accent">ทำเว็บให้เสร็จนานแค่ไหน?</h3>
                <p className="mt-2 text-sm text-muted">
                  เว็บนำเสนอ 3-7 วัน เว็บธุรกิจ 1-3 สัปดาห์ เว็บแอพหรือระบบ 1-3 เดือน
                  ขึ้นกับความซับซ้อน ทำงานเป็นช่วงๆ ให้ดูได้ตลอด ปรับแก้ได้
                </p>
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="card p-6">
                <h3 className="font-semibold text-accent">ทำเว็บแล้วติดอันดับ Google ได้ไหม?</h3>
                <p className="mt-2 text-sm text-muted">
                  ได้ ทุกเว็บที่ทำติดตั้ง SEO ครบ — Title, Meta Description, Sitemap,
                  Robots.txt, Structured Data, ความเร็วโหลด และมือถือ
                  ใช้ Next.js ที่ Google ชอบ แต่อันดับขึ้นกับการแข่งขันคีย์เวิร์ดด้วย
                  ใช้เวลา 1-3 เดือนหลังส่งมอบ
                </p>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="card p-6">
                <h3 className="font-semibold text-accent">รับทำแอพมือถือ ราคาเท่าไหร่?</h3>
                <p className="mt-2 text-sm text-muted">
                  แอพมือถือเริ่มต้นประมาณ 30,000-100,000 บาท ขึ้นกับฟีเจอร์
                  ใช้ React Native หรือ Flutter ทำครั้งเดียวได้ทั้ง iOS และ Android
                  ประหยัดงบกว่าทำแยก
                </p>
              </div>
            </Reveal>
            <Reveal delay={500}>
              <div className="card p-6">
                <h3 className="font-semibold text-accent">รับทำระบบ POS ร้านอาหาร ราคาเท่าไหร่?</h3>
                <p className="mt-2 text-sm text-muted">
                  ระบบ POS ร้านอาหารเริ่มต้นประมาณ 30,000-80,000 บาท
                  ขายสินค้า พิมพ์ใบเสร็จ จัดการสต็อก รายงานยอดขาย
                  รองรับบาร์โค้ด หลายสาขา ทำงานได้ทั้งออนไลน์และออฟไลน์
                </p>
              </div>
            </Reveal>
            <Reveal delay={600}>
              <div className="card p-6">
                <h3 className="font-semibold text-accent">หลังส่งมอบมีดูแลไหม?</h3>
                <p className="mt-2 text-sm text-muted">
                  มี ดูแลและบำรุงรักษาหลังส่งมอบ แก้บั๊ก อัปเดตฟีเจอร์
                  สอนทีมใช้งาน และให้คำปรึกษาด้านเทคโนโลยีต่อเนื่อง
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactCTA />
      <FAQSchema faqs={[
        { q: "รับทำเว็บไซต์ ราคาเท่าไหร่?", a: "ราคาขึ้นกับขอบเขตงาน เว็บนำเสนอ (Landing Page) เริ่มต้นประมาณ 5,000-15,000 บาท เว็บธุรกิจหลายหน้า 15,000-50,000 บาท เว็บแอพหรือระบบ 50,000 บาทขึ้นไป ทักมาคุยรายละเอียดได้" },
        { q: "ทำเว็บให้เสร็จนานแค่ไหน?", a: "เว็บนำเสนอ 3-7 วัน เว็บธุรกิจ 1-3 สัปดาห์ เว็บแอพหรือระบบ 1-3 เดือน ขึ้นกับความซับซ้อน" },
        { q: "ทำเว็บแล้วติดอันดับ Google ได้ไหม?", a: "ได้ ทุกเว็บติดตั้ง SEO ครบ ใช้ Next.js ที่ Google ชอบ ใช้เวลา 1-3 เดือนหลังส่งมอบ" },
        { q: "รับทำแอพมือถือ ราคาเท่าไหร่?", a: "แอพมือถือเริ่มต้นประมาณ 30,000-100,000 บาท ใช้ React Native หรือ Flutter ทำครั้งเดียวได้ทั้ง iOS และ Android" },
        { q: "รับทำระบบ POS ร้านอาหาร ราคาเท่าไหร่?", a: "ระบบ POS ร้านอาหารเริ่มต้นประมาณ 30,000-80,000 บาท ขายสินค้า พิมพ์ใบเสร็จ จัดการสต็อก รายงานยอดขาย" },
        { q: "หลังส่งมอบมีดูแลไหม?", a: "มี ดูแลและบำรุงรักษาหลังส่งมอบ แก้บั๊ก อัปเดตฟีเจอร์ สอนทีมใช้งาน" },
      ]} />
      {services.map((s) => (
        <ServiceSchema key={s.slug} name={s.title} description={s.short} slug={s.slug} />
      ))}
    </>
  );
}
