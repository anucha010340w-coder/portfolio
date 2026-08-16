import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import TypeReveal from "@/components/TypeReveal";
import { BreadcrumbSchema, FAQSchema } from "@/components/Schema";
import "@/app/prose-thai.css";

export const metadata: Metadata = {
  title: "เกี่ยวกับผม",
  description: `รู้จัก ${siteConfig.name} — ${siteConfig.role} ผู้รับทำเว็บ แอพ และระบบตามสั่ง`,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: `เกี่ยวกับผม | ${siteConfig.name}`,
    description: `รู้จัก ${siteConfig.name} — ${siteConfig.role} ผู้รับทำเว็บ แอพ และระบบตามสั่ง`,
    url: `${siteConfig.url}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: `เกี่ยวกับผม | ${siteConfig.name}`,
    description: `รู้จัก ${siteConfig.name} — ${siteConfig.role} ผู้รับทำเว็บ แอพ และระบบตามสั่ง`,
  },
};

const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue"] },
  { group: "Backend", items: ["Node.js", "Express", "NestJS", "PostgreSQL", "MongoDB", "Prisma"] },
  { group: "Mobile", items: ["React Native", "Flutter", "PWA"] },
  { group: "DevOps & Tools", items: ["Docker", "Vercel", "GitHub Actions", "Linux", "Nginx"] },
  { group: "อื่นๆ", items: ["SEO", "POS Hardware", "LINE API", "Payment Gateway", "CMS"] },
];

const timeline = [
  {
    year: "2562 (2019)",
    title: "เริ่มต้นเป็น Developer",
    desc: "เริ่มเขียนโปรแกรมจริงจัง ทำเว็บและระบบเล็กๆ ให้ผู้รู้จัก",
  },
  {
    year: "2564 (2021)",
    title: "รับงาน freelance เต็มตัว",
    desc: "รับทำเว็บไซต์ธุรกิจ เว็บแอพ และระบบ POS ให้ร้านค้าและบริษัท",
  },
  {
    year: "2566 (2023)",
    title: "ขยายไปแอพมือถือ",
    desc: "เริ่มทำแอพมือถือด้วย React Native ให้ลูกค้าที่ต้องการแอปคู่กับเว็บ",
  },
  {
    year: "2568 (2025)",
    title: "มุ่งเน้นระบบและ SEO",
    desc: "เน้นคุณภาพระบบและทำ SEO ให้เว็บลูกค้าติดอันดับ Google ได้จริง",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: "หน้าแรก", path: "/" }, { name: "เกี่ยวกับผม", path: "/about" }]} />
      <section className="relative overflow-hidden">
        <div className="bg-hologram absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-28">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
            <TypeReveal text={`สวัสดีครับ ผม ${siteConfig.name}`} />
          </h1>
          <p className="mt-4 text-xl text-muted">
            <TypeReveal text={`${siteConfig.role} จากประเทศไทย รับทำเว็บ แอพ และระบบตามสั่งมากว่า 5 ปี`} speed={30} />
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16">
        <Reveal>
        <div className="prose-thai">
          <h2>เกี่ยวกับผม</h2>
          <p>
            ผมชื่อ <strong>{siteConfig.name}</strong> เป็น Full-Stack Developer รับทำเว็บแอพ เว็บไซต์ธุรกิจ แอพมือถือ ระบบ POS
            และระบบตามสั่ง มาตลอดกว่า 5 ปี ผมเชื่อว่าซอฟต์แวร์ที่ดีต้อง <strong>ใช้งานได้จริง แก้ปัญหาธุรกิจได้จริง</strong>
            ไม่ใช่แค่สวยในสายตา
          </p>
          <p>
            ผมทำงานกับลูกค้าตั้งแต่ร้านค้าเล็กๆ ที่ต้องการเว็บนำเสนอ ไปจนถึงบริษัทที่ต้องการระบบจัดการซับซ้อน
            ทุกงานผมเริ่มจากการฟัง วิเคราะห์ปัญหา แล้วเสนอทางออกที่คุ้มค่าที่สุด ไม่ใช่ขายของ
          </p>

          <h2>ทำไมลูกค้าเลือกผม?</h2>
          <ul>
            <li><strong>ติดตามผลงานจนจบ:</strong> ผมไม่ทำส่งแล้วหาย ทุกโปรเจกต์ผมติดตามดูแลจนลูกค้าใช้งานได้จริง พบปัญหาแก้ไขได้ทันที ไม่ต้องรอเป็นสัปดาห์</li>
            <li><strong>ราคากันเอง:</strong> ผมไม่คิดราคาเหมาราคาหลักหมื่นหลักแสนแบบไม่มีเหตุผล ราคาขึ้นกับขอบเขตงานจริง คุยกันได้ และมีเกณฑ์ชัดเจน ไม่มีค่าซ่อนเร้น</li>
            <li><strong>บริการหลังการขาย:</strong> ส่งมอบแล้วไม่จบ ผมดูแลและแก้ไขปัญหาต่อให้ ปรับเพิ่มฟีเจอร์ได้ ไม่ต้องหาคนใหม่มาดูต่อ ลูกค้าหลายรายทำงานด้วยกันมาตลอด 3-5 ปี</li>
            <li><strong>ไม่คุยเกินจริง:</strong> ทำได้แค่ไหนบอกแค่นั้น ถ้าฟีเจอร์ไหนทำไม่ได้ บอกตรงๆ ถ้าเทคโนโลยีไหนไม่เหมาะ แนะนำตรงๆ ไม่ขายของ ไม่สร้างความหวังลมๆ แล้วทำไม่ได้</li>
            <li><strong>ใช้งานได้จริง:</strong> เน้นความเสถียรและประสบการณ์ผู้ใช้ ไม่ใช่แค่หน้าตา เว็บหรือระบบที่ผมทำต้องใช้งานได้ทุกวัน ไม่ใช่โชว์พอร์ตแล้วทิ้ง</li>
          </ul>

          <h2>วิธีทำงานของผม</h2>
          <ol>
            <li><strong>ฟังก่อน:</strong> เริ่มจากคุยกับลูกค้าว่าต้องการอะไร มีปัญหาอะไร งบเท่าไหร่ ไม่รีบเสนอขาย</li>
            <li><strong>วางแผน:</strong> แยกขอบเขตชัดเจน บอกได้ว่าอะไรทำได้ อะไรทำไม่ได้ ระยะเวลาเท่าไหร่ ราคาเท่าไหร่</li>
            <li><strong>ทำจริง:</strong> เริ่มพัฒนา อัปเดตความคืบหน้าให้ลูกค้าเห็น ไม่หายไปเป็นเดือน</li>
            <li><strong>ส่งมอบและดูแล:</strong> ทดสอบให้ใช้งานได้จริง ส่งมอบพร้อมคู่มือ แล้วดูแลต่อ แก้ปัญหา ปรับเพิ่มได้ต่อไป</li>
          </ol>
        </div>
        </Reveal>
      </section>

      {/* Skills */}
      <section className="border-y border-border bg-card/30">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <Reveal>
            <h2 className="text-2xl font-bold"><TypeReveal text="ทักษะและเทคโนโลยี" /></h2>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {skills.map((s, i) => (
              <Reveal key={s.group} delay={i * 100}>
                <div className="card p-5">
                  <h3 className="font-semibold text-accent">{s.group}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="rounded-full border border-border bg-background px-3 py-1 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <Reveal>
          <h2 className="text-2xl font-bold"><TypeReveal text="เส้นทางของผม" /></h2>
        </Reveal>
        <div className="mt-8 space-y-6">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 100}>
              <div className="card flex flex-col gap-2 p-5 md:flex-row md:items-start md:gap-6">
                <div className="w-full md:w-40 shrink-0 font-mono text-sm text-accent">{t.year}</div>
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="mt-1 text-sm text-muted">{t.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <ContactCTA />
      <FAQSchema faqs={[
        { q: "รับทำเว็บไซต์และแอพไหม?", a: "รับทำครบทุกประเภท ตั้งแต่เว็บ 1 หน้า ไปจนถึงระบบเต็มรูปแบบ ทั้งเว็บแอพ เว็บธุรกิจ แอพมือถือ ระบบ POS และระบบตามสั่ง" },
        { q: "ราคาเริ่มต้นเท่าไหร่?", a: "ราคาขึ้นกับขอบเขตงานจริง คุยกันได้ มีเกณฑ์ชัดเจน ไม่มีค่าซ่อนเร้น ปรึกษาฟรี ไม่มีค่าใช้จ่าย" },
        { q: "ดูแลหลังส่งมอบไหม?", a: "ดูแลครับ ทุกโปรเจกต์ติดตามดูแลจนลูกค้าใช้งานได้จริง พบปัญหาแก้ไขได้ทันที ปรับเพิ่มฟีเจอร์ได้ต่อ" },
        { q: "ใช้เทคโนโลยีอะไร?", a: "ใช้ React, Next.js, TypeScript, Node.js, NestJS, PostgreSQL, React Native, Flutter, Docker และอื่นๆ ตามความเหมาะสมของงาน" },
        { q: "ติดต่อทางไหนได้บ้าง?", a: "ทักได้ทาง LINE, โทรศัพท์, อีเมล, Facebook และ GitHub เวลาทำการ 9.00 - 21.00 น. ตอบกลับภายใน 24 ชม." },
      ]} />
    </>
  );
}
