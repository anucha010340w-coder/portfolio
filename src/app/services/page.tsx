import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { serviceIconMap } from "@/lib/serviceIcons";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema, ServiceSchema } from "@/components/Schema";

export const metadata: Metadata = {
  title: "บริการ",
  description: `บริการของ ${siteConfig.name} — รับทำเว็บแอพ เว็บไซต์ธุรกิจ แอพมือถือ ระบบ POS ระบบตามสั่ง และที่ปรึกษา IT`,
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: `บริการ | ${siteConfig.name}`,
    description: `บริการของ ${siteConfig.name} — รับทำเว็บแอพ เว็บไซต์ธุรกิจ แอพมือถือ ระบบ POS ระบบตามสั่ง และที่ปรึกษา IT`,
    url: `${siteConfig.url}/services`,
  },
  twitter: {
    card: "summary_large_image",
    title: `บริการ | ${siteConfig.name}`,
    description: `บริการของ ${siteConfig.name} — รับทำเว็บแอพ เว็บไซต์ธุรกิจ แอพมือถือ ระบบ POS ระบบตามสั่ง และที่ปรึกษา IT`,
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

      <ContactCTA />
      {services.map((s) => (
        <ServiceSchema key={s.slug} name={s.title} description={s.short} slug={s.slug} />
      ))}
    </>
  );
}
